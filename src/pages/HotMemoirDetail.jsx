import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import hotBooks from '../data/hotBooks'
import fetchJSON, { isShifu } from '../lib/hotData'

export default function HotMemoirDetail() {
  const { id } = useParams()
  const [memoir, setMemoir] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    setMemoir(null)
    setError(false)
    fetchJSON(`/hot/memoirs/${id}.json.gz`)
      .then(setMemoir)
      .catch(() => fetchJSON(`/hot/memoirs/${id}.json`).then(setMemoir).catch(() => setError(true)))
  }, [id])

  // 兼容旧 bundle 内数据（Top30 收藏拆页）
  const legacyMemoir = !memoir && !error
    ? hotBooks.flatMap(b => (b.memoirs || []).map(m => ({ ...m, _book: b }))).find(m => String(m.id) === id)
    : null

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-xl font-bold text-[#1d1d1f] mb-3">未找到该拆页</h2>
          <Link to="/hot/books" className="text-[#0071e3] hover:underline">返回经典拆页</Link>
        </div>
      </div>
    )
  }

  if (!memoir && !legacyMemoir) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center text-[#86868b]">加载中…</div>
      </div>
    )
  }

  const m = memoir || legacyMemoir
  const bookId = memoir ? memoir.bookId : legacyMemoir._book.id
  const bookTitle = memoir ? memoir.bookTitle : legacyMemoir._book.title
  const texts = m.texts || []

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <Link
          to={`/hot/book/${bookId}`}
          className="inline-flex items-center gap-2 text-sm text-[#86868b] hover:text-[#0071e3] transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回《{bookTitle}》
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            {m.level && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-[#0071e3] font-bold">
                {m.level}
              </span>
            )}
            {isShifu(m.user) && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 font-bold">
                玄龙
              </span>
            )}
            {m.user && <span className="text-xs text-[#86868b]">{m.user}</span>}
            {m.duration && <span className="text-xs text-[#86868b]">· {m.duration} 分钟</span>}
            {m.examResult && (
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600">{m.examResult}</span>
            )}
          </div>
          <h1 className="text-xl md:text-2xl font-black text-[#1d1d1f] mb-3">{m.topic || '（未命名拆页）'}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <Link to={`/hot/book/${bookId}`} className="text-sm text-[#6e6e73] hover:text-[#0071e3] transition-colors">
              《{bookTitle}》
            </Link>
            {m.activity?.date && (
              <span className="text-xs text-[#86868b]">
                · {m.activity.date}{m.activity.address ? ` · ${m.activity.address}` : ''}
              </span>
            )}
          </div>
          {m.remark && (
            <p className="mt-3 text-sm text-[#6e6e73] p-3 rounded-lg bg-dark-card-hover/50 border border-dark-border">
              {m.remark}
            </p>
          )}
        </motion.div>

        {/* RIA Content */}
        {texts.length === 0 && (
          <div className="glass rounded-xl p-8 text-center text-[#86868b] text-sm">该拆页暂无公开正文</div>
        )}
        {texts.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            <div className="ria-section">
              <span className="ria-label bg-purple-500/15 text-purple-400 border border-purple-500/20">
                R · 阅读拆页
              </span>
              <div className="memoir-content whitespace-pre-wrap text-sm leading-relaxed text-[#424245]">
                {text.quote || '（暂无原文内容）'}
              </div>
            </div>

            {text.explains && (
              <div className="ria-section">
                <span className="ria-label bg-cyan-500/15 text-[#0071e3] border border-cyan-500/20">
                  I · 引导促进
                </span>
                <div className="memoir-content whitespace-pre-wrap text-sm leading-relaxed text-[#424245]">
                  {text.explains}
                </div>
              </div>
            )}

            {text.interaction && (
              <div className="ria-section">
                <span className="ria-label bg-emerald-500/15 text-emerald-600 border border-emerald-500/20">
                  A · 拆为己用
                </span>
                <div className="memoir-content whitespace-pre-wrap text-sm leading-relaxed text-[#424245]">
                  {text.interaction}
                </div>
              </div>
            )}
          </motion.div>
        ))}

        {/* 学习目标 */}
        {m.learnGoal && (
          <div className="ria-section">
            <span className="ria-label bg-amber-500/15 text-amber-600 border border-amber-500/20">
              学习目标
            </span>
            <div className="memoir-content whitespace-pre-wrap text-sm leading-relaxed text-[#424245]">
              {m.learnGoal}
            </div>
          </div>
        )}

        {/* 现场音频 */}
        {(m.radioUrl || legacyMemoir?.radioUrl) && (
          <div className="glass rounded-xl p-4 mt-4 flex items-center gap-3">
            <span className="text-sm text-[#6e6e73]">🎧 现场拆书录音</span>
            <a
              href={m.radioUrl || legacyMemoir?.radioUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-[#0071e3] hover:underline ml-auto"
            >
              网盘收听{(m.radioPwd || legacyMemoir?.radioPwd) ? ` · 提取码 ${m.radioPwd || legacyMemoir?.radioPwd}` : ''} ↗
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
