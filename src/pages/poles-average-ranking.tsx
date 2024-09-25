import { PDFDownloadLink } from '@react-pdf/renderer'
import { useSearchParams } from 'react-router-dom'

import { RankingAverageViewer } from '@/components/templates/ranking-average-viewer'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useCreatePolesAverageRankingSheet } from '@/hooks/use-create-poles-average-ranking-sheet'
import { useGetCourse } from '@/hooks/use-get-course'
import { useGetPolesAverageRanking } from '@/hooks/use-get-poles-average-ranking'
import { fail } from '@/utils/fail'

export function PolesAverageRanking() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')

  const { ranking, isLoading } = useGetPolesAverageRanking({
    courseId: String(courseId),
  })

  const { course, isLoading: isLoadingGetCourse } = useGetCourse({
    courseId: String(courseId),
  })

  const { mutateAsync: createPolesAverageRankingSheetFn } =
    useCreatePolesAverageRankingSheet()

  async function handleDownloadExcel() {
    try {
      const response = await createPolesAverageRankingSheetFn({
        courseId: String(courseId),
        hasBehavior: 'true',
      })

      window.location.href = response.fileUrl
    } catch (err) {
      fail(err)
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-full px-4 text-center sm:text-left">
        <h2 className="mb-4 border-b-2 border-b-black text-xl font-semibold">
          Classificação de média dos polos
        </h2>

        <div className="mb-6 flex items-center justify-center font-bold">
          {isLoadingGetCourse ? (
            <Skeleton className="h-4 w-44 bg-slate-300" />
          ) : (
            <span className="text-black">
              Classificação Geral: {course?.name}
            </span>
          )}
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-md">
          <Table className="min-w-full table-auto">
            <TableHeader>
              <TableRow className="border-b bg-pmpa-blue-500 print:flex print:justify-start">
                <TableHead className="w-10 py-2 text-center text-sm font-semibold text-white print:w-auto print:px-0 print:py-0 print:pl-4">
                  CLASS
                </TableHead>
                <TableHead className="w-24 py-2 text-center text-sm font-semibold text-white print:w-auto print:px-0 print:py-0 print:pl-4">
                  POLO
                </TableHead>
                <TableHead className="w-32 py-2 text-center text-sm font-semibold text-white print:w-auto print:px-0 print:py-0 print:pl-4">
                  MÉDIA
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <>
                  {Array.from({ length: 4 }).map((_, index) => (
                    <tr key={index} className="animate-pulse">
                      <td className="bg-gray-200 px-4 py-2 text-sm"></td>
                      <td className="bg-gray-200 px-4 py-2 text-sm"></td>
                      <td className="bg-gray-200 px-4 py-2 text-sm"></td>
                    </tr>
                  ))}
                </>
              ) : (
                ranking?.map((item, index) => (
                  <TableRow key={item.poleAverage.name}>
                    <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
                      {index + 1}º
                    </TableCell>
                    <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
                      {item.poleAverage.name}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-center text-sm text-slate-700">
                      {item.poleAverage.average}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex h-[576px] flex-col gap-4 overflow-auto lg:hidden">
          <PDFDownloadLink
            document={
              <RankingAverageViewer
                courseName={course?.name ?? ''}
                ranking={
                  ranking
                    ? ranking.map((item, index) => ({
                        classification: index + 1,
                        average: item.poleAverage.average,
                        pole: item.poleAverage.name ?? '',
                      }))
                    : []
                }
              />
            }
            fileName="classificacao-geral-2023.pdf"
          >
            {({ loading }) =>
              loading ? (
                'Preparando documento...'
              ) : (
                <Button>Download PDF</Button>
              )
            }
          </PDFDownloadLink>
          <Button onClick={handleDownloadExcel}>Download Excel</Button>
        </div>
      </section>
    </div>
  )
}
