import type { CommandBlock, GridCell, Stage } from '../types/lesson'

const DIR: CommandBlock[] = [
  { id: 'up', icon: '⬆️', label: '上', voiceText: '向上走一格' },
  { id: 'down', icon: '⬇️', label: '下', voiceText: '向下走一格' },
  { id: 'left', icon: '⬅️', label: '左', voiceText: '向左走一格' },
  { id: 'right', icon: '➡️', label: '右', voiceText: '向右走一格' },
]

const E: GridCell = { type: 'empty' }
const W: GridCell = { type: 'wall', icon: '🪨' }
const G: GridCell = { type: 'goal', icon: '🥕' }
const S: GridCell = { type: 'collect', icon: '⭐' }

/**
 * 编程启蒙 · 算法思维（幼小衔接）
 * 坐标系、最短路径、循环压缩、条件判断、多目标收集。
 */
export const codingStage: Stage = {
  id: 'stage-coding-1',
  moduleId: 'coding',
  name: '算法小司令',
  icon: '🤖',
  description: '坐标、最短路、循环与收集',
  color: 'from-orange-400 to-amber-400',
  lessons: [
    {
      id: 'c1-l1',
      stageId: 'stage-coding-1',
      title: '第几行第几列',
      type: 'teach',
      duration: 12,
      order: 1,
      content: {
        teach: {
          character: '小斑马斑斑',
          steps: [
            {
              title: '格子有名字',
              content: '地图上的每个格子可以用「第几行、第几列」来描述。我们约定：从上到下是行，从左到右是列，都从 0 开始数。',
              voiceText: '地图上的每个格子可以用第几行、第几列来描述。从上到下是行，从左到右是列，都从零开始数。',
              animation: 'wave',
            },
            {
              title: '举例',
              content: '左上角是 (0,0)，它右边一格是 (0,1)，它下边一格是 (1,0)。',
              voiceText: '左上角是零零，它右边一格是零一，它下边一格是一零。',
            },
            {
              title: '为什么重要',
              content: '编程里用坐标告诉电脑「去哪里」，比只说「那边」清楚多了！',
              voiceText: '编程里用坐标告诉电脑去哪里，比只说那边清楚多了！',
            },
          ],
          summary: '坐标：(行, 列)，从上到下、从左到右，从 0 起算。',
        },
        quiz: [
          {
            id: 'c1-l1-q1',
            question: '3×3 格子里，正中间的坐标是？',
            hint: '行和列都是中间那个数',
            type: 'choice',
            options: [
              { id: 'a', text: '(0,0)', isCorrect: false },
              { id: 'b', text: '(1,1)', isCorrect: true },
              { id: 'c', text: '(2,2)', isCorrect: false },
            ],
            correctAnswer: 'b',
            explanation: '3×3 中间一行是第 1 行，中间一列是第 1 列。',
            starReward: 2,
          },
          {
            id: 'c1-l1-q2',
            question: '从 (0,0) 向右走两格，到哪？',
            hint: '列号加 2',
            type: 'choice',
            options: [
              { id: 'a', text: '(2,0)', isCorrect: false },
              { id: 'b', text: '(0,2)', isCorrect: true },
              { id: 'c', text: '(2,2)', isCorrect: false },
            ],
            correctAnswer: 'b',
            explanation: '向右只改变列：0+2=2，所以是 (0,2)。',
            starReward: 2,
          },
        ],
      },
    },
    {
      id: 'c1-l2',
      stageId: 'stage-coding-1',
      title: '最短路径',
      type: 'teach',
      duration: 12,
      order: 2,
      content: {
        teach: {
          character: '小斑马斑斑',
          steps: [
            {
              title: '能到还不够',
              content: '走到终点的路可能有很多条，但程序员喜欢找「步数最少」的那一条。',
              voiceText: '走到终点的路可能有很多条，但程序员喜欢找步数最少的那一条。',
            },
            {
              title: '怎么想',
              content: '先看竖直要走几格、水平要走几格，加起来常常就是最短（没有墙挡路时）。',
              voiceText: '先看竖直要走几格、水平要走几格，加起来常常就是最短，没有墙挡路时。',
            },
            {
              title: '绕远了',
              content: '如果多走了回头路或弯路，即使到了终点，也不是最短路径哦。',
              voiceText: '如果多走了回头路或弯路，即使到了终点，也不是最短路径哦。',
            },
          ],
          summary: '最短路径：用最少步数到达目标。',
        },
        quiz: [
          {
            id: 'c1-l2-q1',
            question: '用最少步数走到胡萝卜！（绕远会提示再试）',
            hint: '最短只要 4 步：右右下下',
            type: 'path',
            path: {
              rows: 3,
              cols: 3,
              cells: [
                [E, E, E],
                [E, W, E],
                [E, E, G],
              ],
              start: { row: 0, col: 0 },
              startDirection: 'right',
              solution: ['right', 'right', 'down', 'down'],
              palette: DIR,
              requireShortest: true,
            },
            explanation: '右→右→下→下，正好 4 步，是最短路。',
            starReward: 3,
          },
          {
            id: 'c1-l2-q2',
            question: '没有墙时，从 (0,0) 到 (2,3) 最短几步？',
            hint: '行差 + 列差',
            type: 'choice',
            options: [
              { id: 'a', text: '3 步', isCorrect: false },
              { id: 'b', text: '5 步', isCorrect: true },
              { id: 'c', text: '6 步', isCorrect: false },
            ],
            correctAnswer: 'b',
            explanation: '向下 2 + 向右 3 = 5 步。',
            starReward: 2,
          },
        ],
      },
    },
    {
      id: 'c1-l3',
      stageId: 'stage-coding-1',
      title: '重复 N 次',
      type: 'teach',
      duration: 12,
      order: 3,
      content: {
        teach: {
          character: '小斑马斑斑',
          steps: [
            {
              title: '懒人聪明法',
              content: '➡️➡️➡️➡️ 可以想成「向右重复 4 次」。循环就是把重复的动作压缩成一句。',
              voiceText: '向右向右向右向右，可以想成向右重复四次。循环就是把重复的动作压缩成一句。',
            },
            {
              title: '为什么有用',
              content: '指令越短越不容易写错，电脑执行起来也更清楚。',
              voiceText: '指令越短越不容易写错，电脑执行起来也更清楚。',
            },
            {
              title: '数一数',
              content: '看到一串相同方向，先数有几个，就是重复的次数。',
              voiceText: '看到一串相同方向，先数有几个，就是重复的次数。',
            },
          ],
          summary: '循环：把相同动作写成「重复 N 次」。',
        },
        quiz: [
          {
            id: 'c1-l3-q1',
            question: '⬇️⬇️⬇️⬇️⬇️ 用循环怎么说？',
            hint: '数一数有几个向下',
            type: 'loop',
            options: [
              { id: 'a', text: '向下重复 3 次', isCorrect: false },
              { id: 'b', text: '向下重复 5 次', isCorrect: true },
              { id: 'c', text: '向下重复 4 次', isCorrect: false },
            ],
            correctAnswer: 'b',
            explanation: '一共 5 个向下箭头。',
            starReward: 2,
          },
          {
            id: 'c1-l3-q2',
            question: '「向右重复 3 次，再向下重复 2 次」一共几步？',
            hint: '3 + 2',
            type: 'choice',
            options: [
              { id: 'a', text: '5 步', isCorrect: true },
              { id: 'b', text: '6 步', isCorrect: false },
              { id: 'c', text: '32 步', isCorrect: false },
            ],
            correctAnswer: 'a',
            explanation: '3 次向右 + 2 次向下 = 5 步。',
            starReward: 2,
          },
        ],
      },
    },
    {
      id: 'c1-l4',
      stageId: 'stage-coding-1',
      title: '如果遇到墙',
      type: 'teach',
      duration: 12,
      order: 4,
      content: {
        teach: {
          character: '小斑马斑斑',
          steps: [
            {
              title: '条件判断',
              content: '程序员会写：如果前面是墙，就转向；否则继续走。这叫「如果…就…」。',
              voiceText: '程序员会写：如果前面是墙，就转向；否则继续走。这叫如果，就。',
            },
            {
              title: '先想再走',
              content: '走迷宫前先观察哪里有石头，提前规划转弯，比撞墙再重来更聪明。',
              voiceText: '走迷宫前先观察哪里有石头，提前规划转弯，比撞墙再重来更聪明。',
            },
            {
              title: '找错指令',
              content: '调试（debug）就是找出哪一步判断错了，把它改对。',
              voiceText: '调试就是找出哪一步判断错了，把它改对。',
            },
          ],
          summary: '条件：如果遇到墙就转向；调试是找错并改正。',
        },
        quiz: [
          {
            id: 'c1-l4-q1',
            question: '斑斑正前方是墙，按「如果遇墙就右转」该怎么做？',
            hint: '条件触发了',
            type: 'choice',
            options: [
              { id: 'a', text: '继续向前撞上去', isCorrect: false },
              { id: 'b', text: '向右转', isCorrect: true },
              { id: 'c', text: '原地不动永远等着', isCorrect: false },
            ],
            correctAnswer: 'b',
            explanation: '条件成立：遇到墙 → 执行右转。',
            starReward: 2,
          },
          {
            id: 'c1-l4-q2',
            question: '想去右下角，指令写了 ➡️➡️⬇️，中间有墙挡在第二步右边。哪步有问题？',
            hint: '第二步会撞墙',
            type: 'debug',
            options: [
              { id: 'a', text: '第一步向右', isCorrect: false },
              { id: 'b', text: '第二步向右（该先向下）', isCorrect: true },
              { id: 'c', text: '第三步向下', isCorrect: false },
            ],
            correctAnswer: 'b',
            explanation: '第二步右边是墙，应先向下绕开。',
            starReward: 2,
          },
        ],
      },
    },
    {
      id: 'c1-l5',
      stageId: 'stage-coding-1',
      title: '收集再过关',
      type: 'teach',
      duration: 12,
      order: 5,
      content: {
        teach: {
          character: '小斑马斑斑',
          steps: [
            {
              title: '多个目标',
              content: '有时不但要到终点，还要先收集路上的星星。漏掉星星就不算过关。',
              voiceText: '有时不但要到终点，还要先收集路上的星星。漏掉星星就不算过关。',
            },
            {
              title: '规划顺序',
              content: '先想清楚：星星在哪、终点在哪，规划一条「都经过」的路线。',
              voiceText: '先想清楚：星星在哪、终点在哪，规划一条都经过的路线。',
            },
            {
              title: '函数思维',
              content: '如果「向右两步再向下」经常用，可以给它起名叫「小拐弯」，以后直接用——这就是函数封装的萌芽！',
              voiceText: '如果向右两步再向下经常用，可以给它起名叫小拐弯，以后直接用。这就是函数封装的萌芽！',
            },
          ],
          summary: '多目标：先收集再到达；常用动作可以打包命名。',
        },
        quiz: [
          {
            id: 'c1-l5-q1',
            question: '先收集 2 颗星星⭐，再走到胡萝卜！',
            hint: '别直奔终点，先把星星捡完',
            type: 'path',
            path: {
              rows: 3,
              cols: 4,
              cells: [
                [E, S, E, E],
                [E, W, E, S],
                [E, E, E, G],
              ],
              start: { row: 0, col: 0 },
              startDirection: 'right',
              solution: ['right', 'right', 'right', 'down', 'down'],
              palette: DIR,
              collectCount: 2,
            },
            explanation: '两条可行路线之一：先拿上面的星，绕开石头拿第二颗星，再到终点。',
            starReward: 3,
          },
          {
            id: 'c1-l5-q2',
            question: '把「右、右、下」打包成「小拐弯」。执行 2 次小拐弯，相当于几步？',
            hint: '每次 3 步',
            type: 'choice',
            options: [
              { id: 'a', text: '3 步', isCorrect: false },
              { id: 'b', text: '5 步', isCorrect: false },
              { id: 'c', text: '6 步', isCorrect: true },
            ],
            correctAnswer: 'c',
            explanation: '每次小拐弯 3 步，2 次共 6 步。',
            starReward: 2,
          },
        ],
      },
    },
  ],
}
