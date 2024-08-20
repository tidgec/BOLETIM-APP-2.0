export interface JWTPayload {
  payload: {
    role: string
    sub: string
  }
}
