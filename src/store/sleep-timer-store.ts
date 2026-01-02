import { create } from "zustand";

interface SleepTimerStore {
	hours: number;
	minutes: number;
	remainingSeconds: number | null;
	isActive: boolean;
	intervalId: NodeJS.Timeout | null;

	// Actions
	setTime: (hours: number, minutes: number) => void;
	startTimer: () => void;
	stopTimer: () => void;
	tick: () => void;
}

export const useSleepTimerStore = create<SleepTimerStore>((set, get) => ({
	hours: 0,
	minutes: 0,
	remainingSeconds: null,
	isActive: false,
	intervalId: null,

	setTime: (hours, minutes) => {
		set({ hours, minutes });
	},

	startTimer: () => {
		const { hours, minutes, intervalId } = get();

		// Очищаем предыдущий интервал если он есть
		if (intervalId) {
			clearInterval(intervalId);
		}

		const totalSeconds = hours * 3600 + minutes * 60;

		if (totalSeconds > 0) {
			set({ remainingSeconds: totalSeconds, isActive: true });

			// Создаем новый интервал
			const newIntervalId = setInterval(() => {
				get().tick();
			}, 1000);

			set({ intervalId: newIntervalId as unknown as NodeJS.Timeout });
		}
	},

	stopTimer: () => {
		const { intervalId } = get();
		if (intervalId) {
			clearInterval(intervalId);
		}
		set({
			isActive: false,
			remainingSeconds: null,
			intervalId: null,
		});
	},
	tick: () => {
		const { remainingSeconds, intervalId } = get();

		if (remainingSeconds === null || remainingSeconds <= 0) {
			if (intervalId) {
				clearInterval(intervalId);
			}
			set({
				isActive: false,
				remainingSeconds: null,
				intervalId: null,
			});
			return;
		}

		set({ remainingSeconds: remainingSeconds - 1 });
	},
}));
