import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';

interface ApiResponse {
    object: string;
    total_cards: number;
    has_more: boolean;
    next_page: string;
    data: Array<Cards>;
}

interface Cards {
    id: string;
    name: string;
    image_uris: {
        small: string;
        normal: string;
        large: string;
        png: string;
        art_crop: string;
        border_crop: string;
    };
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { page } = req.query;
    try {
        // https://api.scryfall.com/cards/search?q=year%3E=1993
        // const apiResponse = await axios
        //     .get(`https://api.magicthegathering.io/v1/cards?page=${page}&pageSize=10&orderBy=name`)
        //     .then((res) => {
        //         return res;
        //     });
        const apiResponse: AxiosResponse<ApiResponse> = await axios
            .get(`https://api.scryfall.com/cards/search?q=year%3E=1993&page=${page}`)
            .then((res) => {
                return res;
            });

        const response = {
            meta: {
                success: true,
                totalCount: apiResponse.data.total_cards,
                pageCount: Math.ceil(apiResponse.data.total_cards / 175),
                currentPage: page,
                perPage: 175,
            },
            cards: [...apiResponse.data.data],
        };
        // const response = {
        //     meta: {
        //         success: true,
        //         totalCount: apiResponse.headers['total-count'],
        //         pageCount: apiResponse.headers['total-count'] / apiResponse.headers['page-size'],
        //         currentPage: page,
        //         perPage: apiResponse.headers['page-size'],
        //     },
        //     cards: [...apiResponse.data.cards],
        // };
        res.status(200).json(response);
    } catch (error) {
        throw new Error('Erro: ' + error.response);
    }
};
