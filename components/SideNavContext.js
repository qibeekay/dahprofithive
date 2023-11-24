'use client';
// ModalContext.js
import React, { createContext, useContext, useState } from 'react';

const ToggleContext = createContext();

export function ToggleProvider({ children }) {
	const [isToggleOpen, setIsToggleOpen] = useState(false);
	const [isDashToggleOpen, setIsDashToggleOpen] = useState(false);

	const openToggleModal = () => {
		setIsToggleOpen(true);
	};

	const closeToggleModal = () => {
		setIsToggleOpen(false);
	};

	const openDashToggleModal = () => {
		setIsDashToggleOpen(true);
	};

	const closeDashToggleModal = () => {
		setIsDashToggleOpen(false);
	};

	return (
		<ToggleContext.Provider
			value={{
				isToggleOpen,
				closeToggleModal,
				openToggleModal,
				isDashToggleOpen,
				openDashToggleModal,
				closeDashToggleModal,
			}}>
			{children}
		</ToggleContext.Provider>
	);
}

export function useToggle() {
	return useContext(ToggleContext);
}
