import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

const candidates = [
  path.join(rootDir, 'assets', 'ali-original.jpg'),
  path.join(rootDir, 'assets', 'ali-original.jpeg'),
  path.join(rootDir, 'src', 'assets', 'ali-original.jpg'),
  path.join(rootDir, 'src', 'assets', 'ali-original.jpg.jpeg'),
  path.join(rootDir, 'src', 'assets', 'ali-original.jpeg'),
]
const input = candidates.find((p) => fs.existsSync(p))
const output = path.join(rootDir, 'public', 'ali.png')

const REMBG_FALLBACK = `
⚠ Background removal failed. Try the Python fallback:

  pip install rembg onnxruntime
  rembg i assets/ali-original.jpg public/ali.png

Then re-run: npm run cutout
`

if (!input) {
  console.warn(
    '⚠ No photo found — add ali-original.jpg to assets/ or src/assets/, then re-run.\n' +
      '   Skipping cutout step.'
  )
  process.exit(0)
}

console.log(`Using source: ${path.relative(rootDir, input)}`)

console.log('Removing background from photo...\n')

try {
  const { removeBackground } = await import('@imgly/background-removal-node')

  const distDir = path.join(rootDir, 'node_modules', '@imgly', 'background-removal-node', 'dist')
  const config = {
    model: 'medium',
    publicPath: pathToFileURL(distDir).href + '/',
    output: { format: 'image/png', quality: 0.9 },
    progress: (key, current, total) => {
      const pct = Math.round((current / total) * 100)
      process.stdout.write(`\r  ${key}: ${pct}%   `)
    },
  }

  const inputData = await fs.promises.readFile(input)
  const ext = path.extname(input).replace('.', '').toLowerCase()
  const mime =
    ext === 'jpg' || ext === 'jpeg' || ext === 'jpg.jpeg' ? 'image/jpeg' : `image/${ext}`
  const inputBlob = new Blob([inputData], { type: mime })

  const result = await removeBackground(inputBlob, config)
  process.stdout.write('\n')

  let buffer
  if (Buffer.isBuffer(result)) {
    buffer = result
  } else if (result instanceof Blob) {
    buffer = Buffer.from(await result.arrayBuffer())
  } else if (result instanceof Uint8Array) {
    buffer = Buffer.from(result)
  } else {
    throw new Error(`Unexpected removeBackground return type: ${typeof result}`)
  }

  fs.mkdirSync(path.dirname(output), { recursive: true })
  fs.writeFileSync(output, buffer)
  console.log('✓ cutout saved to public/ali.png')
} catch (e) {
  const message = e instanceof Error ? e.message : String(e)
  console.error(`\n✗ Cutout failed: ${message}`)
  console.error(REMBG_FALLBACK)
  process.exit(1)
}
