import { useMutation, useQueryClient } from '@tanstack/react-query'

import { changeStudentStatus } from '@/http/change-student-status'

export function useChangeStudentStatus() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: changeStudentStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['student-courses'],
      })
    },
  })

  return mutation
}
