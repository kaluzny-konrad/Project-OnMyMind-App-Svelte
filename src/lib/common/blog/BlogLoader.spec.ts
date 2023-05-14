import { render, screen } from '@testing-library/svelte';
import type BlogContent from '../../types/BlogContent';
import type BlogInfo from '../../types/BlogInfo';
import BlogLoader from './BlogLoader.svelte';

const shortName = 'example-blog';

const mockedBlogContent: BlogContent = {
	content: 'content',
};

const mockedBlogInfo: BlogInfo = {
	shortName: shortName,
	title: 'title',
	description: 'description',
	date: '01-01-2021',
};

it('renders the Blog component', async () => {
	render(BlogLoader, {
		shortName: shortName,
	});

	expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('renders the Blog component', async () => {
	render(BlogLoader, {
		shortName: shortName,
		blogContent: mockedBlogContent,
		blogInfo: mockedBlogInfo,
	});

	expect(screen.getByTestId('blog-title')).toHaveTextContent(
		mockedBlogInfo.title,
	);
	expect(screen.getByText(mockedBlogContent.content)).toBeInTheDocument();
});
