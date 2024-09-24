import { useSearchParams } from 'react-router-dom'

import { Pole } from '@/components/pole'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCoursePoles } from '@/hooks/use-get-course-poles'

export function ListCoursePolesPage() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')

  const { poles, isLoading: isLoadingPoles } = useGetCoursePoles({
    courseId: String(courseId),
  })

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Selecione o polo
        </h2>

        <div className="mx-2 my-4 flex flex-col items-center justify-center gap-4 md:flex-row">
          {isLoadingPoles ? (
            <div className="flex w-full justify-center gap-8">
              <Skeleton className="h-16 w-64 bg-slate-300" />
              <Skeleton className="h-16 w-64 bg-slate-300" />
              <Skeleton className="h-16 w-64 bg-slate-300" />
            </div>
          ) : (
            poles?.map((pole) => (
              <>
                <div key={pole.id} className="flex gap-8">
                  <Pole pole={pole} courseId={courseId ?? ''} />
                </div>
              </>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
