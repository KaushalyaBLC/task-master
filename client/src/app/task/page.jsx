import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import TasksTable from "@/components/TaskTable"
import AddTaskButton from "@/components/AddTaskButton"
import axios from "axios"
import { getAuthSession } from "@/lib/withAuth"

async function TasksPage({ searchParams = {} }) {
  // Get user session on the server
 
  const session = await getAuthSession() // Redirects to "/" if not authenticated

  // Handle unauthenticated access


  // Destructure filters from search params
  const { status, dueBefore } = await searchParams

  // Extract access token from session
  const accessToken = session.user?.accessToken

  // Fetch tasks with token and filters
  const tasks = await fetchTasks({ status, dueBefore, accessToken })

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Your Tasks</h1>
          <AddTaskButton />
        </div>
        <TasksTable tasks={tasks} />
      </div>
    </div>
  )
}

async function fetchTasks({ status, dueBefore, accessToken }) {
  try {
    const response = await axios.get("http://localhost:5000/api/tasks", {
      params: { status, dueBefore },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    console.error("Failed to fetch tasks:", error)
    return []
  }
}

export default TasksPage;