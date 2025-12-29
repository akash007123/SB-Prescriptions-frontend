import React from 'react'

export default function Card({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h4 className="font-semibold mb-2">{title}</h4>
      <div className="text-sm text-slate-700">{children}</div>
    </div>
  )
}
