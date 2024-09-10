import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface RemoveBehaviorGradeProps {
  id: string
  january?: number
  february?: number
  march?: number
  april?: number
  may?: number
  jun?: number
  july?: number
  august?: number
  september?: number
  october?: number
  november?: number
  december?: number
}

export async function removeBehaviorGrade({
  id,
  january,
  february,
  march,
  april,
  may,
  jun,
  july,
  august,
  september,
  october,
  november,
  december,
}: RemoveBehaviorGradeProps) {
  const token = Cookies.get('token')

  await api.patch(
    `/behaviors/${id}/remove`,
    {
      january,
      february,
      march,
      april,
      may,
      jun,
      july,
      august,
      september,
      october,
      november,
      december,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
}
