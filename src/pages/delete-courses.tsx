import CFO from '@/assets/cfo-img-curso.jpg'
import { Skeleton } from '@/components/ui/skeleton'

const courses = [
  { id: 1, title: 'CAS - 2023' },
  { id: 2, title: 'CAS TURMA I - 2024' },
  { id: 3, title: 'CAS TURMA II - 2023' },
]

export function DeleteCourses() {
  const isLoading = false

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-4 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Deletar cursos
        </h2>

        <div className="flex flex-wrap justify-center">
          {isLoading ? (
            <>
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="m-10 w-80 bg-white py-1 shadow-md">
                  <div className="flex flex-col items-center">
                    <Skeleton className="mb-4 h-40 w-full" />
                    <Skeleton className="mb-2 h-6 w-3/4" />
                    <Skeleton className="h-8 w-1/2 rounded bg-pmpa-blue-500 px-4 py-2 text-white" />
                  </div>
                </div>
              ))}
            </>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                className="m-10 w-80 bg-white py-1 shadow-md"
              >
                <div className="flex flex-col items-center">
                  <img src={CFO} alt="Polícia Militar" className="mb-4" />
                  <h3 className="mb-2 text-xl">{course.title}</h3>
                  <button className="rounded bg-pmpa-blue-500 px-4 py-2 text-white">
                    Deletar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
