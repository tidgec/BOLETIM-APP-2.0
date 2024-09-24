import { ShieldCheck } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

import { useValidateDocument } from '@/hooks/use-validate-document'

export function ValidateDocument() {
  const [searchParams] = useSearchParams()
  const historicId = searchParams.get('historic')
  const hash = searchParams.get('hash')

  const { message, ok } = useValidateDocument({
    historicId: String(historicId),
    hash: String(hash),
  })

  if (message === 'Course historic is valid.' && ok === 200) {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-2 py-6">
        <h2 className="text-2xl font-bold">Documento válido!</h2>

        <ShieldCheck className="h-64 w-64 text-green-600" />
      </div>
    )
  }
}
