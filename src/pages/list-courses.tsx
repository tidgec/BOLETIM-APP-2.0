import { Link } from 'react-router-dom'

import { Course } from '@/components/course'
import { useGetCourses } from '@/hooks/use-get-courses'

export function ListCoursesPage() {
  const { courses, isLoading } = useGetCourses()

  const currentUrl = window.location.href.replace('/courses', '')

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-2 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-black text-xl font-semibold">
          Selecione o curso
        </h2>

        <div className="flex flex-wrap justify-center">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            courses?.map((course) => (
              <div
                key={course.id}
                className="m-10 w-80 bg-white py-1 shadow-md"
              >
                <Link
                  to={`${currentUrl}?courseId=${course.id}`}
                  className="block"
                >
                  <Course course={course} />
                </Link>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
