import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import Animation from '../types/Animation';

const storageName = 'animations';

const isBrowser = typeof window !== 'undefined';
const data: Animation[] = isBrowser
	? JSON.parse(window?.localStorage?.getItem(storageName) as string) ?? []
	: [];

export const animations: Writable<Animation[]> = writable(
	data.map((animation) => {
		const correctAnimation = new Animation(animation.startTime);
		return correctAnimation;
	}),
);

animations.subscribe((value: Animation[]) => {
	if (isBrowser) {
		localStorage?.setItem(storageName, JSON.stringify(value));
	}
});

export const startSuccessAnimation = (): Animation => {
	const existedAnimation = getSuccessAnimationStatus();
	if (existedAnimation) return existedAnimation;

	const animation: Animation = new Animation();

	animations.update((currentAnimations: Animation[]) => {
		return [...currentAnimations, animation];
	});
	return animation;
};

export const getSuccessAnimationStatus = (): Animation => {
	animations.update((currentAnimations: Animation[]) => {
		return currentAnimations.filter(
			(existedAnimation: Animation) =>
				existedAnimation?.isRunning() === true ||
				existedAnimation?.isFadingOut() === true,
		);
	});

	let existedAnimations: Animation[] = [];
	animations.subscribe((currentAnimations: Animation[]) => {
		existedAnimations = currentAnimations;
	});

	return existedAnimations[0];
};
