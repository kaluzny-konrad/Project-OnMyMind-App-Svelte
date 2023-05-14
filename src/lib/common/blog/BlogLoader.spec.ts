import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/svelte';
import type BlogContent from '../../types/BlogContent';
import type BlogInfo from '../../types/BlogInfo';
import BlogLoader from './BlogLoader.svelte';

const mockedBlogShortName = 'blog1';

const blogsContentPath = `/data/blogs/${mockedBlogShortName}/blogContent.json`;
const mockedBlogContent: BlogContent = {
	content: 'content',
};

const blogsInfoPath = '/data/blogs/blogsInfo.json';
const mockedBlogInfos: BlogInfo[] = [
	{
		shortName: mockedBlogShortName,
		title: 'Blog 1',
		description: 'This is blog 1',
		date: '2022-01-01',
	},
	{
		shortName: 'blog2',
		title: 'Blog 2',
		description: 'This is blog 2',
		date: '2022-02-02',
	},
];

global.fetch = jest.fn().mockImplementation((input: RequestInfo) => {
	if (input === blogsInfoPath) {
		return Promise.resolve({
			json: () => Promise.resolve(mockedBlogInfos),
		}) as Promise<Response>;
	} else if (input === blogsContentPath) {
		return Promise.resolve({
			json: () => Promise.resolve(mockedBlogContent),
		}) as Promise<Response>;
	}
	throw new Error(`Unhandled fetch: ${input}`);
});

it('show Loading on start', async () => {
	render(BlogLoader, {
		shortName: mockedBlogShortName,
	});

	expect(screen.getByText('Loading...')).toBeInTheDocument();
});

it('renders the Blog component', async () => {
	render(BlogLoader, {
		shortName: mockedBlogShortName,
	});

	waitFor(() => {
		expect(screen.getByTestId('blog-title')).toHaveTextContent(
			mockedBlogInfos[0].title,
		);
		expect(screen.getByText(mockedBlogContent.content)).toBeInTheDocument();
	});
});
