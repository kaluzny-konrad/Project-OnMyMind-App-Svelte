import { render, waitFor, screen } from '@testing-library/svelte';
import { vitest, vi } from 'vitest';
import type BlogContent from '../../types/BlogContent';
import type BlogInfo from '../../types/BlogInfo';
import BlogLoader from './BlogLoader.svelte';
import * as exports from '../../api/blogApi';

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

	const loadingMessage = screen.getByText('Loading...');
	expect(loadingMessage).toBeInTheDocument();
});
