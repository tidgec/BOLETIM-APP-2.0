import { useSearchParams } from 'react-router-dom'

import { Pole } from '@/components/pole'
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

        <div className="mx-2 mb-4 mt-4 flex h-[36rem] flex-col gap-4 overflow-auto">
          {isLoadingPoles && <p>Loading...</p>}
          {!isLoadingPoles &&
            poles?.map((pole) => (
              <div key={pole.id}>
                <Pole pole={pole} courseId={courseId ?? ''} />
              </div>
            ))}
        </div>
      </section>
    </div>
  )
}
