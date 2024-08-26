import { Course } from '@/components/course'
import { useGetCourses } from '@/hooks/use-get-courses'

export function DeleteAdmin() {
  const { courses, isLoading } = useGetCourses(1)

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
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
                <Course course={course} />
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
