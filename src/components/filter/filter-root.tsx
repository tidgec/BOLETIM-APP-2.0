import { zodResolver } from '@hookform/resolvers/zod'
import { ReactNode } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Button } from '../ui/button'

const studentFiltersSchema = z.object({
  username: z.string().optional(),
  cpf: z.string().optional(),
  poleId: z.string().optional(),
})

type StudentFiltersSchema = z.infer<typeof studentFiltersSchema>

interface FilterRootProps {
  children: ReactNode
}

export function FilterRoot({ children }: FilterRootProps) {
  const [searchParams, setSearchParams] = useSearchParams()

  const poleId = searchParams.get('poleId')
  const cpf = searchParams.get('cpf')
  const username = searchParams.get('username')

  const studentsFilterForm = useForm<StudentFiltersSchema>({
    resolver: zodResolver(studentFiltersSchema),
    defaultValues: {
      poleId: poleId ?? 'all',
      cpf: cpf ?? '',
      username: username ?? '',
    },
  })

  const { handleSubmit } = studentsFilterForm

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
    <form
      onSubmit={handleSubmit(handleFilter)}
      className="mb-4 mt-4 flex w-full flex-col items-start gap-4 md:flex-row md:gap-2"
    >
      <div className="flex w-full flex-col gap-2 md:flex-grow md:flex-row">
        <FormProvider {...studentsFilterForm}>{children}</FormProvider>
      </div>
      <div className="flex w-full justify-center md:justify-end">
        <Button type="submit" className="h-12 w-full md:w-20">
          Filtrar
        </Button>
      </div>
    </form>
  )
}
