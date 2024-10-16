import { Link } from 'react-router-dom'

import ActiveIcon from '@/assets/active-icon.png'
import AddLotIcon from '@/assets/add-lot-icon.png'
import PlusIcon from '@/assets/add-plus-icon.png'
import BinIcon from '@/assets/bin-icon.png'
import RemoveIcon from '@/assets/remove-icon.png'
import UpdateIcon from '@/assets/update-icon.png'
import { useDecode } from '@/auth'

export function Students() {
  const decoded = useDecode()

  return (
    <section className="mx-auto w-full max-w-[90rem] px-4 py-10 md:py-6">
      <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
        Alunos
      </h2>

      <div className="mx-auto my-6 grid w-full max-w-7xl grid-cols-1 justify-items-center gap-4 py-2 md:grid-cols-2 md:justify-items-start lg:grid-cols-3">
        <Link
          to={'/students/add/list-courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={PlusIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Adicionar Aluno</span>
        </Link>
        <Link
          to={'/students/batch'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={AddLotIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Alunos em Lote</span>
        </Link>
        <Link
          to={'/students/update/list-courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={UpdateIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Atualizar Aluno</span>
        </Link>
        <Link
          to={'/students/enable/list-courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={ActiveIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Ativar Aluno</span>
        </Link>
        <Link
          to={'/students/disable/list-courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={RemoveIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Desativar Aluno</span>
        </Link>
        {decoded?.user.role === 'dev' && (
          <Link
            to={'/students/delete/list-courses'}
            className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
          >
            <img
              src={BinIcon}
              className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
              alt=""
            />
            <span className="font-medium text-white">Excluir Aluno</span>
          </Link>
        )}
      </div>
    </section>
  )
}
