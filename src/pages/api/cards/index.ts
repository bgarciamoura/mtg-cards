import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { page } = req.query;
    try {
        const apiResponse = await axios
            .get(`https://api.magicthegathering.io/v1/cards?page=${page}&pageSize=10&orderBy=name`)
            .then((res) => res);

        const response = {
            meta: {
                success: true,
                totalCount: apiResponse.headers['total-count'],
                pageCount: apiResponse.headers['total-count'] / apiResponse.headers['page-size'],
                currentPage: page,
                perPage: apiResponse.headers['page-size'],
            },
            cards: [...apiResponse.data.cards],
        };
        res.status(200).json(response);
    } catch (error) {
        throw new Error('Erro: ' + error.response);
    }
};
