import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useGameStore } from '../../stores/gameStore'

interface PlayerMeshRefs {
  group: THREE.Group
  leftArm: THREE.Group
  rightArm: THREE.Group
  leftLeg: THREE.Group
  leftKnee: THREE.Group
  rightLeg: THREE.Group
  rightKnee: THREE.Group
  smoothedPos: THREE.Vector3
  smoothedRotY: number
  walkTime: number
  lastPos: THREE.Vector3
}

const SKIN_MAT = new THREE.MeshStandardMaterial({ color: '#e8c4a0', metalness: 0.05, roughness: 0.8 })
const HAIR_MAT = new THREE.MeshStandardMaterial({ color: '#3d2817', metalness: 0.0, roughness: 0.9 })
const EYE_WHITE_MAT = new THREE.MeshStandardMaterial({ color: '#ffffff', metalness: 0.0, roughness: 0.3 })
const EYE_PUPIL_MAT = new THREE.MeshStandardMaterial({ color: '#1a1a1a', metalness: 0.1, roughness: 0.3 })
const BROW_MAT = new THREE.MeshStandardMaterial({ color: '#2a1a0a', metalness: 0.0, roughness: 0.9 })
const NOSE_MAT = new THREE.MeshStandardMaterial({ color: '#d4a88a', metalness: 0.05, roughness: 0.8 })
const LIP_MAT = new THREE.MeshStandardMaterial({ color: '#c07070', metalness: 0.0, roughness: 0.6 })
const EAR_MAT = new THREE.MeshStandardMaterial({ color: '#d4a080', metalness: 0.05, roughness: 0.8 })
const GUN_METAL_MAT = new THREE.MeshStandardMaterial({ color: '#444', metalness: 0.7, roughness: 0.3 })
const GUN_BARREL_MAT = new THREE.MeshStandardMaterial({ color: '#2a2a2a', metalness: 0.85, roughness: 0.2 })
const GUN_GRIP_MAT = new THREE.MeshStandardMaterial({ color: '#5c3a21', metalness: 0.1, roughness: 0.75 })
const LEG_MAT = new THREE.MeshStandardMaterial({ color: '#3a3a3a', metalness: 0.1, roughness: 0.75 })
const LEG_LOWER_MAT = new THREE.MeshStandardMaterial({ color: '#2d2d2d', metalness: 0.1, roughness: 0.75 })
const SHOE_MAT = new THREE.MeshStandardMaterial({ color: '#1a1a1a', metalness: 0.2, roughness: 0.8 })
const BELT_MAT = new THREE.MeshStandardMaterial({ color: '#2a1a0a', metalness: 0.1, roughness: 0.7 })
const POCKET_MAT = new THREE.MeshStandardMaterial({ color: '#1a2a3a', metalness: 0.05, roughness: 0.8 })
const GLOVE_MAT = new THREE.MeshStandardMaterial({ color: '#2a2a2a', metalness: 0.1, roughness: 0.7 })
const KNEEPAD_MAT = new THREE.MeshStandardMaterial({ color: '#1a1a1a', metalness: 0.2, roughness: 0.6 })
const ELBOWPAD_MAT = new THREE.MeshStandardMaterial({ color: '#1a1a1a', metalness: 0.2, roughness: 0.6 })
const MAG_POUCH_MAT = new THREE.MeshStandardMaterial({ color: '#2a2a2a', metalness: 0.05, roughness: 0.75 })
const GRENADE_POUCH_MAT = new THREE.MeshStandardMaterial({ color: '#2a2a2a', metalness: 0.05, roughness: 0.75 })
const RADIO_MAT = new THREE.MeshStandardMaterial({ color: '#333', metalness: 0.3, roughness: 0.5 })
const BOOT_LACE_MAT = new THREE.MeshStandardMaterial({ color: '#0a0a0a', metalness: 0.1, roughness: 0.8 })
const COLLAR_MAT = new THREE.MeshStandardMaterial({ color: '#1a1a1a', metalness: 0.1, roughness: 0.7 })

// 头部几何体
const HEAD_GEO = new THREE.SphereGeometry(0.18, 16, 16)
const HAIR_TOP_GEO = new THREE.SphereGeometry(0.19, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.5)
const HAIR_BACK_GEO = new THREE.SphereGeometry(0.17, 12, 12, Math.PI * 0.3, Math.PI * 0.4, 0, Math.PI * 0.6)
const EYE_WHITE_GEO = new THREE.SphereGeometry(0.035, 8, 8)
const EYE_PUPIL_GEO = new THREE.SphereGeometry(0.02, 6, 6)
const BROW_GEO = new THREE.BoxGeometry(0.06, 0.012, 0.015)
const NOSE_GEO = new THREE.ConeGeometry(0.025, 0.06, 4)
const LIP_GEO = new THREE.BoxGeometry(0.05, 0.012, 0.015)
const EAR_GEO = new THREE.SphereGeometry(0.04, 6, 6)

const NECK_GEO = new THREE.CylinderGeometry(0.05, 0.06, 0.08, 8)
const TORSO_GEO = new THREE.BoxGeometry(0.36, 0.6, 0.24)
const TORSO_LOWER_GEO = new THREE.BoxGeometry(0.34, 0.28, 0.23)
const VEST_GEO = new THREE.BoxGeometry(0.3, 0.25, 0.05)
const BELT_GEO = new THREE.BoxGeometry(0.36, 0.04, 0.26)
const SHOULDER_L_GEO = new THREE.SphereGeometry(0.07, 8, 8)
const SHOULDER_R_GEO = new THREE.SphereGeometry(0.07, 8, 8)
const ELBOW_L_GEO = new THREE.SphereGeometry(0.045, 6, 6)
const ELBOW_R_GEO = new THREE.SphereGeometry(0.045, 6, 6)
const UPPER_ARM_GEO = new THREE.CylinderGeometry(0.055, 0.05, 0.28, 8)
const FOREARM_GEO = new THREE.CylinderGeometry(0.045, 0.04, 0.24, 8)
const GUN_PART_GEO = new THREE.BoxGeometry(0.1, 0.04, 0.08)
const GUN_BARREL_GEO = new THREE.CylinderGeometry(0.02, 0.015, 0.45, 6)
const GUN_GRIP_GEO = new THREE.BoxGeometry(0.06, 0.1, 0.2)
const GUN_ARM_GEO = new THREE.CylinderGeometry(0.05, 0.04, 0.24, 8)
const HIP_GEO = new THREE.BoxGeometry(0.28, 0.1, 0.18)
const KNEE_GEO = new THREE.SphereGeometry(0.05, 6, 6)
const UPPER_LEG_GEO = new THREE.CylinderGeometry(0.065, 0.055, 0.38, 8)
const LOWER_LEG_GEO = new THREE.CylinderGeometry(0.05, 0.042, 0.34, 8)
const SHOE_GEO = new THREE.BoxGeometry(0.12, 0.06, 0.2)

function createPlayerModel(team: 'red' | 'blue'): PlayerMeshRefs {
  const teamColor = team === 'red' ? '#8b2020' : '#204080'
  const teamVestColor = team === 'red' ? '#a02525' : '#2550a0'
  const teamLowerColor = team === 'red' ? '#6b1818' : '#183060'
  const teamAccent = team === 'red' ? '#c03030' : '#3060c0'
  
  const torsoMat = new THREE.MeshStandardMaterial({ color: teamColor, metalness: 0.1, roughness: 0.7 })
  const torsoLowerMat = new THREE.MeshStandardMaterial({ color: teamLowerColor, metalness: 0.1, roughness: 0.7 })
  const vestMat = new THREE.MeshStandardMaterial({ color: teamVestColor, metalness: 0.15, roughness: 0.55 })
  const shoulderPadMat = new THREE.MeshStandardMaterial({ color: teamAccent, metalness: 0.2, roughness: 0.5 })
  
  const group = new THREE.Group()

  // 髋部
  const hip = new THREE.Mesh(HIP_GEO, torsoLowerMat)
  hip.position.set(0, 0.45, 0)
  group.add(hip)

  // 腰带
  const belt = new THREE.Mesh(BELT_GEO, BELT_MAT)
  belt.position.set(0, 0.5, 0)
  group.add(belt)

  // 腰带扣
  const beltBuckle = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.025, 0.02), new THREE.MeshStandardMaterial({ color: '#c0a060', metalness: 0.8, roughness: 0.3 }))
  beltBuckle.position.set(0, 0.5, -0.13)
  group.add(beltBuckle)

  // 弹匣袋 - 左
  const magPouchL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.04), MAG_POUCH_MAT)
  magPouchL.position.set(-0.1, 0.46, -0.11)
  group.add(magPouchL)
  const magPouchL2 = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.04), MAG_POUCH_MAT)
  magPouchL2.position.set(-0.1, 0.46, -0.06)
  group.add(magPouchL2)

  // 手榴弹袋 - 右
  const grenadePouch = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.07, 8), GRENADE_POUCH_MAT)
  grenadePouch.position.set(0.1, 0.46, -0.09)
  group.add(grenadePouch)

  // 下躯干
  const torsoLower = new THREE.Mesh(TORSO_LOWER_GEO, torsoLowerMat)
  torsoLower.position.set(0, 0.65, 0)
  group.add(torsoLower)

  // 躯干
  const torso = new THREE.Mesh(TORSO_GEO, torsoMat)
  torso.position.set(0, 0.95, 0)
  group.add(torso)

  // 衣领
  const collar = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.08), COLLAR_MAT)
  collar.position.set(0, 1.18, -0.08)
  group.add(collar)

  // 胸前口袋
  const pocketL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.02), POCKET_MAT)
  pocketL.position.set(-0.09, 0.93, -0.12)
  group.add(pocketL)
  const pocketR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.1, 0.02), POCKET_MAT)
  pocketR.position.set(0.09, 0.93, -0.12)
  group.add(pocketR)

  // 口袋盖
  const pocketFlapL = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.025, 0.022), POCKET_MAT)
  pocketFlapL.position.set(-0.09, 0.98, -0.12)
  pocketFlapL.rotation.x = 0.1
  group.add(pocketFlapL)
  const pocketFlapR = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.025, 0.022), POCKET_MAT)
  pocketFlapR.position.set(0.09, 0.98, -0.12)
  pocketFlapR.rotation.x = 0.1
  group.add(pocketFlapR)

  // 战术背心
  const vest = new THREE.Mesh(VEST_GEO, vestMat)
  vest.position.set(0, 0.97, -0.13)
  group.add(vest)

  // 背心弹匣袋
  const vestMag1 = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.12, 0.03), MAG_POUCH_MAT)
  vestMag1.position.set(-0.08, 0.95, -0.15)
  group.add(vestMag1)
  const vestMag2 = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.12, 0.03), MAG_POUCH_MAT)
  vestMag2.position.set(-0.03, 0.95, -0.15)
  group.add(vestMag2)
  const vestMag3 = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.12, 0.03), MAG_POUCH_MAT)
  vestMag3.position.set(0.03, 0.95, -0.15)
  group.add(vestMag3)
  const vestMag4 = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.12, 0.03), MAG_POUCH_MAT)
  vestMag4.position.set(0.08, 0.95, -0.15)
  group.add(vestMag4)

  // 对讲机
  const radio = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.06, 0.02), RADIO_MAT)
  radio.position.set(-0.13, 0.9, -0.1)
  group.add(radio)
  const radioAntenna = new THREE.Mesh(new THREE.CylinderGeometry(0.003, 0.003, 0.04, 4), RADIO_MAT)
  radioAntenna.position.set(-0.14, 0.95, -0.1)
  group.add(radioAntenna)

  // 肩垫
  const shoulderL = new THREE.Mesh(SHOULDER_L_GEO, shoulderPadMat)
  shoulderL.position.set(-0.2, 1.15, 0)
  shoulderL.scale.set(1.1, 0.7, 0.9)
  group.add(shoulderL)

  const shoulderR = new THREE.Mesh(SHOULDER_R_GEO, shoulderPadMat)
  shoulderR.position.set(0.2, 1.15, 0)
  shoulderR.scale.set(1.1, 0.7, 0.9)
  group.add(shoulderR)

  // 脖子
  const neck = new THREE.Mesh(NECK_GEO, SKIN_MAT)
  neck.position.set(0, 1.23, 0)
  group.add(neck)

  // 头部组
  const headGroup = new THREE.Group()
  headGroup.position.set(0, 1.28, 0)
  group.add(headGroup)

  // 头部
  const head = new THREE.Mesh(HEAD_GEO, SKIN_MAT)
  head.position.set(0, 0.11, 0)
  headGroup.add(head)

  // 头发
  const hairTop = new THREE.Mesh(HAIR_TOP_GEO, HAIR_MAT)
  hairTop.position.set(0, 0.22, 0.02)
  hairTop.rotation.x = -0.1
  headGroup.add(hairTop)

  const hairBack = new THREE.Mesh(HAIR_BACK_GEO, HAIR_MAT)
  hairBack.position.set(0, 0.12, 0.08)
  hairBack.rotation.x = 0.3
  headGroup.add(hairBack)

  // 耳朵
  const earL = new THREE.Mesh(EAR_GEO, EAR_MAT)
  earL.position.set(-0.18, 0.08, 0)
  earL.scale.set(0.6, 1, 0.5)
  headGroup.add(earL)

  const earR = new THREE.Mesh(EAR_GEO, EAR_MAT)
  earR.position.set(0.18, 0.08, 0)
  earR.scale.set(0.6, 1, 0.5)
  headGroup.add(earR)

  // 眉毛
  const browL = new THREE.Mesh(BROW_GEO, BROW_MAT)
  browL.position.set(-0.06, 0.18, -0.16)
  browL.rotation.z = 0.15
  headGroup.add(browL)

  const browR = new THREE.Mesh(BROW_GEO, BROW_MAT)
  browR.position.set(0.06, 0.18, -0.16)
  browR.rotation.z = -0.15
  headGroup.add(browR)

  // 眼睛
  const eyeWhiteL = new THREE.Mesh(EYE_WHITE_GEO, EYE_WHITE_MAT)
  eyeWhiteL.position.set(-0.06, 0.14, -0.16)
  headGroup.add(eyeWhiteL)

  const eyePupilL = new THREE.Mesh(EYE_PUPIL_GEO, EYE_PUPIL_MAT)
  eyePupilL.position.set(-0.06, 0.14, -0.19)
  headGroup.add(eyePupilL)

  const eyeWhiteR = new THREE.Mesh(EYE_WHITE_GEO, EYE_WHITE_MAT)
  eyeWhiteR.position.set(0.06, 0.14, -0.16)
  headGroup.add(eyeWhiteR)

  const eyePupilR = new THREE.Mesh(EYE_PUPIL_GEO, EYE_PUPIL_MAT)
  eyePupilR.position.set(0.06, 0.14, -0.19)
  headGroup.add(eyePupilR)

  // 鼻子
  const nose = new THREE.Mesh(NOSE_GEO, NOSE_MAT)
  nose.position.set(0, 0.08, -0.18)
  nose.rotation.x = -Math.PI / 2 + 0.3
  headGroup.add(nose)

  // 嘴唇
  const lipTop = new THREE.Mesh(LIP_GEO, LIP_MAT)
  lipTop.position.set(0, 0.025, -0.16)
  headGroup.add(lipTop)

  const lipBottom = new THREE.Mesh(LIP_GEO, LIP_MAT)
  lipBottom.position.set(0, 0.008, -0.16)
  headGroup.add(lipBottom)

  // 下巴
  const chin = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), SKIN_MAT)
  chin.position.set(0, -0.02, -0.14)
  chin.scale.set(0.8, 0.6, 0.7)
  headGroup.add(chin)

  // 左臂
  const leftArm = new THREE.Group()
  leftArm.position.set(-0.22, 1.12, 0)
  group.add(leftArm)
  const leftUpperArm = new THREE.Mesh(UPPER_ARM_GEO, torsoMat)
  leftUpperArm.position.set(0, -0.14, 0)
  leftArm.add(leftUpperArm)

  // 护肘
  const leftElbowPad = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), ELBOWPAD_MAT)
  leftElbowPad.position.set(0, -0.28, -0.02)
  leftElbowPad.scale.set(0.9, 0.7, 0.6)
  leftArm.add(leftElbowPad)

  const leftElbow = new THREE.Mesh(ELBOW_L_GEO, SKIN_MAT)
  leftElbow.position.set(0, -0.28, 0)
  leftArm.add(leftElbow)

  const leftForearmGroup = new THREE.Group()
  leftForearmGroup.position.set(0, -0.28, 0)
  leftArm.add(leftForearmGroup)
  const leftForearm = new THREE.Mesh(FOREARM_GEO, SKIN_MAT)
  leftForearm.position.set(0, -0.12, 0)
  leftForearmGroup.add(leftForearm)

  // 手套
  const leftGlove = new THREE.Mesh(new THREE.SphereGeometry(0.045, 8, 8), GLOVE_MAT)
  leftGlove.position.set(0, -0.25, 0)
  leftGlove.scale.set(0.9, 1, 0.7)
  leftForearmGroup.add(leftGlove)

  // 手指 - 左
  const fingerGeo = new THREE.CylinderGeometry(0.006, 0.005, 0.025, 6)
  const thumbGeo = new THREE.CylinderGeometry(0.008, 0.007, 0.02, 6)
  
  const leftThumb = new THREE.Mesh(thumbGeo, GLOVE_MAT)
  leftThumb.position.set(-0.03, -0.23, -0.01)
  leftThumb.rotation.z = 0.5
  leftForearmGroup.add(leftThumb)

  for (let i = 0; i < 4; i++) {
    const finger = new THREE.Mesh(fingerGeo, GLOVE_MAT)
    finger.position.set(-0.015 + i * 0.01, -0.28, -0.02)
    leftForearmGroup.add(finger)
  }

  // 右臂
  const rightArm = new THREE.Group()
  rightArm.position.set(0.22, 1.12, 0)
  rightArm.rotation.set(0.5, 0, -0.05)
  group.add(rightArm)
  const rightUpperArm = new THREE.Mesh(GUN_ARM_GEO, torsoMat)
  rightUpperArm.position.set(0, -0.14, 0)
  rightArm.add(rightUpperArm)

  // 护肘
  const rightElbowPad = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), ELBOWPAD_MAT)
  rightElbowPad.position.set(0, -0.26, -0.02)
  rightElbowPad.scale.set(0.9, 0.7, 0.6)
  rightArm.add(rightElbowPad)

  const rightElbow = new THREE.Mesh(ELBOW_R_GEO, SKIN_MAT)
  rightElbow.position.set(0, -0.26, 0)
  rightArm.add(rightElbow)

  const rightForearmGroup = new THREE.Group()
  rightForearmGroup.position.set(0, -0.26, 0)
  rightArm.add(rightForearmGroup)
  const rightForearm = new THREE.Mesh(FOREARM_GEO, SKIN_MAT)
  rightForearm.position.set(0, -0.12, 0)
  rightForearmGroup.add(rightForearm)

  // 枪组
  const gunGroup = new THREE.Group()
  gunGroup.position.set(0, -0.18, -0.08)
  gunGroup.rotation.x = 0.3
  rightForearmGroup.add(gunGroup)
  const gunPart = new THREE.Mesh(GUN_PART_GEO, GUN_METAL_MAT)
  gunPart.position.set(0, 0, 0)
  gunGroup.add(gunPart)
  const gunBarrel = new THREE.Mesh(GUN_BARREL_GEO, GUN_BARREL_MAT)
  gunBarrel.position.set(0, 0, -0.28)
  gunBarrel.rotation.set(Math.PI / 2, 0, 0)
  gunGroup.add(gunBarrel)
  const gunGrip = new THREE.Mesh(GUN_GRIP_GEO, GUN_GRIP_MAT)
  gunGrip.position.set(0, -0.08, 0.08)
  gunGroup.add(gunGrip)

  // 右手手套
  const rightGlove = new THREE.Mesh(new THREE.SphereGeometry(0.042, 8, 8), GLOVE_MAT)
  rightGlove.position.set(0, -0.05, 0.05)
  rightGlove.scale.set(0.9, 0.8, 0.7)
  rightForearmGroup.add(rightGlove)

  // 右手指
  const rightThumb = new THREE.Mesh(thumbGeo, GLOVE_MAT)
  rightThumb.position.set(0.025, -0.06, 0.02)
  rightThumb.rotation.z = -0.4
  rightForearmGroup.add(rightThumb)

  for (let i = 0; i < 3; i++) {
    const finger = new THREE.Mesh(fingerGeo, GLOVE_MAT)
    finger.position.set(-0.01 + i * 0.01, -0.09, 0.08)
    finger.rotation.x = 0.3
    rightForearmGroup.add(finger)
  }

  // 左腿
  const leftLeg = new THREE.Group()
  leftLeg.position.set(-0.1, 0.45, 0)
  group.add(leftLeg)
  const leftUpperLeg = new THREE.Mesh(UPPER_LEG_GEO, LEG_MAT)
  leftUpperLeg.position.set(0, -0.19, 0)
  leftLeg.add(leftUpperLeg)

  // 大腿口袋
  const thighPocketL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.02), POCKET_MAT)
  thighPocketL.position.set(-0.05, -0.2, -0.07)
  leftLeg.add(thighPocketL)

  // 护膝
  const leftKneepad = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), KNEEPAD_MAT)
  leftKneepad.position.set(0, -0.38, -0.03)
  leftKneepad.scale.set(1, 0.8, 0.7)
  leftLeg.add(leftKneepad)

  const leftKneeCap = new THREE.Mesh(KNEE_GEO, LEG_LOWER_MAT)
  leftKneeCap.position.set(0, -0.38, 0)
  leftKneeCap.scale.set(1, 0.8, 1.1)
  leftLeg.add(leftKneeCap)

  const leftKnee = new THREE.Group()
  leftKnee.position.set(0, -0.38, 0)
  leftLeg.add(leftKnee)
  const leftLowerLeg = new THREE.Mesh(LOWER_LEG_GEO, LEG_LOWER_MAT)
  leftLowerLeg.position.set(0, -0.19, 0)
  leftKnee.add(leftLowerLeg)

  // 小腿口袋
  const calfPocketL = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 0.02), POCKET_MAT)
  calfPocketL.position.set(-0.04, -0.25, -0.06)
  leftKnee.add(calfPocketL)

  // 靴子
  const leftShoe = new THREE.Mesh(SHOE_GEO, SHOE_MAT)
  leftShoe.position.set(0, -0.38, 0.04)
  leftKnee.add(leftShoe)

  // 靴筒
  const leftBootTop = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.15), SHOE_MAT)
  leftBootTop.position.set(0, -0.34, 0.03)
  leftKnee.add(leftBootTop)

  // 鞋带
  for (let i = 0; i < 4; i++) {
    const lace = new THREE.Mesh(new THREE.BoxGeometry(0.002, 0.003, 0.06), BOOT_LACE_MAT)
    lace.position.set(0, -0.36 + i * 0.008, 0.06)
    leftKnee.add(lace)
  }

  // 右腿
  const rightLeg = new THREE.Group()
  rightLeg.position.set(0.1, 0.45, 0)
  group.add(rightLeg)
  const rightUpperLeg = new THREE.Mesh(UPPER_LEG_GEO, LEG_MAT)
  rightUpperLeg.position.set(0, -0.19, 0)
  rightLeg.add(rightUpperLeg)

  // 大腿口袋
  const thighPocketR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.08, 0.02), POCKET_MAT)
  thighPocketR.position.set(0.05, -0.2, -0.07)
  rightLeg.add(thighPocketR)

  // 护膝
  const rightKneepad = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), KNEEPAD_MAT)
  rightKneepad.position.set(0, -0.38, -0.03)
  rightKneepad.scale.set(1, 0.8, 0.7)
  rightLeg.add(rightKneepad)

  const rightKneeCap = new THREE.Mesh(KNEE_GEO, LEG_LOWER_MAT)
  rightKneeCap.position.set(0, -0.38, 0)
  rightKneeCap.scale.set(1, 0.8, 1.1)
  rightLeg.add(rightKneeCap)

  const rightKnee = new THREE.Group()
  rightKnee.position.set(0, -0.38, 0)
  rightLeg.add(rightKnee)
  const rightLowerLeg = new THREE.Mesh(LOWER_LEG_GEO, LEG_LOWER_MAT)
  rightLowerLeg.position.set(0, -0.19, 0)
  rightKnee.add(rightLowerLeg)

  // 小腿口袋
  const calfPocketR = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.07, 0.02), POCKET_MAT)
  calfPocketR.position.set(0.04, -0.25, -0.06)
  rightKnee.add(calfPocketR)

  // 靴子
  const rightShoe = new THREE.Mesh(SHOE_GEO, SHOE_MAT)
  rightShoe.position.set(0, -0.38, 0.04)
  rightKnee.add(rightShoe)

  // 靴筒
  const rightBootTop = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, 0.15), SHOE_MAT)
  rightBootTop.position.set(0, -0.34, 0.03)
  rightKnee.add(rightBootTop)

  // 鞋带
  for (let i = 0; i < 4; i++) {
    const lace = new THREE.Mesh(new THREE.BoxGeometry(0.002, 0.003, 0.06), BOOT_LACE_MAT)
    lace.position.set(0, -0.36 + i * 0.008, 0.06)
    rightKnee.add(lace)
  }

  return {
    group,
    leftArm,
    rightArm,
    leftLeg,
    leftKnee,
    rightLeg,
    rightKnee,
    smoothedPos: new THREE.Vector3(),
    smoothedRotY: 0,
    walkTime: 0,
    lastPos: new THREE.Vector3(),
  }
}

export default function OtherPlayers() {
  const containerRef = useRef<THREE.Group>(null)
  const playerMeshes = useRef<Map<string, PlayerMeshRefs>>(new Map())
  const playerIdRef = useRef<string>('')
  const currentRoomRef = useRef(useGameStore.getState().currentRoom)

  useEffect(() => {
    const unsub = useGameStore.subscribe(state => {
      playerIdRef.current = state.playerId
      currentRoomRef.current = state.currentRoom
    })
    playerIdRef.current = useGameStore.getState().playerId
    currentRoomRef.current = useGameStore.getState().currentRoom
    return unsub
  }, [])

  useFrame((_, delta) => {
    const container = containerRef.current
    const room = currentRoomRef.current
    if (!container || !room || room.status !== 'playing') {
      for (const pm of playerMeshes.current.values()) {
        container?.remove(pm.group)
      }
      playerMeshes.current.clear()
      return
    }

    const myId = playerIdRef.current
    const activeIds = new Set<string>()

    for (const player of room.players) {
      if (player.id === myId) continue
      activeIds.add(player.id)

      let pm = playerMeshes.current.get(player.id)

      if (!player.isAlive) {
        if (pm) {
          container.remove(pm.group)
          playerMeshes.current.delete(player.id)
        }
        continue
      }

      if (!pm) {
        pm = createPlayerModel(player.team)
        pm.smoothedPos.set(player.position.x, player.position.y, player.position.z)
        pm.lastPos.copy(pm.smoothedPos)
        pm.smoothedRotY = player.rotation.y
        pm.walkTime = 0
        container.add(pm.group)
        playerMeshes.current.set(player.id, pm)
      }

      const lerpFactor = 1 - Math.pow(0.001, delta)
      pm.smoothedPos.x += (player.position.x - pm.smoothedPos.x) * lerpFactor
      pm.smoothedPos.y += (player.position.y - pm.smoothedPos.y) * lerpFactor
      pm.smoothedPos.z += (player.position.z - pm.smoothedPos.z) * lerpFactor
      pm.smoothedRotY += (player.rotation.y - pm.smoothedRotY) * lerpFactor

      pm.group.position.set(pm.smoothedPos.x, pm.smoothedPos.y - 1.4, pm.smoothedPos.z)
      pm.group.rotation.y = pm.smoothedRotY

      const dx = pm.smoothedPos.x - pm.lastPos.x
      const dz = pm.smoothedPos.z - pm.lastPos.z
      const movedDist = Math.sqrt(dx * dx + dz * dz)
      const isMoving = movedDist > 0.003

      if (isMoving) {
        pm.walkTime += delta
      }
      pm.lastPos.copy(pm.smoothedPos)

      const t = pm.walkTime
      const legSwing = isMoving ? Math.sin(t * 10) * 0.4 : 0
      const armSwing = isMoving ? Math.sin(t * 10) * 0.3 : 0

      pm.leftLeg.rotation.x = legSwing
      pm.rightLeg.rotation.x = -legSwing
      pm.leftKnee.rotation.x = -legSwing * 0.6
      pm.rightKnee.rotation.x = legSwing * 0.6
      pm.leftArm.rotation.z = armSwing
      pm.rightArm.rotation.z = -0.1 + armSwing * 0.3
    }

    playerMeshes.current.forEach((pm, pid) => {
      if (!activeIds.has(pid)) {
        container.remove(pm.group)
        playerMeshes.current.delete(pid)
      }
    })
  })

  return <group ref={containerRef} />
}
