import { FilterForm } from '@/components/filter/filter-form'

export function SearchManagerToUpdateInfo() {

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Buscar alunos
        </h2>
        <FilterForm/>
      </section>
    </div>
  )
}
