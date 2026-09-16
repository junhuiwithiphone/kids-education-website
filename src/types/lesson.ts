// 课程类型
export type LessonType = 'teach' | 'quiz' | 'review'

// 题目类型
// choice: 点选  sequence: 指令/步骤排序  path: 网格走迷宫
// loop: 循环计数  debug: 找错误步骤  equation: 算式填空  sudoku: 4×4 数独
export type QuestionType =
  | 'choice'
  | 'sequence'
  | 'path'
  | 'loop'
  | 'debug'
  | 'equation'
  | 'sudoku'

// 模块（思维 / 科学 / 编程）
export type ModuleId = 'thinking' | 'science' | 'coding'

// 指令块（编程启蒙用）
export interface CommandBlock {
  id: string
  icon: string
  label: string
  voiceText: string
}

// 网格走迷宫的单元格
export interface GridCell {
  type: 'empty' | 'wall' | 'goal' | 'collect'
  icon?: string
}

// 走迷宫题目配置
export interface PathConfig {
  rows: number
  cols: number
  cells: GridCell[][]
  start: { row: number; col: number }
  startDirection: 'up' | 'down' | 'left' | 'right'
  // 正确指令序列，按 CommandBlock.id 引用
  solution: string[]
  // 提供给孩子的可选指令块
  palette: CommandBlock[]
  /**
   * 是否要求最短路径。
   * 开启后必须用最少步数到达终点（且收集所有 collect 物品），否则判为未通过。
   * 用于「最短路径规划」这类进阶编程思维训练。
   */
  requireShortest?: boolean
  /** 必须全部收集的物品格数量，配合 requireShortest 使用 */
  collectCount?: number
}

// 指令排序题目配置
export interface SequenceConfig {
  // 打乱后展示给孩子的指令块
  blocks: CommandBlock[]
  // 正确顺序，按 CommandBlock.id 引用
  solution: string[]
}

/**
 * 算式填空配置。
 * 用 null 表示需要孩子填写的空位，如 [9, '+', null] → 「9 + ▢ = ?」
 * 支持 20 以内加减法、凑十法、破十法、连加连减、逆向求被减数等。
 */
export interface EquationConfig {
  /** 算式各项：数字、运算符、null 表示空格 */
  terms: (number | string | null)[]
  /** 正确答案（空格处应填的数） */
  answer: number
  /** 数字键盘可选值，默认 0-20；可自定义为干扰项较小的集合 */
  keypad?: number[]
  /** 等号右侧的显示值；省略时自动计算 */
  equals?: number
}

/**
 * 4×4 数独配置（幼小衔接经典逻辑题）。
 * 规则：每行、每列、每个 2×2 宫格内，1-4 各出现一次。
 * puzzle 中 0 表示待填空格。
 */
export interface SudokuConfig {
  size: 4
  /** 初始盘面，0 为空格 */
  puzzle: number[][]
  /** 完整解 */
  solution: number[][]
  /** 盘面元素图标（可选），用具象图案降低纯数字抽象度 */
  icons?: string[]
}

// 选项
export interface Option {
  id: string
  text: string
  image?: string
  isCorrect: boolean
}

// 题目接口
export interface Question {
  id: string
  question: string
  hint: string
  type: QuestionType
  options?: Option[]
  sequence?: SequenceConfig
  path?: PathConfig
  equation?: EquationConfig
  sudoku?: SudokuConfig
  correctAnswer?: string | number
  explanation: string
  starReward: number
}

// 教学步骤
export interface TeachStep {
  title: string
  content: string
  image?: string
  voiceText: string
  animation?: string
}

// 讲授内容
export interface TeachContent {
  character: string
  steps: TeachStep[]
  summary: string
}

// 课程内容
export interface LessonContent {
  teach?: TeachContent
  quiz?: Question[]
  review?: string[]
}

// 课程阶段
export interface Stage {
  id: string
  moduleId: ModuleId
  name: string
  icon: string
  description: string
  color: string
  lessons: Lesson[]
}

// 课程模块（思维 / 科学 / 编程）
export interface Module {
  id: ModuleId
  name: string
  icon: string
  tagline: string
  description: string
  color: string
  stages: Stage[]
}

// 课程接口
export interface Lesson {
  id: string
  stageId: string
  title: string
  type: LessonType
  content: LessonContent
  duration: number // 分钟
  order: number
  locked?: boolean
}
