import { formatCPF } from '@/utils/format-cpf'

interface StudentProps {
  student: {
    id: string
    username: string
    cpf: string
    email: string
    createdAt: string
    course: {
      id: string
      name: string
    }
    pole: {
      id: string
      name: string
    }
  }
}

export function Student({ student }: StudentProps) {
  return (
    <div key={student.id}>
      <ul className="space-y-2 rounded border p-4">
        <li className="mb-4 text-base font-semibold md:text-lg">
          Nome: {student.username}
        </li>
        <li className="text-sm md:text-base">CPF: {formatCPF(student.cpf)}</li>
        <li className="text-sm md:text-base">Email: {student.email}</li>
        <li className="text-sm md:text-base">Curso: {student.course.name}</li>
        <li className="text-sm md:text-base">Polo: {student.pole.name}</li>
        <li className="text-sm md:text-base">
          Inserido em: {student.createdAt}
        </li>
      </ul>
    </div>
  )
}
