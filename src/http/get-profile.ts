import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

import { api } from '@/lib/axios'

export interface GetProfileStudentResponse {
  student: {
    id: string
    cpf: string
    email: string
    civilId?: string
    username: string
    avatarUrl: string | null
    role: string
    birthday: Date
    profile?: {
      militaryId?: string
      fatherName?: string
      motherName?: string
      state?: string
      county?: string
    }
    courses?: {
      studentCourseId: string
      id: string
      name: string
      startAt: string
      imageUrl: string
    }[]
    poles?: {
      studentPoleId: string
      id: string
      name: string
    }[]
  }
}

export interface GetProfileManagerResponse {
  manager: {
    id: string
    cpf: string
    email: string
    civilId?: string
    username: string
    avatarUrl: string | null
    role: string
    birthday: Date
    profile?: {
      militaryId?: string
      fatherName?: string
      motherName?: string
      state?: string
      county?: string
    }
    courses?: {
      studentCourseId: string
      id: string
      name: string
      startAt: string
      imageUrl: string
    }[]
    poles?: {
      studentPoleId: string
      id: string
      name: string
    }[]
  }
}

export interface GetProfileResponse {
  id: string
  cpf: string
  email: string
  civilId?: string
  militaryId?: string
  fatherName?: string
  motherName?: string
  state?: string
  county?: string
  username: string
  avatarUrl: string | null
  role: string
  birthday: Date
  courses?: {
    studentCourseId: string
    id: string
    name: string
    startAt: string
    imageUrl: string
  }[]
  poles?: {
    studentPoleId: string
    id: string
    name: string
  }[]
}

export async function getProfile(): Promise<GetProfileResponse> {
  const token = Cookies.get('token')
  if (!token) throw new Error('Não autorizado.')

  const {
    payload,
  }: {
    payload: {
      sub: string
      role: string
    }
  } = jwtDecode(token)

  if (payload.role === 'dev') {
    const response = await api.get('/developers/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.developer
  }

  if (payload.role === 'admin') {
    const response = await api.get('/administrators/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response.data.administrator
  }

  if (payload.role === 'manager') {
    const response = await api.get<GetProfileManagerResponse>(
      '/managers/profile',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const { manager } = response.data

    return {
      id: manager.id,
      username: manager.username,
      email: manager.email,
      avatarUrl: manager.avatarUrl,
      birthday: manager.birthday,
      cpf: manager.cpf,
      role: manager.role,
      civilId: manager.civilId,
      courses: manager.courses,
      poles: manager.poles,
      militaryId: manager.profile?.militaryId,
      state: manager.profile?.state,
      county: manager.profile?.county,
      fatherName: manager.profile?.fatherName,
      motherName: manager.profile?.motherName,
    }
  }

  const response = await api.get<GetProfileStudentResponse>(
    '/students/profile',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  const { student } = response.data

  return {
    id: student.id,
    username: student.username,
    email: student.email,
    avatarUrl: student.avatarUrl,
    birthday: student.birthday,
    cpf: student.cpf,
    role: student.role,
    civilId: student.civilId,
    courses: student.courses,
    poles: student.poles,
    militaryId: student.profile?.militaryId,
    state: student.profile?.state,
    county: student.profile?.county,
    fatherName: student.profile?.fatherName,
    motherName: student.profile?.motherName,
  }
}
