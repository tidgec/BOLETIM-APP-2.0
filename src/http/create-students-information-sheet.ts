import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'
import { JWTPayload } from '@/types/jwt'

interface CreateStudentsInformationSheetRequest {
  courseId: string
}

interface CreateStudentsInformationSheetResponse {
  fileUrl: string
}

export async function createStudentsInformationSheet({
  courseId,
}: CreateStudentsInformationSheetRequest) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const { payload }: JWTPayload = jwtDecode(token)

  if (payload.role === 'manager') {
    const response = await api.post<CreateStudentsInformationSheetResponse>(
      '/manager/students/sheet',
      {
        courseId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    return {
      fileUrl: response.data.fileUrl,
    }
  }

  const response = await api.post<CreateStudentsInformationSheetResponse>(
    '/students/sheet',
    {
      courseId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    fileUrl: response.data.fileUrl,
  }
}
