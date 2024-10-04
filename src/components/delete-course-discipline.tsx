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
  const { mutateAsync: deleteCourseDisciplineFn, isPending } =
    useDeleteCourseDiscipline()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading(
      'Aguarde um pouco! A disciplina está sendo removida do curso.',
    )
  }

  async function handleDeleteCourseDiscipline() {
    try {
      await deleteCourseDisciplineFn({
        courseId: discipline.courseId,
        disciplineId: discipline.disciplineId,
      })

      toast.success('Disciplina deletada do curso com sucesso!', {
        duration: 1000,
        onAutoClose: () => {
          toast.dismiss(toastId)
        },
      })
    } catch (err) {
      fail(err, toastId)
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
