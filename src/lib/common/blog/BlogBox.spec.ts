import '@testing-library/jest-dom';
import type BlogInfo from '../../types/BlogInfo';
import BlogBox from './BlogBox.svelte';
import { render, screen } from '@testing-library/svelte';

describe('BlogBox', () => {
	const mockedBlogInfo: BlogInfo = {
		shortName: 'shortName',
		title: 'title',
		description: 'description',
		date: '01-01-2021',
	};

	beforeEach(() => {
		render(BlogBox, { blog: mockedBlogInfo });
	});

	it('should have mocked data', () => {
		expect(
			screen.getByTestId(`blog-${mockedBlogInfo.shortName}`),
		).toHaveAttribute('href', `/blog/${mockedBlogInfo.shortName}`);
		expect(screen.getByTestId('blog-title')).toHaveTextContent(
			mockedBlogInfo.title,
		);
		expect(screen.getByTestId('blog-description')).toHaveTextContent(
			mockedBlogInfo.description,
		);
		expect(screen.getByTestId('blog-date')).toHaveTextContent(
			mockedBlogInfo.date,
		);
	});
});
