'use client'

import React from 'react'
import { Category, useGetAllSurveys } from 'geo-survey-map-shared-modules'
import { useAppContext } from '@/context/AppContext'
import { FILTERS } from '@/constants/constants'

export const LeftSidebarFilters = () => {
	const { appState, updateFilters } = useAppContext()
	const getActiveStyling = (category: Category) => (appState.mapFilters.includes(category) ? 'border-primary bg-primary/10' : '')

	return (
		<React.Fragment>
			<small className="font-bold text-gray">Filtry</small>
			<ul className="flex flex-col gap-2 flex-1 overflow-y-auto">
				{FILTERS.map((item) => (
					<li
						key={item.title}
						className={`rounded-lg border border-gray py-3 px-2 flex items-center gap-2 cursor-pointer transition ${getActiveStyling(
							item.category
						)}`}
						onClick={() => updateFilters(item.category)}>
						{item.icon} {item.title}
					</li>
				))}
			</ul>
		</React.Fragment>
	)
}
