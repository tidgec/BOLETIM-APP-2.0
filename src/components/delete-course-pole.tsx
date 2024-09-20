import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { useDeleteCoursePole } from '@/hooks/use-delete-course-pole'

import { Button } from './ui/button'

interface DeleteCoursePoleProps {
  pole: {
    id: string
    name: string
  }
}

export function DeleteCoursePole({ pole }: DeleteCoursePoleProps) {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')

  const { mutateAsync: deleteCoursePoleFn } = useDeleteCoursePole()

  async function handleDeleteCoursePole() {
    if (!courseId) throw new Error('Curso inexistente!')

    try {
      await deleteCoursePoleFn({
        courseId,
        poleId: pole.id,
      })

      toast.success('Polo deletado com sucesso!', {
        duration: 1000,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex flex-col gap-1 rounded bg-pmpa-blue-700 px-2 py-1">
      <span className="font-medium">{pole.name}</span>
      <Button
        variant={'destructive'}
        size={'sm'}
        onClick={handleDeleteCoursePole}
      >
        Deletar
      </Button>
    </div>
  )
}
