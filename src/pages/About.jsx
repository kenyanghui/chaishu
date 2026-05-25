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
            <p className="text-neon-purple font-medium">AI 摆渡人 · 拆书家</p>
          </div>

          {/* Info grid */}
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              { label: '所在地', value: '广州' },
              { label: '所属分舵', value: '广州小蛮腰分舵' },
              { label: '拆书等级', value: '拆书家（TF3-3）' },
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
                玥清是我杨姓族名，玥是左王右月，清是清水的清。我是 AI 摆渡人，以"AI+心智"双轮驱动，帮助企业及二代接班人构建 AI 时代的核心竞争力，实现可持续增长与代际跃迁。
              </p>
              <p>
                混沌学园 AI 创新领教，国际人工智能产业联盟首席生态官。
                AI 内创业加速器二代教育传承教练，悦洋海外集团首席人工智能官。
                前微软、惠普、北电工程师，二十年企业咨询服务与科技创业经验，
                8 年二代传承内创业协同探索，专注 AI 赋能二代教育传承，成就企业家的幸福望族。
              </p>
              <p className="flex flex-wrap gap-2 mt-4">
                {['二代教育传承教练', '数字员工方案讲师', '组织转型心智教练'].map(tag => (
                  <span key={tag} className="px-3 py-1 rounded-full bg-neon-purple/10 border border-neon-purple/20 text-neon-purple text-xs">
                    {tag}
                  </span>
                ))}
              </p>
            </div>
          </div>

          {/* 服务能力 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">服务能力</h2>
            <div className="grid md:grid-cols-4 gap-3">
              {[
                { name: '培训', desc: 'AI 拆书工作坊、数字员工实操、二代传承教练' },
                { name: '咨询', desc: '企业内部创业辅导、科技成果转化、组织转型' },
                { name: '教练', desc: '二代教育传承、高管心智教练、AI 内创业加速' },
                { name: '投资', desc: 'AI 项目评估、科技创业辅导、资源对接' },
              ].map(s => (
                <div key={s.name} className="p-4 rounded-xl bg-dark-card-hover/50 border border-dark-border">
                  <div className="text-lg font-bold text-white mb-1">{s.name}</div>
                  <div className="text-xs text-slate-400">{s.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 擅长领域 */}
          <div className="mb-10">
            <h2 className="text-xl font-bold text-white mb-4">擅长领域</h2>
            <div className="flex flex-wrap gap-2">
              {['企业内部创业辅导', '科技成果转化咨询', '服务咨询教育行业', 'AI 赋能二代教育传承', '企业数字化转型', '高管心智成长'].map((area, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-dark-card-hover/50 border border-dark-border text-sm text-slate-400">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-neon-purple/10 to-neon-blue/10 border border-neon-purple/20 text-center">
            <h3 className="text-lg font-bold text-white mb-2">联系我</h3>
            <p className="text-sm text-slate-400 mb-4">
              培训 · 咨询 · 教练 · 投资
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
