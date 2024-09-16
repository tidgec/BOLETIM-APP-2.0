import { PDFDownloadLink } from '@react-pdf/renderer'
import { useSearchParams } from 'react-router-dom'

import { Chart } from '@/components/chart'
import GeneralClassificationViewer from '@/components/templates/general-classification-viewer'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetRanking } from '@/hooks/use-get-ranking'
import { conceptMap, overallStatusMap } from '@/utils/status-and-concept-mapper'

export function OverallRanking() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const page = searchParams.get('page') ?? '1'

  const { ranking, isLoading } = useGetRanking({
    courseId: String(courseId),
    page,
  })

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

  const pdfData = [
    {
      class: '1º',
      qav: '30/30',
      qc: '10/10',
      rg: '23826',
      name: 'Lucas Pereira da Silva',
      average: '9.784',
      concept: 'Muito Bom',
      dob: '01/01/1975',
      polo: 'SANTARÉM',
      status: 'APROVADO',
    },
  ]

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-full px-4 text-center sm:text-left">
        <h2 className="mb-4 border-b-2 border-b-black text-xl font-semibold">
          Classificação
        </h2>

        <div className="mb-4 flex items-center justify-center rounded-lg bg-pmpa-blue-500 p-4">
          <div>
            {isLoading ? (
              <Skeleton className="h-80 w-80" />
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

        <div className="mb-6 text-center font-bold">
          <span className="text-black">Classificação Geral: CAS - 2023</span>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-md">
          {isLoading ? (
            <Skeleton className="h-72 w-full" />
          ) : (
            <table className="min-w-full">
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
                {isLoading
                  ? Array.from({ length: 10 }).map((_, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <Skeleton className="h-6 w-12" />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <Skeleton className="h-6 w-20" />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <Skeleton className="h-6 w-20" />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <Skeleton className="h-6 w-24" />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <Skeleton className="h-6 w-32" />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <Skeleton className="h-6 w-24" />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <Skeleton className="h-6 w-24" />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <Skeleton className="h-6 w-32" />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <Skeleton className="h-6 w-32" />
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          <Skeleton className="h-6 w-24" />
                        </td>
                      </tr>
                    ))
                  : ranking?.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          {index + 1}º
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          {item.studentAverage.assessmentsCount}
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          {item.studentAverage.averageInform.behaviorsCount}
                        </td>
                        <td className="px-4 py-2 text-sm text-slate-700">
                          {item.studentCivilID}
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
                    ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="mt-4 text-center">
          <PDFDownloadLink
            document={<GeneralClassificationViewer data={pdfData} />}
            fileName="classificacao-geral-2023.pdf"
          >
            {({ loading }) =>
              loading ? (
                'Preparing document...'
              ) : (
                <button className="rounded bg-pmpa-blue-500 px-4 py-2 text-white">
                  Download PDF
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      </section>
    </div>
  )
}
