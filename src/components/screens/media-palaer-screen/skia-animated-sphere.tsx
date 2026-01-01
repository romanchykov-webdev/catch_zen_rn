import { Blur, Canvas, Circle, Group, RadialGradient, vec } from "@shopify/react-native-skia";
import React, { useEffect, useMemo } from "react";
import { Dimensions } from "react-native";
import { Easing, useDerivedValue, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";

const { width } = Dimensions.get("window");

const CONFIG = {
	CANVAS_SIZE: width * 0.95,
	BASE_RADIUS: 100,
	EXPANDED_RADIUS: width * 0.45,
	CORE_RADIUS: 25,
	PARTICLE_COUNT: 60,
	WAVE_COUNT: 10,
	// Настройка уровня "туманности"
	GLOBAL_BLUR: 3,

	COLORS: {
		PRIMARY: "#48BB78",
		SECONDARY: "#38B2AC",
		ACCENT: "#B2F5EA",
		CORE: "#E6FFFA",
		GLOW: "#2C7A7B",
	},

	ANIMATION: {
		DURATION: 4000,
		CORE_DURATION: 2000,
	},
};

export const SkiaAnimatedSphere = ({ isPlaying }: { isPlaying: boolean }) => {
	const centerPoint = CONFIG.CANVAS_SIZE / 2;
	const center = vec(centerPoint, centerPoint);

	const mainRadius = useSharedValue(CONFIG.BASE_RADIUS);
	const pulseIntensity = useSharedValue(1);

	const animatedMainRadius = useDerivedValue(() => mainRadius.value);
	const animatedBlur = useDerivedValue(() => pulseIntensity.value * CONFIG.GLOBAL_BLUR);

	const particles = useMemo(() => {
		const data = [];
		for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
			const angle = (i / CONFIG.PARTICLE_COUNT) * Math.PI * 2;
			const distance = CONFIG.BASE_RADIUS * 0.6 + Math.random() * (CONFIG.BASE_RADIUS * 0.5);
			data.push({
				x: centerPoint + Math.cos(angle) * distance,
				y: centerPoint + Math.sin(angle) * distance,
				size: 2 + Math.random() * 4,
				opacity: 0.3 + Math.random() * 0.5,
			});
		}
		return data;
	}, [centerPoint]);

	const waveCircles = useMemo(() => {
		return Array.from({ length: CONFIG.WAVE_COUNT }).map((_, i) => ({
			radius: CONFIG.CORE_RADIUS + i * (CONFIG.BASE_RADIUS / CONFIG.WAVE_COUNT),
			index: i,
		}));
	}, []);

	useEffect(() => {
		if (isPlaying) {
			mainRadius.value = withRepeat(
				withTiming(CONFIG.EXPANDED_RADIUS, {
					duration: CONFIG.ANIMATION.DURATION,
					easing: Easing.inOut(Easing.sin),
				}),
				-1,
				true,
			);
			pulseIntensity.value = withRepeat(
				withTiming(1.5, {
					duration: CONFIG.ANIMATION.CORE_DURATION,
					easing: Easing.inOut(Easing.ease),
				}),
				-1,
				true,
			);
		} else {
			mainRadius.value = withTiming(CONFIG.BASE_RADIUS, { duration: 1000 });
			pulseIntensity.value = withTiming(1, { duration: 1000 });
		}
	}, [isPlaying]);

	return (
		<Canvas style={{ width: CONFIG.CANVAS_SIZE, height: CONFIG.CANVAS_SIZE }}>
			{/* Глобальный фильтр размытия для всей группы */}
			<Group>
				<Blur blur={animatedBlur} />

				{/* 1. Внешнее свечение */}
				<Circle cx={centerPoint} cy={centerPoint} r={animatedMainRadius} opacity={0.3}>
					<RadialGradient
						c={center}
						r={animatedMainRadius}
						colors={[CONFIG.COLORS.PRIMARY, CONFIG.COLORS.GLOW, "transparent"]}
					/>
				</Circle>

				{/* 2. Волны энергии */}
				<Group>
					{waveCircles.map((circle, index) => {
						const opacity = 0.2 - index * (0.2 / CONFIG.WAVE_COUNT);
						return (
							<Circle
								key={`wave-${index}`}
								cx={centerPoint}
								cy={centerPoint}
								r={circle.radius}
								opacity={opacity}
								color={index % 2 === 0 ? CONFIG.COLORS.PRIMARY : CONFIG.COLORS.ACCENT}
							/>
						);
					})}
				</Group>

				{/* 3. Основное тело сферы */}
				<Circle cx={centerPoint} cy={centerPoint} r={animatedMainRadius}>
					<RadialGradient
						c={center}
						r={animatedMainRadius}
						colors={[CONFIG.COLORS.PRIMARY, CONFIG.COLORS.SECONDARY, CONFIG.COLORS.ACCENT, "transparent"]}
						positions={[0, 0.5, 0.8, 1]}
					/>
				</Circle>

				{/* 4. Частицы  */}
				<Group>
					{particles.map((p, i) => (
						<Circle
							key={i}
							cx={p.x}
							cy={p.y}
							r={p.size}
							color={i % 2 === 0 ? CONFIG.COLORS.ACCENT : CONFIG.COLORS.CORE}
							opacity={p.opacity}
						/>
					))}
				</Group>

				{/* 5. Ядро */}
				<Circle cx={centerPoint} cy={centerPoint} r={CONFIG.CORE_RADIUS}>
					<RadialGradient
						c={center}
						r={CONFIG.CORE_RADIUS}
						colors={[CONFIG.COLORS.CORE, CONFIG.COLORS.SECONDARY, "transparent"]}
					/>
				</Circle>
			</Group>
		</Canvas>
	);
};
