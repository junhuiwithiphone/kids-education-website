import type { Stage } from '../types/lesson'

/**
 * 思维启蒙 · 幼小衔接难度（斑马思维 S3+）
 * 先打牢 10 以内加减，再过渡到凑十 / 破十与 20 以内运算。
 */
export const stages: Stage[] = [
  // ════════════════════════════════════════════
  // 阶段 0：加减法入门（10 以内）
  // ════════════════════════════════════════════
  {
    id: 'stage0',
    moduleId: 'thinking',
    name: '加减法入门',
    icon: '🔢',
    description: '先把 10 以内加减学明白',
    color: 'from-rose-300 to-pink-400',
    lessons: [
      {
        id: 's0-l1',
        stageId: 'stage0',
        title: '加法是合起来',
        type: 'teach',
        duration: 10,
        order: 1,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '你好呀！',
                content: '今天从最基础开始：加法就是把两堆东西合在一起，数一数一共有多少。',
                voiceText: '你好呀！今天从最基础开始：加法就是把两堆东西合在一起，数一数一共有多少。',
                animation: 'wave',
              },
              {
                title: '小例子',
                content: '左边 2 颗草莓，右边 3 颗草莓，合起来写 2 + 3 = 5。加号表示「合起来」。',
                voiceText: '左边两颗草莓，右边三颗草莓，合起来写二加三等于五。加号表示合起来。',
              },
              {
                title: '换个说法',
                content: '也可以说「2 和 3 一共是 5」「2 加上 3 得 5」。意思一样。',
                voiceText: '也可以说二和三一共是五，二加上三得五。意思一样。',
              },
            ],
            summary: '加法：合起来，求一共有多少。',
          },
          quiz: [
            {
              id: 's0-l1-q1',
              question: '3 + 2 = ▢',
              hint: '合起来数一数',
              type: 'equation',
              equation: {
                terms: [3, '+', 2],
                answer: 5,
                keypad: [3, 4, 5, 6, 7],
              },
              explanation: '3 和 2 合起来是 5。',
              starReward: 1,
            },
            {
              id: 's0-l1-q2',
              question: '篮子里有 1 个苹果，又放进 4 个，一共几个？',
              hint: '1 + 4',
              type: 'choice',
              options: [
                { id: 'a', text: '4', isCorrect: false },
                { id: 'b', text: '5', isCorrect: true },
                { id: 'c', text: '6', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: '1 + 4 = 5。',
              starReward: 1,
            },
          ],
        },
      },
      {
        id: 's0-l2',
        stageId: 'stage0',
        title: '5 以内加法',
        type: 'teach',
        duration: 10,
        order: 2,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '手指帮手',
                content: '算 5 以内加法，可以伸出手指：先伸出第一个数，再一根一根加第二个数。',
                voiceText: '算五以内加法，可以伸出手指：先伸出第一个数，再一根一根加第二个数。',
              },
              {
                title: '凑成 5',
                content: '1 + 4、2 + 3、5 + 0 都合起来是 5。多练几组，反应会变快。',
                voiceText: '一加四、二加三、五加零，都合起来是五。多练几组，反应会变快。',
              },
              {
                title: '交换律小发现',
                content: '2 + 3 和 3 + 2 答案一样都是 5。加数换位置，和不变。',
                voiceText: '二加三和三加二答案一样都是五。加数换位置，和不变。',
              },
            ],
            summary: '5 以内加法要熟练；加数可交换。',
          },
          quiz: [
            {
              id: 's0-l2-q1',
              question: '2 + 3 = ▢',
              hint: '合起来',
              type: 'equation',
              equation: {
                terms: [2, '+', 3],
                answer: 5,
                keypad: [3, 4, 5, 6],
              },
              explanation: '2 + 3 = 5。',
              starReward: 1,
            },
            {
              id: 's0-l2-q2',
              question: '4 + 1 = ▢',
              hint: '再加 1',
              type: 'equation',
              equation: {
                terms: [4, '+', 1],
                answer: 5,
                keypad: [3, 4, 5, 6],
              },
              explanation: '4 + 1 = 5。',
              starReward: 1,
            },
            {
              id: 's0-l2-q3',
              question: '1 + 1 + 2 = ▢',
              hint: '先算前面',
              type: 'equation',
              equation: {
                terms: [1, '+', 1, '+', 2],
                answer: 4,
                keypad: [2, 3, 4, 5],
              },
              explanation: '1 + 1 = 2，再加 2 得 4。',
              starReward: 1,
            },
          ],
        },
      },
      {
        id: 's0-l3',
        stageId: 'stage0',
        title: '10 以内加法',
        type: 'teach',
        duration: 12,
        order: 3,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '走到 10',
                content: '现在把和扩大到 10。比如 6 + 3 = 9，7 + 2 = 9，4 + 5 = 9。',
                voiceText: '现在把和扩大到十。比如六加三等于九，七加二等于九，四加五等于九。',
              },
              {
                title: '凑成 10',
                content: '1 + 9、2 + 8、3 + 7、4 + 6、5 + 5 都合起来正好是 10。先记熟这些「好朋友」。',
                voiceText: '一加九、二加八、三加七、四加六、五加五，都合起来正好是十。先记熟这些好朋友。',
              },
              {
                title: '为后面铺路',
                content: '把 10 的组成记牢，后面学「凑十法」会轻松很多！',
                voiceText: '把十的组成记牢，后面学凑十法会轻松很多！',
              },
            ],
            summary: '熟练 10 以内加法，并记住组成 10 的数对。',
          },
          quiz: [
            {
              id: 's0-l3-q1',
              question: '6 + 3 = ▢',
              hint: '合起来',
              type: 'equation',
              equation: {
                terms: [6, '+', 3],
                answer: 9,
                keypad: [7, 8, 9, 10],
              },
              explanation: '6 + 3 = 9。',
              starReward: 1,
            },
            {
              id: 's0-l3-q2',
              question: '4 + 6 = ▢',
              hint: '它们是 10 的好朋友',
              type: 'equation',
              equation: {
                terms: [4, '+', 6],
                answer: 10,
                keypad: [8, 9, 10],
              },
              explanation: '4 和 6 合起来正好是 10。',
              starReward: 2,
            },
            {
              id: 's0-l3-q3',
              question: '哪一组合起来是 10？',
              hint: '找 10 的好朋友',
              type: 'choice',
              options: [
                { id: 'a', text: '3 + 6', isCorrect: false },
                { id: 'b', text: '2 + 8', isCorrect: true },
                { id: 'c', text: '5 + 4', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: '2 + 8 = 10。',
              starReward: 2,
            },
          ],
        },
      },
      {
        id: 's0-l4',
        stageId: 'stage0',
        title: '减法是拿走',
        type: 'teach',
        duration: 10,
        order: 4,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '什么是减法',
                content: '减法表示从一堆里拿走一些，看还剩多少。减号「−」表示「拿走」。',
                voiceText: '减法表示从一堆里拿走一些，看还剩多少。减号表示拿走。',
              },
              {
                title: '小例子',
                content: '有 5 颗糖，吃掉 2 颗，还剩 3 颗，写 5 − 2 = 3。',
                voiceText: '有五颗糖，吃掉两颗，还剩三颗，写五减二等于三。',
              },
              {
                title: '和加法一家人',
                content: '因为 2 + 3 = 5，所以 5 − 2 = 3，5 − 3 = 2。加减可以互相验算。',
                voiceText: '因为二加三等于五，所以五减二等于三，五减三等于二。加减可以互相验算。',
              },
            ],
            summary: '减法：拿走，求还剩多少；可用加法验算。',
          },
          quiz: [
            {
              id: 's0-l4-q1',
              question: '5 − 2 = ▢',
              hint: '拿走 2 还剩几',
              type: 'equation',
              equation: {
                terms: [5, '−', 2],
                answer: 3,
                keypad: [1, 2, 3, 4],
              },
              explanation: '5 拿走 2 还剩 3。',
              starReward: 1,
            },
            {
              id: 's0-l4-q2',
              question: '有 4 只鸟，飞走 1 只，还剩几只？',
              hint: '4 − 1',
              type: 'choice',
              options: [
                { id: 'a', text: '2', isCorrect: false },
                { id: 'b', text: '3', isCorrect: true },
                { id: 'c', text: '5', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: '4 − 1 = 3。',
              starReward: 1,
            },
          ],
        },
      },
      {
        id: 's0-l5',
        stageId: 'stage0',
        title: '10 以内减法',
        type: 'teach',
        duration: 12,
        order: 5,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '从 10 往回减',
                content: '10 − 3 = 7，10 − 6 = 4。想「10 的好朋友」：拿走几，就剩组成 10 的另一个数。',
                voiceText: '十减三等于七，十减六等于四。想十的好朋友：拿走几，就剩组成十的另一个数。',
              },
              {
                title: '一般减法',
                content: '8 − 3 = 5，9 − 4 = 5，7 − 5 = 2。可以用手指，也可以想加法反过来。',
                voiceText: '八减三等于五，九减四等于五，七减五等于二。可以用手指，也可以想加法反过来。',
              },
              {
                title: '准备升级',
                content: '10 以内加减练熟后，下一阶段就会学「凑十法」，去算超过 10 的加法啦！',
                voiceText: '十以内加减练熟后，下一阶段就会学凑十法，去算超过十的加法啦！',
              },
            ],
            summary: '熟练 10 以内减法，为凑十法做准备。',
          },
          quiz: [
            {
              id: 's0-l5-q1',
              question: '10 − 4 = ▢',
              hint: '4 的好朋友是 6',
              type: 'equation',
              equation: {
                terms: [10, '−', 4],
                answer: 6,
                keypad: [4, 5, 6, 7],
              },
              explanation: '10 − 4 = 6，因为 4 + 6 = 10。',
              starReward: 2,
            },
            {
              id: 's0-l5-q2',
              question: '9 − 5 = ▢',
              hint: '想想 5 + ▢ = 9',
              type: 'equation',
              equation: {
                terms: [9, '−', 5],
                answer: 4,
                keypad: [3, 4, 5, 6],
              },
              explanation: '9 − 5 = 4。',
              starReward: 1,
            },
            {
              id: 's0-l5-q3',
              question: '8 − 3 − 2 = ▢',
              hint: '从左到右',
              type: 'equation',
              equation: {
                terms: [8, '−', 3, '−', 2],
                answer: 3,
                keypad: [2, 3, 4, 5],
              },
              explanation: '8 − 3 = 5，再 5 − 2 = 3。',
              starReward: 2,
            },
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════
  // 阶段 1：20 以内加减法（凑十 / 破十）
  // ════════════════════════════════════════════
  {
    id: 'stage1',
    moduleId: 'thinking',
    name: '加减法高手',
    icon: '🧮',
    description: '凑十、破十、连加连减',
    color: 'from-pink-400 to-purple-400',
    lessons: [
      {
        id: 's1-l1',
        stageId: 'stage1',
        title: '凑十法',
        type: 'teach',
        duration: 12,
        order: 1,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '你好呀！',
                content: '10 以内加减你已经会了！今天学一个超厉害的秘诀——凑十法，去算超过 10 的加法。',
                voiceText: '十以内加减你已经会了！今天学一个超厉害的秘诀，凑十法，去算超过十的加法。',
                animation: 'wave',
              },
              {
                title: '什么是凑十',
                content: '算 8 + 5 时，先从 5 里拿出 2，和 8 凑成 10，剩下 3，所以 8 + 5 = 13。',
                voiceText: '算八加五时，先从五里拿出二，和八凑成十，剩下三，所以八加五等于十三。',
              },
              {
                title: '再练一次',
                content: '9 + 6：先从 6 拿出 1 给 9，凑成 10，剩下 5，答案是 15。',
                voiceText: '九加六：先从六拿出一给九，凑成十，剩下五，答案是十五。',
              },
              {
                title: '记住口诀',
                content: '看见靠近 10 的数，就想办法凑成 10，算起来飞快！',
                voiceText: '看见靠近十的数，就想办法凑成十，算起来飞快！',
              },
            ],
            summary: '凑十法：先凑成 10，再加剩下的数。',
          },
          quiz: [
            {
              id: 's1-l1-q1',
              question: '用凑十法算：8 + 7 = ▢',
              hint: '先从 7 拿出 2，和 8 凑成 10',
              type: 'equation',
              equation: {
                terms: [8, '+', 7],
                answer: 15,
                equals: 15,
                keypad: [12, 13, 14, 15, 16, 17],
              },
              explanation: '8 凑十需要 2，7 剩 5，10 + 5 = 15！',
              starReward: 2,
            },
            {
              id: 's1-l1-q2',
              question: '9 + 4 = ▢，空格里填几？',
              hint: '9 再加 1 就是 10',
              type: 'equation',
              equation: {
                terms: [9, '+', null],
                answer: 4,
                equals: 13,
                keypad: [2, 3, 4, 5, 6, 7],
              },
              explanation: '9 + 1 = 10，还剩 3，一共 13，所以空格是 4。',
              starReward: 2,
            },
            {
              id: 's1-l1-q3',
              question: '7 + 5 用凑十法，答案是？',
              hint: '7 凑十要 3',
              type: 'choice',
              options: [
                { id: 'a', text: '11', isCorrect: false },
                { id: 'b', text: '12', isCorrect: true },
                { id: 'c', text: '13', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: '7 + 3 = 10，5 剩 2，10 + 2 = 12。',
              starReward: 1,
            },
          ],
        },
      },
      {
        id: 's1-l2',
        stageId: 'stage1',
        title: '破十法',
        type: 'teach',
        duration: 12,
        order: 2,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '减法也能巧算',
                content: '15 − 7 怎么算？先把 15 破成 10 和 5：10 − 7 = 3，再加回 5，得 8。',
                voiceText: '十五减七怎么算？先把十五破成十和五：十减七等于三，再加回五，得八。',
              },
              {
                title: '再看一例',
                content: '13 − 6：10 − 6 = 4，再加剩下的 3，答案是 7。',
                voiceText: '十三减六：十减六等于四，再加剩下的三，答案是七。',
              },
              {
                title: '什么时候用',
                content: '被减数大于 10、减数比较大时，破十法特别好用！',
                voiceText: '被减数大于十、减数比较大时，破十法特别好用！',
              },
            ],
            summary: '破十法：先算 10 减几，再加个位剩下的。',
          },
          quiz: [
            {
              id: 's1-l2-q1',
              question: '用破十法：14 − 8 = ▢',
              hint: '先算 10 − 8 = 2，再加 4',
              type: 'equation',
              equation: {
                terms: [14, '−', 8],
                answer: 6,
                equals: 6,
                keypad: [4, 5, 6, 7, 8, 9],
              },
              explanation: '10 − 8 = 2，加上个位的 4，得 6。',
              starReward: 2,
            },
            {
              id: 's1-l2-q2',
              question: '16 − ▢ = 9，空格是几？',
              hint: '16 减几等于 9',
              type: 'equation',
              equation: {
                terms: [16, '−', null],
                answer: 7,
                equals: 9,
                keypad: [5, 6, 7, 8, 9],
              },
              explanation: '16 − 7 = 9，用破十：10 − 7 = 3，再加 6 得 9。',
              starReward: 2,
            },
          ],
        },
      },
      {
        id: 's1-l3',
        stageId: 'stage1',
        title: '连加连减',
        type: 'teach',
        duration: 12,
        order: 3,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '一串算式',
                content: '3 + 5 + 4 可以先算 3 + 5 = 8，再 8 + 4 = 12。从左往右一步一步来。',
                voiceText: '三加五加四，可以先算三加五等于八，再八加四等于十二。从左往右一步一步来。',
              },
              {
                title: '连减也一样',
                content: '18 − 5 − 3：先 18 − 5 = 13，再 13 − 3 = 10。',
                voiceText: '十八减五减三：先十八减五等于十三，再十三减三等于十。',
              },
              {
                title: '小技巧',
                content: '连加时可以先找能凑十的两个数，算得更快！',
                voiceText: '连加时可以先找能凑十的两个数，算得更快！',
              },
            ],
            summary: '连加连减从左到右算；连加可先凑十。',
          },
          quiz: [
            {
              id: 's1-l3-q1',
              question: '6 + 4 + 7 = ▢',
              hint: '6 + 4 正好凑十',
              type: 'equation',
              equation: {
                terms: [6, '+', 4, '+', 7],
                answer: 17,
                equals: 17,
                keypad: [15, 16, 17, 18, 19],
              },
              explanation: '6 + 4 = 10，10 + 7 = 17。',
              starReward: 2,
            },
            {
              id: 's1-l3-q2',
              question: '15 − 4 − 6 = ▢',
              hint: '先减 4，再减 6',
              type: 'equation',
              equation: {
                terms: [15, '−', 4, '−', 6],
                answer: 5,
                equals: 5,
                keypad: [3, 4, 5, 6, 7],
              },
              explanation: '15 − 4 = 11，11 − 6 = 5。',
              starReward: 2,
            },
          ],
        },
      },
      {
        id: 's1-l4',
        stageId: 'stage1',
        title: '加减混合',
        type: 'teach',
        duration: 12,
        order: 4,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '加加减减',
                content: '8 + 7 − 5：先 8 + 7 = 15，再 15 − 5 = 10。仍按从左到右。',
                voiceText: '八加七减五：先八加七等于十五，再十五减五等于十。仍按从左到右。',
              },
              {
                title: '生活里也有',
                content: '篮子里有 12 个苹果，又放进 3 个，再吃掉 4 个，还剩几个？',
                voiceText: '篮子里有十二个苹果，又放进三个，再吃掉四个，还剩几个？',
              },
              {
                title: '列式',
                content: '12 + 3 − 4 = 11。先加后减，一步一步清清楚楚。',
                voiceText: '十二加三减四等于十一。先加后减，一步一步清清楚楚。',
              },
            ],
            summary: '加减混合也是从左到右，先算前面的。',
          },
          quiz: [
            {
              id: 's1-l4-q1',
              question: '9 + 6 − 8 = ▢',
              hint: '先算 9 + 6',
              type: 'equation',
              equation: {
                terms: [9, '+', 6, '−', 8],
                answer: 7,
                equals: 7,
                keypad: [5, 6, 7, 8, 9],
              },
              explanation: '9 + 6 = 15，15 − 8 = 7。',
              starReward: 2,
            },
            {
              id: 's1-l4-q2',
              question: '有 10 颗糖，吃了 3 颗，又得到 5 颗，现在有几颗？',
              hint: '10 − 3 + 5',
              type: 'choice',
              options: [
                { id: 'a', text: '8', isCorrect: false },
                { id: 'b', text: '12', isCorrect: true },
                { id: 'c', text: '15', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: '10 − 3 = 7，7 + 5 = 12。',
              starReward: 2,
            },
          ],
        },
      },
      {
        id: 's1-l5',
        stageId: 'stage1',
        title: '加减法闯关',
        type: 'quiz',
        duration: 10,
        order: 5,
        content: {
          review: ['凑十法', '破十法', '连加连减', '加减混合'],
          quiz: [
            {
              id: 's1-l5-q1',
              question: '8 + 9 = ▢',
              hint: '凑十：8 + 2 = 10',
              type: 'equation',
              equation: {
                terms: [8, '+', 9],
                answer: 17,
                equals: 17,
                keypad: [15, 16, 17, 18],
              },
              explanation: '8 + 2 = 10，9 剩 7，得 17。',
              starReward: 2,
            },
            {
              id: 's1-l5-q2',
              question: '17 − 9 = ▢',
              hint: '破十法试试',
              type: 'equation',
              equation: {
                terms: [17, '−', 9],
                answer: 8,
                equals: 8,
                keypad: [6, 7, 8, 9],
              },
              explanation: '10 − 9 = 1，再加 7 得 8。',
              starReward: 2,
            },
            {
              id: 's1-l5-q3',
              question: '5 + 8 − 6 = ▢',
              hint: '从左到右',
              type: 'equation',
              equation: {
                terms: [5, '+', 8, '−', 6],
                answer: 7,
                equals: 7,
                keypad: [5, 6, 7, 8, 9],
              },
              explanation: '5 + 8 = 13，13 − 6 = 7。',
              starReward: 2,
            },
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════
  // 阶段 2：逆向思维
  // ════════════════════════════════════════════
  {
    id: 'stage2',
    moduleId: 'thinking',
    name: '逆向小侦探',
    icon: '🔍',
    description: '已知结果求未知数',
    color: 'from-violet-400 to-fuchsia-400',
    lessons: [
      {
        id: 's2-l1',
        stageId: 'stage2',
        title: '求加数',
        type: 'teach',
        duration: 12,
        order: 1,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '反过来想',
                content: '▢ + 5 = 12，问空格是几？可以想：12 减 5 就是空格！',
                voiceText: '空加五等于十二，问空格是几？可以想：十二减五就是空格！',
              },
              {
                title: '验算',
                content: '12 − 5 = 7，所以 ▢ = 7。验算：7 + 5 = 12，对啦！',
                voiceText: '十二减五等于七，所以空格是七。验算：七加五等于十二，对啦！',
              },
              {
                title: '小口诀',
                content: '已知一个加数和总和，用减法就能求出另一个加数。',
                voiceText: '已知一个加数和总和，用减法就能求出另一个加数。',
              },
            ],
            summary: '求加数：总和减去已知加数。',
          },
          quiz: [
            {
              id: 's2-l1-q1',
              question: '▢ + 5 = 12，空格是几？',
              hint: '用 12 减 5',
              type: 'equation',
              equation: {
                terms: [null, '+', 5],
                answer: 7,
                equals: 12,
                keypad: [5, 6, 7, 8, 9],
              },
              explanation: '12 − 5 = 7，所以空格是 7。',
              starReward: 2,
            },
            {
              id: 's2-l1-q2',
              question: '8 + ▢ = 15',
              hint: '15 − 8',
              type: 'equation',
              equation: {
                terms: [8, '+', null],
                answer: 7,
                equals: 15,
                keypad: [5, 6, 7, 8, 9],
              },
              explanation: '15 − 8 = 7。',
              starReward: 2,
            },
          ],
        },
      },
      {
        id: 's2-l2',
        stageId: 'stage2',
        title: '求被减数',
        type: 'teach',
        duration: 12,
        order: 2,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '神秘的被减数',
                content: '▢ − 6 = 9。空格里原来有多少？想一想：拿走 6 还剩 9，原来就是 9 + 6。',
                voiceText: '空减六等于九。空格里原来有多少？拿走六还剩九，原来就是九加六。',
              },
              {
                title: '算出来',
                content: '9 + 6 = 15，所以 ▢ = 15。验算：15 − 6 = 9。',
                voiceText: '九加六等于十五，所以空格是十五。验算：十五减六等于九。',
              },
            ],
            summary: '求被减数：差 + 减数。',
          },
          quiz: [
            {
              id: 's2-l2-q1',
              question: '▢ − 6 = 9，空格是几？',
              hint: '差加减数',
              type: 'equation',
              equation: {
                terms: [null, '−', 6],
                answer: 15,
                equals: 9,
                keypad: [12, 13, 14, 15, 16],
              },
              explanation: '9 + 6 = 15。',
              starReward: 2,
            },
            {
              id: 's2-l2-q2',
              question: '▢ − 8 = 7',
              hint: '7 + 8',
              type: 'equation',
              equation: {
                terms: [null, '−', 8],
                answer: 15,
                equals: 7,
                keypad: [13, 14, 15, 16, 17],
              },
              explanation: '7 + 8 = 15。',
              starReward: 2,
            },
          ],
        },
      },
      {
        id: 's2-l3',
        stageId: 'stage2',
        title: '求减数',
        type: 'teach',
        duration: 12,
        order: 3,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '拿走了多少',
                content: '15 − ▢ = 7。从 15 变成 7，拿走了多少？用 15 − 7 就能求出。',
                voiceText: '十五减空等于七。从十五变成七，拿走了多少？用十五减七就能求出。',
              },
              {
                title: '答案',
                content: '15 − 7 = 8，所以空格是 8。验算：15 − 8 = 7。',
                voiceText: '十五减七等于八，所以空格是八。验算：十五减八等于七。',
              },
            ],
            summary: '求减数：被减数 − 差。',
          },
          quiz: [
            {
              id: 's2-l3-q1',
              question: '15 − ▢ = 7',
              hint: '15 减 7',
              type: 'equation',
              equation: {
                terms: [15, '−', null],
                answer: 8,
                equals: 7,
                keypad: [6, 7, 8, 9],
              },
              explanation: '15 − 7 = 8。',
              starReward: 2,
            },
            {
              id: 's2-l3-q2',
              question: '20 − ▢ = 12',
              hint: '20 减 12',
              type: 'equation',
              equation: {
                terms: [20, '−', null],
                answer: 8,
                equals: 12,
                keypad: [6, 7, 8, 9, 10],
              },
              explanation: '20 − 12 = 8。',
              starReward: 2,
            },
          ],
        },
      },
      {
        id: 's2-l4',
        stageId: 'stage2',
        title: '等量代换',
        type: 'teach',
        duration: 12,
        order: 4,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '谁和谁一样重',
                content: '如果 🍎 = 2 颗 ⭐，🍌 = 3 颗 ⭐，那 🍎 + 🍌 等于几颗 ⭐？',
                voiceText: '如果一个苹果等于两颗星星，一根香蕉等于三颗星星，那苹果加香蕉等于几颗星星？',
              },
              {
                title: '代换',
                content: '把水果都换成星星：2 + 3 = 5 颗 ⭐。这就是等量代换！',
                voiceText: '把水果都换成星星：二加三等于五颗星星。这就是等量代换！',
              },
            ],
            summary: '用相同单位替换，就能比较或计算。',
          },
          quiz: [
            {
              id: 's2-l4-q1',
              question: '🍎=2⭐，🍌=3⭐，🍎+🍌=几颗⭐？',
              hint: '2 + 3',
              type: 'choice',
              options: [
                { id: 'a', text: '4 ⭐', isCorrect: false },
                { id: 'b', text: '5 ⭐', isCorrect: true },
                { id: 'c', text: '6 ⭐', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: '2 + 3 = 5 颗星星。',
              starReward: 2,
            },
            {
              id: 's2-l4-q2',
              question: '🔺=3，两个🔺等于几个⬜？（⬜=2）',
              hint: '先算两个三角：3+3=6，再看几个方块',
              type: 'choice',
              options: [
                { id: 'a', text: '2 个⬜', isCorrect: false },
                { id: 'b', text: '3 个⬜', isCorrect: true },
                { id: 'c', text: '4 个⬜', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: '两个🔺=6，每个⬜=2，6÷2=3 个⬜。',
              starReward: 2,
            },
          ],
        },
      },
      {
        id: 's2-l5',
        stageId: 'stage2',
        title: '逆向闯关',
        type: 'quiz',
        duration: 10,
        order: 5,
        content: {
          review: ['求加数', '求被减数', '求减数', '等量代换'],
          quiz: [
            {
              id: 's2-l5-q1',
              question: '▢ + 9 = 17',
              hint: '17 − 9',
              type: 'equation',
              equation: {
                terms: [null, '+', 9],
                answer: 8,
                equals: 17,
                keypad: [6, 7, 8, 9],
              },
              explanation: '17 − 9 = 8。',
              starReward: 2,
            },
            {
              id: 's2-l5-q2',
              question: '▢ − 5 = 11',
              hint: '11 + 5',
              type: 'equation',
              equation: {
                terms: [null, '−', 5],
                answer: 16,
                equals: 11,
                keypad: [14, 15, 16, 17],
              },
              explanation: '11 + 5 = 16。',
              starReward: 2,
            },
            {
              id: 's2-l5-q3',
              question: '18 − ▢ = 9',
              hint: '18 − 9',
              type: 'equation',
              equation: {
                terms: [18, '−', null],
                answer: 9,
                equals: 9,
                keypad: [7, 8, 9, 10],
              },
              explanation: '18 − 9 = 9。',
              starReward: 2,
            },
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════
  // 阶段 3：图形空间与规律
  // ════════════════════════════════════════════
  {
    id: 'stage3',
    moduleId: 'thinking',
    name: '图形与规律',
    icon: '🔷',
    description: '数图形、对称、数列规律',
    color: 'from-blue-400 to-indigo-400',
    lessons: [
      {
        id: 's3-l1',
        stageId: 'stage3',
        title: '数一数图形',
        type: 'teach',
        duration: 12,
        order: 1,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '藏起来的三角形',
                content: '大正方形被对角线分成 2 个大三角，还会藏着小三角。要仔细数，别漏掉！',
                voiceText: '大正方形被对角线分成两个大三角，还会藏着小三角。要仔细数，别漏掉！',
              },
              {
                title: '分类数',
                content: '先数最小的，再数由几个小块拼成的，最后数最大的。分类数不容易漏。',
                voiceText: '先数最小的，再数由几个小块拼成的，最后数最大的。分类数不容易漏。',
              },
            ],
            summary: '数图形要分类：小的、中的、大的分别数。',
          },
          quiz: [
            {
              id: 's3-l1-q1',
              question: '一个大正方形用两条对角线分成 4 个小三角，一共有几个三角形？',
              hint: '4 个小的 + 由相邻两个拼成的',
              type: 'choice',
              options: [
                { id: 'a', text: '4 个', isCorrect: false },
                { id: 'b', text: '6 个', isCorrect: false },
                { id: 'c', text: '8 个', isCorrect: true },
              ],
              correctAnswer: 'c',
              explanation: '4 个最小三角 + 4 个由两个小三角拼成的大三角 = 8。',
              starReward: 2,
            },
            {
              id: 's3-l1-q2',
              question: '下图想象：3 个并排正方形，一共有几个正方形？',
              hint: '3 个小的 + 相邻 2 个拼成的 + 最大的',
              type: 'choice',
              options: [
                { id: 'a', text: '3 个', isCorrect: false },
                { id: 'b', text: '5 个', isCorrect: false },
                { id: 'c', text: '6 个', isCorrect: true },
              ],
              correctAnswer: 'c',
              explanation: '3 个小正方形 + 2 个「两格拼成」+ 1 个「三格拼成」= 6。',
              starReward: 2,
            },
          ],
        },
      },
      {
        id: 's3-l2',
        stageId: 'stage3',
        title: '对称与镜像',
        type: 'teach',
        duration: 12,
        order: 2,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '对折一样',
                content: '如果把图形对折后两边完全重合，它就有对称轴。蝴蝶、人脸常常是左右对称的。',
                voiceText: '如果把图形对折后两边完全重合，它就有对称轴。蝴蝶、人脸常常是左右对称的。',
              },
              {
                title: '镜像翻转',
                content: '镜子里的左手会变成右手方向。想对称图案时，要想「翻过去」而不是平移。',
                voiceText: '镜子里的左手会变成右手方向。想对称图案时，要想翻过去，而不是平移。',
              },
            ],
            summary: '对称轴两边像镜子一样相反。',
          },
          quiz: [
            {
              id: 's3-l2-q1',
              question: '左边是 ◢，沿竖线对称后右边应该是？',
              hint: '左右翻转',
              type: 'choice',
              options: [
                { id: 'a', text: '◢（同向）', isCorrect: false },
                { id: 'b', text: '◣（镜像）', isCorrect: true },
                { id: 'c', text: '▲（朝上）', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: '左右对称要把图形左右翻转，◢ 的镜像是 ◣。',
              starReward: 2,
            },
            {
              id: 's3-l2-q2',
              question: '哪个字母左右对折后几乎重合？',
              hint: '找中间能对折的',
              type: 'choice',
              options: [
                { id: 'a', text: 'F', isCorrect: false },
                { id: 'b', text: 'A', isCorrect: true },
                { id: 'c', text: 'P', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: 'A 左右对称；F 和 P 只有一边有笔画。',
              starReward: 1,
            },
          ],
        },
      },
      {
        id: 's3-l3',
        stageId: 'stage3',
        title: '数列规律',
        type: 'teach',
        duration: 12,
        order: 3,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '找变化',
                content: '2、5、8、11… 每次加 3，这叫等差规律。下一个是 11 + 3 = 14。',
                voiceText: '二、五、八、十一，每次加三，这叫等差规律。下一个是十一加三等于十四。',
              },
              {
                title: '间隔规律',
                content: '红、蓝、红、蓝… 间隔出现。有时是两组轮流：▲●▲●。',
                voiceText: '红、蓝、红、蓝，间隔出现。有时是两组轮流：三角圆三角圆。',
              },
              {
                title: '双重规律',
                content: '形状和颜色可能各自变化，要两个一起看！',
                voiceText: '形状和颜色可能各自变化，要两个一起看！',
              },
            ],
            summary: '找规律：看每次怎么变，再往后推。',
          },
          quiz: [
            {
              id: 's3-l3-q1',
              question: '3、6、9、12、▢ 下一个是？',
              hint: '每次加 3',
              type: 'equation',
              equation: {
                terms: [null],
                answer: 15,
                equals: 15,
                keypad: [13, 14, 15, 16, 18],
              },
              explanation: '每次 +3，12 + 3 = 15。',
              starReward: 2,
            },
            {
              id: 's3-l3-q2',
              question: '2、4、7、11、▢？（差是 2、3、4…）',
              hint: '差每次多 1',
              type: 'choice',
              options: [
                { id: 'a', text: '14', isCorrect: false },
                { id: 'b', text: '15', isCorrect: false },
                { id: 'c', text: '16', isCorrect: true },
              ],
              correctAnswer: 'c',
              explanation: '差为 2、3、4、5，所以 11 + 5 = 16。',
              starReward: 2,
            },
            {
              id: 's3-l3-q3',
              question: '▲●▲●▲▢ 下一个是？',
              hint: '三角和圆交替',
              type: 'choice',
              options: [
                { id: 'a', text: '▲', isCorrect: false },
                { id: 'b', text: '●', isCorrect: true },
                { id: 'c', text: '■', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: '▲● 交替，▲ 后面是 ●。',
              starReward: 1,
            },
          ],
        },
      },
      {
        id: 's3-l4',
        stageId: 'stage3',
        title: '左右相对性',
        type: 'teach',
        duration: 10,
        order: 4,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '对面的左右',
                content: '你面向斑斑时，你的右手那边，对斑斑来说是它的左边。面对面时左右是反的！',
                voiceText: '你面向斑斑时，你的右手那边，对斑斑来说是它的左边。面对面时左右是反的！',
              },
              {
                title: '站在对方位置想',
                content: '判断对面人的左右，要想象自己转到他的朝向再看。',
                voiceText: '判断对面人的左右，要想象自己转到他的朝向再看。',
              },
            ],
            summary: '面对面时，对方的左就是你的右。',
          },
          quiz: [
            {
              id: 's3-l4-q1',
              question: '斑斑面向你，它举起的是它的右手。在你看来是哪边？',
              hint: '面对面左右相反',
              type: 'choice',
              options: [
                { id: 'a', text: '你的右边', isCorrect: false },
                { id: 'b', text: '你的左边', isCorrect: true },
                { id: 'c', text: '正中间', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: '面对面时，对方的右手出现在你的左边。',
              starReward: 2,
            },
          ],
        },
      },
      {
        id: 's3-l5',
        stageId: 'stage3',
        title: '图形规律闯关',
        type: 'quiz',
        duration: 10,
        order: 5,
        content: {
          review: ['数图形', '对称', '数列规律', '左右相对'],
          quiz: [
            {
              id: 's3-l5-q1',
              question: '5、8、11、14、▢',
              hint: '每次 +3',
              type: 'equation',
              equation: {
                terms: [null],
                answer: 17,
                equals: 17,
                keypad: [15, 16, 17, 18],
              },
              explanation: '14 + 3 = 17。',
              starReward: 2,
            },
            {
              id: 's3-l5-q2',
              question: '哪个图形左右对称？',
              hint: '对折能重合',
              type: 'choice',
              options: [
                { id: 'a', text: '🦶 脚印（一侧）', isCorrect: false },
                { id: 'b', text: '🦋 蝴蝶', isCorrect: true },
                { id: 'c', text: '🎧 单边耳机', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: '蝴蝶翅膀左右对称。',
              starReward: 1,
            },
          ],
        },
      },
    ],
  },

  // ════════════════════════════════════════════
  // 阶段 4：逻辑推理
  // ════════════════════════════════════════════
  {
    id: 'stage4',
    moduleId: 'thinking',
    name: '逻辑推理官',
    icon: '🧩',
    description: '数独、传递排序、应用题',
    color: 'from-rose-400 to-orange-400',
    lessons: [
      {
        id: 's4-l1',
        stageId: 'stage4',
        title: '4×4 数独入门',
        type: 'teach',
        duration: 15,
        order: 1,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '数独规则',
                content: '4×4 格子里，每行、每列、每个 2×2 小宫，都要有 1、2、3、4 各一次，不能重复。',
                voiceText: '四乘四格子里，每行、每列、每个二乘二小宫，都要有一、二、三、四各一次，不能重复。',
              },
              {
                title: '怎么想',
                content: '看某一行已经有了哪些数，缺的那个就填进去。宫和列也要一起检查。',
                voiceText: '看某一行已经有了哪些数，缺的那个就填进去。宫和列也要一起检查。',
              },
            ],
            summary: '行、列、宫都不能有重复数字。',
          },
          quiz: [
            {
              id: 's4-l1-q1',
              question: '把数独填完整（点空格再点数字）',
              hint: '每行每列每宫 1-4 各一次',
              type: 'sudoku',
              sudoku: {
                size: 4,
                puzzle: [
                  [1, 0, 0, 4],
                  [0, 4, 1, 0],
                  [0, 1, 4, 0],
                  [4, 0, 0, 1],
                ],
                solution: [
                  [1, 2, 3, 4],
                  [3, 4, 1, 2],
                  [2, 1, 4, 3],
                  [4, 3, 2, 1],
                ],
              },
              explanation: '按行、列、宫不重复填完就对啦！',
              starReward: 3,
            },
          ],
        },
      },
      {
        id: 's4-l2',
        stageId: 'stage4',
        title: '传递性排序',
        type: 'teach',
        duration: 12,
        order: 2,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '比高矮',
                content: '如果小明比小红高，小红比小华高，那小明一定比小华高。这叫传递性。',
                voiceText: '如果小明比小红高，小红比小华高，那小明一定比小华高。这叫传递性。',
              },
              {
                title: '排顺序',
                content: '把已知关系连成一条链，就能排出从高到矮（或从大到小）的完整顺序。',
                voiceText: '把已知关系连成一条链，就能排出从高到矮，或从大到小的完整顺序。',
              },
            ],
            summary: 'A>B 且 B>C，则 A>C。',
          },
          quiz: [
            {
              id: 's4-l2-q1',
              question: '猫比狗轻，狗比猪轻。谁最重？',
              hint: '串起来想',
              type: 'choice',
              options: [
                { id: 'a', text: '猫', isCorrect: false },
                { id: 'b', text: '狗', isCorrect: false },
                { id: 'c', text: '猪', isCorrect: true },
              ],
              correctAnswer: 'c',
              explanation: '猫 < 狗 < 猪，猪最重。',
              starReward: 2,
            },
            {
              id: 's4-l2-q2',
              question: '红花比黄花开得早，黄花比蓝花早。最晚开的是？',
              hint: '最早→中间→最晚',
              type: 'choice',
              options: [
                { id: 'a', text: '红花', isCorrect: false },
                { id: 'b', text: '黄花', isCorrect: false },
                { id: 'c', text: '蓝花', isCorrect: true },
              ],
              correctAnswer: 'c',
              explanation: '红 → 黄 → 蓝，蓝花最晚。',
              starReward: 2,
            },
          ],
        },
      },
      {
        id: 's4-l3',
        stageId: 'stage4',
        title: '图文应用题',
        type: 'teach',
        duration: 12,
        order: 3,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '读题找关键',
                content: '应用题先找出：已知什么、问什么。多余的信息可以先画掉。',
                voiceText: '应用题先找出：已知什么、问什么。多余的信息可以先画掉。',
              },
              {
                title: '列式计算',
                content: '停车场有 8 辆车，又来了 5 辆，开走 3 辆。问现在有几辆？列式：8 + 5 − 3。',
                voiceText: '停车场有八辆车，又来了五辆，开走三辆。问现在有几辆？列式：八加五减三。',
              },
            ],
            summary: '抓关键信息 → 列式 → 计算。',
          },
          quiz: [
            {
              id: 's4-l3-q1',
              question: '书架有 12 本书，拿走 4 本，又放回 7 本。现在几本？',
              hint: '12 − 4 + 7',
              type: 'equation',
              equation: {
                terms: [12, '−', 4, '+', 7],
                answer: 15,
                equals: 15,
                keypad: [13, 14, 15, 16],
              },
              explanation: '12 − 4 = 8，8 + 7 = 15。',
              starReward: 2,
            },
            {
              id: 's4-l3-q2',
              question: '小明有 15 颗糖，给弟弟 6 颗，妈妈又给了 4 颗。他现在有几颗？',
              hint: '15 − 6 + 4',
              type: 'choice',
              options: [
                { id: 'a', text: '11', isCorrect: false },
                { id: 'b', text: '13', isCorrect: true },
                { id: 'c', text: '19', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: '15 − 6 = 9，9 + 4 = 13。',
              starReward: 2,
            },
          ],
        },
      },
      {
        id: 's4-l4',
        stageId: 'stage4',
        title: '多余条件',
        type: 'teach',
        duration: 10,
        order: 4,
        content: {
          teach: {
            character: '小斑马斑斑',
            steps: [
              {
                title: '不是每个数都有用',
                content: '题目里有时会多写一些无关信息，用来考你能不能抓住真正有用的条件。',
                voiceText: '题目里有时会多写一些无关信息，用来考你能不能抓住真正有用的条件。',
              },
              {
                title: '例子',
                content: '「小红 5 岁，有 8 支铅笔，又买了 3 支。现在几支？」年龄和算铅笔无关！',
                voiceText: '小红五岁，有八支铅笔，又买了三支。现在几支？年龄和算铅笔无关！',
              },
            ],
            summary: '先判断哪些数真正用得上。',
          },
          quiz: [
            {
              id: 's4-l4-q1',
              question: '动物园有 6 只熊猫、3 只大象。熊猫吃了 2 根竹子。问还剩几只熊猫？',
              hint: '吃竹子不改变熊猫只数',
              type: 'choice',
              options: [
                { id: 'a', text: '4 只', isCorrect: false },
                { id: 'b', text: '6 只', isCorrect: true },
                { id: 'c', text: '3 只', isCorrect: false },
              ],
              correctAnswer: 'b',
              explanation: '大象和竹子都是多余信息，熊猫还是 6 只。',
              starReward: 2,
            },
            {
              id: 's4-l4-q2',
              question: '桌上 10 个杯子，其中 4 个蓝色；又拿来 5 个杯子。现在共几个杯子？',
              hint: '颜色可能用不上',
              type: 'equation',
              equation: {
                terms: [10, '+', 5],
                answer: 15,
                equals: 15,
                keypad: [9, 14, 15, 19],
              },
              explanation: '「4 个蓝色」是多余条件，10 + 5 = 15。',
              starReward: 2,
            },
          ],
        },
      },
      {
        id: 's4-l5',
        stageId: 'stage4',
        title: '终极逻辑挑战',
        type: 'quiz',
        duration: 12,
        order: 5,
        content: {
          review: ['数独', '传递性', '应用题', '多余条件'],
          quiz: [
            {
              id: 's4-l5-q1',
              question: '完成这道 4×4 数独',
              hint: '行、列、宫不重复',
              type: 'sudoku',
              sudoku: {
                size: 4,
                puzzle: [
                  [0, 3, 4, 0],
                  [4, 0, 0, 2],
                  [1, 0, 0, 3],
                  [0, 2, 1, 0],
                ],
                solution: [
                  [2, 3, 4, 1],
                  [4, 1, 3, 2],
                  [1, 4, 2, 3],
                  [3, 2, 1, 4],
                ],
                icons: ['🍎', '🍌', '🍇', '🍊'],
              },
              explanation: '用水果图标完成数独，规则一样！',
              starReward: 3,
            },
            {
              id: 's4-l5-q2',
              question: 'A 比 B 大，B 比 C 大，C 比 D 大。最小的是？',
              hint: '串成一条链',
              type: 'choice',
              options: [
                { id: 'a', text: 'A', isCorrect: false },
                { id: 'b', text: 'C', isCorrect: false },
                { id: 'c', text: 'D', isCorrect: true },
              ],
              correctAnswer: 'c',
              explanation: 'A > B > C > D，D 最小。',
              starReward: 2,
            },
          ],
        },
      },
    ],
  },
]
