export function verifyFormula(type: string): 'period' | 'module' {
  return ['CAS', 'CFP', 'CGS', 'CHO'].includes(type) ? 'module' : 'period'
}
