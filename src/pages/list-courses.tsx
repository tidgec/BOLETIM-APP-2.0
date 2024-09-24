import { Link } from 'react-router-dom'

import { Course } from '@/components/course'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourses } from '@/hooks/use-get-courses'

export function ListCoursesPage() {
  const { courses, isLoading } = useGetCourses()

  const currentUrl = window.location.href.replace('/list-courses', '')

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] text-center sm:text-left">
        <h2 className="w-full border-b-2 border-black text-xl font-semibold">
          Selecione o curso
        </h2>

        <div className="mt-4 flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-start">
          {isLoading ? (
            <>
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="bg-white shadow-md">
                  <Skeleton className="h-40 w-64" />
                </div>
              ))}
            </>
          ) : (
            courses?.map((course) => (
              <div key={course.id} className="bg-white shadow-md">
                <Link
                  to={`${currentUrl}?courseId=${course.id}`}
                  className="block"
                >
                  <Course course={course} />
                </Link>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
