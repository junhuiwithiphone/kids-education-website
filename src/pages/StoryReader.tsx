import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BigButton from '../components/BigButton'
import { useReadAloud } from '../hooks/useReadAloud'
import { prepareImage, recognizePage } from '../lib/ocr'
import { createSamplePage } from '../lib/samplePage'

export default function StoryReader() {
  const navigate = useNavigate()
  const albumRef = useRef<HTMLInputElement>(null)
  const cameraRef = useRef<HTMLInputElement>(null)
  const requestRef = useRef(0)

  const [preview, setPreview] = useState<string | null>(null)
  const [page, setPage] = useState<HTMLCanvasElement | null>(null)
  const [text, setText] = useState('')
  const [confidence, setConfidence] = useState<number | null>(null)
  const [recognizing, setRecognizing] = useState(false)
  const [progress, setProgress] = useState<{ label: string; ratio: number } | null>(null)
  const [ocrError, setOcrError] = useState<string | null>(null)

  const { sentences, index, status, error: speechError, play, pause, stop, speakFrom } = useReadAloud(text)

  useEffect(() => {
    if (index < 0) return
    document.getElementById(`sentence-${index}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  }, [index])

  async function runOcr(canvas: HTMLCanvasElement) {
    const requestId = (requestRef.current += 1)
    setRecognizing(true)
    setOcrError(null)
    setText('')
    setConfidence(null)
    setProgress({ label: '正在准备', ratio: 0 })
    try {
      const result = await recognizePage(canvas, (label, ratio) => {
        if (requestId !== requestRef.current) return
        setProgress({ label, ratio: Math.max(0, Math.min(1, ratio)) })
      })
      if (requestId !== requestRef.current) return
      if (!result.text) {
        setOcrError('没有认出文字。请拍得更正、更亮一些，尽量避开反光。')
        return
      }
      setText(result.text)
      setConfidence(result.confidence)
    } catch {
      if (requestId !== requestRef.current) return
      setOcrError('识别失败了。第一次需要联网下载中文模型，请检查网络后再试。')
    } finally {
      if (requestId === requestRef.current) {
        setRecognizing(false)
        setProgress(null)
      }
    }
  }

  async function useCanvas(canvas: HTMLCanvasElement) {
    setPage(canvas)
    setPreview(canvas.toDataURL('image/jpeg', 0.85))
    await runOcr(canvas)
  }

  async function useFile(file: File | undefined) {
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setOcrError('请选择一张照片')
      return
    }
    try {
      await useCanvas(await prepareImage(file))
    } catch {
      setOcrError('这张照片打不开，换一张试试')
    }
  }

  const lowConfidence = confidence !== null && confidence < 75 && text.length > 0

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => navigate('/')}
            aria-label="返回"
            className="w-11 h-11 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors text-xl"
          >
            ←
          </button>
          <span className="text-3xl">📖</span>
          <h1 className="text-xl md:text-2xl font-bold text-amber-700 flex-1">绘本朗读</h1>
        </div>
      </header>

      <main className={`max-w-3xl mx-auto px-4 py-6 ${text ? 'pb-40' : ''}`}>
        <p className="text-lg text-gray-600 mb-5">
          拍一页绘本，斑斑把字认出来，再读给小朋友听。照片只留在这台设备上。
        </p>

        <section
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault()
            void useFile(event.dataTransfer.files?.[0])
          }}
          className="bg-white rounded-3xl shadow-lg p-4 md:p-6"
        >
          {preview ? (
            <img
              src={preview}
              alt="这一页绘本"
              className="w-full max-h-80 object-contain rounded-2xl bg-amber-50"
            />
          ) : (
            <div className="rounded-2xl border-4 border-dashed border-amber-200 bg-amber-50/60 px-6 py-12 text-center">
              <div className="text-6xl mb-3">📷</div>
              <p className="text-xl font-bold text-amber-800">把绘本这一页放进来</p>
              <p className="text-gray-500 mt-2">横排印刷字效果最好。花体、竖排可以先改字再读。</p>
            </div>
          )}

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
            <BigButton onClick={() => albumRef.current?.click()} disabled={recognizing} variant="secondary">
              相册
            </BigButton>
            <BigButton onClick={() => cameraRef.current?.click()} disabled={recognizing}>
              拍照
            </BigButton>
            <BigButton
              onClick={() => {
                void createSamplePage().then(useCanvas)
              }}
              disabled={recognizing}
              variant="secondary"
            >
              示例页
            </BigButton>
          </div>
          <input
            ref={albumRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(event) => {
              void useFile(event.target.files?.[0])
              event.target.value = ''
            }}
          />
          <input
            ref={cameraRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={(event) => {
              void useFile(event.target.files?.[0])
              event.target.value = ''
            }}
          />

          {page && !recognizing && (
            <div className="mt-3 text-center">
              <button
                onClick={() => void runOcr(page)}
                className="text-amber-700 font-bold underline underline-offset-4"
              >
                再认一次
              </button>
            </div>
          )}
        </section>

        {progress && (
          <section className="mt-5 bg-white rounded-3xl shadow p-5" aria-live="polite">
            <p className="font-bold text-amber-800">{progress.label}</p>
            <div className="mt-3 h-3 bg-amber-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-amber-400 transition-all"
                style={{ width: `${Math.round(progress.ratio * 100)}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-2">第一次会下载中文模型，之后就存在这台设备里。</p>
          </section>
        )}

        {ocrError && (
          <p className="mt-5 bg-white text-rose-600 font-bold rounded-2xl px-4 py-3 shadow" role="alert">
            {ocrError}
          </p>
        )}

        {text && (
          <section className="mt-5 space-y-4">
            <div className="bg-white rounded-3xl shadow-lg p-4 md:p-6">
              <label htmlFor="story-text" className="block font-bold text-gray-700 mb-2">
                认出来的字，可以改一改
              </label>
              {lowConfidence && (
                <p className="text-sm text-amber-700 mb-2">有些字可能认错了，读之前先看一眼。</p>
              )}
              <textarea
                id="story-text"
                value={text}
                onChange={(event) => setText(event.target.value)}
                rows={6}
                className="w-full rounded-2xl border-2 border-amber-100 bg-amber-50/40 p-4 text-lg leading-relaxed text-gray-800 focus:outline-none focus:border-amber-300"
              />
            </div>

            <div className="space-y-3">
              {sentences.map((sentence, sentenceIndex) => {
                const active = sentenceIndex === index
                return (
                  <button
                    key={`${sentenceIndex}-${sentence}`}
                    id={`sentence-${sentenceIndex}`}
                    onClick={() => speakFrom(sentenceIndex)}
                    className={`w-full text-left rounded-3xl px-5 py-4 text-xl leading-relaxed shadow scroll-mb-32 transition-colors ${
                      active ? 'bg-amber-400 text-white' : 'bg-white text-gray-800 hover:bg-amber-50'
                    }`}
                  >
                    {sentence}
                  </button>
                )
              })}
            </div>
            {speechError && <p className="text-rose-600 font-bold">{speechError}</p>}
          </section>
        )}
      </main>

      {text && (
        <div className="fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-sm border-t border-amber-100">
          <div className="max-w-3xl mx-auto px-4 py-3 flex gap-3">
            {status === 'playing' ? (
              <BigButton onClick={pause} className="flex-1" size="lg">
                暂停
              </BigButton>
            ) : (
              <BigButton onClick={play} className="flex-1" size="lg" disabled={sentences.length === 0}>
                {status === 'paused' ? '继续读' : '读给我听'}
              </BigButton>
            )}
            <BigButton
              onClick={stop}
              variant="secondary"
              size="lg"
              disabled={status === 'idle'}
            >
              停止
            </BigButton>
          </div>
        </div>
      )}
    </div>
  )
}
