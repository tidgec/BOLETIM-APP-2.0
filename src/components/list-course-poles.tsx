import { Controller, useFormContext } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { useGetCoursePoles } from '@/hooks/use-get-course-poles'

import { Skeleton } from './ui/skeleton'

export function ListCoursePoles() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')

  const { control } = useFormContext()
  const { poles, isLoading: isLoadingPoles } = useGetCoursePoles({
    courseId: String(courseId),
  })

  return (
    <>
      {isLoadingPoles && <Skeleton className="h-10 w-36" />}

      {!isLoadingPoles && (
        <Controller
          name="poleId"
          defaultValue="all"
          control={control}
          render={({ field: { name, onChange, value, disabled } }) => {
            return (
              <select
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChange}
                className="rounded border p-2"
              >
                <option value={'none'}>Todos os polos</option>

                {!isLoadingPoles &&
                  poles?.map((pole) => (
                    <option key={pole.id} value={pole.id}>
                      {pole.name}
                    </option>
                  ))}
              </select>
            )
          }}
        />
      )}
    </>
  )
}
