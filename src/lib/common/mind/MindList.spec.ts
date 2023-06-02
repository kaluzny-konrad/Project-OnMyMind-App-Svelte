import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import type Mind from '../../types/Mind';

import MindList from './MindList.svelte';

describe('MindRows Component', () => {
	it('renders the component with MindRow for each mind', () => {
		const minds: Mind[] = [
			{
				id: '1',
				name: 'Test Mind 1',
				isComplete: false,
			},
			{
				id: '2',
				name: 'Test Mind 2',
				isComplete: true,
			},
		];
		render(MindList, { minds });

		const mindRows = screen.getAllByTestId('mind-row');
		expect(mindRows).toHaveLength(minds.length);

		mindRows.forEach((mindRow, index) => {
			const mind = minds[index];
			if (mind.isComplete) {
				const expectedContent = `Edit task 00:00 Reopen task Delete task`;
				expect(mindRow).toHaveTextContent(expectedContent);
			} else {
				const expectedContent = `Edit task 00:00 Run timer Complete task`;
				expect(mindRow).toHaveTextContent(expectedContent);
			}
		});
	});

	it('does not render MindRow when minds array is empty', () => {
		render(MindList, { minds: [] });

		const mindRows = screen.queryAllByTestId('mind-row');
		expect(mindRows).toHaveLength(0);
	});

	it('renders Edit & Complete Buttons & Timer when mind is not complete', () => {
		const minds: Mind[] = [
			{
				id: '1',
				name: 'Test Mind 1',
				isComplete: false,
			},
		];
		render(MindList, { minds });
		expect(screen.queryByTestId('timer')).toBeInTheDocument();
		expect(screen.queryByTestId('edit-task')).toBeInTheDocument();
		expect(screen.queryByTestId('complete-task')).toBeInTheDocument();
		expect(screen.queryByTestId('delete-task')).not.toBeInTheDocument();
		expect(screen.queryByTestId('reopen-task')).not.toBeInTheDocument();
	});

	it('renders Reopen & Delete Buttons & Timer when mind is complete', () => {
		const minds: Mind[] = [
			{
				id: '2',
				name: 'Test Mind 2',
				isComplete: true,
			},
		];
		render(MindList, { minds });
		expect(screen.queryByTestId('timer')).toBeInTheDocument();
		expect(screen.queryByTestId('edit-task')).toBeInTheDocument();
		expect(screen.queryByTestId('delete-task')).toBeInTheDocument();
		expect(screen.queryByTestId('reopen-task')).toBeInTheDocument();
		expect(screen.queryByTestId('complete-task')).not.toBeInTheDocument();
	});
});
