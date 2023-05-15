import '@testing-library/jest-dom';
import type BlogInfo from '../../types/BlogInfo';
import BlogList from './BlogList.svelte';
import { render, screen, waitFor } from '@testing-library/svelte';

describe('Blog', () => {
	const mockedBlogInfos: BlogInfo[] = [
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

	global.fetch = jest.fn().mockResolvedValue({
		json: jest.fn().mockResolvedValue(mockedBlogInfos),
	});

	it('should have mocked data', async () => {
		render(BlogList);

		await waitFor(() => {
			const blogBox = screen.getByTestId(
				`blog-${mockedBlogInfos[0].shortName}`,
			);
			expect(blogBox).toHaveAttribute(
				'href',
				`/blog/${mockedBlogInfos[0].shortName}`,
			);

			expect(screen.getAllByTestId('blog-box')).toHaveLength(
				mockedBlogInfos.length,
			);
		});
	});
});
