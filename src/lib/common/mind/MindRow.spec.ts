import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import type Mind from '../../types/Mind';

import MindRow from './MindRow.svelte';

describe('MindRow Component', () => {
	const mind: Mind = {
		id: '1',
		name: 'Test Mind',
		isComplete: false,
	};

	it('renders Edit & Complete Buttons & Timer when mind is not complete', () => {
		render(MindRow, { mind });
		expect(screen.queryByTestId('timer')).toBeInTheDocument();
		expect(screen.queryByTestId('edit-task')).toBeInTheDocument();
		expect(screen.queryByTestId('complete-task')).toBeInTheDocument();
		expect(screen.queryByTestId('delete-task')).not.toBeInTheDocument();
		expect(screen.queryByTestId('reopen-task')).not.toBeInTheDocument();
	});

	it('renders Reopen & Delete Buttons & Timer when mind is complete', () => {
		const completedMind: Mind = {
			id: '2',
			name: 'Completed Mind',
			isComplete: true,
		};
		render(MindRow, { mind: completedMind });
		expect(screen.queryByTestId('timer')).toBeInTheDocument();
		expect(screen.queryByTestId('edit-task')).toBeInTheDocument();
		expect(screen.queryByTestId('delete-task')).toBeInTheDocument();
		expect(screen.queryByTestId('reopen-task')).toBeInTheDocument();
		expect(screen.queryByTestId('complete-task')).not.toBeInTheDocument();
	});
});
