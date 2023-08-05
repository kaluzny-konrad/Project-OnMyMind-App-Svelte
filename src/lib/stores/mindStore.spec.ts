import type Mind from '$lib/types/Mind';
import {
	addMindToStore,
	deleteMindFromStore,
	toggleCompleteInStore,
	changeMindNameInStore,
	moveMindToTopInStore,
	minds,
} from './mindStore';

describe('mindStore', () => {
	const mockDate = new Date('2023-08-05T17:57:09.814Z');

	beforeEach(() => {
		minds.set([]);
		jest.spyOn(global, 'Date').mockReturnValue(mockDate);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	function getMind(id: string) {
		let mind;
		minds.subscribe((minds: Mind[]) => {
			mind = minds.find((mind) => mind.id === id);
		});
		return mind;
	}

	function getMinds(): Mind[] {
		let mindsArray: Mind[] = [];
		minds.subscribe((minds: Mind[]) => {
			mindsArray = minds;
		});
		return mindsArray;
	}

	it('adds mind to store correctly', () => {
		const expectedMindName = 'mindName';

		const id = addMindToStore(expectedMindName);

		const mind = getMind(id);
		expect(mind).toEqual({ id, name: expectedMindName, isComplete: false });
	});

	it('deletes mind from store correctly', () => {
		const id = addMindToStore('mindName');

		deleteMindFromStore(id);

		const mind = getMind(id);
		expect(mind).toBeUndefined();
	});

	it('passing wrong id to delete - do nothing', () => {
		const expectedMindName = 'mindName';
		const id = addMindToStore(expectedMindName);

		deleteMindFromStore('wrongId');

		const mind = getMind(id);
		expect(mind).toEqual({ id, name: expectedMindName, isComplete: false });
	});

	it('toggles mind complete in store correctly', () => {
		const id = addMindToStore('mindName');

		toggleCompleteInStore(id);

		const mind = getMind(id);
		expect(mind).toEqual({
			id,
			name: 'mindName',
			isComplete: true,
			completeDateTime: mockDate,
		});
	});

	it('passing wrong id to toggle - do nothing', () => {
		const id = addMindToStore('mindName');

		toggleCompleteInStore('wrongId');

		const mind = getMind(id);
		expect(mind).toEqual({ id, name: 'mindName', isComplete: false });
	});

	it('changes mind name in store correctly', () => {
		const id = addMindToStore('mindName');

		changeMindNameInStore(id, 'newMindName');

		const mind = getMind(id);
		expect(mind).toEqual({ id, name: 'newMindName', isComplete: false });
	});

	it('pass wrong id to change name - do nothing', () => {
		const id = addMindToStore('mindName');

		changeMindNameInStore('wrongId', 'newMindName');

		const mind = getMind(id);
		expect(mind).toEqual({ id, name: 'mindName', isComplete: false });
	});

	it('moves mind to top in store correctly', () => {
		const firstMindName = 'mindName';
		const firstMindId = addMindToStore(firstMindName);
		const secondMindName = 'mindName2';
		const secondMindId = addMindToStore(secondMindName);

		const mindsBefore = getMinds();
		expect(mindsBefore[0]).toEqual({
			id: secondMindId,
			name: secondMindName,
			isComplete: false,
		});

		moveMindToTopInStore(firstMindId);

		const mindsAfter = getMinds();
		expect(mindsAfter[0]).toEqual({
			id: firstMindId,
			name: firstMindName,
			isComplete: false,
		});
	});

	it('passing wrong id to move - do noting', () => {
		const firstMindName = 'mindName';
		addMindToStore(firstMindName);
		const secondMindName = 'mindName2';
		const secondMindId = addMindToStore(secondMindName);

		const mindsBefore = getMinds();
		expect(mindsBefore[0]).toEqual({
			id: secondMindId,
			name: secondMindName,
			isComplete: false,
		});

		moveMindToTopInStore('wrongId');

		const mindsAfter = getMinds();
		expect(mindsAfter[0]).toEqual({
			id: secondMindId,
			name: secondMindName,
			isComplete: false,
		});
	});

	it('change state to complete move to end of list', () => {
		addMindToStore('mindName');
		const secondMindName = 'mindName2';
		const secondMindId = addMindToStore(secondMindName);
		addMindToStore('mindName3');

		toggleCompleteInStore(secondMindId);

		const mindsAfter = getMinds();
		expect(mindsAfter[2]).toEqual({
			id: secondMindId,
			name: secondMindName,
			isComplete: true,
			completeDateTime: mockDate,
		});
	});

	it('change state to uncomplete move to top of list', () => {
		addMindToStore('mindName');
		const secondMindName = 'mindName2';
		const secondMindId = addMindToStore(secondMindName);
		addMindToStore('mindName3');

		toggleCompleteInStore(secondMindId);
		toggleCompleteInStore(secondMindId);

		const mindsAfter = getMinds();
		expect(mindsAfter[0]).toEqual({
			id: secondMindId,
			name: secondMindName,
			isComplete: false,
		});
	});
});
