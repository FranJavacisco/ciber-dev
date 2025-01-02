// src/services/linkedinService.js
const LINKEDIN_ACCESS_TOKEN = 'tu_token_de_acceso';
const USER_ID = 'tu_linkedin_id';

export const fetchLinkedInPosts = async () => {
    try {
        const response = await fetch(
            `https://api.linkedin.com/v2/ugcPosts?authors=${USER_ID}`,
            {
                headers: {
                    'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
                    'Content-Type': 'application/json',
                }
            }
        );

        return await response.json();
    } catch (error) {
        console.error('Error fetching LinkedIn posts:', error);
        return null;
    }
};