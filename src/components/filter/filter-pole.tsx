import { Controller, useFormContext } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { useGetCoursePoles } from '@/hooks/use-get-course-poles'

export function FilterPole() {
  const [searchParams] = useSearchParams()
  const { control } = useFormContext()

  const courseId = searchParams.get('courseId')

  const { poles, isLoading: isLoadingPoles } = useGetCoursePoles({
    courseId: String(courseId),
  })

  return (
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
            <option value={'all'}>TODOS</option>

            {isLoadingPoles && <option>Loading...</option>}

            {!isLoadingPoles &&
              poles?.map((pole) => (
                <option key={pole.id} value={pole.id}>
                  {pole.name}
                </option>
              ))}
          </select>
        )
      }}
    ></Controller>
  )
}
