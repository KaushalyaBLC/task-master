'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { useSession } from 'next-auth/react'

export default function AddTaskForm() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    taskName: '',
    description: '',
    dueDate: ''
  })

  const { data: sessionData } = useSession()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Ensure the access token is available
      const accessToken = sessionData?.user?.accessToken
      if (!accessToken) {
        console.error('Access token is missing')
        return
      }

      // Make the API request with the Bearer token in the Authorization header
      axios
        .post('https://api-cool-wind-7220.fly.dev/api/tasks',formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          },
          withCredentials: true
        })
        .then((res) => {
         
        })
        .catch((err) => {
          console.error('Access denied:', err)
        })

      router.push('/task')
    } catch (error) {
      console.error('Failed to create task:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="taskName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Task Name
        </label>
        <input
          id="taskName"
          type="text"
          required
          value={formData.taskName}
          onChange={(e) => setFormData({ ...formData, taskName: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
         <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          type="text"
          required
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div>
        <label
          htmlFor="dueDate"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          required
          value={formData.dueDate}
          onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Task
        </button>
      </div>
    </form>
  )
}