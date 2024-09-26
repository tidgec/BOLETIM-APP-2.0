import { api } from '@/lib/axios'

interface RestorePasswordProps {
  email: string
  newPassword: string
  confirmPassword: string
}

export async function restorePassword({
  email,
  newPassword,
  confirmPassword,
}: RestorePasswordProps) {
  await api.patch(
    '/restore',
    {
      newPassword,
      confirmPassword,
    },
    {
      params: {
        email,
      },
    },
  )
}
