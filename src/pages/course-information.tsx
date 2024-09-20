import { Link, useParams } from 'react-router-dom'

import DisciplineIcon from '@/assets/disciplines-icon.png'
import Inform from '@/assets/info-icon.png'

export function CourseManagementInformation() {
  const { id } = useParams()

  return (
    <section className="mx-auto w-full max-w-[90rem] px-4 py-10 text-center sm:text-left md:py-6">
      <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
        Disciplinas
      </h2>

      <div className="mx-auto my-6 grid w-full max-w-7xl grid-cols-1 justify-items-center gap-4 py-2 md:grid-cols-2 md:justify-items-start lg:grid-cols-3">
        <Link
          to={`/courses/management/${id}/poles`}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={Inform}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Pólos</span>
        </Link>
        <Link
          to={`/courses/management/${id}/disciplines`}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={DisciplineIcon}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Disciplinas</span>
        </Link>
      </div>
    </section>
  )
}
