import Skeleton from 'react-loading-skeleton'

import { Course } from '@/components/course'
import { useGetCourses } from '@/hooks/use-get-courses'

export function StudentDownloadAcademicRecord() {
  const { courses, isLoading } = useGetCourses()

  async function handleDownloadAcademicRecord() {}

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Selecione o curso
        </h2>

        <div className="flex justify-center">
          {isLoading ? (
            <>
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="m-10 bg-white shadow-md">
                  <Skeleton className="h-40 w-64" />
                </div>
              ))}
            </>
          ) : (
            courses?.map((course) => (
              <div
                key={course.id}
                className="m-10 cursor-pointer bg-white shadow-md"
                onClick={handleDownloadAcademicRecord}
              >
                <Course course={course} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
