'use client'

import { Bounce, ToastContainer } from 'react-toastify'
import React, { PropsWithChildren } from 'react'
import 'react-toastify/dist/ReactToastify.css'

export const ToastProvider: React.FC<PropsWithChildren> = ({ children }) => (
	<>
		{children}
		<ToastContainer
			position="top-center"
			autoClose={5000}
			hideProgressBar={false}
			newestOnTop={false}
			closeOnClick={false}
			rtl={false}
			pauseOnFocusLoss={false}
			draggable={false}
			pauseOnHover={false}
			theme="light"
			transition={Bounce}
		/>
	</>
)
