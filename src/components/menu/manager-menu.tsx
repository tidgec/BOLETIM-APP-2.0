import {
  LucideBarChart2,
  LucideBoxes,
  LucideBrain,
  LucideHome,
  LucideScrollText,
  LucideUsers,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function ManagerMenu({ isOpen }: { isOpen?: boolean }) {
  return (
    <ul className="flex flex-col items-center justify-center space-y-4 text-lg md:items-start md:text-sm">
      <li className="flex gap-4">
        <Link
          to={'/'}
          className="flex items-center justify-center gap-4 md:justify-start"
        >
          <LucideHome size={20} />
          {isOpen && 'Home'}
        </Link>
      </li>
      <li className="flex gap-4">
        <Link
          to={'/students'}
          className="flex items-center justify-center gap-4 md:justify-start"
        >
          <LucideUsers size={20} />
          {isOpen && 'Alunos'}
        </Link>
      </li>
      <li className="flex gap-4">
        <Link
          to={'/notes'}
          className="flex items-center justify-center gap-4 md:justify-start"
        >
          <LucideScrollText size={20} />
          {isOpen && 'Notas'}
        </Link>
      </li>
      <li className="flex gap-4">
        <Link
          to={'/behaviors'}
          className="flex items-center justify-center gap-4 md:justify-start"
        >
          <LucideBrain size={20} />
          {isOpen && 'Comportamentos'}
        </Link>
      </li>
      <li className="flex gap-4">
        <Link
          to={'/rankings'}
          className="flex items-center justify-center gap-4 md:justify-start"
        >
          <LucideBarChart2 size={20} />
          {isOpen && 'Classificação'}
        </Link>
      </li>
      <li className="flex gap-4">
        <Link
          to={'/management'}
          className="flex items-center justify-center gap-4 md:justify-start"
        >
          <LucideBoxes size={20} />
          {isOpen && 'Gerenciamento de dados'}
        </Link>
      </li>
    </ul>
  )
}
