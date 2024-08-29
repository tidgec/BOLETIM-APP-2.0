import { Controller, useFormContext } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'

import { useGetCoursePoles } from '@/hooks/use-get-course-poles'

export function ListCoursePoles() {
  const [searchParams] = useSearchParams()
  const courseId = searchParams.get('courseId')

  const { control } = useFormContext()
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
            <option value={'none'}>Selecione um polo</option>

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
