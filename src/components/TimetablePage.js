import { useState, useCallback } from "react";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import { useSelectedProgram } from "../customHooks/useSelectedProgram";
import { getCurWeekStartTime } from "../utils/helpers";
import { useIsMobile } from "../customHooks/useIsMobile";
import { useGetLessons } from "../customHooks/useGetLessons";
import { HiddenLessonsProvider } from "../customHooks/useHiddenLessons";

const TimetablePage = () => {
	const [displayedWeekStart, setDisplayedWeekStart] = useState(getCurWeekStartTime());

	const toToday = useCallback(() => {
		setDisplayedWeekStart(getCurWeekStartTime());
	}, []);

	const loadMore = useCallback((shiftDirection) => {
		setDisplayedWeekStart((prevWeekStart) => prevWeekStart.clone().add(shiftDirection, "week"));
	}, []);

	// using this context trick because we need clearLessons function before it can be created
	const [clearLessonsContext, setClearLessonsContext] = useState({});

	const [selectedProgram, setSelectedProgram] = useSelectedProgram(clearLessonsContext, toToday);

	const isMobile = useIsMobile(clearLessonsContext, toToday);

	const { lessons, isPending, error, reload } = useGetLessons(
		selectedProgram,
		displayedWeekStart,
		isMobile,
		setClearLessonsContext,
		toToday
	);

	return (
		<HiddenLessonsProvider>
			<div className="inner-body">
				<Header selectedProgram={selectedProgram} setSelectedProgram={setSelectedProgram} />
				<Main
					isMobile={isMobile}
					lessons={lessons}
					isPending={isPending}
					error={error}
					reload={reload}
					loadMore={loadMore}
					displayedWeekStart={displayedWeekStart}
					toToday={toToday}
				/>
				<Footer />
			</div>
		</HiddenLessonsProvider>
	);
};

export default TimetablePage;
