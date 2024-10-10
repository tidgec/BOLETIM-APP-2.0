import { LucideHistory, LucideHome } from 'lucide-react'
import { Link } from 'react-router-dom'

export function StudentMenu({ isOpen }: { isOpen?: boolean }) {
  return (
    <>
      <ul className="hidden md:flex md:flex-col md:items-start md:justify-center md:space-y-4 md:text-sm">
        <li className="flex gap-4">
          <Link
            to={'/student/home'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideHome size={20} />
            {isOpen && 'Home'}
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/student/academic-record'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideHistory size={20} />
            {isOpen && 'Histórico Escolar'}
          </Link>
        </li>
      </ul>

      <ul className="flex flex-col items-start justify-center space-y-4 text-lg md:hidden">
        <li className="flex gap-4">
          <Link
            to={'/student/home'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideHome size={20} />
            {isOpen && 'Home'}
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/student/academic-record'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideHistory size={20} />
            {isOpen && 'Histórico Escolar'}
          </Link>
        </li>
      </ul>
    </>
  )
}
