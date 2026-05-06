// src/routes/Board.jsx
import { DndContext, closestCenter, useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { useContext } from 'react'
import { TasksContext } from '../context/TasksContext'
import Skeleton from '../components/Skeleton'

const COLUMNS = ['Backlog', 'In Progress', 'In Review', 'Done']

/* =======================
   Task Card (Kanban Item)
   ======================= */
function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="
        bg-[#0f172a] border border-white/5 rounded-xl p-4
        cursor-grab active:cursor-grabbing
        shadow-sm hover:shadow-md transition
      "
    >
      {/* Tag */}
      <span
        className="
          inline-block mb-2 px-2 py-0.5 text-xs font-medium
          rounded bg-blue-500/20 text-blue-300
        "
      >
        FEATURE
      </span>

      {/* Title */}
      <div className="text-sm font-semibold mb-2 text-gray-100">
        {task.title}
      </div>

      {/* Meta row */}
      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>May 12</span>
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
      </div>
    </div>
  )
}

/* =======================
   Column (Kanban Lane)
   ======================= */
function Column({ status, tasks }) {
  const { setNodeRef } = useDroppable({ id: status })

  return (
    <div
      ref={setNodeRef}
      className="
        bg-[#020617] border border-white/5 rounded-2xl
        p-4 flex flex-col
        min-h-[420px]
        md:min-h-[520px]
      "
    >
      {/* Column Header */}
      <div className="flex items-center justify-between mb-4">
        <h2
          className="
            text-xs font-semibold tracking-widest
            text-gray-300 uppercase
          "
        >
          {status}
        </h2>

        <span
          className="
            text-xs px-2 py-0.5 rounded-full
            bg-white/10 text-gray-300
          "
        >
          {tasks.length}
        </span>
      </div>

      {/* Cards */}
      <SortableContext
        items={tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div
          className="
            flex flex-col gap-3
            overflow-y-auto
            pr-1
          "
        >
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

/* =======================
   Board Page
   ======================= */
export default function Board() {
  const { tasks, loading, moveTask } = useContext(TasksContext)

  if (loading) return <Skeleton />

  const allTaskIds = tasks.map((t) => t.id)

  return (
    <div className="space-y-6">
      {/* Board Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-100">
            Sprint Board
          </h1>
          <p className="text-sm text-gray-400">Project overview</p>
        </div>

        <div className="flex gap-3">
          <button
            className="
              px-3 py-1.5 text-sm rounded
              bg-white/10 text-gray-300
            "
          >
            Filter
          </button>

          <button
            className="
              px-4 py-1.5 text-sm font-medium rounded
              bg-emerald-500 text-black hover:bg-emerald-600
            "
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Kanban Grid */}
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={({ active, over }) => {
          if (!over) return
          moveTask(active.id, over.id)
        }}
      >
        <SortableContext items={allTaskIds}>
          <div
            className="
              grid grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-4
              gap-4 sm:gap-6
              items-start
            "
          >
            {COLUMNS.map((status) => (
              <Column
                key={status}
                status={status}
                tasks={tasks.filter((t) => t.status === status)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}