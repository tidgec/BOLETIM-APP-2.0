import Cookies from 'js-cookie'

import { api } from '@/lib/axios'
interface UploadAttachmentRequest {
  file: File
}

interface UploadAttachmentResponse {
  fileUrl: string
}

export async function uploadAttachment({ file }: UploadAttachmentRequest) {
  const token = Cookies.get('token')

  const uploadFormData = new FormData()
  uploadFormData.set('avatar', file)

  const response = await api.post<UploadAttachmentResponse>(
    '/upload',
    uploadFormData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return {
    fileUrl: response.data.fileUrl,
  }
}
