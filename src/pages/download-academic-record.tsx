import { useSearchParams } from 'react-router-dom'

import { Course } from '@/components/course'
import { Pagination } from '@/components/pagination'
import { useGetCourses } from '@/hooks/use-get-courses'

export function DownloadAcademicRecord() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const { courses, totalItems, pages, isLoading } = useGetCourses(page)

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Baixar Histórico Escolar
        </h2>
        <p className="mt-2 text-sm">
          Para baixar o histórico, basta clicar no curso.
        </p>

        {isLoading && <p>Loading...</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {!isLoading &&
            courses?.map((course) => (
              <button
                key={course.id}
                className="m-10 w-80 bg-white py-1 shadow-md"
              >
                <Course course={course} />
              </button>
            ))}
        </div>

        {courses && (
          <Pagination
            items={totalItems ?? 0}
            page={page ? Number(page) : 0}
            pages={pages ?? 0}
          />
        )}
      </section>
    </div>
  )
}
