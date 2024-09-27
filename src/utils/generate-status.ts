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

export function generateStatus(grade: GenerateStatusProps) {
  if (grade.vfe) {
    if (grade.average >= 7 && grade.average < 10) return 'text-green-500'
    if (grade.average >= 5 && grade.average < 7) return 'text-orange-500'
    if (grade.average > 0 && grade.average < 5) return 'text-red-500'

    return 'text-red-700'
  }

  if (grade.average >= 8 && grade.average < 10) return 'text-green-500'
  if (grade.average >= 7 && grade.average < 8) return 'text-blue-500'
  if (grade.average >= 5 && grade.average < 7) return 'text-orange-500'
  if (grade.average > 0 && grade.average < 5) return 'text-red-500'
  return 'text-red-700'
}
