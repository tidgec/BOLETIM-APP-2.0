import { useGetCoursePoles } from '@/hooks/use-get-course-poles'
import { useGetCourseStudents } from '@/hooks/use-get-course-students'
import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { z } from 'zod'

const studentFiltersSchema = z.object({
  search: z.string().optional(),
  poleId: z.string().optional(),
})

type StudentFiltersSchema = z.infer<typeof studentFiltersSchema>

export function AddNotes() {
  const { courseId } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const poleId = searchParams.get('poleId')
  const search = searchParams.get('search')

  const { handleSubmit, register, control } = useForm<StudentFiltersSchema>({
    resolver: zodResolver(studentFiltersSchema),
    defaultValues: {
      poleId: poleId ?? 'all',
      search: search ?? '',
    },
  })

  console.log(poleId)
  console.log(search)

  const { students, isLoading } = useGetCourseStudents({
    courseId: String(courseId),
  })

  const { poles, isLoading: isLoadingPoles } = useGetCoursePoles({
    courseId: String(courseId),
  })

  function handleFilter({ poleId, search }: StudentFiltersSchema) {
    setSearchParams((state) => {
      if (poleId) {
        state.set('poleId', poleId)
      } else {
        state.delete('poleId')
      }

      if (search) {
        state.set('search', search)
      } else {
        state.delete('search')
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
              placeholder="PESQUISE POR NOME, CPF"
              className="w-full flex-1 rounded border p-2"
              {...register('search')}
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

        {!isLoading &&
          students?.map((student) => (
            <div key={student.id} className="mb-4 rounded border p-4">
              <h2 className="mb-4 text-lg font-bold">
                Nome: {student.username}
              </h2>
              <p>Curso: {student.course.name}</p>
              <p>Polo: {student.pole.name}</p>

              <div className="mt-4 grid grid-cols-2 gap-4">
                {['VC I', 'VC II', 'VF', 'VFE'].map((month) => (
                  <div key={month} className="flex flex-col items-center">
                    <label>{month}</label>
                    <input
                      type="text"
                      placeholder="0,00"
                      className="w-full rounded border bg-pmpa-blue-500 p-2 text-center text-white"
                    />
                  </div>
                ))}
              </div>
              <div>
                <button
                  type="submit"
                  className="my-3 ml-auto block rounded bg-pmpa-blue-800 px-3 py-2 text-white hover:bg-pmpa-blue-500"
                >
                  Adicionar
                </button>
              </div>
            </div>
          ))}
      </section>
    </div>
  )
}
