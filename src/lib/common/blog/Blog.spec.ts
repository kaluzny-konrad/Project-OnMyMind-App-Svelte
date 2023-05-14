import { render, screen } from '@testing-library/svelte';
import type BlogContent from '../../types/BlogContent';
import type BlogInfo from '../../types/BlogInfo';
import Blog from './Blog.svelte';

const mockedBlogContent: BlogContent = {
	content: 'content',
};

const mockedBlogInfo: BlogInfo = {
	shortName: 'mockedShortName',
	title: 'title',
	description: 'description',
	date: '01-01-2021',
};

describe('Blog', () => {
	it('should have mocked data', async () => {
		render(Blog, {
			blogContent: mockedBlogContent,
			blogInfo: mockedBlogInfo,
		});
		expect(screen.getByTestId('blog-title')).toHaveTextContent(
			mockedBlogInfo.title,
		);
		expect(screen.getByText(mockedBlogContent.content)).toBeInTheDocument();
	});
});
