import { Course } from '@/components/course'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
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

        {isLoading && (
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="bg-white shadow-md">
              <Skeleton className="h-40 w-80" />
            </div>

            <div className="bg-white shadow-md">
              <Skeleton className="h-40 w-80" />
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap justify-center">
          {!isLoading &&
            courses?.map((course) => (
              <div key={course.id} className="bg-white shadow-md">
                <Button
                  variant={'outline'}
                  className="block h-full bg-transparent p-0"
                  onClick={() => handleDownloadSummary(course.id)}
                >
                  <Course course={course} />
                </Button>
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
