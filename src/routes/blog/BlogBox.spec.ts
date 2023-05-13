import type { BlogInfo } from '$lib/types/BlogInfo';
import BlogBox from './BlogBox.svelte';
import { render, screen } from '@testing-library/svelte';

describe('BlogBox', () => {
	beforeEach(() => {
		const mockedBlogInfo: BlogInfo = {
			shortName: 'shortName',
			title: 'title',
			description: 'description',
			date: '01-01-2021',
		};
		render(BlogBox, { blog: mockedBlogInfo });
	});

	it('should have data', () => {
		expect(screen.getByText('title')).toBeInTheDocument();
		expect(screen.getByTestId('blog-title')).toHaveTextContent('title');
		expect(screen.getByText('description')).toBeInTheDocument();
		expect(screen.getByText('01-01-2021')).toBeInTheDocument();
	});
});
