export function BehaviorRemove() {
  const alunos = [
    {
      nome: 'ADENOR DE OLIVEIRA ELIAS',
      curso: 'CAS TURMA I - 2024',
      polo: 'SANTARÉM',
    },
    {
      nome: 'AGOSTINHO DE SOUZA',
      curso: 'CAS TURMA I - 2024',
      polo: 'CASTANHAL',
    },
    {
      nome: 'AILTON VASCONCELOS HIANES FILHO',
      curso: 'CAS TURMA I - 2024',
      polo: 'CASTANHAL',
    },
  ]

  const meses = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ]

  const handleClick = (nome: string, mes: string) => {
    if (
      window.confirm(
        `Você confirma a seleção do mês ${mes} para o aluno ${nome}?`,
      )
    ) {
      console.log(`Mês ${mes} confirmado para o aluno ${nome}`)
    } else {
      console.log(`Mês ${mes} não confirmado para o aluno ${nome}`)
    }
  }

  return (
    <div className="flex items-center justify-center py-6">
      <div className="w-full max-w-[90rem] p-6">
        <section>
          <h2 className="mb-4 w-full border-b-2 border-b-black text-xl font-semibold">
            Remover Comportamento
          </h2>

          <span className="mb-6 block rounded bg-pmpa-blue-500 px-28 py-4 text-center font-bold text-white">
            SELECIONE O ANO E O PERÍODO
          </span>
          {alunos.map((aluno, index) => (
            <div key={index} className="mb-6">
              e <h3 className="font-bold">{aluno.nome}</h3>
              <p>Curso: {aluno.curso}</p>
              <p>Polo: {aluno.polo}</p>
              <div className="mt-2 flex flex-wrap justify-center space-x-2">
                {meses.map((mes, mesIndex) => (
                  <button
                    key={mesIndex}
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-pmpa-blue-500 text-white"
                    onClick={() => handleClick(aluno.nome, mes)}
                  >
                    {mes}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
