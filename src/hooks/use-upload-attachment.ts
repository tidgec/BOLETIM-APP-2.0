import { useMutation } from '@tanstack/react-query'

import { uploadAttachment } from '@/http/upload-attachment'

export function useUploadAttachment() {
  const mutation = useMutation({
    mutationFn: uploadAttachment,
  })

  return mutation
}
