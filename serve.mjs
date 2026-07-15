import http from 'http'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { exec } from 'child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.join(__dirname, 'dist')
const PORT = 4173

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.glb': 'model/gltf-binary',
  '.gltf': 'model/gltf+json',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
}

function send(res, status, body, type) {
  res.writeHead(status, { 'Content-Type': type || 'text/plain; charset=utf-8' })
  res.end(body)
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || '/').split('?')[0])
  let filePath = path.join(ROOT, urlPath)
  if (!filePath.startsWith(ROOT)) return send(res, 403, 'Forbidden')

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) {
      const ext = path.extname(filePath).toLowerCase()
      try {
        const data = fs.readFileSync(filePath)
        return send(res, 200, data, MIME[ext] || 'application/octet-stream')
      } catch (e) {
        return send(res, 500, 'Read error')
      }
    }
    // SPA fallback: serve index.html for routes without a file extension
    if (!path.extname(urlPath)) {
      const idx = path.join(ROOT, 'index.html')
      if (fs.existsSync(idx)) {
        return send(res, 200, fs.readFileSync(idx), MIME['.html'])
      }
    }
    send(res, 404, 'Not found')
  })
})

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}/`
  console.log('FPS offline game started: ' + url)
  console.log('Click "单人训练" (Solo Training) to play with no network. Ctrl+C to quit.')
  const cmd =
    process.platform === 'win32'
      ? `cmd /c start "" "${url}"`
      : process.platform === 'darwin'
      ? `open "${url}"`
      : `xdg-open "${url}"`
  exec(cmd, () => {})
})
