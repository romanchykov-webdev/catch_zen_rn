import { useEffect, useState } from 'react';

interface UseTimerCountdownProps {
	endTime: number | null;
	isActive: boolean;
	onTimerEnd?: () => void;
}

export const useTimerCountdown = ({ 
	endTime, 
	isActive, 
	onTimerEnd 
}: UseTimerCountdownProps) => {
	const [remainingSeconds, setRemainingSeconds] = useState<number>(0);

	useEffect(() => {
		if (!isActive || endTime === null) {
			setRemainingSeconds(0);
			return;
		}

		// Вычисляем начальное оставшееся время
		const updateRemainingTime = () => {
			const now = Date.now();
			const diff = Math.max(0, Math.floor((endTime - now) / 1000));
			
			if (diff <= 0) {
				setRemainingSeconds(0);
				if (onTimerEnd) {
					onTimerEnd();
				}
				return false; // Останавливаем интервал
			}
			
			setRemainingSeconds(diff);
			return true; // Продолжаем интервал
		};

		// Сразу обновляем
		if (!updateRemainingTime()) {
			return;
		}

		//  Создаем интервал только один раз при изменении endTime
		const intervalId = setInterval(() => {
			if (!updateRemainingTime()) {
				clearInterval(intervalId);
			}
		}, 1000);

		return () => clearInterval(intervalId);
	}, [endTime, isActive, onTimerEnd]); 

	return remainingSeconds;
};