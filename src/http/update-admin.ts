interface UpdateAdminRequest {
  id: string
  username?: string
  cpf?: string
  email?: string
  password?: string
  birthday?: string
  civilId?: string
}

export function updateAdmin({
  id,
  username,
  cpf,
  email,
  password,
  birthday,
  civilId,
}: UpdateAdminRequest) {}
