import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

import { useDecode } from '@/auth'

interface ProtectedLayoutProps {
  roles: string[]
  children: ReactNode
}

export function ProtectedLayout({ roles, children }: ProtectedLayoutProps) {
  const navigate = useNavigate()
  const decoded = useDecode()

  if (
    !roles.includes(decoded?.user.role ?? 'student') &&
    decoded?.user.role === 'student'
  ) {
    navigate('/student/home')
    return <></>
  }

  if (!roles.includes(decoded?.user.role ?? 'student')) {
    navigate('/')
    return <></>
  }

  return children
}
