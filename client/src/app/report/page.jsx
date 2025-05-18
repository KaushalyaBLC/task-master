import { getAuthSession } from "@/lib/withAuth"
import axios from "axios"

export default async function ReportPage() {
  const session = await getAuthSession()
  const accessToken = session.user?.accessToken

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks/reports", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      })
      return response.data
    } catch (error) {
      console.error("Failed to fetch tasks:", error)
      return { pending: 0, done: 0 }
    }
  }

  const summary = await fetchTasks()

  const fetchNext7DaysTasks = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tasks/reports/next7days",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      )
      return response.data
    } catch (error) {
      console.error("Failed to fetch next 7 days tasks:", error)
      return []
    }
  }

  const tasks = await fetchNext7DaysTasks()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
        Reports Dashboard
      </h1>

      <div className="flex flex-col items-center space-y-8">
        {/* Status Summary Section */}
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Status Summary
          </h2>
          <div className="flex justify-between">
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Pending Tasks:</span> {summary.pending || 0}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              <span className="font-medium">Completed Tasks:</span> {summary.done || 0}
            </p>
          </div>
        </div>

        {/* Tasks Due in the Next 7 Days */}
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Tasks Due in the Next 7 Days
          </h2>
          {tasks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Due Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {tasks.map((task) => (
                    <tr key={task.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {task.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {new Date(task.due_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {task.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-gray-700 dark:text-gray-300 text-lg">
                No tasks due in the next 7 days. Enjoy your free time!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
