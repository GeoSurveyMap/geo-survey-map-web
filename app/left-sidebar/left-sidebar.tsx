'use client'

import { Box } from '@/components/box'
import React, { useEffect } from 'react'
import { LeftSidebarFilters } from './left-sidebar-filters'
import { Logo } from '@/components/logo'
import { useAppContext } from '@/context/AppContext'
import { ChevronLeft } from 'lucide-react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { useTranslations } from '@/hooks/useTranslations'

export const LeftSidebar = () => {
	const { translations } = useTranslations()
	const { user } = useKindeBrowserClient()
	const { appState, handleLeftSidebarToggle, handleRightSidebarToggle, toggleHideFilters } = useAppContext()
	const { isLeftSideBarShown } = appState
	const hideSidebarStyles = isLeftSideBarShown ? '' : '-translate-x-[19rem]'

	useEffect(() => {
		const mapZoomControl = document.querySelector('.leaflet-control-zoom')
		if (mapZoomControl) {
			if (isLeftSideBarShown) {
				mapZoomControl.classList.remove('hide-left-sidebar')
			} else {
				mapZoomControl.classList.add('hide-left-sidebar')
			}
		}
	}, [isLeftSideBarShown])

	const handleAdd = () => {
		handleLeftSidebarToggle()
		handleRightSidebarToggle()
		toggleHideFilters()
	}

	return (
		<div className={`absolute z-800 p-4 flex h-full ${hideSidebarStyles} transition-all`}>
			<Box className="flex flex-col gap-4 max-w-72 p-4 h-full">
				<div className="flex justify-center">
					<Logo />
				</div>
				<p>{translations.filtersDescription}</p>
				<LeftSidebarFilters />
				<button
					className={`mt-auto bg-primary rounded-lg text-white mx-8 py-2 font-bold ${!user && 'opacity-50'}`}
					onClick={handleAdd}
					disabled={!user}>
					{translations.addPoint}
				</button>
				{!user && <small className="mx-8 text-center o">{translations.notAuthenticatedModal.message}</small>}
			</Box>
			<ToggleLeftSidebarButton />
		</div>
	)
}

const ToggleLeftSidebarButton = () => {
	const { appState, handleLeftSidebarToggle } = useAppContext()
	const { isLeftSideBarShown, isRightSideBarShown } = appState
	const rotateButtonStyles = isLeftSideBarShown ? '' : 'rotate-180'
	const disabledButtonStyles = isRightSideBarShown ? 'bg-[#f4f4f4] text-[#bbbbbb]' : ''

	return (
		<button
			className={`${disabledButtonStyles} rounded border-gray bg-white h-[34px] w-[34px] border-2 ms-4 grid place-items-center hover:bg-zinc-100 ${rotateButtonStyles}`}
			disabled={isRightSideBarShown}
			onClick={handleLeftSidebarToggle}>
			<ChevronLeft size={21} strokeWidth={3} />
		</button>
	)
}
