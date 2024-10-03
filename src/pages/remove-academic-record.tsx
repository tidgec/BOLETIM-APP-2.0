import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Course } from '@/components/course'
import { Pagination } from '@/components/pagination'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetCourses } from '@/hooks/use-get-courses'
import { useRemoveAcademicRecord } from '@/hooks/use-remove-academic-record'
import { fail } from '@/utils/fail'

export function RemoveAcademicRecord() {
  const [searchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const { courses, totalItems, pages, isLoading } = useGetCourses(page)
  const { mutateAsync: removeAcademicRecordFn, isPending } =
    useRemoveAcademicRecord()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading(
      'Aguarde um pouco! O histórico escolar está sendo desativado.',
    )
  }

  async function handleRemoveAcademicRecord(id: string) {
    try {
      await removeAcademicRecordFn({
        courseId: id,
      })

      toast.success('Histórico do curso desativado com sucesso!', {
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
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Desativar Histórico Escolar
        </h2>
        <p className="mt-2 text-sm">
          Para desativar o histórico, basta clicar no curso.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="m-10 w-80">
                  <Skeleton className="h-32 rounded bg-gray-200" />
                </div>
              ))
            : courses?.map((course) => (
                <button
                  key={course.id}
                  className="m-10 w-80 bg-white py-1 shadow-md"
                  onClick={() => handleRemoveAcademicRecord(course.id)}
                >
                  <Course course={course} />
                </button>
              ))}
        </div>

        {courses && (
          <Pagination
            items={totalItems ?? 0}
            page={page ? Number(page) : 0}
            pages={pages ?? 0}
          />
        )}
      </section>
    </div>
  )
}
