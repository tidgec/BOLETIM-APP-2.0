import { Link } from 'react-router-dom'

import PlusIcon from '@/assets/add-plus-icon.png'
import RemoveIcon from '@/assets/remove-icon.png'
import UpdateIcon from '@/assets/update-icon.png'

export function NoteBatchPage() {
  return (
    <section className="mx-auto w-full max-w-[90rem] px-4 py-10 text-center  sm:text-left md:py-6">
      <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
        Notas em lote
      </h2>

      <div className="mx-auto my-6 grid w-full max-w-7xl grid-cols-1 justify-items-center gap-4 py-2 md:grid-cols-2 md:justify-items-start lg:grid-cols-3">
        <Link
          to={'/notes/batch/add/list-courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={PlusIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">
            Adicionar notas em lote
          </span>
        </Link>
        <Link
          to={'/notes/batch/update/list-courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={UpdateIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">
            Atualizar notas em lote
          </span>
        </Link>
        <Link
          to={'/notes/batch/remove/list-courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={RemoveIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Remover notas em lote</span>
        </Link>
      </div>
    </section>
  )
}
