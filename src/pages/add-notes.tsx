import { CreateAssessmentForm } from '@/components/create-assessment-form'
import { Pagination } from '@/components/pagination'
import { useGetCoursePoles } from '@/hooks/use-get-course-poles'
import { useGetCourseStudents } from '@/hooks/use-get-course-students'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const studentFiltersSchema = z.object({
  username: z.string().optional(),
  cpf: z.string().optional(),
  poleId: z.string().optional(),
})

type StudentFiltersSchema = z.infer<typeof studentFiltersSchema>

export function AddNotes() {
  const { courseId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const poleId = searchParams.get('poleId')
  const cpf = searchParams.get('cpf')
  const username = searchParams.get('username')
  const page = searchParams.get('page')

  const { handleSubmit, register, control } = useForm<StudentFiltersSchema>({
    resolver: zodResolver(studentFiltersSchema),
    defaultValues: {
      poleId: poleId ?? 'all',
      cpf: cpf ?? '',
      username: username ?? '',
    },
  })

  const { students, totalItems, pages, isLoading } = useGetCourseStudents({
    courseId: String(courseId),
    cpf: cpf ?? '',
    username: username ?? '',
    page: page ?? '1',
  })

  const { poles, isLoading: isLoadingPoles } = useGetCoursePoles({
    courseId: String(courseId),
  })

  function handleFilter({ poleId, cpf, username }: StudentFiltersSchema) {
    setSearchParams((state) => {
      if (poleId) {
        state.set('poleId', poleId)
      } else {
        state.delete('poleId')
      }

      if (cpf) {
        state.set('cpf', cpf)
      } else {
        state.delete('cpf')
      }

      if (username) {
        state.set('username', username)
      } else {
        state.delete('username')
      }

      state.set('page', '1')

      return state
    })
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black py-4 text-xl font-semibold">
          Adicionar nota
        </h2>

        <form
          onSubmit={handleSubmit(handleFilter)}
          className="mb-4 mt-4 flex w-full justify-between gap-2"
        >
          <div className="flex w-full max-w-3xl gap-2">
            <input
              type="text"
              placeholder="Busque por CPF"
              className="w-full flex-1 rounded border p-2"
              {...register('cpf')}
            />

            <input
              type="text"
              placeholder="Busque por nome  "
              className="w-full flex-1 rounded border p-2"
              {...register('username')}
            />

            {isLoading && <p>Loading...</p>}
            <Controller
              name="poleId"
              defaultValue="all"
              control={control}
              render={({ field: { name, onChange, value, disabled } }) => {
                return (
                  <select
                    name={name}
                    value={value}
                    disabled={disabled}
                    onChange={onChange}
                    className="rounded border p-2"
                  >
                    <option value={'all'}>TODOS</option>

                    {!isLoadingPoles &&
                      poles?.map((pole) => (
                        <option key={pole.id} value={pole.id}>
                          {pole.name}
                        </option>
                      ))}
                  </select>
                )
              }}
            ></Controller>
          </div>

          <button className="rounded bg-pmpa-blue-600 px-4 text-white hover:bg-pmpa-blue-500">
            Filtrar
          </button>
        </form>

        {isLoading && <p>Loading...</p>}

        <div className="mx-2 mb-4 h-[36rem] space-y-4 overflow-auto">
          {!isLoading &&
            students?.map((student) => (
              <div key={student.id} className="rounded border p-4">
                <h2 className="mb-4 text-lg font-bold">
                  Nome: {student.username}
                </h2>
                <p>Curso: {student.course.name}</p>
                <p>Polo: {student.pole.name}</p>

                <CreateAssessmentForm studentId={student.id} />
              </div>
            ))}
        </div>

        <Pagination
          items={totalItems ?? 0}
          page={page ? Number(page) : 1}
          pages={pages ?? 0}
        />
      </section>
    </div>
  )
}
