import { api } from '@/lib/axios'
import { JWTPayload } from '@/types/jwt'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

export async function getCourses(page: string) {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const { payload }: JWTPayload = jwtDecode(token)

  if (payload.role === 'manager') {
    const response = await api.get(`/managers/courses?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return {
      courses: response.data.courses,
      pages: response.data.pages,
      totalItems: response.data.totalItems,
    }
  }

  if (payload.role === 'student') {
    const response = await api.get(`/students/courses?page=${page}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return {
      courses: response.data.courses,
      pages: response.data.pages,
      totalItems: response.data.totalItems,
    }
  }

  const response = await api.get(`/courses?page=${page}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return {
    courses: response.data.courses,
    pages: response.data.pages,
    totalItems: response.data.totalItems,
  }
}
