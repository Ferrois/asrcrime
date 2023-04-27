import React from 'react'
import { ToastContainer } from 'react-toastify'

export function Toastify() {
  return (
    <ToastContainer
        position="top-left"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={true}
        pauseOnHover={false}
        limit={4}
      />
  )
}