import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Modal({ open, onClose, children } : { open: boolean, onClose: ()=>void, children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={onClose}></div>
          <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 8, opacity: 0 }} className="relative bg-white rounded-lg p-6 max-w-lg w-full mx-4 shadow-lg">
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
