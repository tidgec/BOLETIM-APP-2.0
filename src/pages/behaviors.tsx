import { Link } from 'react-router-dom'

import AddLotIcon from '@/assets/add-lot-icon.png'
import PlusIcon from '@/assets/add-plus-icon.png'
import RemoveIcon from '@/assets/remove-icon.png'
import UpdateIcon from '@/assets/update-icon.png'

export function Behaviors() {
  return (
    <section className="mx-auto w-full max-w-[90rem] px-4 py-10 text-center sm:text-left md:py-6">
      <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
        Comportamentos
      </h2>

      <div className="mx-auto my-6 grid w-full max-w-7xl grid-cols-1 justify-items-center gap-4 py-2 md:grid-cols-2 md:justify-items-start lg:grid-cols-3">
        <Link
          to={'/behaviors/add/list-courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={PlusIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">
            Adicionar Comportamento
          </span>
        </Link>
        <Link
          to={'/behaviors/batch'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={AddLotIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Comportamentos em lote</span>
        </Link>
        <Link
          to={'/behaviors/update/list-courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={UpdateIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">
            Atualizar Comportamento
          </span>
        </Link>
        <Link
          to={'/behaviors/remove/list-courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={RemoveIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Remover Comportamento</span>
        </Link>
      </div>
    </section>
  )
}
