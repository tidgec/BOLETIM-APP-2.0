import Skeleton from 'react-loading-skeleton'
import { toast } from 'sonner'

import { useDecode } from '@/auth'
import { Course } from '@/components/course'
import { useDownloadAcademicRecord } from '@/hooks/use-download-academic-record'
import { useGetCourses } from '@/hooks/use-get-courses'
import { fail } from '@/utils/fail'

export function StudentDownloadAcademicRecord() {
  const { courses, isLoading } = useGetCourses()

  const { mutateAsync: downloadAcademicRecordFn, isPending } =
    useDownloadAcademicRecord()

  let toastId: string | number

  if (isPending) {
    toastId = toast.loading(
      'Aguarde um pouco! O histórico escolar está sendo baixado.',
    )
  }

  const decoded = useDecode()

  async function handleDownloadAcademicRecord(courseId: string) {
    try {
      const { fileUrl } = await downloadAcademicRecordFn({
        courseId: String(courseId),
        studentId: decoded?.user.sub ?? '',
      })

      toast.success('Histórico baixado com sucesso!', {
        duration: 1000,
        onAutoClose: () => {
          toast.dismiss(toastId)
        },
      })

      window.location.href = fileUrl
    } catch (err) {
      fail(err, toastId)
    }
  }

  return (
    <div className="w-full py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Selecione o curso
        </h2>

        <div className="flex justify-center">
          {isLoading ? (
            <>
              {[1, 2, 3].map((_, index) => (
                <div key={index} className="m-10 bg-white shadow-md">
                  <Skeleton className="h-40 w-64" />
                </div>
              ))}
            </>
          ) : (
            courses?.map((course) => (
              <div
                key={course.id}
                className="m-10 cursor-pointer bg-white shadow-md"
                onClick={() => handleDownloadAcademicRecord(course.id)}
              >
                <Course course={course} />
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
