// lib/withAuth.js
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/pages/api/auth/[...nextauth]'

export function withAuth(gssp) {
  return async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions)

    if (!session) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

    // Pass session as a second argument to gssp
    return await gssp(context, session)
  }
}
