import { api } from '@/lib/axios'

interface SignInProps {
  cpf: string
  password: string
}

export async function signIn({ cpf, password }: SignInProps) {
  const response = await api.post('/credentials/auth', {
    cpf,
    password,
  })

  return {
    token: response.data.token,
  }
}
