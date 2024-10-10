import {
  LucideBarChart2,
  LucideBookCopy,
  LucideBoxes,
  LucideBrain,
  LucideHistory,
  LucideHome,
  LucideNotepadText,
  LucideScrollText,
  LucideSquareUser,
  LucideUserCog,
  LucideUsers,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export function DevMenu({ isOpen }: { isOpen?: boolean }) {
  return (
    <>
      <ul className="hidden md:flex md:flex-col md:items-start md:justify-center md:space-y-4 md:text-sm">
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
            to={'/courses'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideBookCopy size={20} />
            {isOpen && 'Cursos'}
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
            to={'/managers'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideSquareUser size={20} />
            {isOpen && 'Supervisores'}
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/admins'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideUserCog size={20} />
            {isOpen && 'Administradores'}
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
            to={'/reports'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideNotepadText size={20} />
            {isOpen && 'Relatórios'}
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/rankings'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideBarChart2 size={20} />
            {isOpen && 'Classificações'}
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
        <li className="flex gap-4">
          <Link
            to={'/academic-record'}
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
            to={'/'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideHome size={20} />
            Home
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/courses'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideBookCopy size={20} />
            Cursos
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/students'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideUsers size={20} />
            Alunos
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/managers'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideSquareUser size={20} />
            Supervisores
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/admins'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideUserCog size={20} />
            Administradores
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/notes'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideScrollText size={20} />
            Notas
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/behaviors'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideBrain size={20} />
            Comportamentos
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/reports'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideNotepadText size={20} />
            Relatórios
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/rankings'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideBarChart2 size={20} />
            Classificações
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/management'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideBoxes size={20} />
            Gerenciamento de dados
          </Link>
        </li>
        <li className="flex gap-4">
          <Link
            to={'/academic-record'}
            className="flex items-center justify-center gap-4 md:justify-start"
          >
            <LucideHistory size={20} />
            Histórico Escolar
          </Link>
        </li>
      </ul>
    </>
  )
}
