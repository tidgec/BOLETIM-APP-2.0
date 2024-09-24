import { api } from '@/lib/axios'

export interface ValidateDocumentRequest {
  historicId: string
  hash: string
}

export interface ValidateDocumentResponse {
  message: string
}

export async function validateDocument({
  historicId,
  hash,
}: ValidateDocumentRequest) {
  const response = await api.get<ValidateDocumentResponse>(
    `/historics/${historicId}/validate`,
    {
      params: {
        hash,
      },
    },
  )

  return {
    message: response.data.message,
    ok: response.status,
  }
}
