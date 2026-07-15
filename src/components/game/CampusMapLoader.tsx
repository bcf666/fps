import { useMemo, useEffect, useState } from 'react'
import * as THREE from 'three'

interface ModelConfig {
  name: string
  position: [number, number, number]
}

// 所有40个模型的位置（来自 model_config.json）
const MODEL_CONFIGS: ModelConfig[] = [
  { name: '1001', position: [-21.74, 0.5, 10.41] },
  { name: '1002', position: [-80.34, 0.5, 84.41] },
  { name: '1003', position: [-75.16, 0.5, -4.59] },
  { name: '1004', position: [-176.53, 0.5, -59.18] },
  { name: '1005', position: [-125.03, 0.5, -124.28] },
  { name: '1006', position: [-220.81, 0.5, -128.15] },
  { name: '1007', position: [-174.79, 0.5, -145.75] },
  { name: '1008', position: [-102.64, 0.5, -162.06] },
  { name: '1009', position: [-270.59, 0.5, -171.31] },
  { name: '1010', position: [-45.01, 0.5, -132.31] },
  { name: '1011', position: [-0.37, 0.5, -98.53] },
  { name: '1012', position: [-3.36, 0.5, 158.06] },
  { name: '1013', position: [11.50, 0.5, 148.62] },
  { name: '1014', position: [-2.44, 0.5, 37.75] },
  { name: '1015', position: [-92.80, 0.5, 111.54] },
  { name: '1016', position: [-118.58, 0.5, -55.07] },
  { name: '1017', position: [-85.40, 0.5, -53.54] },
  { name: '1018', position: [-171.45, 0.5, -113.34] },
  { name: '1019', position: [-232.31, 0.5, -173.15] },
  { name: '1020', position: [-219.79, 0.5, -173.91] },
  { name: '1021', position: [-193.81, 0.5, -174.60] },
  { name: '1022', position: [-70.43, 0.5, -180.09] },
  { name: '1023', position: [22.24, 0.5, -171.73] },
  { name: '1024', position: [35.31, 0.5, -173.10] },
  { name: '1025', position: [91.17, 0.5, -173.21] },
  { name: '1026', position: [94.71, 0.5, -132.18] },
  { name: '1027', position: [136.54, 0.5, -132.03] },
  { name: '1028', position: [-77.14, 0.5, 65.29] },
  { name: '1029', position: [-199.62, 0.5, -9.71] },
  { name: '1030', position: [-126.64, 0.5, 165.30] },
  { name: '1031', position: [115.58, 0.5, 119.15] },
  { name: '1032', position: [76.08, 0.5, -26.02] },
  { name: '1033', position: [-164.62, 0.5, -10.96] },
  { name: '1034', position: [-21.74, 0.5, 10.41] },
  { name: '1035', position: [-133.44, 0.5, -186.35] },
  { name: '1036', position: [-199.77, 0.5, 172.98] },
  { name: '1037', position: [-129.26, 0.5, -187.97] },
  { name: '1038', position: [-104.70, 0.5, -186.35] },
  { name: '1039', position: [-119.73, 0.5, -185.43] },
  { name: '1040', position: [-21.74, 0.5, 10.41] },
]

// 树木实例位置（复用模型 1036），来自原校园地图场景
const TREE_POSITIONS: [number, number, number][] = [
  [-199.77, 0.5, 172.98], [-56.69, 0.5, 172.98], [23.80, 0.5, 172.98], [63.15, 0.5, 172.98],
  [102.50, 0.5, 172.98], [114.00, 0.5, 135.08], [83.26, 0.5, 152.09], [62.78, 0.5, 139.01],
  [38.60, 0.5, 152.77], [28.38, 0.5, 144.35], [2.59, 0.5, 143.73], [-6.67, 0.5, 136.73],
  [-5.86, 0.5, 110.15], [-5.86, 0.5, 81.29], [-5.86, 0.5, 53.15], [-29.89, 0.5, 92.55],
  [-29.89, 0.5, 66.60], [-29.89, 0.5, 52.32], [-46.85, 0.5, 44.47], [-71.47, 0.5, 44.47],
  [-90.80, 0.5, 44.47], [-114.18, 0.5, 56.90], [-115.97, 0.5, 89.58], [-30.44, 0.5, -26.40],
  [-116.62, 0.5, -10.11], [-116.62, 0.5, 0.88], [-18.42, 0.5, -68.49], [-40.55, 0.5, -49.21],
  [-49.03, 0.5, -51.86], [-66.14, 0.5, -61.52], [-93.71, 0.5, -52.48], [-94.44, 0.5, -61.52],
  [-101.82, 0.5, -55.87], [-99.39, 0.5, -75.51], [-108.08, 0.5, -77.61], [-213.47, 0.5, -13.59],
  [-227.89, 0.5, -18.40], [-203.01, 0.5, -105.12], [-214.88, 0.5, -106.74], [-282.31, 0.5, -97.30],
  [-296.69, 0.5, -120.52], [-286.07, 0.5, -125.85], [-304.46, 0.5, -138.66], [-255.29, 0.5, -134.76],
  [-232.13, 0.5, -142.62], [-144.99, 0.5, -121.85], [-129.29, 0.5, -106.74], [-130.66, 0.5, -166.38],
  [-10.92, 0.5, -115.30], [-9.01, 0.5, -138.66], [-6.37, 0.5, -152.93],
]
const TREE_MODEL_NAME = '1036'

interface ParsedModel {
  meshes: { geometry: THREE.BufferGeometry; material: THREE.Material }[]
}

// 解析旧版 Three.js JSON v3.1 格式
// 该格式使用扁平数组存储顶点/法线/UV，面数据用位标记编码
// 面类型位标记：
// bit 0 (1): isQuad - 是否为四边形
// bit 1 (2): hasMaterial - 是否有材质索引
// bit 2 (4): hasFaceUv - 是否有面级UV（每个面2个浮点数，非索引）
// bit 3 (8): hasFaceVertexUv - 是否有顶点级UV（每个顶点1个UV索引）
// bit 4 (16): hasFaceNormal - 是否有面级法线（每个面3个浮点数，非索引）
// bit 5 (32): hasFaceVertexNormal - 是否有顶点级法线（每个顶点1个法线索引）
// bit 6 (64): hasFaceColor - 是否有面级颜色
// bit 7 (128): hasFaceVertexColor - 是否有顶点级颜色
function parseLegacyJSON(json: any): { geometries: THREE.BufferGeometry[]; materialIndices: number[] } {
  const vertices = json.vertices as number[]    // [x,y,z, x,y,z, ...]
  const normals = json.normals as number[]      // [x,y,z, x,y,z, ...]
  const uvs = json.uvs as number[][]             // [[u,v, u,v, ...]]  (1 layer)
  const faces = json.faces as number[]           // 扁平面数组

  const groups: Map<number, { positions: number[]; normals: number[]; uvs: number[]; indices: number[] }> = new Map()

  let offset = 0
  const nUvLayers = uvs ? uvs.length : 0

  while (offset < faces.length) {
    const type = faces[offset++]

    const isQuad = !!(type & 1)
    const hasMaterial = !!(type & 2)
    const hasFaceUv = !!(type & 4)
    const hasFaceVertexUv = !!(type & 8)
    const hasFaceNormal = !!(type & 16)
    const hasFaceVertexNormal = !!(type & 32)
    const hasFaceColor = !!(type & 64)
    const hasFaceVertexColor = !!(type & 128)

    const a = faces[offset++]
    const b = faces[offset++]
    const c = faces[offset++]
    let d = -1
    if (isQuad) {
      d = faces[offset++]
    }

    let materialIndex = 0
    if (hasMaterial) {
      materialIndex = faces[offset++]
    }

    // 处理 hasFaceUv（面级UV）：每个面2个浮点数，非索引
    // 这种UV是整个面共享的，不是逐顶点的
    // 如果没有hasFaceVertexUv，则使用这些面级UV为所有顶点重复设置
    let faceUvs: number[][] = []
    if (hasFaceUv) {
      for (let layer = 0; layer < nUvLayers; layer++) {
        faceUvs.push([faces[offset++], faces[offset++]])
      }
    }

    // 处理 hasFaceVertexUv（顶点级UV）：每个顶点1个UV索引
    let uvIndices: number[] = []
    if (hasFaceVertexUv) {
      for (let layer = 0; layer < nUvLayers; layer++) {
        uvIndices.push(faces[offset++], faces[offset++], faces[offset++])
        if (isQuad) {
          uvIndices.push(faces[offset++])
        }
      }
    }

    // 处理 hasFaceNormal（面级法线）：每个面3个浮点数，非索引
    // 跳过这些值
    if (hasFaceNormal) {
      offset += 3
    }

    // 处理 hasFaceVertexNormal（顶点级法线）：每个顶点1个法线索引
    let normalIndices: number[] = []
    if (hasFaceVertexNormal) {
      normalIndices.push(faces[offset++], faces[offset++], faces[offset++])
      if (isQuad) {
        normalIndices.push(faces[offset++])
      }
    }

    // 跳过 face color
    if (hasFaceColor) {
      offset++
    }

    // 跳过 face vertex colors
    if (hasFaceVertexColor) {
      offset += isQuad ? 4 : 3
    }

    if (!groups.has(materialIndex)) {
      groups.set(materialIndex, { positions: [], normals: [], uvs: [], indices: [] })
    }
    const group = groups.get(materialIndex)!

    const triIndices = isQuad ? [a, b, c, a, c, d] : [a, b, c]
    const triNormalIndices = isQuad
      ? [normalIndices[0], normalIndices[1], normalIndices[2], normalIndices[0], normalIndices[2], normalIndices[3] || normalIndices[2]]
      : normalIndices
    const triUvIndices = isQuad
      ? [uvIndices[0], uvIndices[1], uvIndices[2], uvIndices[0], uvIndices[2], uvIndices[3] || uvIndices[2]]
      : uvIndices

    for (let t = 0; t < triIndices.length; t++) {
      const vi = triIndices[t]
      const baseIndex = group.positions.length / 3

      group.positions.push(vertices[vi * 3], vertices[vi * 3 + 1], vertices[vi * 3 + 2])

      if (triNormalIndices[t] !== undefined && normals.length > 0) {
        const ni = triNormalIndices[t]
        group.normals.push(normals[ni * 3], normals[ni * 3 + 1], normals[ni * 3 + 2])
      }

      if (triUvIndices[t] !== undefined && uvs && uvs[0] && uvs[0].length > 0) {
        const ui = triUvIndices[t]
        group.uvs.push(uvs[0][ui * 2], uvs[0][ui * 2 + 1])
      } else if (faceUvs.length > 0 && faceUvs[0].length === 2) {
        group.uvs.push(faceUvs[0][0], faceUvs[0][1])
      }

      group.indices.push(baseIndex)
    }
  }

  // 构建 BufferGeometry
  const geometries: THREE.BufferGeometry[] = []
  const materialIndices: number[] = []

  for (const [matIdx, group] of groups) {
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(group.positions, 3))

    if (group.normals.length === group.positions.length) {
      geometry.setAttribute('normal', new THREE.Float32BufferAttribute(group.normals, 3))
    } else {
      geometry.computeVertexNormals()
    }

    if (group.uvs.length > 0) {
      geometry.setAttribute('uv', new THREE.Float32BufferAttribute(group.uvs, 2))
    }

    geometry.setIndex(group.indices)
    geometry.computeBoundingBox()
    geometry.computeBoundingSphere()

    geometries.push(geometry)
    materialIndices.push(matIdx)
  }

  return { geometries, materialIndices }
}

const textureLoader = new THREE.TextureLoader()
const textureCache = new Map<string, THREE.Texture>()

function loadTexture(url: string): Promise<THREE.Texture> {
  if (textureCache.has(url)) {
    return Promise.resolve(textureCache.get(url)!)
  }
  return new Promise((resolve) => {
    textureLoader.load(url, (texture) => {
      texture.wrapS = THREE.RepeatWrapping
      texture.wrapT = THREE.RepeatWrapping
      textureCache.set(url, texture)
      resolve(texture)
    }, undefined, () => {
      // 加载失败时返回白色纹理
      resolve(new THREE.Texture())
    })
  })
}

function loadModel(modelName: string): Promise<ParsedModel> {
  return fetch(`/campus/${modelName}.js`)
    .then(response => response.json())
    .then(json => {
      const { geometries, materialIndices } = parseLegacyJSON(json)

      // 创建材质（纹理异步加载，不阻塞）
      const materials: THREE.Material[] = []
      for (let i = 0; i < (json.materials?.length || 0); i++) {
        const matData = json.materials[i]
        const hasTexture = !!matData.mapDiffuse
        const material = new THREE.MeshLambertMaterial({
          color: hasTexture
            ? 0xffffff
            : matData.colorDiffuse
            ? new THREE.Color(matData.colorDiffuse[0], matData.colorDiffuse[1], matData.colorDiffuse[2])
            : 0x999999,
          side: THREE.DoubleSide,
        })

        // 半透明材质（如树叶、栏杆）：保留源文件的透明度
        if (matData.transparency !== undefined && matData.transparency < 1) {
          material.transparent = true
          material.opacity = matData.transparency
        }

        // 注意：部分贴图文件名带空格（如 "lqy20191112006 .png"），
        // 必须清理空格后再请求，否则浏览器编码成 %20 匹配不到磁盘文件
        if (matData.mapDiffuse) {
          const texName = matData.mapDiffuse.replace(/\s+/g, '')
          loadTexture(`/campus/maps/${texName}`).then(texture => {
            material.map = texture
            material.needsUpdate = true
          })
        }

        materials.push(material)
      }

      // 组装 mesh 数据
      const meshes: { geometry: THREE.BufferGeometry; material: THREE.Material }[] = []
      for (let i = 0; i < geometries.length; i++) {
        const matIdx = materialIndices[i]
        const material = materials[matIdx] || new THREE.MeshLambertMaterial({ color: 0x999999 })
        meshes.push({ geometry: geometries[i], material })
      }

      return { meshes }
    })
}

function ModelMesh({ model, config }: { model: ParsedModel; config: ModelConfig }) {
  const group = useMemo(() => {
    const g = new THREE.Group()
    for (const mesh of model.meshes) {
      const m = new THREE.Mesh(mesh.geometry, mesh.material)
      m.castShadow = true
      m.receiveShadow = true
      g.add(m)
    }
    return g
  }, [model])

  useEffect(() => {
    group.position.set(config.position[0], config.position[1], config.position[2])
  }, [group, config])

  return <primitive object={group} />
}

// 将树模型(1036)在 51 个位置实例化，共享几何体与材质
function TreeInstances({ model }: { model: ParsedModel }) {
  const group = useMemo(() => {
    const g = new THREE.Group()
    for (const pos of TREE_POSITIONS) {
      for (const mesh of model.meshes) {
        const m = new THREE.Mesh(mesh.geometry, mesh.material)
        m.position.set(pos[0], pos[1], pos[2])
        m.castShadow = true
        m.receiveShadow = true
        g.add(m)
      }
    }
    return g
  }, [model])

  return <primitive object={group} />
}

export default function CampusMapLoader() {
  const [loadedModels, setLoadedModels] = useState<Map<string, ParsedModel>>(new Map())
  const [treeModel, setTreeModel] = useState<ParsedModel | null>(null)

  useEffect(() => {
    // 建筑逐个加载（跳过树模型 1036，单独处理实例化）
    for (const config of MODEL_CONFIGS) {
      if (config.name === TREE_MODEL_NAME) continue
      loadModel(config.name)
        .then(model => {
          setLoadedModels(prev => {
            const next = new Map(prev)
            next.set(config.name, model)
            return next
          })
        })
        .catch(e => console.error(`[CampusMap] Failed to load model ${config.name}:`, e))
    }

    // 加载树模型并实例化到 51 个位置
    loadModel(TREE_MODEL_NAME)
      .then(setTreeModel)
      .catch(e => console.error(`[CampusMap] Failed to load tree model ${TREE_MODEL_NAME}:`, e))
  }, [])

  return (
    <group>
      {MODEL_CONFIGS.map((config) => {
        if (config.name === TREE_MODEL_NAME) return null
        const model = loadedModels.get(config.name)
        if (!model) return null
        return <ModelMesh key={config.name} model={model} config={config} />
      })}
      {treeModel && <TreeInstances model={treeModel} />}
    </group>
  )
}
