import { useState } from 'react'

export function AddNotes() {
  const [selectedYear, setSelectedYear] = useState('2024')

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black py-4 text-xl font-semibold">
          Adicionar nota
        </h2>

        <div className="mb-4 py-6">
          <input
            type="text"
            placeholder="PESQUISE POR NOME, CPF"
            className="w-full rounded border p-2"
          />
        </div>

        <div className="mb-4">
          <select className="w-full rounded border p-2">
            <option>TODOS OS POLOS</option>
            <option>BELÉM</option>
            <option>SANTARÉM</option>
            <option>CASTANHAL</option>
          </select>
        </div>

        <div className="mb-4">
          <select
            className="w-full rounded border p-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="2024">2024</option>
          </select>
        </div>

        <div className="mb-4 rounded border p-4">
          <h2 className="mb-4 text-lg font-bold">
            Nome: ADENOR DE OLIVEIRA ELIAS
          </h2>
          <p>Curso: CAS TURMA - 2024</p>
          <p>Polo: SANTARÉM</p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            {['VC I', 'VC II', 'VF', 'VFE'].map((month) => (
              <div key={month} className="flex flex-col items-center">
                <label>{month}</label>
                <input
                  type="text"
                  placeholder="0,00"
                  className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
                />
              </div>
            ))}
          </div>
          <div>
            <button
              type="submit"
              className="my-3 ml-auto block rounded bg-pmpa-blue-800 px-3 py-2 text-white hover:bg-pmpa-blue-500"
            >
              Adicionar
            </button>
          </div>
        </div>

        {}
        <div className="mb-4 rounded border p-4">
          <h2 className="mb-4 text-lg font-bold">Nome: AGOSTINHO DE SOUZA</h2>
          <p>Curso: CAS TURMA - 2024</p>
          <p>Polo: CASTANHAL</p>

          <div className="mt-4 grid grid-cols-2 gap-4">
            {['VC I', 'VC II', 'VF', 'VFE'].map((month) => (
              <div key={month} className="flex flex-col items-center">
                <label>{month}</label>
                <input
                  type="text"
                  placeholder="0,00"
                  className="w-full rounded  border bg-pmpa-blue-500 p-2 text-center text-white"
                />
              </div>
            ))}
          </div>
          <div>
            <button
              type="submit"
              className="my-3 ml-auto block rounded bg-pmpa-blue-800 px-3 py-2 text-white hover:bg-pmpa-blue-500"
            >
              Adicionar
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
