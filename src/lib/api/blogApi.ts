import type BlogInfo from '../types/BlogInfo';
import type BlogContent from '../types/BlogContent';

export async function getBlogsInfo(): Promise<BlogInfo[]> {
	const response = await fetch(`/data/blogs/blogsInfo.json`);
	const blogsInfo = (await response.json()) as BlogInfo[];
	return blogsInfo;
}

export async function getBlogInfo(shortName: string): Promise<BlogInfo> {
	const response = await fetch(`/data/blogs/blogsInfo.json`);
	const blogsInfo = (await response.json()) as BlogInfo[];
	const blogInfo = blogsInfo.find(
		(blogInfo: BlogInfo) => blogInfo.shortName === shortName,
	);
	if (!blogInfo) return { shortName: '', title: '', description: '', date: '' };
	return blogInfo;
}

export async function getBlogContent(shortName: string): Promise<BlogContent> {
	const response = await fetch(`/data/blogs/${shortName}/blogContent.json`);
	const blogContent = (await response.json()) as BlogContent;
	return blogContent;
}
