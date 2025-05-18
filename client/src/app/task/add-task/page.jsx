import { getAuthSession } from "@/lib/withAuth"
import AddTaskForm from "@/components/AddTaskForm"

export default async function AddTaskPage() {
  const session = await getAuthSession()

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Add New Task
        </h1>
        <AddTaskForm />
      </div>
    </div>
  )
}