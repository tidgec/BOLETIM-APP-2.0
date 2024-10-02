import type { AxiosError } from 'axios'
import { toast } from 'sonner'

export function fail(err: unknown) {
  const error = err as AxiosError
  const { message } = error.response?.data as { message: string }

  toast.error(`${message}`, {
    duration: 5000,
    closeButton: true,
  })
}
