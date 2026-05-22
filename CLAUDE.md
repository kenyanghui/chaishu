# AI 拆书工坊

本项目的核心使命是：**每见到一本书的拆页，就产出一个可用的教练 Skill**。

## 管线架构

```
hotBooks.js → 仓颉拆书管线(scripts/pipeline-cangjie.js) → .claude/skills/*.md
                                                              ↓
                                                  skills.js（网站数据）
                                                              ↓
                                              高清大图 / ljg-card / 达尔文进化
```

## 各环节职责

| 环节 | 输入 | 输出 | 说明 |
|------|------|------|------|
| **女娲蒸馏** | 书名+作者 | 作者思想知识图谱 | 用女娲 Skill 深度分析作者思想体系 |
| **仓颉拆书** | `hotBooks.js` 拆页 | `.claude/skills/*.md` | `scripts/pipeline-cangjie.js` — 自动提取 RIA 内容生成教练技能 |
| **高清大图** | 技能框架 | 信息图/思维导图 | `high-density-infographic` Skill |
| **ljg-card** | 技能步骤 | Anki 卡片组 | 待实现 |
| **达尔文进化** | SKILL.md | 优化的 SKILL.md | `达尔文` Skill — 评分 + 爬山优化 |

## 当前数据状态

- **hotBooks.js**: 21 本书, 数百个拆书帮拆页
- **skills.js**: 21 个技能包, 66 个技能（自动提取）
- **.claude/skills/**: 67 个教练 SKILL.md（自动生成）
- **热门拆书页面**: `/hot` — 展示 21 本书
- **技能工坊页面**: `/skills` — 展示 66 个技能

## 管线脚本

```bash
# 完整运行：拆页 → SKILL.md
node scripts/pipeline-cangjie.js

# 更新 skills.js 网站数据
node scripts/update-skills.js
```

## 产出标准

每个拆页产出对应的 `.claude/skills/<skill-name>.md`:
1. **Frontmatter**: name, description, triggers
2. **核心方法论**: 操作步骤
3. **教练流程**: 诊断 → 教学 → 演练 → 反馈
4. **出处**: 书籍 + 拆书家信息

## 命名规范

- 文件名: `{level}-{topic-kebab}.md`
- trigger: 主题名 + 作者 + 书中关键词

## 开发命令

```bash
npm run dev    # 启动开发服务器
npm run build  # 构建生产版本
npm run preview # 预览构建结果
```
