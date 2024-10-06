import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { GetCourseBehaviorsResponse } from '@/http/get-course-behaviors'
import { updateBehavior } from '@/http/update-behavior'

export function useUpdateBehavior() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateBehavior,
    onSuccess: async (
      _,
      {
        id,
        january,
        february,
        march,
        april,
        may,
        jun,
        july,
        august,
        september,
        october,
        november,
        december,
      },
    ) => {
      await queryClient.invalidateQueries({
        queryKey: [
          'ranking',
          'pole-ranking',
          'sub-ranking',
          'sub-pole-ranking',
          'average-behavior-poles-ranking',
          'poles-average-ranking',
          'boletims',
        ],
      })

      const behaviorsCache =
        queryClient.getQueriesData<GetCourseBehaviorsResponse>({
          queryKey: ['course-behaviors'],
        })

      behaviorsCache.forEach(([cacheKey, cached]) => {
        if (!cached) return

        queryClient.setQueryData<GetCourseBehaviorsResponse>(cacheKey, {
          ...cached,
          behaviors: cached.behaviors.map((behavior) => {
            const isStudentBehavior = behavior.id === id

            const januaryAssign =
              isStudentBehavior && january !== behavior.january
                ? january
                : behavior.january

            const februaryAssign =
              isStudentBehavior && february !== behavior.february
                ? february
                : behavior.february

            const marchAssign =
              isStudentBehavior && march !== behavior.march
                ? march
                : behavior.march

            const aprilAssign =
              isStudentBehavior && april !== behavior.april
                ? april
                : behavior.april

            const mayAssign =
              isStudentBehavior && may !== behavior.may ? may : behavior.may

            const junAssign =
              isStudentBehavior && jun !== behavior.jun ? jun : behavior.jun

            const julyAssign =
              isStudentBehavior && july !== behavior.july ? july : behavior.july

            const augustAssign =
              isStudentBehavior && august !== behavior.august
                ? august
                : behavior.august

            const septemberAssign =
              isStudentBehavior && september !== behavior.september
                ? september
                : behavior.september

            const octoberAssign =
              isStudentBehavior && october !== behavior.october
                ? october
                : behavior.october

            const novemberAssign =
              isStudentBehavior && november !== behavior.november
                ? november
                : behavior.november

            const decemberAssign =
              isStudentBehavior && december !== behavior.december
                ? december
                : behavior.december

            return {
              ...behavior,
              january: januaryAssign,
              february: februaryAssign,
              march: marchAssign,
              april: aprilAssign,
              may: mayAssign,
              jun: junAssign,
              july: julyAssign,
              august: augustAssign,
              september: septemberAssign,
              october: octoberAssign,
              november: novemberAssign,
              december: decemberAssign,
            }
          }),
        })
      })
    },
  })

  return mutation
}
