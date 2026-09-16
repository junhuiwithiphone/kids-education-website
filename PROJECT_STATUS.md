# 斑斑启蒙乐园 · 项目状态

> 面向 4 岁儿童的思维 / 科学 / 编程启蒙网站（MVP）
> 最后更新：2026-09-16（课程按幼小衔接标准重构）

---

## 1. 快速开始

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # tsc && vite build
npx tsc --noEmit # 仅类型检查
```

**当前状态**：题型补齐（equation / sudoku / path 进阶判定），课程内容已按幼小衔接难度重写。

---

## 2. 技术栈

| 类别 | 选型 |
|------|------|
| 框架 | React 18 + TypeScript 5 |
| 构建 | Vite 5 |
| 样式 | Tailwind CSS 3 |
| 状态 | zustand 4（+ persist 中间件） |
| 动画 | framer-motion 10 |
| 路由 | react-router-dom 6 |
| 语音 | Web Speech API（`speechSynthesis`，`zh-CN`） |
| 音效 | Web Audio API 合成（无音频文件依赖） |
| 图形 | emoji（无 SVG / 图片资源依赖） |

---

## 3. 目录结构

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── routes.tsx
├── types/
│   ├── lesson.ts
│   └── user.ts
├── data/
│   ├── stages.ts              # 思维启蒙 5 阶段 25 课（含 10 以内入门）
│   ├── science.ts             # 科学启蒙 1 阶段 5 课
│   ├── coding.ts              # 编程启蒙 1 阶段 5 课
│   └── modules.ts             # 三大模块组装
├── stores/
│   ├── lessonStore.ts
│   ├── userStore.ts
│   └── quizStore.ts
├── hooks/
│   ├── useSpeech.ts
│   └── useSound.ts
├── components/
│   ├── SpeakButton.tsx
│   ├── BigButton.tsx
│   ├── Character.tsx
│   ├── StarDisplay.tsx
│   ├── ProgressBar.tsx
│   └── questions/
│       ├── QuestionRenderer.tsx
│       ├── ChoiceQuestion.tsx
│       ├── SequenceQuestion.tsx
│       ├── PathQuestion.tsx       # 支持 requireShortest / collectCount
│       ├── EquationQuestion.tsx   # 算式填空 + 数字键盘
│       └── SudokuQuestion.tsx     # 4×4 数独
└── pages/
    ├── Home.tsx / Module.tsx / StageMap.tsx
    ├── Lesson.tsx / Quiz.tsx / Result.tsx / Profile.tsx
```

---

## 4. 题型状态

| 类型 | 状态 | 组件 |
|------|------|------|
| `choice` / `loop` / `debug` | ✅ | ChoiceQuestion |
| `sequence` | ✅ | SequenceQuestion |
| `path` | ✅ | PathQuestion（含最短路 / 收集判定） |
| `equation` | ✅ | EquationQuestion |
| `sudoku` | ✅ | SudokuQuestion |

---

## 5. 课程内容（幼小衔接）

### 🧠 思维启蒙（`stages.ts`，25 课）
| 阶段 | 主题 |
|------|------|
| stage0 加减法入门 | 合起来/拿走、5 以内、10 以内加减与 10 的组成 |
| stage1 加减法高手 | 凑十、破十、连加连减、加减混合 |
| stage2 逆向小侦探 | 求加数 / 被减数 / 减数、等量代换 |
| stage3 图形与规律 | 数图形、对称、数列、左右相对性 |
| stage4 逻辑推理官 | 4×4 数独、传递排序、应用题、多余条件 |

### 🔬 科学启蒙（`science.ts`，5 课）
密度浮沉原理、溶解、水的三态、光影与颜色、食物链

### 🤖 编程启蒙（`coding.ts`，5 课）
坐标系、最短路径、循环压缩、条件/调试、多目标收集 + 函数萌芽

---

## 6. 设计约定（务必遵守）

- **语音优先**：题干/选项/教学内容配合 `SpeakButton`
- **零挫败**：答错不红叉、不扣分，可无限重试
- **大触控区**：按钮 ≥ 56px
- `tsconfig` 开启 `noUnusedLocals` / `noUnusedParameters`
- 不要在 `<button>` 内嵌 `<button>`（选项用 `motion.div[role=button]`）

---

## 7. 已完成

- [x] EquationQuestion / SudokuQuestion + QuestionRenderer 接入
- [x] PathQuestion：`requireShortest`、`collectCount`
- [x] 重写思维 / 科学 / 编程课程数据
- [x] 科学数据抽离为 `data/science.ts`
- [x] 更新 `package.json` name、`index.html` title

## 8. 后续迭代（非阻塞）

- [ ] 家长中心 `/parent`
- [ ] 拖拽交互（`@dnd-kit`）
- [ ] 预录音频替换 Web Speech
- [ ] 平板横屏布局优化
- [ ] 无障碍 `aria-label` 补全
