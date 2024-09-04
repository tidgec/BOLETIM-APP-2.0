import { Link } from 'react-router-dom'

export function AverageBehavior() {
  return (
    <section className="mx-auto w-full max-w-[90rem] px-2 py-2 md:py-6">
      <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
        Selecione o Polo
      </h2>
      <div className="flex w-full flex-col items-center justify-start bg-gray-100 pt-20">
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/classification/average-scores-for-poles">
            <button className="h-16 w-64 rounded-lg bg-pmpa-blue-500 text-lg font-semibold text-white shadow-lg">
              CFAP
            </button>
          </Link>
          <Link to="/classification/average-scores-for-poles">
            <button className="h-16 w-64 rounded-lg bg-pmpa-blue-500 text-lg font-semibold text-white shadow-lg">
              SANTARÉM
            </button>
          </Link>
          <Link to="/classificacao/BEM">
            <button className="h-16 w-64 rounded-lg bg-pmpa-blue-500 text-lg font-semibold text-white shadow-lg">
              BELÉM
            </button>
          </Link>
          <Link to="/classificacao/CASTANHAL">
            <button className="h-16 w-64 rounded-lg bg-pmpa-blue-500 text-lg font-semibold text-white shadow-lg">
              CASTANHAL
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
