import type BlogInfo from '../../types/BlogInfo';
import Blog from './BlogList.svelte';
import { render, screen } from '@testing-library/svelte';

describe('Blog', () => {
	const mockedBlogsInfo: BlogInfo[] = [
		{
			shortName: 'shortName',
			title: 'title',
			description: 'description',
			date: '01-01-2021',
		},
		{
			shortName: 'shortName2',
			title: 'title2',
			description: 'description2',
			date: '02-01-2021',
		},
	];

	beforeEach(() => {
		render(Blog, { blogs: mockedBlogsInfo });
	});

	it('should have mocked data', () => {
		mockedBlogsInfo.forEach((mockedBlogInfo) => {
			const blogBox = screen.getByTestId(`blog-${mockedBlogInfo.shortName}`);
			expect(blogBox).toHaveAttribute(
				'href',
				`/blog/${mockedBlogInfo.shortName}`,
			);
		});

		expect(screen.getAllByTestId('blog-box')).toHaveLength(
			mockedBlogsInfo.length,
		);
	});
});
