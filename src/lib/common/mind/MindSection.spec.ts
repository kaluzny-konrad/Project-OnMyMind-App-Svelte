import { render, screen } from '@testing-library/svelte';
import '@testing-library/jest-dom';

import { minds } from '../../stores/mindStore';
import MindSection from './MindSection.svelte';
import type Mind from '$lib/types/Mind';

describe('MindSection Component', () => {
	const openMind1 = {
		id: '1',
		name: 'Test Mind 1',
		isComplete: false,
	};
	const closedMind1 = {
		id: '2',
		name: 'Test Mind 2',
		isComplete: true,
	};
	const openMind2 = {
		id: '3',
		name: 'Test Mind 3',
		isComplete: false,
	};
	const closedMind2 = {
		id: '4',
		name: 'Test Mind 4',
		isComplete: true,
	};

	it('renders NewMind and MindRows for open and closed minds', () => {
		const mockMinds: Mind[] = [openMind1, closedMind1, openMind2, closedMind2];
		minds.set(mockMinds);
		render(MindSection);

		expect(screen.queryAllByTestId('mind-row').length).toBe(4);

		expect(screen.queryByTestId('new-mind')).toBeInTheDocument();

		const openMindTitle = screen.getByText('In progress');
		expect(openMindTitle).toBeInTheDocument();

		const closedMindTitle = screen.getByText('Completed');
		expect(closedMindTitle).toBeInTheDocument();
	});

	it('renders only NewMind when there are no minds', () => {
		const mockMinds: Mind[] = [];
		minds.set(mockMinds);
		render(MindSection);

		expect(screen.queryAllByTestId('mind-row').length).toBe(0);

		expect(screen.queryByTestId('new-mind')).toBeInTheDocument();

		const openMindTitle = screen.queryByText('In progress');
		expect(openMindTitle).not.toBeInTheDocument();

		const closedMindTitle = screen.queryByText('Completed');
		expect(closedMindTitle).not.toBeInTheDocument();
	});

	it('renders NewMind and MindRow for open minds when there are no closed minds', () => {
		const mockMinds: Mind[] = [openMind1, openMind2];
		minds.set(mockMinds);
		render(MindSection);

		expect(screen.queryAllByTestId('mind-row').length).toBe(2);

		expect(screen.queryByTestId('new-mind')).toBeInTheDocument();

		const openMindTitle = screen.getByText('In progress');
		expect(openMindTitle).toBeInTheDocument();

		const closedMindTitle = screen.queryByText('Completed');
		expect(closedMindTitle).not.toBeInTheDocument();
	});

	it('renders NewMind and MindRow for closed minds when there are no open minds', () => {
		const mockMinds: Mind[] = [closedMind1, closedMind2];
		minds.set(mockMinds);
		render(MindSection);

		expect(screen.queryAllByTestId('mind-row').length).toBe(2);

		expect(screen.queryByTestId('new-mind')).toBeInTheDocument();

		const openMindTitle = screen.queryByText('In progress');
		expect(openMindTitle).not.toBeInTheDocument();

		const closedMindTitle = screen.getByText('Completed');
		expect(closedMindTitle).toBeInTheDocument();
	});
});
