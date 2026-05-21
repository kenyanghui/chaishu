export default function Footer() {
  return (
    <footer className="border-t border-dark-border mt-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-slate-500">
            <span className="gradient-text font-bold">玥清·AI拆书</span>
            <span className="mx-2">·</span>
            用 AI 拆解好书，让知识为你所用
          </div>
          <div className="text-xs text-slate-600">
            Made with AI · 2026
          </div>
        </div>
      </div>
    </footer>
  )
}
