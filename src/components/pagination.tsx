import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'

interface PaginationProps {
  pages: number
  items: number
  page: number
}

export function Pagination({ items, page, pages }: PaginationProps) {
  const [, setSearchParams] = useSearchParams()

  function firstPage() {
    setSearchParams((params) => {
      params.set('page', '1')

      return params
    })
  }

  function previousPage() {
    if (page - 1 <= 0) {
      return
    }

    setSearchParams((params) => {
      params.set('page', String(page - 1))

      return params
    })
  }

  function nextPage() {
    if (page + 1 > pages) {
      return
    }

    setSearchParams((params) => {
      params.set('page', String(page + 1))

      return params
    })
  }

  function lastPage() {
    setSearchParams((params) => {
      params.set('page', String(pages))

      return params
    })
  }

  return (
    <div className="flex flex-col items-center justify-between gap-2 text-sm text-zinc-500 sm:flex-row md:flex-col md:justify-center md:gap-4 xl:flex-row xl:justify-between xl:gap-0">
      <span>Total {items} item(s)</span>
      <div className="flex w-full flex-col items-center justify-between gap-4 sm:w-auto sm:flex-row sm:justify-start sm:gap-8">
        <span>
          Page {page} of {pages}
        </span>

        <div className="space-x-1.5">
          <Button
            onClick={firstPage}
            size="icon"
            disabled={page - 1 <= 0}
            variant={'secondary'}
          >
            <ChevronsLeft className="size-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button
            onClick={previousPage}
            size="icon"
            disabled={page - 1 <= 0}
            variant={'secondary'}
          >
            <ChevronLeft className="size-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <Button
            onClick={nextPage}
            size="icon"
            disabled={page + 1 > pages}
            variant={'secondary'}
          >
            <ChevronRight className="size-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button
            onClick={lastPage}
            size="icon"
            disabled={page + 1 > pages}
            variant={'secondary'}
          >
            <ChevronsRight className="size-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
