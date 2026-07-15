// 本地玩家实时状态（每帧由 FPSController 写入，不触发 React 重渲染）。
// 小地图 / 雷达直接按帧轮询读取，避免高频写入主 store 导致全量重渲染。
export const localPlayer = {
  x: 0,
  z: 0,
  rotationY: 0,
  active: false,
}

export function updateLocalPlayer(x: number, z: number, rotationY: number) {
  localPlayer.x = x
  localPlayer.z = z
  localPlayer.rotationY = rotationY
  localPlayer.active = true
}
