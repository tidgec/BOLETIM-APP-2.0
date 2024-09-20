import { Link, useSearchParams } from 'react-router-dom'

import { Course } from '@/components/course'
import { Pagination } from '@/components/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourses } from '@/hooks/use-get-courses'

export function AllCourses() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const {
    courses,
    totalItems,
    pages,
    isLoading: isLoadingGetCourses,
  } = useGetCourses(page)

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-2 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Todos os cursos
        </h2>

        <div className="flex flex-wrap justify-center">
          {isLoadingGetCourses
            ? [1, 2, 3].map((_, index) => (
                <div key={index} className="m-10 w-80 bg-white py-1 shadow-md">
                  <Skeleton className="h-40 w-full" />
                </div>
              ))
            : courses?.map((course) => (
                <Link
                  to={`/courses/management/${course.id}`}
                  key={course.id}
                  className="m-10 w-80 bg-white py-1 shadow-md"
                >
                  <Course course={course} />
                </Link>
              ))}
        </div>

        {courses && (
          <Pagination
            items={totalItems ?? 0}
            pages={pages ?? 0}
            page={page ? Number(page) : 1}
          />
        )}
      </section>
    </div>
  )
}
