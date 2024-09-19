import { useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'

import { Pagination } from '@/components/pagination'
import { Student } from '@/components/student'
import { useDownloadAcademicRecord } from '@/hooks/use-download-academic-record'
import { useGetCourseStudents } from '@/hooks/use-get-course-students'

export function DownloadAcademicRecord() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')
  const poleId = searchParams.get('poleId')
  const cpf = searchParams.get('cpf')
  const username = searchParams.get('username')
  const page = searchParams.get('page')

  const { students, totalItems, pages, isLoading } = useGetCourseStudents({
    courseId: String(courseId),
    cpf: cpf ?? '',
    username: username ?? '',
    page: page ?? '1',
    poleId: poleId ?? 'all',
  })

  const { mutateAsync: downloadAcademicRecordFn } = useDownloadAcademicRecord()

  async function handleDownloadAcademicRecord(studentId: string) {
    try {
      const { fileUrl } = await downloadAcademicRecordFn({
        courseId: String(courseId),
        studentId,
      })

      toast.success('Histórico baixado com sucesso!', {
        duration: 1000,
      })

      console.log(fileUrl)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="w-full px-4 py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Baixar Histórico Escolar
        </h2>
        <p className="mt-2 text-sm">
          Para baixar o histórico, basta clicar no curso.
        </p>

        <div className="mx-2 mb-4 mt-6 flex h-[36rem] flex-col gap-4 overflow-auto">
          {isLoading && <p>Loading...</p>}
          {!isLoading &&
            students?.map((student) => (
              <div
                key={student.id}
                className="cursor-pointer"
                onClick={() => handleDownloadAcademicRecord(student.id)}
              >
                <Student student={student} />
              </div>
            ))}
        </div>

        {students && (
          <Pagination
            items={totalItems ?? 0}
            page={page ? Number(page) : 1}
            pages={pages ?? 0}
          />
        )}
      </section>
    </div>
  )
}
