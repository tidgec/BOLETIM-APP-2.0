import { useSearchParams } from 'react-router-dom'

import { FilterForm } from '@/components/filter/filter-form'
import { Pagination } from '@/components/pagination'
import { UserSkeleton } from '@/components/skeletons/user-skeleton'
import { Button } from '@/components/ui/button'
import { useCreateStudentsInformationSheet } from '@/hooks/use-create-students-information-sheet'
import { useGetCourseStudents } from '@/hooks/use-get-course-students'
import { fail } from '@/utils/fail'
import { formatCPF } from '@/utils/format-cpf'

export function StudentInformation() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId') ?? ''
  const page = searchParams.get('page') ?? '1'
  const poleId = searchParams.get('poleId')
  const cpf = searchParams.get('cpf')
  const username = searchParams.get('username')

  const { students, totalItems, pages, isLoading } = useGetCourseStudents({
    courseId,
    page,
    poleId: poleId ?? 'all',
    cpf: cpf ?? '',
    username: username ?? '',
  })

  const { mutateAsync: createStudentsInformationSheetFn } =
    useCreateStudentsInformationSheet()

  async function handleDownloadExcel() {
    if (!courseId) return

    try {
      const response = await createStudentsInformationSheetFn({
        courseId,
      })

      window.location.href = response.fileUrl
    } catch (err) {
      fail(err)
    }
  }

  return (
    <div className="w-full px-4 py-6">
      <section className="mx-auto w-full max-w-[90rem]">
        <h2 className="w-full border-b-2 border-b-black text-xl font-semibold">
          Informação dos estudantes
        </h2>

        <FilterForm />

        <div className="mb-2 mt-4 flex h-[28rem] flex-col gap-4 overflow-y-auto px-4 md:grid md:grid-cols-2">
          {isLoading ? (
            <>
              <UserSkeleton />
              <UserSkeleton />
              <UserSkeleton />
            </>
          ) : (
            students?.map((student) => (
              <div key={student.id}>
                <ul className="flex flex-col gap-2 rounded border p-4">
                  <li className="mb-4 text-base font-semibold md:text-lg">
                    Nome: {student.username}
                  </li>
                  <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
                    <li className="text-sm md:text-base">
                      CPF: {formatCPF(student.cpf)}
                    </li>
                    <li className="text-sm md:text-base">
                      Email: {student.email}
                    </li>
                    <li className="text-sm md:text-base">
                      RG Civil: {student.civilId}
                    </li>
                    <li className="text-sm md:text-base">
                      RG Militar: {student.militaryId}
                    </li>
                    <li className="text-sm md:text-base">
                      Estado: {student.state}
                    </li>
                    <li className="text-sm md:text-base">
                      Munícipio: {student.county}
                    </li>
                    <li className="text-sm md:text-base">
                      Nome da Mãe: {student.motherName}
                    </li>
                    <li className="text-sm md:text-base">
                      Nome do Pai: {student.fatherName}
                    </li>
                    <li className="text-sm md:text-base">
                      Data de nascimento: {student.birthday}
                    </li>
                    <li className="text-sm md:text-base">
                      Curso: {student.course.name}
                    </li>
                    <li className="text-sm md:text-base">
                      Polo: {student.pole.name}
                    </li>
                  </div>
                </ul>
              </div>
            ))
          )}
        </div>

        {students && (
          <Pagination
            pages={pages ?? 0}
            page={Number(page) ?? 0}
            items={totalItems ?? 0}
          />
        )}

        <div className="flex justify-end py-4">
          <Button size={'lg'} onClick={handleDownloadExcel}>
            Baixar
          </Button>
        </div>
      </section>
    </div>
  )
}
