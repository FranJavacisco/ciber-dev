// src/services/blogService.js
import { createClient } from 'contentful';

const client = createClient({
    space: 'tu_space_id',
    accessToken: 'tu_access_token'
});

export const getBlogPosts = async () => {
    try {
        const response = await client.getEntries({
            content_type: 'blogPost'
        });

        return response.items.map(item => ({
            id: item.sys.id,
            title: item.fields.title,
            content: item.fields.content,
            excerpt: item.fields.excerpt,
            linkedinUrl: item.fields.linkedinUrl,
            publishDate: item.fields.publishDate,
            image: item.fields.image?.fields?.file?.url,
            tags: item.fields.tags
        }));
    } catch (error) {
        console.error('Error fetching blog posts:', error);
        return [];
    }
};