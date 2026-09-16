import type { Stage } from '../types/lesson'

/**
 * 科学启蒙 · 原理层（幼小衔接）
 * 从「是什么」进阶到「为什么」：密度、溶解、物态、光影、食物链。
 */
export const scienceStage: Stage = {
  id: 'stage-science-1',
  moduleId: 'science',
  name: '小小科学家',
  icon: '🔬',
  description: '密度、溶解、光影与食物链',
  color: 'from-teal-400 to-cyan-400',
  lessons: [
    {
      id: 'sc1-l1',
      stageId: 'stage-science-1',
      title: '为什么有的沉、有的浮',
      type: 'teach',
      duration: 12,
      order: 1,
      content: {
        teach: {
          character: '小斑马斑斑',
          steps: [
            {
              title: '不是因为重',
              content: '大木头能浮，小铁钉会沉。不是「重就沉」，而是要看是不是比同体积的水更「密」。',
              voiceText: '大木头能浮，小铁钉会沉。不是重就沉，而是要看是不是比同体积的水更密。',
              animation: 'wave',
            },
            {
              title: '密度小窍门',
              content: '同样大小的一块，如果比水「挤得更紧、更重」，就会沉；比水「松、轻」就会浮。',
              voiceText: '同样大小的一块，如果比水挤得更紧、更重，就会沉；比水松、轻就会浮。',
            },
            {
              title: '空心的秘密',
              content: '铁船是空心的，整体「平均密度」变小，所以大铁船也能浮在海上！',
              voiceText: '铁船是空心的，整体平均密度变小，所以大铁船也能浮在海上！',
            },
          ],
          summary: '浮沉看密度：同体积比水重就沉，比水轻就浮。',
        },
        quiz: [
          {
            id: 'sc1-l1-q1',
            question: '为什么小石子沉、大木头却浮？',
            hint: '想密度，不是想谁更重',
            type: 'choice',
            options: [
              { id: 'a', text: '因为木头更轻所以一定浮', isCorrect: false },
              { id: 'b', text: '石头同体积比水更「密」', isCorrect: true },
              { id: 'c', text: '木头有魔法', isCorrect: false },
            ],
            correctAnswer: 'b',
            explanation: '同体积下石头比水密会沉，木头比水疏会浮。',
            starReward: 2,
          },
          {
            id: 'sc1-l1-q2',
            question: '铁钉沉，铁船却能浮，主要因为？',
            hint: '想想空心',
            type: 'choice',
            options: [
              { id: 'a', text: '船涂了防水漆', isCorrect: false },
              { id: 'b', text: '船是空心的，平均密度变小', isCorrect: true },
              { id: 'c', text: '海里的水比较特别', isCorrect: false },
            ],
            correctAnswer: 'b',
            explanation: '空心让整体平均密度小于水，所以能浮。',
            starReward: 2,
          },
        ],
      },
    },
    {
      id: 'sc1-l2',
      stageId: 'stage-science-1',
      title: '溶解与看不见',
      type: 'teach',
      duration: 12,
      order: 2,
      content: {
        teach: {
          character: '小斑马斑斑',
          steps: [
            {
              title: '糖去哪了',
              content: '糖放进水里搅一搅，看不见了，但水变甜了——糖分子分散到水里，这叫溶解。',
              voiceText: '糖放进水里搅一搅，看不见了，但水变甜了。糖分子分散到水里，这叫溶解。',
            },
            {
              title: '不是消失',
              content: '溶解不是「没了」，而是变得太小、散布开，用舌头还能感觉到。',
              voiceText: '溶解不是没了，而是变得太小、散布开，用舌头还能感觉到。',
            },
            {
              title: '谁更容易溶',
              content: '热水通常比冷水更容易溶解糖和盐；沙子不会溶解，只会沉在水底。',
              voiceText: '热水通常比冷水更容易溶解糖和盐；沙子不会溶解，只会沉在水底。',
            },
          ],
          summary: '溶解是物质分散到水里，不是消失。',
        },
        quiz: [
          {
            id: 'sc1-l2-q1',
            question: '糖放进水里看不见了，糖怎么样了？',
            hint: '水还会变甜',
            type: 'choice',
            options: [
              { id: 'a', text: '彻底消失了', isCorrect: false },
              { id: 'b', text: '溶解分散在水里', isCorrect: true },
              { id: 'c', text: '变成了水', isCorrect: false },
            ],
            correctAnswer: 'b',
            explanation: '糖溶解后分子还在水中，所以水是甜的。',
            starReward: 2,
          },
          {
            id: 'sc1-l2-q2',
            question: '哪样东西通常更容易让糖化开？',
            hint: '温度有关',
            type: 'choice',
            options: [
              { id: 'a', text: '冰水', isCorrect: false },
              { id: 'b', text: '热水', isCorrect: true },
              { id: 'c', text: '沙子', isCorrect: false },
            ],
            correctAnswer: 'b',
            explanation: '热水分子动得快，通常更易溶解糖。',
            starReward: 1,
          },
        ],
      },
    },
    {
      id: 'sc1-l3',
      stageId: 'stage-science-1',
      title: '水的三态变化',
      type: 'teach',
      duration: 12,
      order: 3,
      content: {
        teach: {
          character: '小斑马斑斑',
          steps: [
            {
              title: '三种模样',
              content: '水可以是液体（水流）、固体（冰）、气体（水蒸气）。温度变了，模样就会变。',
              voiceText: '水可以是液体水流、固体冰、气体水蒸气。温度变了，模样就会变。',
            },
            {
              title: '加热与冷却',
              content: '水加热会蒸发成水蒸气；水蒸气遇冷变成小水珠（凝结）；水结冰是凝固。',
              voiceText: '水加热会蒸发成水蒸气；水蒸气遇冷变成小水珠，叫凝结；水结冰是凝固。',
            },
            {
              title: '还是水',
              content: '冰、水、水蒸气都是水，只是状态不同，分子还是同一种。',
              voiceText: '冰、水、水蒸气都是水，只是状态不同，分子还是同一种。',
            },
          ],
          summary: '水有固、液、气三态，靠温度变化转换。',
        },
        quiz: [
          {
            id: 'sc1-l3-q1',
            question: '镜子上呼一口气出现小水珠，这叫？',
            hint: '气变回液',
            type: 'choice',
            options: [
              { id: 'a', text: '蒸发', isCorrect: false },
              { id: 'b', text: '凝结', isCorrect: true },
              { id: 'c', text: '溶解', isCorrect: false },
            ],
            correctAnswer: 'b',
            explanation: '水蒸气遇冷变成小水珠，叫凝结。',
            starReward: 2,
          },
          {
            id: 'sc1-l3-q2',
            question: '冰块变成水，主要是因为？',
            hint: '温度变化',
            type: 'choice',
            options: [
              { id: 'a', text: '温度升高，冰融化', isCorrect: true },
              { id: 'b', text: '冰溶解在空气里', isCorrect: false },
              { id: 'c', text: '冰变成了别的物质', isCorrect: false },
            ],
            correctAnswer: 'a',
            explanation: '升温使冰从固态变成液态水，还是水。',
            starReward: 2,
          },
        ],
      },
    },
    {
      id: 'sc1-l4',
      stageId: 'stage-science-1',
      title: '光影与颜色',
      type: 'teach',
      duration: 12,
      order: 4,
      content: {
        teach: {
          character: '小斑马斑斑',
          steps: [
            {
              title: '影子方向',
              content: '光从左边来，影子就投向右边。影子总在光源的对面。',
              voiceText: '光从左边来，影子就投向右边。影子总在光源的对面。',
            },
            {
              title: '早晚影子长',
              content: '太阳低的时候影子长，太阳高（中午）影子短。',
              voiceText: '太阳低的时候影子长，太阳高，中午影子短。',
            },
            {
              title: '颜色混合',
              content: '颜料：黄 + 蓝 ≈ 绿。光的混合和颜料不完全一样，但画画时可以先这样记。',
              voiceText: '颜料：黄加蓝大约得到绿。光的混合和颜料不完全一样，但画画时可以先这样记。',
            },
          ],
          summary: '影子在光的对面；颜料黄加蓝得绿。',
        },
        quiz: [
          {
            id: 'sc1-l4-q1',
            question: '台灯在你左边，你的影子大概在？',
            hint: '影子在光的对面',
            type: 'choice',
            options: [
              { id: 'a', text: '左边', isCorrect: false },
              { id: 'b', text: '右边', isCorrect: true },
              { id: 'c', text: '头顶上', isCorrect: false },
            ],
            correctAnswer: 'b',
            explanation: '光从左来，影子投向右。',
            starReward: 2,
          },
          {
            id: 'sc1-l4-q2',
            question: '用黄颜料和蓝颜料混在一起，最可能得到？',
            hint: '画画常用',
            type: 'choice',
            options: [
              { id: 'a', text: '红色', isCorrect: false },
              { id: 'b', text: '绿色', isCorrect: true },
              { id: 'c', text: '白色', isCorrect: false },
            ],
            correctAnswer: 'b',
            explanation: '黄 + 蓝颜料通常得到绿色。',
            starReward: 1,
          },
        ],
      },
    },
    {
      id: 'sc1-l5',
      stageId: 'stage-science-1',
      title: '食物链小侦探',
      type: 'teach',
      duration: 12,
      order: 5,
      content: {
        teach: {
          character: '小斑马斑斑',
          steps: [
            {
              title: '谁吃谁',
              content: '草 → 兔子 → 狐狸。能量沿着「被吃 → 吃」的方向传递，这叫食物链。',
              voiceText: '草到兔子到狐狸。能量沿着被吃到吃的方向传递，这叫食物链。',
            },
            {
              title: '生产者',
              content: '绿色植物能自己用阳光「做食物」，是食物链的起点，叫生产者。',
              voiceText: '绿色植物能自己用阳光做食物，是食物链的起点，叫生产者。',
            },
            {
              title: '断了一环',
              content: '如果兔子太少，狐狸会饿；草太多也可能改变环境。环环相扣。',
              voiceText: '如果兔子太少，狐狸会饿；草太多也可能改变环境。环环相扣。',
            },
          ],
          summary: '食物链：植物 → 植食动物 → 肉食动物。',
        },
        quiz: [
          {
            id: 'sc1-l5-q1',
            question: '在「草→兔→鹰」中，谁是生产者？',
            hint: '能自己做食物',
            type: 'choice',
            options: [
              { id: 'a', text: '草', isCorrect: true },
              { id: 'b', text: '兔', isCorrect: false },
              { id: 'c', text: '鹰', isCorrect: false },
            ],
            correctAnswer: 'a',
            explanation: '草是绿色植物，是生产者。',
            starReward: 2,
          },
          {
            id: 'sc1-l5-q2',
            question: '正确的食物链顺序是？',
            hint: '从植物开始',
            type: 'sequence',
            sequence: {
              blocks: [
                { id: 'fox', icon: '🦊', label: '狐狸', voiceText: '狐狸' },
                { id: 'grass', icon: '🌿', label: '草', voiceText: '草' },
                { id: 'rabbit', icon: '🐇', label: '兔子', voiceText: '兔子' },
              ],
              solution: ['grass', 'rabbit', 'fox'],
            },
            explanation: '草被兔吃，兔被狐狸吃。',
            starReward: 2,
          },
        ],
      },
    },
  ],
}
