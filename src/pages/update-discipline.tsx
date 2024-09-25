import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useUpdateDiscipline } from '@/hooks/use-update-discipline'
import { fail } from '@/utils/fail'

const updateDisciplineSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve conter no mínimo 3 caracteres' })
    .max(30, { message: 'O nome deve conter no máximo 30 caracteres' }),
})

type UpdateDisciplineSchema = z.infer<typeof updateDisciplineSchema>

export function UpdateDiscipline() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const discipline = searchParams.get('discipline')

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UpdateDisciplineSchema>({
    resolver: zodResolver(updateDisciplineSchema),
    defaultValues: {
      name: discipline ?? '',
    },
  })

  const { mutateAsync: updateDisciplineFn } = useUpdateDiscipline()

  async function handleUpdateDiscipline({ name }: UpdateDisciplineSchema) {
    if (!id) return

    try {
      await updateDisciplineFn({
        id,
        name,
      })

      toast.success('Disciplina atualizada com sucesso!', {
        duration: 1000,
      })

      reset()
    } catch (err) {
      fail(err)
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Atualizar disciplina
        </h2>

        <div className="mx-auto my-8 w-full max-w-4xl rounded bg-pmpa-blue-700">
          <form
            className="w-full space-y-4 p-6"
            onSubmit={handleSubmit(handleUpdateDiscipline)}
          >
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm text-gray-200">
                Nome da disciplina
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded px-4 py-3 text-sm text-gray-700"
                placeholder="Digite nome da disciplina"
                {...register('name')}
              />
              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              )}
            </div>
            {/* <div className="space-y-1">
              <label htmlFor="course" className="text-sm text-gray-200">
                Selecione o curso
              </label>
              <select
                id="course"
                className="w-full rounded px-4 py-3 text-sm text-gray-700"
              >
                <option value="">Selecione um curso</option>
                <option value="curso1">CAS</option>
                <option value="curso2">CFP</option>
              </select>
            </div>
            <div className="space-y-1">
              <label htmlFor="pole" className="text-sm text-gray-200">
                Selecione o polo
              </label>
              <select
                id="pole"
                className="w-full rounded px-4 py-3 text-sm text-gray-700"
              >
                <option value="">Selecione um polo</option>
                <option value="belem">Belém</option>
                <option value="santarem">Santarém</option>
              </select>
            </div> */}
            <Button
              type="submit"
              className="bg-pmpa-blue-699 ml-auto block rounded px-3 py-2 text-white hover:bg-pmpa-blue-500"
            >
              Atualizar
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
