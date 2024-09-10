import Cookies from 'js-cookie'

import { api } from '@/lib/axios'

interface UpdateBehaviorRequest {
  id: string
  january?: number | null
  february?: number | null
  march?: number | null
  april?: number | null
  may?: number | null
  jun?: number | null
  july?: number | null
  august?: number | null
  september?: number | null
  october?: number | null
  november?: number | null
  december?: number | null
}

export async function updateBehavior({
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
}: UpdateBehaviorRequest) {
  const token = Cookies.get('token')

  await api.put(
    `/behaviors/${id}`,
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
