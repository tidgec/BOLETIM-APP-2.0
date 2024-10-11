import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { z } from 'zod'

import { Pagination } from '@/components/pagination'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetReports } from '@/hooks/use-get-reports'

const reportFiltersSchema = z.object({
  username: z.string().optional(),
  action: z.string().optional(),
})

type ReportFiltersSchema = z.infer<typeof reportFiltersSchema>

export function Reports() {
  const [toPaginated, setToPaginated] = useState<boolean>(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const action = searchParams.get('action') ?? 'all'
  const username = searchParams.get('username') ?? ''
  const page = searchParams.get('page') ?? '1'

  const { handleSubmit, register, control } = useForm<ReportFiltersSchema>({
    resolver: zodResolver(reportFiltersSchema),
    defaultValues: {
      action,
      username,
    },
  })

  const { reports, totalItems, pages, isLoading } = useGetReports({
    action,
    username,
    page: toPaginated ? page : undefined,
  })

  function handleFilter({ action, username }: ReportFiltersSchema) {
    setSearchParams((state) => {
      if (action) {
        state.set('action', action)
      } else {
        state.delete('action')
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

  function handlePrintReport() {
    setToPaginated(false)

    window.print()

    setToPaginated(true)
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem] px-4 text-center sm:text-left">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Relatórios
        </h2>

        <div className="group relative mx-auto my-8 h-[46rem] max-w-6xl overflow-auto rounded bg-white p-4 shadow-md print:h-auto print:overflow-hidden">
          <div className="mb-8 flex items-center justify-between">
            <form
              onSubmit={handleSubmit(handleFilter)}
              className="mb-4 mt-4 flex w-full flex-col items-start gap-4 md:flex-row md:gap-2 print:hidden"
            >
              <div className="flex w-full flex-col gap-2 md:flex-grow md:flex-row">
                <input
                  type="text"
                  placeholder="Digite um nome..."
                  className="w-full flex-1 rounded border p-2"
                  {...register('username')}
                />
                <div>
                  <Controller
                    name="action"
                    defaultValue="all"
                    control={control}
                    render={({
                      field: { name, onChange, value, disabled },
                    }) => (
                      <select
                        name={name}
                        value={value}
                        disabled={disabled}
                        onChange={onChange}
                        className="rounded border p-2 text-center"
                      >
                        <option value={'all'}>TODOS</option>
                        <option value={'add'}>Adições</option>
                        <option value={'remove'}>Remoções</option>
                        <option value={'update'}>Atualizações</option>
                        <option value={'login confirmed'}>
                          Confirmação de login
                        </option>
                      </select>
                    )}
                  />
                </div>
              </div>
              <div className="flex w-full justify-center md:justify-end">
                <Button type="submit" className="h-12 w-full md:w-20">
                  Filtrar
                </Button>
              </div>
            </form>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Skeleton className="h-64 w-[520px]" />
              <Skeleton className="h-64 w-[520px]" />
            </div>
          ) : (
            <div className="flex flex-col items-start justify-center space-y-4 px-2 lg:items-center print:space-y-8">
              {reports?.map((report) => (
                <div
                  key={report.id}
                  className="w-auto text-left lg:w-full lg:max-w-3xl"
                >
                  <pre className="text-clip text-wrap">
                    {report.content.trim()}
                  </pre>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mx-auto max-w-6xl print:hidden">
          {reports && (
            <Pagination
              items={totalItems ?? 0}
              page={page ? Number(page) : 1}
              pages={pages ?? 0}
            />
          )}
        </div>

        <div className="mx-auto mt-4 flex max-w-6xl items-center justify-end print:hidden">
          <Button size={'lg'} onClick={handlePrintReport}>
            Baixar
          </Button>
        </div>
      </section>
    </div>
  )
}
