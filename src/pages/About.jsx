import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          {/* Avatar and name */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-neon-purple to-neon-blue flex items-center justify-center text-3xl font-black text-white">
              玥
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white mb-2">玥清</h1>
            <p className="text-neon-purple font-medium">杨辉 · 三级拆书家</p>
          </div>

          {/* Info grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              { label: '所在地', value: '广州' },
              { label: '所属分舵', value: '广州小蛮腰分舵' },
              { label: '拆书等级', value: '三级拆书家' },
              { label: '微信', value: 'kenyanghui' },
            ].map(info => (
              <div key={info.label} className="p-4 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                <div className="text-xs text-slate-500 mb-1">{info.label}</div>
                <div className="text-sm text-slate-200">{info.value}</div>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">关于我</h2>
            <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
              <p>
                玥清是我杨姓族名，玥是左王右月，清是清水的清，我是王旁边明亮的月亮。
              </p>
              <p>
                我的职业是企业咨询顾问，工作时我追求清水一样的简单清楚。我是云耕企业读书会主理人，咨询和投资是我 2 个标签，有 3 次创业退出经历、目前 4 个企业董事/首席战略官、曾在微软等 5 个 500 强外企任职。
              </p>
              <p>
                欢迎大家来找玥清共同探讨和合作企业读书会、培训工作坊和高管私董会等企业服务。
              </p>
            </div>
          </div>

          {/* AI 拆书理念 */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">AI + 拆书</h2>
            <div className="space-y-3 text-sm text-slate-400 leading-relaxed">
              <p>
                我致力于将 AI 技术与拆书帮 RIA 方法论结合，打造更高效的拆书体验。
                AI 辅助我进行：
              </p>
              <ul className="space-y-2">
                {[
                  '书籍核心思想蒸馏与框架提取',
                  'RIA 拆页内容的深度分析与结构化呈现',
                  '学习者互动场景设计与催化应用',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-1 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-neon-purple to-neon-blue shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4">
                这个网站就是我 AI 拆书成果的集中呈现，希望能为你的学习之旅带来启发。
              </p>
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border border-neon-purple/20 text-center">
            <h3 className="text-lg font-bold text-white mb-2">商务合作</h3>
            <p className="text-sm text-slate-400 mb-4">
              企业读书会 · 培训工作坊 · 高管私董会
            </p>
            <a
              href="mailto:yanghuihotmail@hotmail.com"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-neon-purple to-neon-blue text-white font-medium text-sm hover:shadow-lg hover:shadow-neon-purple/25 transition-all"
            >
              联系我
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
