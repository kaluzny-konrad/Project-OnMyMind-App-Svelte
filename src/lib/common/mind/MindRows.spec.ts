import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import type Mind from '../../types/Mind';

import MindRows from './MindRows.svelte';

describe('MindRows Component', () => {
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
	const title = 'Test Title';

	it('renders the component with MindRow for each mind', () => {
		render(MindRows, { minds, title });
		expect(screen.getByText(title)).toBeInTheDocument();

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
		render(MindRows, { minds: [], title });

		const mindRows = screen.queryAllByTestId('mind-row');
		expect(mindRows).toHaveLength(0);
	});
});
