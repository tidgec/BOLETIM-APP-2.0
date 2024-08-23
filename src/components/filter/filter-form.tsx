import { Filter } from '.'

export function FilterForm() {
  return (
    <Filter.Root>
      <Filter.UsernameInput />
      <Filter.CPFInput />
      <Filter.Select />
    </Filter.Root>
  )
}
