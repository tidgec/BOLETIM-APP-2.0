import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { GetCourseAssessmentsResponse } from '@/http/get-course-assessments'
import { updateAssessment } from '@/http/update-assessment'

export function useUpdateAssessment() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: updateAssessment,
    onSuccess: async (_, { id, vf, avi, avii, vfe }) => {
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

      const assessmentsCache =
        queryClient.getQueriesData<GetCourseAssessmentsResponse>({
          queryKey: ['course-assessments'],
        })

      assessmentsCache.forEach(([cacheKey, cached]) => {
        if (!cached) return

        queryClient.setQueryData<GetCourseAssessmentsResponse>(cacheKey, {
          ...cached,
          assessments: cached.assessments.map((assessment) => {
            const studentAssessment = assessment.id === id

            const vfAssign =
              studentAssessment && vf !== assessment.vf ? vf : assessment.vf

            const aviAssign =
              studentAssessment && avi !== assessment.avi ? avi : assessment.avi

            const aviiAssign =
              studentAssessment && avii !== assessment.avii
                ? avii
                : assessment.avii

            const vfeAssign =
              studentAssessment && vfe !== assessment.vfe ? vfe : assessment.vfe

            return {
              ...assessment,
              vf: vfAssign,
              avi: aviAssign,
              avii: aviiAssign,
              vfe: vfeAssign,
            }
          }),
        })
      })
    },
  })

  return mutation
}
