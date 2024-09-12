import { api } from '@/lib/axios'

interface SignInProps {
  cpf: string
  password: string
}

interface SignInResponse {
  token: string
  redirect?: boolean
}

export async function signIn({ cpf, password }: SignInProps) {
  const response = await api.post<SignInResponse>('/credentials/auth', {
    cpf,
    password,
  })

  return {
    token: response.data.token,
    redirect: response.data.redirect,
  }
}
