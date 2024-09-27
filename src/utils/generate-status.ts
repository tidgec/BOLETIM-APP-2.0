interface GenerateStatusProps {
  average: number
  vfe?: number
}

export function generateAssessmentStatus(grade: GenerateStatusProps) {
  if (grade.vfe)
    return grade.average >= 7 && grade.average <= 10
      ? 'text-blue-500'
      : 'text-red-500'

  return grade.average >= 7 && grade.average <= 10
    ? 'text-green-500'
    : 'text-orange-400'
}

export function generateBehaviorStatus(grade: GenerateStatusProps) {
  if (grade.average >= 6 && grade.average <= 10) return 'text-green-500'

  return 'text-red-500'
}

export function generateStatus(
  concept:
    | 'excellent'
    | 'very good'
    | 'good'
    | 'regular'
    | 'insufficient'
    | 'no income'
    | 'second season',
) {
  const status = {
    excellent: 'text-green-500',
    'very good': 'text-lime-600',
    good: 'text-blue-500',
    regular: 'text-orange-400',
    insufficient: 'text-red-500',
    'no income': 'text-red-700',
    'second season': 'text-orange-400',
  }

  return status[concept]
}
