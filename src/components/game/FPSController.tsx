import { useRef, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../stores/gameStore'
import { useMobileStore } from '../../stores/mobileStore'
import { network } from '../../network/websocket'
import { resolvePlayerCollision, PLAYER_RADIUS, GRAVITY, JUMP_FORCE, getGroundHeight } from '../../config/mapConfig'
import { updateLocalPlayer } from './playerTracker'
import { WEAPONS, getShootCooldown, getRecoilValues } from '../../config/weapons'
import { registerLocalPlayerDamageHandler, onPlayerDeath, getRespawnPoint, onPlayerRespawn } from '../../game/solo/soloCombat'

const LOCAL_PLAYER_ID = 'local_player'
const SOLO_RESPAWN_DELAY = 1.5 // 死亡后多久重生（秒），越短“已阵亡”画面停留越短
const SOLO_RESPAWN_INVULN = 2.5 // 重生后短暂无敌（秒），避免一露头又被秒
const SOLO_SPAWN_INVULN = 2.5 // 入场即获得短暂无敌，避免一进场就被集火秒杀

const EYE_HEIGHT = 1.5
const CROUCH_HEIGHT = 0.8
const PRONE_HEIGHT = 0.3

export default function FPSController() {
  const { camera, gl } = useThree()
  const { currentRoom, playerId } = useGameStore()
  
  const moveState = useRef({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
    sprint: false,
    pickup: false,
  })
  
  const postureState = useRef({
    standing: true,
    crouching: false,
    prone: false,
  })
  const targetBodyHeight = useRef(EYE_HEIGHT)
  const currentBodyHeight = useRef(EYE_HEIGHT)
  
  const velocity = useRef(new THREE.Vector3())
  const velocityY = useRef(0)
  const onGround = useRef(true)
  const direction = useRef(new THREE.Vector3())
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
  const finalEuler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'))
  
  const position = useRef(new THREE.Vector3(-30, 1.5, -42))
  const isLocked = useRef(false)
  
  const shootCooldown = useRef(0)
  const lastPosition = useRef({ x: 0, y: 0, z: 0 })
  const lastRotation = useRef({ x: 0, y: 0 })
  const lastNetworkSend = useRef(0)
  const recoilPitch = useRef(0)
  const recoilYaw = useRef(0)
  
  const ammo = useRef(7)
  const maxAmmo = useRef(7)
  const isReloading = useRef(false)
  const reloadTime = useRef(0)
  const isMouseDown = useRef(false)
  const weaponIndex = useRef(0)
  const lastMobileReload = useRef(false)
  const lastMobileAim = useRef(false)
  const lastSwitchWeapon = useRef(0)
  
  const health = useRef(100)
  const isAlive = useRef(true)
  const respawnTime = useRef(0)
  const invulnTimer = useRef(0)
  const positionInitialized = useRef(false)
  const lastHealth = useRef(100)
  const lastIsAlive = useRef(true)
  const lastSyncedHealth = useRef(100)
  const playerWeapons = useRef<{ index: number; permanent: boolean }[]>([{ index: 3, permanent: true }])
  const playerWeaponSlot = useRef(0)
  const ammoPerSlot = useRef<number[]>([])

  const _forward = useRef(new THREE.Vector3())
  const _right = useRef(new THREE.Vector3())
  const _shootDir = useRef(new THREE.Vector3())
  const isAiming = useRef(false)
  const targetFov = useRef(75)

  useEffect(() => {
    const player = currentRoom?.players?.find(p => p.id === playerId)
    if (player) {
      if (!positionInitialized.current) {
        position.current.set(player.position.x, player.position.y, player.position.z)
        positionInitialized.current = true
        onGround.current = true
        velocityY.current = 0
        // 单人模式：入场即获得短暂无敌，避免一进场就被集火秒杀（否则“已阵亡”会一直刷）
        if (useGameStore.getState().isSolo) {
          invulnTimer.current = SOLO_SPAWN_INVULN
          useGameStore.getState().setSoloInvuln(true)
        }
      }
      // 单人模式：血量/存活由 FPSController 本地权威管理，房间里的 me 只是镜像。
      // 绝不能用可能滞后的房间数据反向覆盖本地状态，否则会在 onPlayerDeath→bumpRoom
      // 触发的 currentRoom 变化时把 isAlive 改回 true，导致“已阵亡”画面卡死。
      // 多人模式：以服务器下发的 player.health/isAlive 为准。
      if (!useGameStore.getState().isSolo) {
        health.current = player.health
        isAlive.current = player.isAlive
        lastHealth.current = player.health
        lastIsAlive.current = player.isAlive
      }
      if (player.weapons) {
        playerWeapons.current = player.weapons
        playerWeaponSlot.current = player.currentWeaponSlot ?? 0
        weaponIndex.current = player.weapons[playerWeaponSlot.current]?.index ?? 0
        for (let i = 0; i < player.weapons.length; i++) {
          if (ammoPerSlot.current[i] === undefined) {
            const wIdx = player.weapons[i]?.index ?? 0
            ammoPerSlot.current[i] = WEAPONS[wIdx]?.magSize ?? 30
          }
        }
      }
    }
  }, [currentRoom, playerId])

  useEffect(() => {
    const handlePlayerRespawn = (data: unknown) => {
      const respawnData = data as { playerId: string; position: { x: number; y: number; z: number } }
      if (respawnData.playerId === playerId) {
        position.current.set(respawnData.position.x, respawnData.position.y, respawnData.position.z)
        velocityY.current = 0
        onGround.current = true
        isAlive.current = true
        health.current = 100
      }
    }

    const handleGameStarted = (data: unknown) => {
      console.log('[FPS] game_started received')
      const room = data as { players: { id: string; position: { x: number; y: number; z: number } }[] }
      const player = room.players?.find(p => p.id === playerId)
      if (player) {
        console.log('[FPS] Setting position from game_started:', player.position)
        position.current.set(player.position.x, player.position.y, player.position.z)
        velocityY.current = 0
        onGround.current = true
        isAlive.current = true
        health.current = 100
        velocity.current.set(0, 0, 0)
      } else {
        console.log('[FPS] Player not found in room')
      }
    }

    network.on('player_respawned', handlePlayerRespawn)
    network.on('game_started', handleGameStarted)

    return () => {
      network.off('player_respawned', handlePlayerRespawn)
      network.off('game_started', handleGameStarted)
    }
  }, [playerId])

  // 单人模式：注册本地玩家受伤回调（由机器人射击触发），本地结算死亡/重生
  useEffect(() => {
    const onDamage = (amount: number) => {
      if (!useGameStore.getState().isSolo) return
      if (!isAlive.current) return
      if (invulnTimer.current > 0) return // 重生保护期间免伤
      health.current -= amount
      if (health.current <= 0) {
        health.current = 0
        isAlive.current = false
        respawnTime.current = SOLO_RESPAWN_DELAY
        onPlayerDeath()
      }
      const h = Math.max(0, Math.round(health.current))
      if (h !== lastSyncedHealth.current) {
        lastSyncedHealth.current = h
        useGameStore.getState().setLocalHealth(h)
      }
    }
    registerLocalPlayerDamageHandler(onDamage)
    return () => {
      registerLocalPlayerDamageHandler(null)
    }
  }, [])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!isLocked.current) return
    
    const movementX = event.movementX || 0
    const movementY = event.movementY || 0
    
    euler.current.y -= movementX * 0.002
    euler.current.x -= movementY * 0.002
    euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x))
  }, [camera])

  const reload = useCallback(() => {
    const weapon = WEAPONS[weaponIndex.current]
    if (!weapon) return
    if (isReloading.current || ammo.current === weapon.magSize) return
    isReloading.current = true
    reloadTime.current = weapon.reloadTime
    useGameStore.getState().setReloading(true)
  }, [])

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW': moveState.current.forward = true; break
      case 'KeyS': moveState.current.backward = true; break
      case 'KeyA': moveState.current.left = true; break
      case 'KeyD': moveState.current.right = true; break
      case 'Space': moveState.current.jump = true; break
      case 'ShiftLeft': moveState.current.sprint = true; break
      case 'KeyR': reload(); break
      case 'KeyF': moveState.current.pickup = true; break
      case 'Digit1':
      case 'Numpad1':
        if (playerWeapons.current.length > 0 && playerWeaponSlot.current !== 0) {
          ammoPerSlot.current[playerWeaponSlot.current] = ammo.current
          playerWeaponSlot.current = 0
          weaponIndex.current = playerWeapons.current[0].index
          if (!useGameStore.getState().isSolo) network.switchWeaponSlot(0)
          useGameStore.getState().setPlayerWeapons(playerWeapons.current, 0)
          ammo.current = ammoPerSlot.current[0] ?? WEAPONS[weaponIndex.current]?.magSize ?? 30
          maxAmmo.current = WEAPONS[weaponIndex.current]?.magSize ?? 30
          isReloading.current = false
        }
        break
      case 'Digit2':
      case 'Numpad2':
        if (playerWeapons.current.length > 1 && playerWeaponSlot.current !== 1) {
          ammoPerSlot.current[playerWeaponSlot.current] = ammo.current
          playerWeaponSlot.current = 1
          weaponIndex.current = playerWeapons.current[1].index
          if (!useGameStore.getState().isSolo) network.switchWeaponSlot(1)
          useGameStore.getState().setPlayerWeapons(playerWeapons.current, 1)
          ammo.current = ammoPerSlot.current[1] ?? WEAPONS[weaponIndex.current]?.magSize ?? 30
          maxAmmo.current = WEAPONS[weaponIndex.current]?.magSize ?? 30
          isReloading.current = false
        }
        break
      case 'Digit3':
      case 'Numpad3':
        if (playerWeapons.current.length > 2 && playerWeaponSlot.current !== 2) {
          ammoPerSlot.current[playerWeaponSlot.current] = ammo.current
          playerWeaponSlot.current = 2
          weaponIndex.current = playerWeapons.current[2].index
          if (!useGameStore.getState().isSolo) network.switchWeaponSlot(2)
          useGameStore.getState().setPlayerWeapons(playerWeapons.current, 2)
          ammo.current = ammoPerSlot.current[2] ?? WEAPONS[weaponIndex.current]?.magSize ?? 30
          maxAmmo.current = WEAPONS[weaponIndex.current]?.magSize ?? 30
          isReloading.current = false
        }
        break
      case 'Digit4':
      case 'Numpad4':
        if (playerWeapons.current.length > 3 && playerWeaponSlot.current !== 3) {
          ammoPerSlot.current[playerWeaponSlot.current] = ammo.current
          playerWeaponSlot.current = 3
          weaponIndex.current = playerWeapons.current[3].index
          if (!useGameStore.getState().isSolo) network.switchWeaponSlot(3)
          useGameStore.getState().setPlayerWeapons(playerWeapons.current, 3)
          ammo.current = ammoPerSlot.current[3] ?? WEAPONS[weaponIndex.current]?.magSize ?? 30
          maxAmmo.current = WEAPONS[weaponIndex.current]?.magSize ?? 30
          isReloading.current = false
        }
        break
      case 'KeyZ':
        if (!postureState.current.prone) {
          postureState.current.crouching = true
          postureState.current.standing = false
          targetBodyHeight.current = CROUCH_HEIGHT
        }
        break
      case 'KeyC':
        if (!postureState.current.crouching) {
          postureState.current.prone = true
          postureState.current.standing = false
          targetBodyHeight.current = PRONE_HEIGHT
        }
        break
    }
  }, [reload])

  const handleKeyUp = useCallback((event: KeyboardEvent) => {
    switch (event.code) {
      case 'KeyW': moveState.current.forward = false; break
      case 'KeyS': moveState.current.backward = false; break
      case 'KeyA': moveState.current.left = false; break
      case 'KeyD': moveState.current.right = false; break
      case 'Space': moveState.current.jump = false; break
      case 'ShiftLeft': moveState.current.sprint = false; break
      case 'KeyZ':
        postureState.current.crouching = false
        postureState.current.standing = !postureState.current.prone
        if (!postureState.current.prone) {
          targetBodyHeight.current = EYE_HEIGHT
        }
        break
      case 'KeyC':
        postureState.current.prone = false
        postureState.current.standing = !postureState.current.crouching
        if (!postureState.current.crouching) {
          targetBodyHeight.current = EYE_HEIGHT
        }
        break
    }
  }, [])

  const handlePointerDown = useCallback(() => {
    if (!isLocked.current) {
      gl.domElement.requestPointerLock()
    }
  }, [gl])

  const shoot = useCallback(() => {
    const weapon = WEAPONS[weaponIndex.current]
    if (!weapon) return
    
    // AWP必须开镜才能射击
    if (weapon.type === 'sniper' && !isAiming.current) return
    
    shootCooldown.current = getShootCooldown(weapon)
    ammo.current -= 1

    useGameStore.getState().triggerLocalShoot()
    useGameStore.getState().setAmmo(ammo.current)
    
    const recoilValues = getRecoilValues(weapon)
    recoilPitch.current = Math.min(recoilPitch.current + recoilValues.pitch, weapon.recoil * 0.025)
    recoilYaw.current += (Math.random() - 0.5) * recoilValues.yaw
    recoilYaw.current = Math.max(-weapon.recoil * 0.02, Math.min(weapon.recoil * 0.02, recoilYaw.current))
    
    _shootDir.current.set(0, 0, -1)
    _shootDir.current.applyQuaternion(camera.quaternion)

    // 瞄准时降低散布
    const finalSpread = isAiming.current ? weapon.spread * weapon.adsSpreadMult : weapon.spread
    if (finalSpread > 0.001) {
      _shootDir.current.x += (Math.random() - 0.5) * finalSpread
      _shootDir.current.y += (Math.random() - 0.5) * finalSpread
      _shootDir.current.z += (Math.random() - 0.5) * finalSpread * 0.5
      _shootDir.current.normalize()
    }
    if (!useGameStore.getState().isSolo) {
      network.sendShoot({ x: _shootDir.current.x, y: _shootDir.current.y, z: _shootDir.current.z, damage: weapon.damage })
    }
    console.log(`Shoot! Ammo left: ${ammo.current}, Weapon: ${weapon.name}, Damage: ${weapon.damage}`)
  }, [camera, playerId])

  useEffect(() => {
    const handlePointerLockChange = () => {
      isLocked.current = document.pointerLockElement === gl.domElement
    }

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button === 0) {
        isMouseDown.current = true
      }
      if (e.button === 2) {
        isAiming.current = true
        useGameStore.getState().setIsAiming(true)
      }
    }

    const handleMouseUp = (e: MouseEvent) => {
      if (e.button === 0) {
        isMouseDown.current = false
      }
      if (e.button === 2) {
        isAiming.current = false
        useGameStore.getState().setIsAiming(false)
      }
    }

    const handleContextMenu = (e: Event) => e.preventDefault()

    document.addEventListener('pointerlockchange', handlePointerLockChange)
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('keyup', handleKeyUp)
    gl.domElement.addEventListener('click', handlePointerDown)
    gl.domElement.addEventListener('contextmenu', handleContextMenu)

    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('keyup', handleKeyUp)
      gl.domElement.removeEventListener('click', handlePointerDown)
      gl.domElement.removeEventListener('contextmenu', handleContextMenu)
    }
  }, [gl, handleMouseMove, handleKeyDown, handleKeyUp, handlePointerDown])

  useFrame((_, delta) => {
    const isSolo = useGameStore.getState().isSolo

    if (!isAlive.current) {
      respawnTime.current -= delta
      if (respawnTime.current <= 0) {
        if (isSolo) {
          try {
            const sp = getRespawnPoint()
            position.current.set(sp.x, sp.y, sp.z)
          } catch (e) {
            // 兜底：重生取点异常也不能让玩家卡死在“已阵亡”
            console.error('[FPS] respawn point failed, fallback to safe spawn', e)
            position.current.set(0, 2, 0)
          }
          velocityY.current = 0
          onGround.current = true
          health.current = 100
          isAlive.current = true
          invulnTimer.current = SOLO_RESPAWN_INVULN
          useGameStore.getState().setSoloInvuln(true)
          const h = 100
          if (h !== lastSyncedHealth.current) {
            lastSyncedHealth.current = h
            useGameStore.getState().setLocalHealth(h)
          }
          // 重置机器人仇恨与开火冷却，避免一露头就被集火 → “已阵亡”反复刷
          try {
            onPlayerRespawn()
          } catch (e) {
            console.error('[FPS] reset bot aggro failed', e)
          }
        } else {
          // 多人模式异常兜底：绝不要让玩家永久卡在死亡状态
          health.current = 100
          isAlive.current = true
        }
      }
    }
    // 复活成功后落入下方正常逻辑（移动 + 写回房间镜像）；
    // 仍处于死亡倒计时时，仅把死亡状态同步进房间镜像后返回，不处理移动/射击。
    if (!isAlive.current) {
      const r = useGameStore.getState().currentRoom
      const me = r?.players.find(p => p.id === LOCAL_PLAYER_ID)
      if (me) {
        me.isAlive = false
        me.health = 0
      }
      return
    }

    // 重生保护倒计时
    if (invulnTimer.current > 0) {
      invulnTimer.current -= delta
      if (invulnTimer.current <= 0) {
        invulnTimer.current = 0
        useGameStore.getState().setSoloInvuln(false)
      }
    }

    const mobile = useMobileStore.getState()
    if (mobile.isMobile) {
      moveState.current.forward = mobile.moveY > 0.1
      moveState.current.backward = mobile.moveY < -0.1
      moveState.current.left = mobile.moveX < -0.1
      moveState.current.right = mobile.moveX > 0.1
      moveState.current.jump = mobile.jump
      moveState.current.sprint = mobile.sprint
      moveState.current.pickup = mobile.pickup
      isMouseDown.current = mobile.shoot
      isAiming.current = mobile.aim

      if (mobile.crouch && !postureState.current.prone) {
        postureState.current.crouching = true
        postureState.current.standing = false
        targetBodyHeight.current = CROUCH_HEIGHT
      } else if (!mobile.crouch && postureState.current.crouching) {
        postureState.current.crouching = false
        postureState.current.standing = !postureState.current.prone
        if (!postureState.current.prone) {
          targetBodyHeight.current = EYE_HEIGHT
        }
      }

      if (mobile.prone && !postureState.current.crouching) {
        postureState.current.prone = true
        postureState.current.standing = false
        targetBodyHeight.current = PRONE_HEIGHT
      } else if (!mobile.prone && postureState.current.prone) {
        postureState.current.prone = false
        postureState.current.standing = !postureState.current.crouching
        if (!postureState.current.crouching) {
          targetBodyHeight.current = EYE_HEIGHT
        }
      }

      const lookDelta = useMobileStore.getState().consumeLookDelta()
      if (lookDelta.x !== 0 || lookDelta.y !== 0) {
        euler.current.y -= lookDelta.x
        euler.current.x -= lookDelta.y
        euler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, euler.current.x))
      }

      if (mobile.reload && !lastMobileReload.current) {
        reload()
      }
      lastMobileReload.current = mobile.reload

      if (mobile.aim !== lastMobileAim.current) {
        isAiming.current = mobile.aim
        useGameStore.getState().setIsAiming(mobile.aim)
      }
      lastMobileAim.current = mobile.aim

      if (mobile.switchWeapon !== lastSwitchWeapon.current) {
        const delta = mobile.switchWeapon - lastSwitchWeapon.current
        lastSwitchWeapon.current = mobile.switchWeapon
        if (playerWeapons.current.length > 1) {
          let newSlot = playerWeaponSlot.current + (delta > 0 ? 1 : -1)
          if (newSlot < 0) newSlot = playerWeapons.current.length - 1
          if (newSlot >= playerWeapons.current.length) newSlot = 0
          ammoPerSlot.current[playerWeaponSlot.current] = ammo.current
          playerWeaponSlot.current = newSlot
          weaponIndex.current = playerWeapons.current[newSlot].index
          if (!useGameStore.getState().isSolo) network.switchWeaponSlot(newSlot)
          useGameStore.getState().setPlayerWeapons(playerWeapons.current, newSlot)
          ammo.current = ammoPerSlot.current[newSlot] ?? WEAPONS[weaponIndex.current]?.magSize ?? 30
          maxAmmo.current = WEAPONS[weaponIndex.current]?.magSize ?? 30
          isReloading.current = false
        }
      }
    }

    shootCooldown.current -= delta

    if (isMouseDown.current && shootCooldown.current <= 0 && isAlive.current && ammo.current > 0 && !isReloading.current) {
      shoot()
    }

    if (isReloading.current) {
      reloadTime.current -= delta
      if (reloadTime.current <= 0) {
        const weapon = WEAPONS[weaponIndex.current]
        ammo.current = weapon ? weapon.magSize : 30
        maxAmmo.current = ammo.current
        isReloading.current = false
        useGameStore.getState().setAmmo(ammo.current)
        useGameStore.getState().setReloading(false)
      }
    }

    const weapon = WEAPONS[weaponIndex.current]
    const recoilRecovery = weapon ? Math.pow(weapon.recoilRecovery, delta) : Math.pow(0.008, delta)
    recoilPitch.current *= recoilRecovery
    recoilYaw.current *= recoilRecovery

    // 瞄准FOV过渡
    if (weapon) {
      targetFov.current = isAiming.current ? weapon.adsFov : 75
    } else {
      targetFov.current = 75
    }
    const perspectiveCam = camera as THREE.PerspectiveCamera
    const currentFov = perspectiveCam.fov
    const fovDiff = targetFov.current - currentFov
    if (Math.abs(fovDiff) > 0.1) {
      perspectiveCam.fov += fovDiff * Math.min(delta * 12, 1)
    } else {
      perspectiveCam.fov = targetFov.current
    }
    perspectiveCam.updateProjectionMatrix()

    finalEuler.current.x = euler.current.x + recoilPitch.current
    finalEuler.current.y = euler.current.y + recoilYaw.current
    finalEuler.current.z = 0
    finalEuler.current.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, finalEuler.current.x))
    camera.quaternion.setFromEuler(finalEuler.current)

    const footYBeforeHeightChange = position.current.y - currentBodyHeight.current

    // 身体高度过渡（蹲下/趴下的平滑过渡）
    const heightDiff = targetBodyHeight.current - currentBodyHeight.current
    if (Math.abs(heightDiff) > 0.001) {
      currentBodyHeight.current += heightDiff * Math.min(delta * 12, 1)
      currentBodyHeight.current = Math.max(PRONE_HEIGHT, Math.min(EYE_HEIGHT, currentBodyHeight.current))
      if (onGround.current) {
        position.current.y = footYBeforeHeightChange + currentBodyHeight.current
      }
    }

    let speed = 5
    if (moveState.current.sprint && !postureState.current.crouching && !postureState.current.prone && !isAiming.current) {
      speed = 8
    } else if (postureState.current.crouching) {
      speed = 2.5
    } else if (postureState.current.prone) {
      speed = 1.2
    }
    if (isAiming.current && weapon) {
      speed *= weapon.adsMoveMult
    }
    
    velocity.current.x *= (1 - 10 * delta)
    velocity.current.z *= (1 - 10 * delta)

    direction.current.z = Number(moveState.current.forward) - Number(moveState.current.backward)
    direction.current.x = Number(moveState.current.right) - Number(moveState.current.left)
    direction.current.normalize()

    velocity.current.x += direction.current.x * speed * delta * 10
    velocity.current.z += direction.current.z * speed * delta * 10

    _forward.current.set(0, 0, -1)
    _forward.current.applyQuaternion(camera.quaternion)
    _forward.current.y = 0
    _forward.current.normalize()

    _right.current.set(1, 0, 0)
    _right.current.applyQuaternion(camera.quaternion)
    _right.current.y = 0
    _right.current.normalize()

    const moveX = _right.current.x * velocity.current.x * delta + _forward.current.x * velocity.current.z * delta
    const moveZ = _right.current.z * velocity.current.x * delta + _forward.current.z * velocity.current.z * delta

    const newX = position.current.x + moveX
    const newZ = position.current.z + moveZ

    const footY = position.current.y - currentBodyHeight.current

    // 用脚底上方30cm做水平碰撞检测：
    // - 站在1m箱子上时检测Y=1.3，超出箱子范围(0~1)，不会和自身站着的箱子碰撞
    // - 在地面行走时检测Y=0.3，能被箱子/墙挡住
    // - 跳跃顶点检测Y≈1.9，被2m高的物体挡住，防止穿墙
    const resolved = resolvePlayerCollision(
      position.current.x,
      position.current.z,
      newX,
      newZ,
      footY + 0.3,
      PLAYER_RADIUS
    )
    
    position.current.x = Math.max(-45, Math.min(45, resolved.x))
    position.current.z = Math.max(-45, Math.min(45, resolved.z))

    if (moveState.current.jump && onGround.current && postureState.current.standing) {
      velocityY.current = JUMP_FORCE
      onGround.current = false
      console.log('[FPS] JUMP!')
    }

    velocityY.current -= GRAVITY * delta

    const newFootY = footY + velocityY.current * delta
    const maxStepHeight = 0.5

    if (onGround.current && velocityY.current <= 0) {
      const groundAtNewPos = getGroundHeight(position.current.x, position.current.z, footY + maxStepHeight + 0.01, undefined, footY)
      if (groundAtNewPos >= footY - 0.2) {
        position.current.y = groundAtNewPos + currentBodyHeight.current
        velocityY.current = 0
        onGround.current = true
      } else {
        position.current.y = newFootY + currentBodyHeight.current
        onGround.current = false
      }
    } else if (velocityY.current <= 0) {
      const groundBelow = getGroundHeight(position.current.x, position.current.z, footY + 0.1)
      if (newFootY <= groundBelow) {
        position.current.y = groundBelow + currentBodyHeight.current
        velocityY.current = 0
        onGround.current = true
      } else {
        position.current.y = newFootY + currentBodyHeight.current
        onGround.current = false
      }
    } else {
      position.current.y = newFootY + currentBodyHeight.current
      onGround.current = false
    }

    position.current.y = Math.max(currentBodyHeight.current, Math.min(30, position.current.y))
    camera.position.copy(position.current)
    updateLocalPlayer(position.current.x, position.current.z, euler.current.y)

    // 单人模式：把本地玩家的位置/朝向写回 room（供小地图与 AI 读取），不走网络
    if (isSolo) {
      const r = useGameStore.getState().currentRoom
      const me = r?.players.find(p => p.id === LOCAL_PLAYER_ID)
      if (me) {
        me.position.x = position.current.x
        me.position.y = position.current.y
        me.position.z = position.current.z
        me.rotation.y = euler.current.y
        me.isAlive = isAlive.current
        me.health = Math.max(0, Math.round(health.current))
      }
    }

    lastNetworkSend.current += delta * 1000
    const shouldSend = lastNetworkSend.current >= 50
    
    const posChanged = 
      Math.abs(position.current.x - lastPosition.current.x) > 0.02 ||
      Math.abs(position.current.z - lastPosition.current.z) > 0.02
    
    const rotChanged = 
      Math.abs(euler.current.y - lastRotation.current.y) > 0.005

    if (!isSolo && shouldSend && (posChanged || rotChanged)) {
      network.sendMove(
        { x: position.current.x, y: position.current.y, z: position.current.z },
        { x: euler.current.x, y: euler.current.y }
      )
      lastPosition.current = { x: position.current.x, y: position.current.y, z: position.current.z }
      lastRotation.current = { x: euler.current.x, y: euler.current.y }
      lastNetworkSend.current = 0
    }

    // 检测地面武器拾取（按E键）
    if (moveState.current.pickup) {
      moveState.current.pickup = false
      const store = useGameStore.getState()
      const groundWeapons = store.groundWeapons
      if (groundWeapons && !isSolo) {
        const px = position.current.x
        const pz = position.current.z
        for (const gw of groundWeapons) {
          if (!gw.available) continue
          const dist = Math.sqrt((px - gw.position.x) ** 2 + (pz - gw.position.z) ** 2)
          if (dist < 2) {
            network.pickupWeapon(gw.id)
            break
          }
        }
      }
    }
  })

  return null
}
