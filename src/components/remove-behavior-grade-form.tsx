import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { useRemoveBehaviorGrade } from '@/hooks/use-remove-behavior-grade'
import { fail } from '@/utils/fail'

import { Checkbox } from './ui/checkbox'

const removeBehaviorGradeFormSchema = z.object({
  january: z.boolean().optional(),
  february: z.boolean().optional(),
  march: z.boolean().optional(),
  april: z.boolean().optional(),
  may: z.boolean().optional(),
  jun: z.boolean().optional(),
  july: z.boolean().optional(),
  august: z.boolean().optional(),
  september: z.boolean().optional(),
  october: z.boolean().optional(),
  november: z.boolean().optional(),
  december: z.boolean().optional(),
})

type RemoveBehaviorGradeFormSchema = z.infer<
  typeof removeBehaviorGradeFormSchema
>

interface RemoveBehaviorGradeFormProps {
  id: string
}

export function RemoveBehaviorGradeForm({ id }: RemoveBehaviorGradeFormProps) {
  const { mutateAsync: removeBehaviorGradeFn } = useRemoveBehaviorGrade()

  const { handleSubmit, control, reset } =
    useForm<RemoveBehaviorGradeFormSchema>({
      resolver: zodResolver(removeBehaviorGradeFormSchema),
    })

  async function handleRemoveBehaviorGrade({
    january,
    february,
    march,
    april,
    may,
    jun,
    july,
    august,
    september,
    october,
    november,
    december,
  }: RemoveBehaviorGradeFormSchema) {
    try {
      await removeBehaviorGradeFn({
        id,
        january: january ? -1 : undefined,
        february: february ? -1 : undefined,
        march: march ? -1 : undefined,
        april: april ? -1 : undefined,
        may: may ? -1 : undefined,
        jun: jun ? -1 : undefined,
        july: july ? -1 : undefined,
        august: august ? -1 : undefined,
        september: september ? -1 : undefined,
        october: october ? -1 : undefined,
        november: november ? -1 : undefined,
        december: december ? -1 : undefined,
      })
      toast.success('Notas de comportamento removidas com sucesso!', {
        duration: 2000,
      })

      reset()
    } catch (err) {
      fail(err)
    }
  }

  return (
    <form
      className="mt-2 flex flex-col items-center justify-center gap-4"
      onSubmit={handleSubmit(handleRemoveBehaviorGrade)}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
        <div className="flex flex-col items-center">
          <label htmlFor="january">Janeiro</label>
          <Controller
            name="january"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="january"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="february">Fevereiro</label>
          <Controller
            name="february"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="vf"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="march">Março</label>
          <Controller
            name="march"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="march"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="april">Abril</label>
          <Controller
            name="april"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="april"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="may">Maio</label>
          <Controller
            name="may"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="may"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="jun">Junho</label>
          <Controller
            name="jun"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="jun"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="july">Julho</label>
          <Controller
            name="july"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="july"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="august">Agosto</label>
          <Controller
            name="august"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="august"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="september">Setembro</label>
          <Controller
            name="september"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="september"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="october">Outubro</label>
          <Controller
            name="october"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="october"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="november">Novembro</label>
          <Controller
            name="november"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="november"
                />
              )
            }}
          ></Controller>
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="december">Dezembro</label>
          <Controller
            name="december"
            defaultValue={false}
            control={control}
            render={({ field: { name, onChange, value, disabled } }) => {
              return (
                <Checkbox
                  name={name}
                  checked={value}
                  disabled={disabled}
                  onCheckedChange={onChange}
                  className="h-6 w-6"
                  id="december"
                />
              )
            }}
          ></Controller>
        </div>
      </div>
      <button
        type="submit"
        className="rounded bg-pmpa-blue-600 px-4 py-2 text-white hover:bg-pmpa-blue-500"
      >
        Remover
      </button>
    </form>
  )
}
