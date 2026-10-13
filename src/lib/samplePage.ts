const SAMPLE_LINES = [
  '小兔子背上小书包。',
  '它走过绿绿的草地。',
  '路边开着一朵红花。',
  '小兔子说：你好呀！',
]

/** 一页干净的示例绘本，方便还没拍照时先试听。 */
export async function createSamplePage(): Promise<HTMLCanvasElement> {
  await document.fonts.ready
  const canvas = document.createElement('canvas')
  canvas.width = 900
  canvas.height = 1200
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('无法生成示例页')

  ctx.fillStyle = '#fff8ee'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.fillStyle = '#b7e4c7'
  ctx.beginPath()
  ctx.ellipse(450, 1040, 280, 70, 0, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#f4a4a4'
  ctx.beginPath()
  ctx.arc(450, 340, 130, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#ffffff'
  ctx.beginPath()
  ctx.arc(400, 320, 16, 0, Math.PI * 2)
  ctx.arc(500, 320, 16, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = '#5c4a3a'
  ctx.font = '52px "Noto Sans SC", "Microsoft YaHei", sans-serif'
  ctx.textAlign = 'center'
  SAMPLE_LINES.forEach((line, index) => {
    ctx.fillText(line, 450, 640 + index * 96)
  })

  return canvas
}
