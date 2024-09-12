import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

import { getProfile } from '@/http/get-profile'
import { JWTPayload } from '@/types/jwt'

export async function useAuth() {
  const navigate = useNavigate()

  const token = Cookies.get('token')

  if (!token) {
    navigate('/sign-in')
    return
  }

  try {
    const user = getProfile()

    return { user }
  } catch {}
}

export function useDecode() {
  const navigate = useNavigate()

  const token = Cookies.get('token')

  if (!token) {
    navigate('/sign-in')
    return null
  }

  const { payload }: JWTPayload = jwtDecode(token)

  return {
    user: payload,
  }
}
