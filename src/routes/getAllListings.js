import Boom from '@hapi/boom';
import db from '../database';

export const getAllListingsRoute = {
    method: 'GET',
    path: '/api/listings',
    handler: async (req, h) => {
        try {
            const { results } = await db.query('SELECT * FROM listings');
            return results;
        } catch (err) {
            console.error('Error in GET /api/listings:', err);
            throw Boom.internal('Database error while fetching listings');
        }
    }
}