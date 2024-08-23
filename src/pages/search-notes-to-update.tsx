import { useState } from 'react'

export function SearchNotesToUpdate() {
  const [searchTerm, setSearchTerm] = useState('')
  const [disciplinas] = useState([
    'Armamento Policial',
    'Direito Penal',
    'Direito Processual Penal',
    'Legislação Penal Especial',
    'Criminologia',
    'Polícia Judiciária',
    'Investigação Criminal',
    'Técnicas de Interrogatório',
    'Ciência Forense',
    'Balística Forense',
    'Documentoscopia',
    'Datiloscopia',
    'Fotografia Forense',
    'Medicina Legal',
    'Odontologia Legal',
    'Psicologia Forense',
    'Sociologia Jurídica',
    'Direitos Humanos',
    'Ética Profissional',
    'Administração Policial',
    'Gestão de Pessoas',
    'Planejamento Estratégico',
    'Orçamento Público',
    'Logística Policial',
    'Comunicação Policial',
    'Relações Públicas',
    'Atendimento ao Público',
    'Segurança Pública',
    'Inteligência Policial',
    'Controle de Multidões',
    'Operações Policiais Especiais',
    'Táticas Policiais',
    'Defesa Pessoal',
    'Atividade Física',
    'Primeiros Socorros',
  ])

  const filteredDisciplinas = searchTerm
    ? disciplinas.filter((disciplina) =>
        disciplina.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : disciplinas
  return (
    <div className="container mx-auto w-full p-4">
      <section className="max-w[90rem] mx-auto w-full">
        <h2 className="w-full border-b-2 border-black py-4 text-xl font-semibold">
          Disciplinas
        </h2>
        <div className="mb-4 flex items-center py-4">
          <input
            type="text"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Pesquise pela disciplina"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDisciplinas.map((disciplina, index) => (
            <div
              key={index}
              className="focus-shadow-outline rounded bg-pmpa-blue-500 px-4 py-2 font-bold text-white hover:bg-pmpa-blue-700 focus:outline-none"
            >
              <a href={`/disciplinas/${disciplina.toLowerCase()}`}>
                {disciplina}
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
