import { FilterCPF } from './filter-cpf'
import { FilterPole } from './filter-pole'
import { FilterRoot } from './filter-root'
import { FilterUsername } from './filter-username'

export const Filter = {
  Root: FilterRoot,
  UsernameInput: FilterUsername,
  CPFInput: FilterCPF,
  Select: FilterPole,
}
