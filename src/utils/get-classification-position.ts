export function getClassificationPosition(index: number, page: string) {
  const pageIndex = page ? Number(page) - 1 : 0
  const perPage = 1000
  return pageIndex * perPage + (index + 1)
}
