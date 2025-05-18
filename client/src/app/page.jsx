'use client'
import Image from 'next/image'
import Loading from "@/components/Loading"
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push('/task')
    }
  }, [session, router])

  if (status === "loading") return <Loading />

  if (!session) {
    return (
      <div className="flex min-h-screen">
        {/* Left Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full h-3/4 flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Login
            </h1>
            
            <button
              onClick={() => signIn('google', { callbackUrl: '/task' })}
              className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <Image
                src="/google.svg"
                alt="Google logo"
                width={20}
                height={20}
                priority
              />
              Sign in with Google
            </button>
          </div>
        </div>

        {/* Right Side - Gradient Background */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
          <div className="w-full h-full flex flex-col items-center justify-center p-12 backdrop-blur-sm bg-black/10">
            <h2 className="text-4xl font-bold text-white mb-6 text-center">
              Welcome to Task Master
            </h2>
            <p className="text-xl text-white/90 text-center max-w-lg">
              Streamline your workflow and boost productivity with task management system
            </p>
            <div className="mt-12 grid grid-cols-2 gap-8">
              <div className="text-white/90 text-center">
                <h3 className="text-2xl font-bold mb-2">Easy</h3>
                <p>Simple and intuitive interface for managing tasks</p>
              </div>
              <div className="text-white/90 text-center">
                <h3 className="text-2xl font-bold mb-2">Efficient</h3>
                <p>Track and organize your tasks effectively</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
