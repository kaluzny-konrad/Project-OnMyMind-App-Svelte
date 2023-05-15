import { getBlogsInfo, getBlogInfo } from './blogApi';
import type BlogInfo from '../types/BlogInfo';

describe('Blog Info API - correct data on endpoint', () => {
	const mockedBlogShortName = 'blog1';
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

	global.fetch = jest.fn().mockResolvedValue({
		json: jest.fn().mockResolvedValue(mockedBlogInfos),
	});

	describe('getBlogsInfo', () => {
		it('fetches and returns blogs info', async () => {
			const blogsInfo = await getBlogsInfo();

			expect(fetch).toHaveBeenCalledWith(blogsInfoPath);
			expect(blogsInfo).toEqual(mockedBlogInfos);
		});
	});

	describe('getBlogInfo', () => {
		it('fetches and returns blog info for the given short name', async () => {
			const blogInfo = await getBlogInfo(mockedBlogShortName);

			expect(fetch).toHaveBeenCalledWith(blogsInfoPath);
			expect(blogInfo).toEqual(mockedBlogInfos[0]);
		});

		it('returns empty blog info when the blog is not found', async () => {
			const blogInfo = await getBlogInfo('not-exists');

			expect(fetch).toHaveBeenCalledWith(blogsInfoPath);
			expect(blogInfo).toEqual({
				shortName: '',
				title: '',
				description: '',
				date: '',
			});
		});
	});
});
