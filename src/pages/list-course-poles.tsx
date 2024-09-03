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
      <section className="mx-auto w-full max-w-[90rem] px-2 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-black text-xl font-semibold">
          Selecione o polo
        </h2>

        <div className="flex flex-wrap justify-center gap-4 py-6">
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
