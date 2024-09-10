import { Course } from '@/components/course'
import { Button } from '@/components/ui/button'
import { useCreateSummary } from '@/hooks/use-create-summary'
import { useGetCourses } from '@/hooks/use-get-courses'

export function Summary() {
  const { courses, isLoading } = useGetCourses()
  const { mutateAsync: createSummaryFn } = useCreateSummary()

  async function handleDownloadSummary(courseId: string) {
    const { fileUrl } = await createSummaryFn({
      courseId,
    })

    window.location.href = fileUrl
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-2 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-black text-xl font-semibold">
          Selecione o curso para baixar ementa
        </h2>

        <div className="flex flex-wrap justify-center">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            courses?.map((course) => (
              <Button
                key={course.id}
                variant={'outline'}
                className="m-10 h-full w-80 bg-white py-1 shadow-md"
                onClick={() => handleDownloadSummary(course.id)}
              >
                <Course course={course} />
              </Button>
            ))}
        </div>
      </section>
    </div>
  )
}
