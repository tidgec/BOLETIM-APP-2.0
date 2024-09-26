import { Link } from 'react-router-dom'

import Info from '@/assets/info-icon.png'
import Reportcard from '@/assets/reportcard-icon.png'
import { Skeleton } from '@/components/ui/skeleton'
import { useProfile } from '@/hooks/use-profile'

export function StudentHome() {
  const { user } = useProfile()

  return (
    <section className="mx-auto w-full max-w-[90rem] px-2 py-10 md:py-6">
      <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
        {!user ? <Skeleton className="h-4 w-20" /> : user.username}
      </h2>

      <div className="mx-auto my-6 grid w-full max-w-7xl grid-cols-1 justify-items-center gap-4 py-2 md:grid-cols-2 md:justify-items-start lg:grid-cols-3">
        {/* <Link
          to={'/student/qts'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={QTS}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">QTS</span>
        </Link> */}
        <Link
          to={'/student/course-information'}
          className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
        >
          <img
            src={Info}
            className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
            alt=""
          />
          <span className="font-medium text-white">Informações do Curso</span>
        </Link>
        {user ? (
          <Link
            to={`/students/${user?.id}/boletim/courses`}
            className="relative flex h-52 w-full max-w-80 justify-end rounded bg-pmpa-blue-700 px-6 py-4"
          >
            <img
              src={Reportcard}
              className="absolute right-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
              alt=""
            />
            <span className="font-medium text-white">Boletim</span>
          </Link>
        ) : (
          <Skeleton className="h-52 w-full max-w-80 bg-slate-300" />
        )}
      </div>
    </section>
  )
}
