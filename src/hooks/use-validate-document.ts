import { useQuery } from '@tanstack/react-query'

import {
  validateDocument,
  ValidateDocumentRequest,
} from '@/http/validate-document'

export function useValidateDocument({
  historicId,
  hash,
}: ValidateDocumentRequest) {
  const query = useQuery({
    queryKey: ['validate-document', historicId, hash],
    queryFn: () => validateDocument({ historicId, hash }),
  })

  return {
    ...query,
    message: query.data?.message,
    ok: query.data?.ok,
  }
}
