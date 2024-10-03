import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

import { useDeleteCoursePole } from '@/hooks/use-delete-course-pole'
import { fail } from '@/utils/fail'

import { Button } from './ui/button'

interface DeleteCoursePoleProps {
  pole: {
    id: string
    name: string
  }
}

export function DeleteCoursePole({ pole }: DeleteCoursePoleProps) {
  const { id } = useParams()

  const { mutateAsync: deleteCoursePoleFn, isPending } = useDeleteCoursePole()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading(
      'Aguarde um pouco! O polo está sendo removido do curso.',
    )
  }

  async function handleDeleteCoursePole() {
    if (!id) throw new Error('Curso inexistente!')

    try {
      await deleteCoursePoleFn({
        courseId: id,
        poleId: pole.id,
      })

      toast.success('Polo deletado com sucesso!', {
        duration: 1000,
        onAutoClose: () => {
          toast.dismiss(toastId)
        },
      })
    } catch (err) {
      fail(err)
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
