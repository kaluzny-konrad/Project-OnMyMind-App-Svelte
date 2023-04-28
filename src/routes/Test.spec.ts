import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import Test from './Test.svelte';

describe('Test', () => {
	it('renders the component', () => {
		render(Test);
		expect(screen.getByText('Test')).toBeInTheDocument();
	});
});
