import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export async function getAuthSession() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/')
  }
  
  return session
}