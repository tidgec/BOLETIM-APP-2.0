import { useState } from 'react';

interface GradeProps {
  disciplina: string;
  vc1: number;
  vc2: number;
  vf: number;
  vfe: number;
  media: number;
  status: string;
}

interface ComportamentoProps {
  mes: string;
  nota: number;
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
];

const behaviorData: ComportamentoProps[] = [
  { mes: 'Janeiro', nota: 8.000 },
  { mes: 'Fevereiro', nota: 8.200 },
  { mes: 'Março', nota: 8.500 },
  { mes: 'Abril', nota: 8.300 },
  { mes: 'Maio', nota: 8.400 },
  { mes: 'Junho', nota: 8.600 },
  { mes: 'Julho', nota: 8.700 },
  { mes: 'Agosto', nota: 8.800 },
  { mes: 'Setembro', nota: 8.500 },
  { mes: 'Outubro', nota: 8.600 },
  { mes: 'Novembro', nota: 8.700 },
  { mes: 'Dezembro', nota: 8.800 },
];

function GradeItem({ grade }: { grade: GradeProps }) {
  return (
    <tr className="border-b border-gray-200 hover:bg-gray-100">
      <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">
        {grade.disciplina}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
        {grade.vc1}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
        {grade.vc2}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
        {grade.vf}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
        {grade.vfe}
      </td>
      <td className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
        {grade.media}
      </td>
      <td className="px-4 py-3 text-sm text-lime-700 whitespace-nowrap">
        {grade.status}
      </td>
    </tr>
  );
}

function BehaviorTable() {
  return (
    <table className="w-full table-auto mb-4">
      <thead>
        <tr className="bg-gray-200 text-pmpa-blue-600 uppercase text-sm leading-normal">
          {behaviorData.map((comportamento) => (
            <th key={comportamento.mes} className="px-4 py-3 text-left font-bold whitespace-nowrap">
              {comportamento.mes}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr className="bg-gray-100">
          {behaviorData.map((comportamento) => (
            <td key={comportamento.mes} className="px-4 py-3 text-sm text-gray-700 whitespace-nowrap">
              {comportamento.nota}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

function ReportCard() {
  const [showGrades, setShowGrades] = useState(false);
  const [showBehavior, setShowBehavior] = useState(false);

  return (
    <div className="container w-full mx-auto mt-10">
      <h1 className="w-full py-3 border-b-2 border-b-black text-3xl font-bold mb-4">Boletim Online</h1>
      <div className="bg-white shadow-md rounded-lg p-4">
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
        <div className="flex justify-start mb-4">
          <button
            className="bg-pmpa-blue-500 hover:bg-pmpa-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowGrades(!showGrades)}
          >
            {showGrades ? 'Ocultar Notas' : 'Ver Notas'}
          </button>
        </div>
        {showGrades && (
          <table className="w-full table-auto mb-4">
            <thead>
              <tr className="bg-gray-200 text-pmpa-blue-600 uppercase text-sm leading-normal">
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap">
                  DISCIPLINA
                </th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap">
                  1° VC
                </th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap">
                  2° VC
                </th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap">
                  VF
                </th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap">
                  VFE
                </th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap">
                  MÉDIA
                </th>
                <th className="px-4 py-3 text-left font-bold whitespace-nowrap">
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
        <div className="flex justify-start mb-4">
          <button
            className="bg-pmpa-blue-500 hover:bg-pmpa-blue-700 text-white font-bold py-2 px-4 rounded"
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
  );
}

export default ReportCard;
