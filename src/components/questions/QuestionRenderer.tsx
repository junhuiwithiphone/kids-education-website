import type { Question } from '../../types/lesson'
import ChoiceQuestion from './ChoiceQuestion'
import SequenceQuestion from './SequenceQuestion'
import PathQuestion from './PathQuestion'
import EquationQuestion from './EquationQuestion'
import SudokuQuestion from './SudokuQuestion'

interface Props {
  question: Question
  onAnswer: (isCorrect: boolean) => void
  disabled?: boolean
  accent?: 'purple' | 'orange' | 'teal'
}

/**
 * 题型分发器 —— 根据 question.type 渲染对应的交互组件。
 */
export default function QuestionRenderer({ question, onAnswer, disabled, accent }: Props) {
  switch (question.type) {
    case 'sequence':
      if (!question.sequence) return null
      return (
        <SequenceQuestion
          config={question.sequence}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      )

    case 'path':
      if (!question.path) return null
      return (
        <PathQuestion config={question.path} onAnswer={onAnswer} disabled={disabled} />
      )

    case 'equation':
      if (!question.equation) return null
      return (
        <EquationQuestion
          config={question.equation}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      )

    case 'sudoku':
      if (!question.sudoku) return null
      return (
        <SudokuQuestion
          config={question.sudoku}
          onAnswer={onAnswer}
          disabled={disabled}
        />
      )

    case 'choice':
    case 'loop':
    case 'debug':
      if (!question.options || question.correctAnswer === undefined) return null
      return (
        <ChoiceQuestion
          options={question.options}
          correctAnswer={question.correctAnswer}
          onAnswer={onAnswer}
          disabled={disabled}
          accent={accent}
        />
      )

    default:
      return null
  }
}
