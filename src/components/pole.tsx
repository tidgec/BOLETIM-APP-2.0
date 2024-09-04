import { Link } from 'react-router-dom'

interface PoleProps {
  courseId: string
  pole: {
    id: string
    name: string
  }
}

export function Pole({ pole, courseId }: PoleProps) {
  const currentUrl = window.location.href.replace(`?courseId=${courseId}`, '')

  return (
    <Link to={`${currentUrl}/${pole.id}?courseId=${courseId}`}>
      <button className="h-16 w-64 rounded-lg bg-pmpa-blue-500 text-lg font-semibold text-white shadow-lg">
        {pole.name}
      </button>
    </Link>
  )
}
