import { useState } from 'react'

interface GradeProps {
  disciplina: string
  vc1: number
  vc2: number
  vf: number
  vfe: number
  media: number
  status: string
}

interface ComportamentoProps {
  mes: string
  nota: number
}

const grades: GradeProps[] = [
  {
    disciplina: 'ARMAMENTO E TIRO POLICIAL',
    vc1: 9500,
    vc2: 9250,
    vf: 9250,
    vfe: 9375,
    media: 9375,
    status: 'APROVADO',
  },
  {
    disciplina: 'CHEFIA E LIDERANÇA',
    vc1: 0,
    vc2: 0,
    vf: 0,
    vfe: 0,
    media: 0,
    status: 'APROVADO',
  },
  {
    disciplina: 'CORRESPONDENCIA POLICIAL MILITAR',
    vc1: 0,
    vc2: 0,
    vf: 0,
    vfe: 0,
    media: 0,
    status: 'APROVADO',
  },
  {
    disciplina: 'DIREITO ADMINISTRATIVO',
    vc1: 0,
    vc2: 0,
    vf: 0,
    vfe: 0,
    media: 0,
    status: 'APROVADO',
  },
  {
    disciplina: 'DIREITO PROCESSUAL PENAL MILITAR',
    vc1: 0,
    vc2: 0,
    vf: 0,
    vfe: 0,
    media: 0,
    status: 'APROVADO',
  },
  {
    disciplina: 'GERENCIAMENTO DE CRISES E TÉCNICAS DE NEGOCIAÇÃO',
    vc1: 0,
    vc2: 0,
    vf: 0,
    vfe: 0,
    media: 0,
    status: 'APROVADO',
  },
  {
    disciplina: 'LEGISLAÇÃO BASICA INSTITUCIONAL',
    vc1: 0,
    vc2: 0,
    vf: 0,
    vfe: 0,
    media: 0,
    status: 'APROVADO',
  },
  {
    disciplina: 'POLICIAMENTO OSTENSIVO GERAL',
    vc1: 0,
    vc2: 0,
    vf: 0,
    vfe: 0,
    media: 0,
    status: 'APROVADO',
  },
  {
    disciplina: 'PROCEDIMENTO E PROCESSOS CORREICIONAIS',
    vc1: 0,
    vc2: 0,
    vf: 0,
    vfe: 0,
    media: 0,
    status: 'APROVADO',
  },
  {
    disciplina: 'TECNOLOGIA DA INFORMAÇÃO E TELECOMUNICAÇÕES',
    vc1: 0,
    vc2: 0,
    vf: 0,
    vfe: 0,
    media: 0,
    status: 'APROVADO',
  },
]

const behaviorData: ComportamentoProps[] = [
  { mes: 'Janeiro', nota: 8.0 },
  { mes: 'Fevereiro', nota: 8.2 },
  { mes: 'Março', nota: 8.5 },
  { mes: 'Abril', nota: 8.3 },
  { mes: 'Maio', nota: 8.4 },
  { mes: 'Junho', nota: 8.6 },
  { mes: 'Julho', nota: 8.7 },
  { mes: 'Agosto', nota: 8.8 },
  { mes: 'Setembro', nota: 8.5 },
  { mes: 'Outubro', nota: 8.6 },
  { mes: 'Novembro', nota: 8.7 },
  { mes: 'Dezembro', nota: 8.8 },
]

function GradeItem({ grade }: { grade: GradeProps }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900">
        {grade.disciplina}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
        {grade.vc1}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
        {grade.vc2}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
        {grade.vf}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
        {grade.vfe}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-700">
        {grade.media}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-lime-700">
        {grade.status}
      </td>
    </tr>
  )
}

function BehaviorTable() {
  return (
    <table className="mb-4 w-full table-auto">
      <thead>
        <tr className="bg-gray-200 text-sm uppercase leading-normal text-pmpa-blue-600">
          {behaviorData.map((comportamento) => (
            <th
              key={comportamento.mes}
              className="whitespace-nowrap px-4 py-3 text-left font-bold"
            >
              {comportamento.mes}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-100">
          {behaviorData.map((comportamento) => (
            <td
              key={comportamento.mes}
              className="whitespace-nowrap px-4 py-3 text-sm text-gray-700"
            >
              {comportamento.nota}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

function ReportCard() {
  const [showGrades, setShowGrades] = useState(false)
  const [showBehavior, setShowBehavior] = useState(false)

  return (
    <div className="container mx-auto mt-10 w-full">
      <h1 className="mb-4 w-full border-b-2 border-b-black py-3 text-3xl font-bold">
        Boletim Online
      </h1>
      <div className="rounded-lg bg-white p-4 shadow-md">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Polo: CFAP</h2>
          <p className="text-gray-700">Nome: AFONSO RAIOL GONZAGA ΝΕΤΟ</p>
          <p className="text-gray-700">Curso: CAS TURMA II - 2023</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold">DISCIPLINAS:</h2>
          <p className="text-gray-700">11/10 LANÇADAS</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold">MÉDIA GERAL: 9.261</h2>
          <p className="text-gray-700">STATUS GERAL: MUITO BOM</p>
        </div>
        <div className="mb-4 flex justify-start">
          <button
            className="rounded bg-pmpa-blue-500 px-4 py-2 font-bold text-white hover:bg-pmpa-blue-700"
            onClick={() => setShowGrades(!showGrades)}
          >
            {showGrades ? 'Ocultar Notas' : 'Ver Notas'}
          </button>
        </div>
        {showGrades && (
          <table className="mb-4 w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-sm uppercase leading-normal text-pmpa-blue-600">
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  DISCIPLINA
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  1° VC
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  2° VC
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  VF
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  VFE
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  MÉDIA
                </th>
                <th className="whitespace-nowrap px-4 py-3 text-left font-bold">
                  STATUS
                </th>
              </tr>
            </thead>
            <tbody>
              {grades.map((grade) => (
                <GradeItem key={grade.disciplina} grade={grade} />
              ))}
            </tbody>
          </table>
        )}
        <div className="mb-4 flex justify-start">
          <button
            className="rounded bg-pmpa-blue-500 px-4 py-2 font-bold text-white hover:bg-pmpa-blue-700"
            onClick={() => setShowBehavior(!showBehavior)}
          >
            {showBehavior ? 'Ocultar Comportamento' : 'Ver Comportamento'}
          </button>
        </div>
        {showBehavior && <BehaviorTable />}
        <div className="mb-4">
          <h2 className="text-xl font-bold">MÉDIA COMPORTAMENTO: 8.500</h2>
          <p className="text-gray-700">STATUS COMPORTAMENTO: APROVADO</p>
        </div>
      </div>
      <button
        className="my-3 ml-auto block rounded bg-pmpa-blue-500 px-4 py-2 font-semibold text-white hover:bg-pmpa-blue-700"
        onClick={() => window.print()}
      >
        Imprimir
      </button>
    </div>
  )
}

export default ReportCard
