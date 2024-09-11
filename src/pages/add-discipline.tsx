import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { useCreateDiscipline } from '@/hooks/use-create-discipline'

const createDisciplineSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome deve conter no mínimo 3 caracteres' })
    .max(30, { message: 'O nome deve conter no máximo 30 caracteres' }),
})

type CreateDisciplineSchema = z.infer<typeof createDisciplineSchema>

export function AddDiscipline() {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<CreateDisciplineSchema>({
    resolver: zodResolver(createDisciplineSchema),
    defaultValues: {
      name: '',
    },
  })

  const { mutateAsync: createDisciplineFn } = useCreateDiscipline()

  async function handleCreateDiscipline({ name }: CreateDisciplineSchema) {
    try {
      await createDisciplineFn({
        name,
      })

      toast.success('Disciplina criada com sucesso!', {
        duration: 1000,
      })

      reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-4 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Adicionar disciplina
        </h2>

        <div className="mx-auto my-8 w-full max-w-4xl rounded bg-pmpa-blue-700">
          <form
            className="w-full space-y-4 p-6"
            onSubmit={handleSubmit(handleCreateDiscipline)}
          >
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm text-gray-200">
                Nome da disciplina:
              </label>
              <input
                type="text"
                id="name"
                autoComplete="off"
                className="w-full rounded px-4 py-3 text-sm text-gray-700"
                placeholder="Digite o nome da disciplina..."
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
              Adicionar
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
