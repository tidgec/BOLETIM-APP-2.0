import { useFormContext } from 'react-hook-form'

export function FilterUsername() {
  const { register } = useFormContext()

  return (
    <input
      type="text"
      placeholder="Busque por nome"
      className="w-full flex-1 rounded border p-2"
      {...register('username')}
    />
  )
}
