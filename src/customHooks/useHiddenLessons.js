import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

const HiddenLessonsContext = createContext({
	hiddenLessons: new Set(),
	isLessonHidden: () => false,
	toggleLessonVisibility: () => {},
	clearAllHidden: () => {},
});

export const HiddenLessonsProvider = ({ children }) => {
	const [hiddenLessons, setHiddenLessons] = useState(new Set());
	const hasLoadedRef = useRef(false);

	// Load once on mount only
	useEffect(() => {
		if (hasLoadedRef.current) return;
		
		const loadedHiddenLessons = localStorage.getItem("hiddenLessons");
		if (loadedHiddenLessons) {
			try {
				const hiddenArray = JSON.parse(loadedHiddenLessons);
				setHiddenLessons(new Set(hiddenArray));
			} catch (e) {
				console.error("Error while loading hidden lessons from local storage:", e);
			}
		}
		hasLoadedRef.current = true;
	}, []);

	// Persist on change (single writer avoids race conditions)
	useEffect(() => {
		// Don't save on initial load
		if (!hasLoadedRef.current) return;
		
		try {
			const asArray = [...hiddenLessons];
			localStorage.setItem("hiddenLessons", JSON.stringify(asArray));
		} catch (e) {
			console.error("Error while saving hidden lessons to local storage:", e);
		}
	}, [hiddenLessons]);

	const toggleLessonVisibility = useCallback((lessonId) => {
		setHiddenLessons((prev) => {
			const next = new Set(prev);
			if (next.has(lessonId)) next.delete(lessonId);
			else next.add(lessonId);
			return next;
		});
	}, []);

	const isLessonHidden = useCallback((lessonId) => hiddenLessons.has(lessonId), [hiddenLessons]);

	const clearAllHidden = useCallback(() => {
		setHiddenLessons(new Set());
		localStorage.removeItem("hiddenLessons");
	}, []);

	const value = useMemo(
		() => ({ hiddenLessons, isLessonHidden, toggleLessonVisibility, clearAllHidden }),
		[hiddenLessons, isLessonHidden, toggleLessonVisibility, clearAllHidden]
	);

	return <HiddenLessonsContext.Provider value={value}>{children}</HiddenLessonsContext.Provider>;
};

export const useHiddenLessons = () => useContext(HiddenLessonsContext);
