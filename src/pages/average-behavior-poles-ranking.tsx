import { PDFDownloadLink } from '@react-pdf/renderer'
import { useSearchParams } from 'react-router-dom'

import GeneralClassificationViewer from '@/components/templates/general-classification-viewer'
import { useGetAverageBehaviorPolesRanking } from '@/hooks/use-get-average-behavior-poles-ranking'

export function AverageBehaviorPolesRanking() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const page = searchParams.get('page') ?? '1'

  const { ranking, isLoading } = useGetAverageBehaviorPolesRanking({
    courseId: String(courseId),
    page,
  })

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
          Classificação de média de comportamento dos polos
        </h2>

        <div className="mb-6 text-center font-bold">
          <span className="text-black">Classificação Geral: CAS - 2023</span>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white shadow-md">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-pmpa-blue-500">
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  CLASS
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  POLO
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  MÉDIA
                </th>
              </tr>
            </thead>
            <tbody>
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
                  <tr key={index}>
                    <td className="px-4 py-2 text-sm text-slate-700">
                      {index + 1}º
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-700">
                      {item.poleAverage.name}
                    </td>
                    <td className="px-4 py-2 text-sm text-slate-700">
                      {item.poleAverage.average}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
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
