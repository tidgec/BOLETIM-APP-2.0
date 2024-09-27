import { PDFDownloadLink } from '@react-pdf/renderer'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

import { useCreatePoleRankingSheet } from '@/hooks/use-create-pole-ranking-sheet'
import { useGetCourse } from '@/hooks/use-get-course'
import { useGetPoleRanking } from '@/hooks/use-get-pole-ranking'
import { fail } from '@/utils/fail'
import { getClassificationPosition } from '@/utils/get-classification-position'
import { conceptMap, overallStatusMap } from '@/utils/status-and-concept-mapper'

import { Chart } from './chart'
import { Pagination } from './pagination'
import {
  RankingResponsiveSkeleton,
  RankingSkeleton,
} from './skeletons/ranking-skeleton'
import { RankingViewer } from './templates/ranking-viewer'
import { Button } from './ui/button'
import { Skeleton } from './ui/skeleton'

export function OverallPoleRankingWithoutBehavior() {
  const navigate = useNavigate()

  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const page = searchParams.get('page') ?? '1'

  const { course, isLoading: isLoadingGetCourse } = useGetCourse({
    courseId: String(courseId),
  })

  const { ranking, isLoading, pages, totalItems } = useGetPoleRanking({
    courseId: String(courseId),
    poleId: String(id),
    page,
    hasBehavior: 'false',
  })

  const { ranking: rankingToPrint } = useGetPoleRanking({
    courseId: String(courseId),
    poleId: String(id),
    hasBehavior: 'false',
  })

  const { mutateAsync: createPoleRankingWithoutBehaviorSheetFn } =
    useCreatePoleRankingSheet()

  async function handleDownloadExcel() {
    try {
      const response = await createPoleRankingWithoutBehaviorSheetFn({
        courseId: String(courseId),
        poleId: String(id),
        hasBehavior: 'false',
      })

      window.location.href = response.fileUrl
    } catch (err) {
      fail(err)
    }
  }

  const totalExcellentSize = ranking?.filter(
    (item) =>
      item.studentAverage.averageInform.studentAverageStatus.concept ===
      'excellent',
  )?.length

  const totalVeryGoodSize = ranking?.filter(
    (item) =>
      item.studentAverage.averageInform.studentAverageStatus.concept ===
      'very good',
  )?.length

  const totalGoodSize = ranking?.filter(
    (item) =>
      item.studentAverage.averageInform.studentAverageStatus.concept === 'good',
  )?.length

  const totalRegularSize = ranking?.filter(
    (item) =>
      item.studentAverage.averageInform.studentAverageStatus.concept ===
      'regular',
  )?.length

  const totalInsufficientSize = ranking?.filter(
    (item) =>
      item.studentAverage.averageInform.studentAverageStatus.concept ===
      'insufficient',
  )?.length

  const totalNoIncomeSize = ranking?.filter(
    (item) =>
      item.studentAverage.averageInform.studentAverageStatus.concept ===
      'no income',
  )?.length

  function handleNavigateToBoletim(studentId: string) {
    navigate(`/students/${studentId}/boletim?courseId=${courseId}`)
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-full px-4 text-center sm:text-left">
        <h2 className="mb-4 border-b-2 border-b-black text-xl font-semibold">
          Classificação por polo sem comportamento
        </h2>

        <div className="mb-4 flex flex-col items-center rounded-lg bg-pmpa-blue-500 p-4 sm:flex-row sm:justify-center">
          <div className="w-full sm:w-1/4">
            {isLoading ? (
              <div className="h-64 w-full">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>
            ) : (
              <Chart
                charts={[
                  {
                    status: 'excellent',
                    size: totalExcellentSize ?? 0,
                    fill: 'var(--color-excellent)',
                  },
                  {
                    status: 'very good',
                    size: totalVeryGoodSize ?? 0,
                    fill: 'var(--color-very-good)',
                  },
                  {
                    status: 'good',
                    size: totalGoodSize ?? 0,
                    fill: 'var(--color-good)',
                  },
                  {
                    status: 'regular',
                    size: totalRegularSize ?? 0,
                    fill: 'var(--color-regular)',
                  },
                  {
                    status: 'insufficient',
                    size: totalInsufficientSize ?? 0,
                    fill: 'var(--color-insufficient)',
                  },
                  {
                    status: 'no income',
                    size: totalNoIncomeSize ?? 0,
                    fill: 'var(--color-no-income)',
                  },
                ]}
              />
            )}
          </div>
        </div>

        <div className="mb-6 flex items-center justify-center font-bold">
          {isLoadingGetCourse ? (
            <Skeleton className="h-4 w-44 bg-slate-300" />
          ) : (
            <span className="text-black">
              Classificação Geral: {course?.name}
            </span>
          )}
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 lg:bg-white lg:shadow-md">
          <table className="hidden min-w-full table-auto lg:table">
            <thead>
              <tr className="border-b bg-pmpa-blue-500">
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  CLASS
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Q.AV
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Q.C
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  RG
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  NOME COMPLETO
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  MÉDIA FINAL
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  CONCEITO
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  DATA DE NASCIMENTO
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  POLO
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  STATUS
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <>
                  <RankingSkeleton />
                  <RankingSkeleton />
                  <RankingSkeleton />
                  <RankingSkeleton />
                  <RankingSkeleton />
                </>
              ) : (
                ranking?.map((item, index) => {
                  const classification = getClassificationPosition(index, page)

                  return (
                    <tr
                      key={index}
                      onClick={() => handleNavigateToBoletim(item.studentId)}
                      className="cursor-pointer"
                    >
                      <td className="px-4 py-2 text-sm text-slate-700">
                        {classification}º
                      </td>
                      <td className="px-4 py-2 text-sm text-slate-700">
                        {item.studentAverage.assessmentsCount}
                      </td>
                      <td className="px-4 py-2 text-sm text-slate-700">
                        {item.studentAverage.averageInform.behaviorsCount}
                      </td>
                      <td className="px-4 py-2 text-sm text-slate-700">
                        {item.studentCivilOrMilitaryId}
                      </td>
                      <td className="px-4 py-2 text-sm text-slate-700">
                        {item.studentPole}
                      </td>
                      <td className="px-4 py-2 text-sm text-slate-700">
                        {item.studentAverage.averageInform.geralAverage}
                      </td>
                      <td className="px-4 py-2 text-sm text-slate-700">
                        {
                          conceptMap[
                            item.studentAverage.averageInform
                              .studentAverageStatus.concept
                          ]
                        }
                      </td>
                      <td className="px-4 py-2 text-sm text-slate-700">
                        {item.studentBirthday}
                      </td>
                      <td className="px-4 py-2 text-sm text-slate-700">
                        {item.studentPole}
                      </td>
                      <td className="px-4 py-2 text-sm text-slate-700">
                        {
                          overallStatusMap[
                            item.studentAverage.averageInform
                              .studentAverageStatus.status
                          ]
                        }
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>

          <div className="flex h-[576px] flex-col gap-4 overflow-auto lg:hidden">
            {isLoading ? (
              <>
                <RankingResponsiveSkeleton />
                <RankingResponsiveSkeleton />
              </>
            ) : (
              ranking?.map((item, index) => {
                const classification = getClassificationPosition(index, page)

                return (
                  <ol
                    key={item.studentName}
                    className="flex cursor-pointer flex-col items-center border-2 border-slate-300"
                    onClick={() => handleNavigateToBoletim(item.studentId)}
                  >
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      CLASSIFICAÇÃO: {classification}ª
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      Q.AV: {item.studentAverage.assessmentsCount}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      Q.C: {item.studentAverage.averageInform.behaviorsCount}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      RG: {item.studentCivilOrMilitaryId}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      NOME COMPLETO: {item.studentName}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      MÉDIA FINAL:{' '}
                      {item.studentAverage.averageInform.geralAverage}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      CONCEITO:{' '}
                      {
                        conceptMap[
                          item.studentAverage.averageInform.studentAverageStatus
                            .concept
                        ]
                      }
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      DATA DE NASCIMENTO: {item.studentBirthday}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      POLO: {item.studentPole}
                    </li>
                    <li className="px-4 py-2 text-start text-base font-medium text-slate-700 lg:text-center lg:text-sm lg:font-normal">
                      STATUS:{' '}
                      {
                        overallStatusMap[
                          item.studentAverage.averageInform.studentAverageStatus
                            .status
                        ]
                      }
                    </li>
                  </ol>
                )
              })
            )}
          </div>
        </div>

        <div className="mt-4 flex w-full items-center justify-center gap-2 text-center print:hidden">
          <PDFDownloadLink
            document={
              <RankingViewer
                courseName={course?.name ?? ''}
                ranking={
                  rankingToPrint
                    ? rankingToPrint.map((item, index) => ({
                        classification: index + 1,
                        average: Number(
                          item.studentAverage.averageInform.geralAverage,
                        ),
                        concept:
                          conceptMap[
                            item.studentAverage.averageInform
                              .studentAverageStatus.concept
                          ],
                        name: item.studentName ?? '',
                        pole: item.studentPole ?? '',
                        qav: item.studentAverage.assessmentsCount,
                        qc: item.studentAverage.averageInform.behaviorsCount,
                        civilId: item.studentCivilOrMilitaryId ?? '',
                        birthday: item.studentBirthday ?? '',
                        status:
                          overallStatusMap[
                            item.studentAverage.averageInform
                              .studentAverageStatus.status
                          ],
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

        {ranking && (
          <Pagination
            items={totalItems ?? 0}
            page={Number(page)}
            pages={pages ?? 0}
          />
        )}
      </section>
    </div>
  )
}
