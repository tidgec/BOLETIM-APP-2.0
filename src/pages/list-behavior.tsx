import { Course } from '@/components/course'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourses } from '@/hooks/use-get-courses'

export function ListBehaviorPage() {
  const { courses, isLoading } = useGetCourses()

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-2 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-black text-xl font-semibold">
          Selecione o curso
        </h2>

        <div className="flex flex-wrap justify-center">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="m-10 w-80 bg-white py-1 shadow-md">
                  <Skeleton className="mb-2 h-40 w-full" />
                  <Skeleton className="mx-auto h-6 w-3/4" />
                </div>
              ))
            : courses?.map((course) => (
                <div
                  key={course.id}
                  className="m-10 w-80 bg-white py-1 shadow-md"
                >
                  <Course course={course} />
                </div>
              ))}
        </div>
      </section>
    </div>
  )
}
