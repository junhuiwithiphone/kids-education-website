export interface OcrLine {
  text: string
  confidence: number
  x0: number
  y0: number
  y1: number
}

function tidyLine(text: string): string {
  return text
    .replace(/\s+/g, ' ')
    .replace(/(?<=[\u4e00-\u9fff])\s+(?=[\u4e00-\u9fff])/g, '')
    .replace(/(?<=[\u4e00-\u9fff])\s*:\s*/g, '：')
    .replace(/(?<=[\u4e00-\u9fff])\s*!\s*/g, '！')
    .replace(/(?<=[\u4e00-\u9fff])\s*\?\s*/g, '？')
    .replace(/(?<=[\u4e00-\u9fff])\s*,\s*/g, '，')
    .replace(/(?<=[\u4e00-\u9fff])\s*;\s*/g, '；')
    .replace(/(?<=[\u4e00-\u9fff])\s+(?=[，。！？、；：])/g, '')
    .replace(/(?<=[，。！？、；：])\s+(?=[\u4e00-\u9fff])/g, '')
    .trim()
}

function isUseful(text: string): boolean {
  return /[\u4e00-\u9fffA-Za-z0-9]/.test(text)
}

/**
 * 按从上到下、从左到右排成可朗读的正文。
 * 同一行带内的碎块会并到一起，行距明显变大时另起一段。
 */
export function arrangeStoryText(lines: OcrLine[]): { text: string; confidence: number } {
  const kept = lines
    .map((line) => ({ ...line, text: tidyLine(line.text) }))
    .filter((line) => line.text.length > 0 && line.confidence >= 40 && isUseful(line.text))
    .sort((a, b) => {
      const aMid = (a.y0 + a.y1) / 2
      const bMid = (b.y0 + b.y1) / 2
      const height = Math.max(8, Math.min(a.y1 - a.y0, b.y1 - b.y0))
      if (Math.abs(aMid - bMid) > height * 0.6) return aMid - bMid
      return a.x0 - b.x0
    })

  if (kept.length === 0) return { text: '', confidence: 0 }

  const parts: string[] = []
  for (let i = 0; i < kept.length; i += 1) {
    if (i > 0) {
      const prev = kept[i - 1]
      const gap = kept[i].y0 - prev.y1
      const height = Math.max(8, prev.y1 - prev.y0)
      parts.push(gap > height * 0.85 ? '\n\n' : '\n')
    }
    parts.push(kept[i].text)
  }

  const confidence = kept.reduce((sum, line) => sum + line.confidence, 0) / kept.length
  return { text: parts.join(''), confidence }
}

export function splitSentences(text: string): string[] {
  return text
    .split(/\n+/)
    .flatMap((block) => block.split(/(?<=[。！？!?；;])/))
    .map((part) => part.trim())
    .filter((part) => part.length > 0)
}
