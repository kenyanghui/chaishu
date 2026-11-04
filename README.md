# 玄龙·拆AI（chaiAI）— 小蛮腰·拆AI 课程阵地

> [chai.aibay.asia](https://chai.aibay.asia/) 的源码仓：拆书帮广州小蛮腰分舵「AI 拆书工作坊」的课程阵地——
> 把 AI 软件和 AI 本身当成拆页对象，用拆书帮 RIA 方法论当场拆开、拆为己用。

## 一句话定位

不教收藏工具，每期工作坊当场拆开一个真实在跑的 AI 软件，3 小时带走一件亲手做出来的东西。
本站既是工作坊的报名/回看阵地，也是「拆为己用」的活样本——**这个站本身就是第三期工作坊的教学现场**。

## 六大模块（与站内导航同序）

| 模块 | 路由 | 是什么 | 真实数字 |
|---|---|---|---|
| 拆学习 | 外链 [chailive](https://www.aibay.asia/chailive/) | RIA 便签法全库共拆站（独立仓部署） | 2255 本书 / 19262 页拆页 / 6 兴趣模块 |
| 拆搭子 | `/chaibuddy` | 拆书帮全量拆书家名录：27 类标签 → 六模式合作推荐，师承/徒弟可点击互链 | 5473 人 / 83 分舵 / 990 条师徒互链 |
| 拆软件 | `/workshops` | 工作坊系列：ima、workbuddy、建站、DeepSeek Harness……当场拆当场接 | 4 期系列课 |
| 拆技能 | `/skills` | 每本书拆成便签 + 信息图 + 可下载 Skill 包（仓颉拆书管线产物） | 210 个技能包 |
| 拆专家 | `/skill-fusion` | 把思想家体系蒸馏成可召唤的「领域 AI 专家团」 | 8 套思想体系 / 6 个专家团 |
| 共拆AI | `/coai` | 六条合作线专页：联合带场 / 领域专家 / 内容工厂 / 开源共建 / 全库共拆 / 知识视觉化 | 6 条开放共建线 |

另有：`/hot`（经典拆页：热门书拆页流与回忆录）、`/learning-path`（成长路径）、`/camp`（训练营）、`/about`。

## 仓库结构

```
chaiAI/
├── src/
│   ├── pages/            # 12 个页面组件（Home/Workshops/Skills/SkillFusion/
│   │                     #   Chaibuddy/Coai/HotBooks/HotBookDetail/HotMemoirDetail/
│   │                     #   LearningPath/Camp/About）
│   ├── data/             # 构建期生成的数据源（skills.js 为仓颉管线 v2 自动生成）
│   │   ├── skills.js         # 210 技能包（id/name/author/items/quote/source）
│   │   ├── hotBooks.js       # 经典拆页书目
│   │   ├── workshops.js      # 工作坊系列定义（场次/报名/回看/投票）
│   │   ├── learningPath.js   # 成长路径
│   │   └── skillFusion.js    # 拆专家：思想家→专家团映射
│   ├── components/       # Navbar（导航定稿：成长路径→经典拆页→拆学习→拆搭子→
│   │                     #   拆软件→拆技能→拆专家→共拆AI→关于）/ Footer
│   └── index.css         # Apple light 设计体系（apple-card/eyebrow/headline/gradient-text）
├── scripts/              # 数据管线（Node/Python，见下节）
├── public/               # 静态资产直接上线
│   ├── chaibuddy/        #   people.json（5473 人脱敏名录 + sf/td 师徒关系）
│   ├── skills/ hot/ cards/ workbook/ tf-assess/ workshop/ shifu/ images/
│   └── ai-chaishu-skill.zip  # 可下载的 AI 拆书 Skill 包
└── .github/workflows/    # push main → Actions 构建 → GitHub Pages
```

## 数据管线（scripts/）

| 脚本 | 作用 |
|---|---|
| `pipeline-cangjie.js` | 仓颉拆书管线：拆书帮技能表格 → 结构化技能包（skills.js 的生成器，v2） |
| `update-skills.js` | 技能数据增量更新入口 |
| `build-hot-data.mjs` / `analyzeHotBooks.cjs` | 经典拆页数据构建与书目分析 |
| `pipeline-darwin.js` / `pipeline-darwin-v2.js` / `pipeline-hd-image.js` | 达尔文管线：拆页 → 高清信息图卡片（public/cards） |
| `pipeline-ljg-card.js` | 刘涓恪卡片管线（特定格式技能卡） |
| `audit-ria.js` | RIA 拆页合规审计（R/I/A 结构齐全性检查） |
| `curated-books.json` / `curated-legacy.json` | 人工精选书目配置 |

拆搭子（chaibuddy）的数据管线不在本仓（名录采集与打码在仓外完成，本仓只收脱敏后的
`public/chaibuddy/people.json`）；chailive 全库站为独立仓独立部署。

## 本地开发

```bash
npm install
npm run dev        # Vite 开发服务器
npm run lint       # ESLint（React 19 规则：effect 内同步 setState 会被拒，改事件驱动）
npm run build      # vite build && cp dist/index.html dist/404.html && cp dist/index.html dist/chaibuddy/index.html
```

build 脚本里的两次 `cp` 是两个已踩实的坑：
- `404.html`：GitHub Pages 对 SPA 深链（如 `/workshops`）返回 404 状态码，复制壳后深链直接 200；
- `chaibuddy/index.html`：SPA 路由 `/chaibuddy` 与 `public/chaibuddy/` 真实目录撞名，
  nginx/GitHub Pages 会 301 到目录再 404——补壳后微信分享卡片不再踩 404。

## 部署与验证

- push `main` → GitHub Actions 自动构建并部署到 GitHub Pages（自定义域名 chai.aibay.asia）。
- 线上验证纪律：push 后等 ~80s；SPA 资源在根 `/assets/` 下，抓首页壳取 bundle hash，
  再 `curl /assets/index-*.js | grep` 页面文案标记确认新包；深链 404 状态码是正常现象看内容不看码。

## 相关仓库

| 仓 | 关系 |
|---|---|
| [chaiflow](https://github.com/kenyanghui/chaiflow) | 本站全部决策记录 / 踩坑复盘 / 操作手册的开源档案 |
| [rsi-ima-workbuddy-wechat-web](https://github.com/kenyanghui/rsi-ima-workbuddy-wechat-web) | 二期工作坊主仓：本站的自动化体检与建站技能 |
| chailive（拆学习） | RIA 全库站，独立仓独立部署于 www.aibay.asia/chailive/ |

## 许可证

MIT
