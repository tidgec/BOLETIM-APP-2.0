import { toast } from 'sonner'

import { useDeleteCourseDiscipline } from '@/hooks/use-delete-course-discipline'
import { fail } from '@/utils/fail'

import { Button } from './ui/button'

interface DeleteCourseDisciplineProps {
  discipline: {
    courseId: string
    disciplineId: string
    name: string
  }
}

export function DeleteCourseDiscipline({
  discipline,
}: DeleteCourseDisciplineProps) {
  const { mutateAsync: deleteCourseDisciplineFn } = useDeleteCourseDiscipline()

  async function handleDeleteCourseDiscipline() {
    try {
      await deleteCourseDisciplineFn({
        courseId: discipline.courseId,
        disciplineId: discipline.disciplineId,
      })

      toast.success('Disciplina deletada com sucesso!', {
        duration: 1000,
      })
    } catch (err) {
      fail(err)
    }
  }

  return (
    <div className="flex flex-col gap-1 rounded bg-pmpa-blue-700 px-2 py-1 text-center md:text-left">
      <span className="font-medium">{discipline.name}</span>
      <Button
        variant={'destructive'}
        size={'sm'}
        onClick={handleDeleteCourseDiscipline}
      >
        Deletar
      </Button>
    </div>
  )
}
