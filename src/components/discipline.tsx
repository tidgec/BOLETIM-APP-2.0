interface DisciplineProps {
  name: string
}

export function Discipline({ name }: DisciplineProps) {
  return (
    <p className="focus-shadow-outline h-full rounded bg-pmpa-blue-500 px-4 py-2 font-bold text-white hover:bg-pmpa-blue-700 focus:outline-none">
      {name}
    </p>
  )
}
