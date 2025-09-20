import { DefaultSession, DefaultUser } from 'next-auth'
import { JWT, DefaultJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      username: string
      role: string
    } & DefaultSession['user']
    accessToken: string
  }

  interface User extends DefaultUser {
    username: string
    role: string
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    role: string
    accessToken: string
    userId: string
    username: string
  }
}
