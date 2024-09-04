import { useMutation, useQueryClient } from '@tanstack/react-query'

import { activeStudentStatus } from '@/http/active-student-status'

export function useActiveStudentStatus() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: activeStudentStatus,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['student-courses'],
      })
    },
  })

  return mutation
}
