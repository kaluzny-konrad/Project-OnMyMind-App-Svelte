import { v4 as uuidv4 } from 'uuid';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import type Mind from '../types/Mind';

const storageName = 'minds-list';

const isBrowser = typeof window !== 'undefined';
const data: Mind[] = isBrowser
	? JSON.parse(window.localStorage.getItem(storageName) as string) ?? []
	: [];

export const minds: Writable<Mind[]> = writable(data);

minds.subscribe((value: Mind[]) => {
	if (isBrowser) {
		localStorage.setItem(storageName, JSON.stringify(value));
	}
});

export const addMindToStore = (mindName: string): string => {
	const id = uuidv4();
	minds.update((currentMinds: Mind[]) => {
		return [{ id: id, name: mindName, isComplete: false }, ...currentMinds];
	});
	return id;
};

export const deleteMindFromStore = (id: string): void => {
	minds.update((currentMinds: Mind[]) => {
		return currentMinds.filter((mind: Mind) => mind.id !== id);
	});
};

export const toggleCompleteInStore = (id: string): void => {
	minds.update((currentMinds: Mind[]) => {
		const mindToToggle = currentMinds.find((mind: Mind) => mind.id === id);
		if (!mindToToggle) return currentMinds;
		const updatedMinds = currentMinds.filter((mind: Mind) => mind.id !== id);
		if (mindToToggle.isComplete) {
			updatedMinds.unshift({
				...mindToToggle,
				isComplete: false,
			});
		} else {
			updatedMinds.push({
				...mindToToggle,
				isComplete: true,
			});
		}
		return updatedMinds;
	});
};

export const changeMindNameInStore = (id: string, name: string): void => {
	minds.update((currentMinds: Mind[]) => {
		return currentMinds.map((mind: Mind) => {
			if (mind.id === id) {
				return { ...mind, name };
			}
			return mind;
		});
	});
};

export const moveMindToTopInStore = (id: string): void => {
	minds.update((currentMinds: Mind[]) => {
		const mindToMove = currentMinds.find((mind: Mind) => mind.id === id);
		if (!mindToMove) return currentMinds;
		const updatedMinds = currentMinds.filter((mind: Mind) => mind.id !== id);
		updatedMinds.unshift(mindToMove);
		return updatedMinds;
	});
};
