import { api } from '@/lib/axios'

interface ForgotPasswordProps {
  cpf: string
}

interface ForgotPasswordResponse {
  message: string
}

export async function forgotPassword({ cpf }: ForgotPasswordProps) {
  const response = await api.post<ForgotPasswordResponse>('/forgot', {
    cpf,
  })

  return {
    message: response.data.message,
  }
}
