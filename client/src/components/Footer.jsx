export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 py-4 text-center">
      <p className="text-sm">
        © {new Date().getFullYear()} TaskMaster. All rights reserved.
      </p>
    </footer>
  )
}