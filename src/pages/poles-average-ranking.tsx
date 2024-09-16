import { PDFDownloadLink } from '@react-pdf/renderer'
import { useSearchParams } from 'react-router-dom'

import GeneralClassificationViewer from '@/components/templates/general-classification-viewer'
import { Skeleton } from '@/components/ui/skeleton' // Importar o componente Skeleton
import { useGetPolesAverageRanking } from '@/hooks/use-get-poles-average-ranking'

export function PolesAverageRanking() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const page = searchParams.get('page') ?? '1'

  const { ranking, isLoading } = useGetPolesAverageRanking({
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
    {
      class: '2º',
      qav: '30/30',
      qc: '8/10',
      rg: '23751',
      name: 'Mariana Souza Ferreira',
      average: '9.724',
      concept: 'Muito Bom',
      dob: '01/01/1924',
      polo: 'SANTARÉM',
      status: 'APROVADO',
    },
    {
      class: '3º',
      qav: '27/30',
      qc: '9/10',
      rg: '23751',
      name: 'Eduardo Alves Lima',
      average: '9.700',
      concept: 'Muito Bom',
      dob: '01/01/2000',
      polo: 'SANTARÉM',
      status: 'APROVADO',
    },
    {
      class: '4º',
      qav: '20/30',
      qc: '5/10',
      rg: '23751',
      name: 'Camila Rocha Costa',
      average: '9.724',
      concept: 'Muito Bom',
      dob: '01/01/1924',
      polo: 'SANTARÉM',
      status: 'APROVADO',
    },
  ]

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-full px-4 text-center sm:text-left">
        <h2 className="mb-4 border-b-2 border-b-black text-xl font-semibold">
          Classificação de média dos polos
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
                // Linha de carregamento do Skeleton
                <tr>
                  <td colSpan={3} className="px-4 py-2">
                    <Skeleton className="h-8 w-full rounded-lg" />
                  </td>
                </tr>
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
