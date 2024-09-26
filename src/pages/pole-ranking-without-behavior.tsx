import { useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

import { OverallPoleRankingWithoutBehavior } from '@/components/overall-pole-ranking-without-behavior'
import { useGetCourse } from '@/hooks/use-get-course'

export function PoleRankingWithoutBehavior() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const { id } = useParams()

  const [isOverall, setIsOverall] = useState<boolean>(true)

  const { course } = useGetCourse({
    courseId: String(courseId),
  })

  if (course?.formula === 'CFO' && isOverall) {
    return (
      <div className="w-full py-6">
        <section className="mx-auto w-full max-w-[90rem] text-center sm:text-left">
          <h2 className="w-full border-b-2 border-black text-xl font-semibold">
            Selecione a classificação
          </h2>

          <div className="mt-4 flex w-full flex-col items-center justify-center gap-4 px-4 md:flex-row">
            <Link
              to={`/rankings/poles/no-beahavior/${id}/sub-ranking?courseId=${course.id}&disciplineModule=1&hasBehavior=false`}
              className="h-16 w-full max-w-64 rounded-lg bg-pmpa-blue-500 text-lg font-semibold text-white shadow-lg"
            >
              <button className="h-full w-full">1º Período</button>
            </Link>
            <Link
              to={`/rankings/poles/no-beahavior/${id}/sub-ranking?courseId=${course.id}&disciplineModule=2&hasBehavior=false`}
              className="h-16 w-full max-w-64 rounded-lg bg-pmpa-blue-500 text-lg font-semibold text-white shadow-lg"
            >
              <button className="h-full w-full">2º Período</button>
            </Link>
            <Link
              to={`/rankings/poles/no-beahavior/${id}/sub-ranking?courseId=${course.id}&disciplineModule=3&hasBehavior=false`}
              className="h-16 w-full max-w-64 rounded-lg bg-pmpa-blue-500 text-lg font-semibold text-white shadow-lg"
            >
              <button className="h-full w-full">3º Período</button>
            </Link>

            <button
              className="h-16 w-full max-w-64 rounded-lg bg-pmpa-blue-500 text-lg font-semibold text-white shadow-lg"
              onClick={() => setIsOverall(false)}
            >
              Geral
            </button>
          </div>
        </section>
      </div>
    )
  }

  return <OverallPoleRankingWithoutBehavior />
}
