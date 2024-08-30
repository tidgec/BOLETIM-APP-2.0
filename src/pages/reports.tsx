import { useGetReports } from '@/hooks/use-get-reports'

export function Reports() {
  const { reports, isLoading } = useGetReports()

  return (
    <div className="w-full py-6">
      <section className="text-center sm:text-left px-4 mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Relatórios
        </h2>

        <div className="group relative mx-auto my-8 h-[46rem] max-h-screen  max-w-6xl overflow-auto rounded bg-white p-4 shadow-md">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex w-full max-w-3xl items-center gap-4 rounded-full bg-white px-2 py-2">
              <input
                type="text"
                placeholder="Busque pelo nome ..."
                className="roundend-lg wpx-4 flex-1 rounded-lg border border-gray-500 bg-transparent px-4 py-2 focus:border-pmpa-blue-500 focus:outline-none "
              />
              <button className="hidden"></button>
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="filter" className="block font-bold text-black ">
                Filtrar Por:
              </label>
              <select
                id="filter"
                className=" roundend-lg focus:shadow-outline  w-full flex-1 rounded-lg border border-gray-500 px-5 py-2 leading-tight text-gray-700 shadow focus:outline-none"
              >
                <option value="Aluno">Aluno</option>
                <option value="Gestor">Gestor</option>
              </select>
            </div>
          </div>

          <div className="text-center">
            <button className="rounded bg-pmpa-blue-700 px-10 py-2 font-bold text-white ">
              TODOS OS RELATÓRIOS
            </button>

            <div className="flex-1 items-center py-2">
              <select
                id="filter_reports"
                className="roundend-lg focus:shadow-outline rounded-lg border border-gray-500 px-4 py-2 text-center leading-tight text-gray-700 shadow focus:outline-none "
              >
                <option value="Todos">TODOS</option>
                <option value="Adições">ADIÇÕES</option>
                <option value="Remoções">REMOÇÕES</option>
                <option value="Alterações">ALTERAÇÕES</option>
                <option value="Login">LOGIN</option>
              </select>
            </div>
          </div>

          {isLoading && <p>Loading...</p>}

          {!isLoading &&
            reports?.map((report) => {
              return <div key={report.id}>{report.content}</div>
            })}
        </div>
      </section>
    </div>
  )
}
