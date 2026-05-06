// src/components/Skeleton.jsx
export default function Skeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-8 w-1/3 bg-gray-700 rounded" />
      <div className="h-4 w-full bg-gray-800 rounded" />
      <div className="h-4 w-full bg-gray-800 rounded" />
      <div className="h-4 w-5/6 bg-gray-800 rounded" />
      <div className="h-4 w-2/3 bg-gray-800 rounded" />
    </div>
  )
}