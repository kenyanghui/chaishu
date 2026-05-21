import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import memoirs from '../data/memoirs'

export default function MemoirDetail() {
  const { id } = useParams()
  const memoir = memoirs.find(m => m.id === parseInt(id))

  if (!memoir) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">未找到该拆页</h2>
          <Link to="/" className="text-neon-purple hover:underline">返回首页</Link>
        </div>
      </div>
    )
  }

  const { book, texts, prologue, learnGoal, remark, radioUrl, radioPwd, level, topic, activity } = memoir

  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back link */}
        <Link
          to={`/book/${encodeURIComponent(book.title)}`}
          className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-neon-purple transition-colors mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回《{book.title}》
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 md:p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="px-3 py-1 rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 text-neon-purple text-sm font-bold">
              {level}
            </span>
            <span className="text-sm text-slate-500">{activity?.date}</span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-white mb-4">{topic}</h1>

          <div className="flex items-center gap-3 mb-6">
            <Link to={`/book/${encodeURIComponent(book.title)}`} className="flex items-center gap-2 group">
              <div className="w-8 h-10 rounded overflow-hidden bg-dark-card-hover">
                {book.image ? (
                  <img src={book.image} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-neon-purple">{book.title[0]}</div>
                )}
              </div>
              <span className="text-sm text-slate-400 group-hover:text-neon-purple transition-colors">
                《{book.title}》· {book.author}
              </span>
            </Link>
          </div>

          {activity?.subject && (
            <div className="text-sm text-slate-500 mb-2">
              活动：{activity.subject}
              {activity.address && <span> · {activity.address}</span>}
            </div>
          )}

          {/* Audio link */}
          {radioUrl && (
            <div className="mt-4 p-4 rounded-xl bg-dark-card-hover/50 border border-dark-border">
              <div className="text-xs text-slate-500 mb-2">录音回放</div>
              <a
                href={radioUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-neon-cyan hover:text-neon-blue transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
                收听拆书录音
              </a>
              {radioPwd && <span className="text-xs text-slate-600 ml-3">密码：{radioPwd}</span>}
            </div>
          )}
        </motion.div>

        {/* Prologue */}
        {prologue && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="ria-section"
          >
            <span className="ria-label bg-purple-500/10 text-purple-400">开场</span>
            <div className="memoir-content whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
              {prologue}
            </div>
          </motion.div>
        )}

        {/* Learn Goal */}
        {learnGoal && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="ria-section"
          >
            <span className="ria-label bg-blue-500/10 text-blue-400">学习目标</span>
            <div className="memoir-content whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
              {learnGoal}
            </div>
          </motion.div>
        )}

        {/* Remark */}
        {remark && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="ria-section"
          >
            <span className="ria-label bg-indigo-500/10 text-indigo-400">主题介绍</span>
            <div className="memoir-content whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
              {remark}
            </div>
          </motion.div>
        )}

        {/* RIA Sections */}
        {texts.map((text, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
          >
            {/* R - Reading */}
            <div className="ria-section">
              <span className="ria-label bg-purple-500/15 text-purple-400 border border-purple-500/20">
                R · 阅读拆页
              </span>
              <div className="memoir-content whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                {text.quote}
              </div>
            </div>

            {/* I - Interpretation */}
            <div className="ria-section">
              <span className="ria-label bg-cyan-500/15 text-cyan-400 border border-cyan-500/20">
                I · 讲解引导
              </span>
              <div className="memoir-content whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                {text.explains}
              </div>
            </div>

            {/* A - Appropriation */}
            <div className="ria-section">
              <span className="ria-label bg-teal-500/15 text-teal-400 border border-teal-500/20">
                A · 拆为己用
              </span>
              <div className="memoir-content whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                {text.interaction}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
