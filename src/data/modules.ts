import type { Module, Stage } from '../types/lesson'
import { stages as thinkingStages } from './stages'
import { scienceStage } from './science'
import { codingStage } from './coding'

/** 三大模块定义（幼小衔接难度） */
export const modules: Module[] = [
  {
    id: 'thinking',
    name: '思维启蒙',
    icon: '🧠',
    tagline: '加减法、逆向与逻辑推理',
    description: '20 以内运算、方程思维、图形规律与数独推理',
    color: 'from-pink-400 to-rose-400',
    stages: thinkingStages,
  },
  {
    id: 'science',
    name: '科学启蒙',
    icon: '🔬',
    tagline: '追问为什么',
    description: '密度浮沉、溶解、水的三态、光影与食物链',
    color: 'from-teal-400 to-cyan-400',
    stages: [scienceStage],
  },
  {
    id: 'coding',
    name: '编程启蒙',
    icon: '🤖',
    tagline: '坐标、最短路与循环',
    description: '坐标系、最短路径、循环压缩、条件判断与多目标收集',
    color: 'from-orange-400 to-amber-400',
    stages: [codingStage],
  },
]

export const allStages: Stage[] = modules.flatMap((m) => m.stages)

export function getModuleById(id: string): Module | undefined {
  return modules.find((m) => m.id === id)
}

export function getStageById(id: string): Stage | undefined {
  return allStages.find((s) => s.id === id)
}
