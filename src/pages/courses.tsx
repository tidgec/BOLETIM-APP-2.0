import { Link } from 'react-router-dom'

import PlusIcon from '@/assets/add-plus-icon.png'
import CourseManagement from '@/assets/course-management-icon.png'
import RemoveIcon from '@/assets/remove-icon.png'
import UpdateIcon from '@/assets/update-icon.png'
import { useDecode } from '@/auth'

export function Courses() {
  const decoded = useDecode()

  return (
    <section className=" mx-auto w-full max-w-[90rem] px-4 py-10 text-center sm:text-left md:py-6">
      <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
        Cursos
      </h2>

      <div className="mx-auto my-6 grid w-full max-w-7xl grid-cols-1 justify-items-center gap-4 py-2 md:grid-cols-2 md:justify-items-start lg:grid-cols-3">
        <Link
          to={'/courses/add'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={PlusIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Adicionar Curso</span>
        </Link>
        <Link
          to={'/courses/update/list-courses'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={UpdateIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Atualizar Curso</span>
        </Link>

        {decoded?.user.role === 'dev' && (
          <Link
            to={'/courses/delete'}
            className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
          >
            <img
              src={RemoveIcon}
              className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
              alt=""
            />
            <span className="font-medium text-white">Remover curso</span>
          </Link>
        )}

        <Link
          to={'/courses/management'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={CourseManagement}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Gerenciamento de curso</span>
        </Link>
        {/* <Link
          to={'/courses/QTS'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={QTS}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Adicionar QTS</span>
        </Link>
        <Link
          to={'/import/documents'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={Document}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Importar Documentos</span>
        </Link> */}
      </div>
    </section>
  )
}
