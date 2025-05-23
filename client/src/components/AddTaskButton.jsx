'use client'
import { useRouter } from 'next/navigation'

export default function AddTaskButton() {
  const router = useRouter()

  return (
    <button 
      onClick={() => router.push('/task/add-task')}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      Add New Task
    </button>
  )
}