export function formatDate(date: string) {
  const [year, month, day] = date.split('-')

  return `${year}/${month}/${day}`
}
