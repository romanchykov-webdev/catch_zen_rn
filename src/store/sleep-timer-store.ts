import { create } from "zustand";

interface SleepTimerState {
	hours: number;
	minutes: number;
	isActive: boolean;
	endTime: number | null; 
}

interface SleepTimerActions {
	setTime: (hours: number, minutes: number) => void;
	startTimer: () => void;
	stopTimer: () => void;
}

type SleepTimerStore = SleepTimerState & SleepTimerActions;

export const useSleepTimerStore = create<SleepTimerStore>((set, get) => ({
	hours: 0,
	minutes: 0,
	isActive: false,
	endTime: null,

	setTime: (hours, minutes) => {
		set({ hours, minutes });
	},

	startTimer: () => {
		const { hours, minutes } = get();
		const totalSeconds = hours * 3600 + minutes * 60;

		if (totalSeconds > 0) {
			//время окончания вместо тикающего счетчика
			const endTime = Date.now() + totalSeconds * 1000;
			set({ isActive: true, endTime });
		}
	},

	stopTimer: () => {
		set({
			isActive: false,
			endTime: null,
		});
	},
}));

//  Селекторы для оптимизации подписок
export const selectIsActive = (state: SleepTimerStore) => state.isActive;
export const selectEndTime = (state: SleepTimerStore) => state.endTime;
export const selectHours = (state: SleepTimerStore) => state.hours; 
export const selectMinutes = (state: SleepTimerStore) => state.minutes; 