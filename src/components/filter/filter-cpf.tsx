import { useFormContext } from 'react-hook-form'

export function FilterCPF() {
  const { register } = useFormContext()

  return (
    <input
      type="text"
      placeholder="Busque por CPF"
      className="w-full flex-1 rounded border p-2"
      {...register('cpf')}
    />
  )
}
