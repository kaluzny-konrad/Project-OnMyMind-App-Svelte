import { v4 as uuidv4 } from 'uuid';
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

interface Mind {
	id: string;
	name: string;
	isComplete: boolean;
}

const data: Mind[] = browser
	? JSON.parse(window.localStorage.getItem('minds-list') as string) ?? []
	: [];

export const minds: Writable<Mind[]> = writable(data);

minds.subscribe((value: Mind[]) => {
	if (browser) {
		console.log('minds.subscribe', value);
		localStorage.setItem('minds-list', JSON.stringify(value));
	}
});

export const addMindToStore = (mindName: string): void => {
	minds.update((currentMinds: Mind[]) => {
		return [...currentMinds, { id: uuidv4(), name: mindName, isComplete: false }];
	});
};

export const deleteMindFromStore = (id: string): void => {
	console.log('deleteMind', id);
	minds.update((currentMinds: Mind[]) => {
		return currentMinds.filter((mind: Mind) => mind.id !== id);
	});
};

export const toggleCompleteInStore = (id: string): void => {
	console.log('toggleComplete', id);
	minds.update((currentMinds: Mind[]) => {
		const mindToToggle = currentMinds.find((mind: Mind) => mind.id === id);
		if (!mindToToggle) return currentMinds;
		const updatedMinds = currentMinds.filter((mind: Mind) => mind.id !== id);
		if (mindToToggle.isComplete) {
			updatedMinds.unshift({ ...mindToToggle, isComplete: false });
		} else {
			updatedMinds.push({ ...mindToToggle, isComplete: true });
		}
		return updatedMinds;
	});
};

export const editMindInStore = (id: string, name: string): void => {
	console.log('editMind', id, name);
	minds.update((currentMinds: Mind[]) => {
		return currentMinds.map((mind: Mind) => {
			if (mind.id === id) {
				return { ...mind, name };
			}
			return mind;
		});
	});
};
