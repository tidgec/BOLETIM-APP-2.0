import { Discipline } from '@/components/discipline'
import { useGetCourseDisciplines } from '@/hooks/use-get-course-disciplines'
import { useSearchParams } from 'react-router-dom'

export function ListCourseDisciplinesPage() {
  const [searchParams] = useSearchParams()

  const courseId = searchParams.get('courseId')

  const { disciplines, isLoading } = useGetCourseDisciplines(String(courseId))

  return (
    <div className="container mx-auto w-full p-4">
      <section className="max-w[90rem] mx-auto w-full">
        <h2 className="w-full border-b-2 border-black py-4 text-xl font-semibold">
          Disciplinas
        </h2>
        <div className="mb-4 flex items-center py-4">
          <input
            type="text"
            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
            placeholder="Pesquise pela disciplina"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            disciplines?.map((discipline) => (
              <Discipline
                key={discipline.disciplineId}
                courseId={String(courseId)}
                disciplineId={discipline.disciplineId}
                name={discipline.name}
              />
            ))}
        </div>
      </section>
    </div>
  )
}
