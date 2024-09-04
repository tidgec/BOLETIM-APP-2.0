import { useMutation, useQueryClient } from '@tanstack/react-query'

import { disableStudentStatus } from '@/http/disable-student-status'

export function useDisableStudentStatus() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: disableStudentStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['student-courses'],
      })
    },
  })

  return mutation
}
