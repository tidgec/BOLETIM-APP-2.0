import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

const addCourseSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome do curso deve ter no mínimo 3 caracteres' })
    .max(30, { message: 'O nome do curso deve ter no máximo 30 caracteres' }),
  formula: z.enum(['CAS', 'CGS', 'CFP', 'CHO', 'CFO', 'none']),
  endsAt: z.string(),
  poleIds: z.array(z.string()),
})

type AddCourseSchema = z.infer<typeof addCourseSchema>

export function AddCourses() {
  const [steps, setSteps] = useState(0)

  const { handleSubmit, register, control } = useForm<AddCourseSchema>({
    resolver: zodResolver(addCourseSchema),
    defaultValues: {
      name: '',
      formula: 'none',
    },
  })

  function handleNextStep(step: number) {
    if (step === 2) setSteps(2)
    setSteps(step)
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-4 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Adicionar Cursos
        </h2>

        <div className="mx-auto my-12 max-w-4xl rounded bg-pmpa-blue-700">
          <form className="w-full p-6">
            {steps === 0 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm text-gray-200">
                    Nome do curso:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite o nome do curso"
                    {...register('name')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="formula"
                    className="mb-2 block text-sm text-gray-200"
                  >
                    Selecione a fórmula do curso:
                  </label>
                  <Controller
                    name="formula"
                    defaultValue="none"
                    control={control}
                    render={({
                      field: { name, onChange, value, disabled },
                    }) => {
                      return (
                        <select
                          name={name}
                          value={value}
                          disabled={disabled}
                          onChange={onChange}
                          className="rounded border p-2"
                        >
                          <option value="none">Selecione</option>
                          <option value="CAS">CAS</option>
                          <option value="CGS">CGS</option>
                          <option value="CFP">CFP</option>
                          <option value="CHO">CHO</option>
                          <option value="CFO">CFO</option>
                        </select>
                      )
                    }}
                  />
                </div>

                {/* <div>
                          <label
                            htmlFor="quantity"
                            className="mb-2 block text-sm text-gray-200"
                          >
                            Quantidade de módulos
                          </label>
                          <input
                            type="text"
                            id="quantity"
                            placeholder="0"
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                          />
                        </div> */}

                {/* 
                        <div>
                          <label
                            htmlFor="weight"
                            className="mb-2 block text-sm text-gray-200"
                          >
                            Este curso terá peso sob os módulos?
                          </label>
                          <select
                            id="weight"
                            className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                          >
                            <option value="false">Não</option>
                            <option value="true">Sim</option>
                          </select>
                        </div> */}

                <div className="space-y-1">
                  <label htmlFor="startDate" className="text-sm text-gray-200">
                    Data de início:
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite a data de início do curso"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="endsAt" className="text-sm text-gray-200">
                    Data de conclusão:
                  </label>
                  <input
                    type="date"
                    id="endsAt"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite a data de conclusão do curso"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="image" className="text-sm text-gray-200">
                    Adicionar imagem do curso:
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    accept="image/*"
                  />
                </div>

                <button
                  type="button"
                  className="ml-auto block rounded bg-pmpa-blue-500 px-3 py-2 text-white hover:bg-pmpa-blue-900"
                >
                  Próximo
                </button>
              </div>
            )}

            {steps === 1 && (
              <div className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="name" className="text-sm text-gray-200">
                    Nome do curso:
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite o nome do curso"
                    {...register('name')}
                  />
                </div>

                <div>
                  <label
                    htmlFor="formula"
                    className="mb-2 block text-sm text-gray-200"
                  >
                    Selecione a fórmula do curso:
                  </label>
                  <Controller
                    name="formula"
                    defaultValue="none"
                    control={control}
                    render={({
                      field: { name, onChange, value, disabled },
                    }) => {
                      return (
                        <select
                          name={name}
                          value={value}
                          disabled={disabled}
                          onChange={onChange}
                          className="rounded border p-2"
                        >
                          <option value="none">Selecione</option>
                          <option value="CAS">CAS</option>
                          <option value="CGS">CGS</option>
                          <option value="CFP">CFP</option>
                          <option value="CHO">CHO</option>
                          <option value="CFO">CFO</option>
                        </select>
                      )
                    }}
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="startDate" className="text-sm text-gray-200">
                    Data de início:
                  </label>
                  <input
                    type="date"
                    id="startDate"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite a data de início do curso"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="endsAt" className="text-sm text-gray-200">
                    Data de conclusão:
                  </label>
                  <input
                    type="date"
                    id="endsAt"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    placeholder="Digite a data de conclusão do curso"
                  />
                </div>

                <div className="space-y-1">
                  <label htmlFor="image" className="text-sm text-gray-200">
                    Adicionar imagem do curso:
                  </label>
                  <input
                    type="file"
                    id="image"
                    className="w-full rounded-sm px-4 py-3 text-sm text-gray-700"
                    accept="image/*"
                  />
                </div>

                <button
                  type="button"
                  className="ml-auto block rounded bg-pmpa-blue-500 px-3 py-2 text-white hover:bg-pmpa-blue-900"
                >
                  Próximo
                </button>
              </div>
            )}
          </form>
        </div>
      </section>
    </div>
  )
}
