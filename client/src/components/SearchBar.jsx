import { useState } from 'react'

export default function SearchBar({ onSearch }) {
  const [q, setQ] = useState('')

  const submit = e => {
    e.preventDefault()
    if (q.trim()) onSearch(q.trim())
  }

  return (
    <form
      onSubmit={submit}
      className="w-full max-w-md flex items-center bg-white dark:bg-gray-700 shadow rounded overflow-hidden"
    >
      <button type="submit" className="p-3 text-gray-400 hover:text-gray-600">
        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 014 4H4a4 4 0 014-4zm-6 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.817-4.817A6 6 0 012 12z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <input
        type="text"
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Search for a country..."
        className="flex-grow p-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none"
      />
    </form>
  )
}
