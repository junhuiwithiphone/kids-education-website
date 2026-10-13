import Tesseract from 'tesseract.js'
import { arrangeStoryText, type OcrLine } from './storyText'

type OcrWorker = Awaited<ReturnType<typeof Tesseract.createWorker>>

const STATUS_LABEL: Record<string, string> = {
  'loading tesseract core': '正在准备识别引擎',
  'initializing tesseract': '正在启动识别引擎',
  'loading language traineddata': '正在下载中文模型',
  'initializing api': '正在加载中文模型',
  'recognizing text': '正在认字',
}

let workerPromise: Promise<OcrWorker> | null = null
let onProgress: (label: string, ratio: number) => void = () => {}

function getWorker(): Promise<OcrWorker> {
  if (!workerPromise) {
    workerPromise = Tesseract.createWorker('chi_sim', Tesseract.OEM.LSTM_ONLY, {
      logger: (message) => {
        const label = STATUS_LABEL[message.status] ?? '正在处理'
        onProgress(label, message.progress ?? 0)
      },
    })
      .then(async (worker) => {
        // 绘本文字散落在插画里，用稀疏文本模式，并按照片常见清晰度设置 DPI。
        await worker.setParameters({
          tessedit_pageseg_mode: Tesseract.PSM.SPARSE_TEXT,
          user_defined_dpi: '300',
        })
        return worker
      })
      .catch((error: unknown) => {
        workerPromise = null
        throw error
      })
  }
  return workerPromise
}

function linesFromBlocks(blocks: Tesseract.Block[] | null): OcrLine[] {
  const lines: OcrLine[] = []
  for (const block of blocks ?? []) {
    for (const paragraph of block.paragraphs ?? []) {
      for (const line of paragraph.lines ?? []) {
        if (!line.text || !line.bbox) continue
        lines.push({
          text: line.text,
          confidence: line.confidence ?? 0,
          x0: line.bbox.x0,
          y0: line.bbox.y0,
          y1: line.bbox.y1,
        })
      }
    }
  }
  return lines
}

export async function prepareImage(file: File): Promise<HTMLCanvasElement> {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
  try {
    return drawBitmap(bitmap)
  } finally {
    bitmap.close()
  }
}

function drawBitmap(bitmap: ImageBitmap): HTMLCanvasElement {
  const maxEdge = 1800
  const scale = Math.min(1, maxEdge / Math.max(bitmap.width, bitmap.height))
  const width = Math.max(1, Math.round(bitmap.width * scale))
  const height = Math.max(1, Math.round(bitmap.height * scale))
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('无法处理这张照片')
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, width, height)
  ctx.drawImage(bitmap, 0, 0, width, height)
  return canvas
}

export async function recognizePage(
  canvas: HTMLCanvasElement,
  report: (label: string, ratio: number) => void,
): Promise<{ text: string; confidence: number }> {
  onProgress = report
  report('正在准备', 0)
  const worker = await getWorker()
  const result = await worker.recognize(canvas, {}, { text: true, blocks: true })
  const arranged = arrangeStoryText(linesFromBlocks(result.data.blocks))
  if (arranged.text) return arranged

  const fallback = (result.data.text ?? '').replace(/[ \t]+\n/g, '\n').trim()
  return { text: fallback, confidence: result.data.confidence ?? 0 }
}
