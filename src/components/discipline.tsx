import { Link } from 'react-router-dom'

interface DisciplineProps {
  disciplineId: string
  name: string
}

export function Discipline({ disciplineId, name }: DisciplineProps) {
  const currentUrl = window.location.href

  return (
    <Link
      key={disciplineId}
      to={`${currentUrl}/disciplines/${disciplineId}`}
      className="focus-shadow-outline rounded bg-pmpa-blue-500 px-4 py-2 font-bold text-white hover:bg-pmpa-blue-700 focus:outline-none"
    >
      {name}
    </Link>
  )
}
