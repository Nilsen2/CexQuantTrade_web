import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { getLocale } from "next-intl/server"

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      id: "login",
      name: "login",
      authorize: async (credentials) => {
        const locale = await getLocale()

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Access-Language": locale,
          },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        })

        const result = await res.json()
        console.log(result)
        if (result.code !== 0) return null;

        return {
            ...result.data.user,
            token: result.data.token
        }
      },
    }),
  ],

  pages: {
    signIn: "/signin",
    signOut: "/",
    error: "/err",
  },

  session: { strategy: "jwt" },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
        token.token = user.token
      }
      return token
    },

    async session({ session, token }) {
      session.user = token.user as any
      session.token = token.token as string
      return session
    }
  }
})
