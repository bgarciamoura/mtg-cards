import styled from 'styled-components';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import axios, { AxiosResponse } from 'axios';
import Router, { useRouter } from 'next/router';
import Image from 'next/image';

interface HomeProps {
    meta: {
        success: true;
        totalCount: string;
        pageCount: string;
        currentPage: string;
        perPage: string;
    };
    cards: Array<Cards>;
}

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

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { page } = context.query || 1;
    let response = {};
    try {
        const apiResponse: AxiosResponse<ApiResponse> = await axios
            .get(`https://api.scryfall.com/cards/search?q=year%3E=1993&page=${page}`)
            .then((res) => {
                return res;
            });

        response = {
            meta: {
                success: true,
                totalCount: apiResponse.data.total_cards,
                pageCount: Math.ceil(apiResponse.data.total_cards / 175),
                currentPage: page,
                perPage: 175,
            },
            cards: [...apiResponse.data.data],
        };
    } catch (error) {
        throw new Error('Erro na Home: ' + error);
    }
    return {
        props: {
            homeProps: response,
        },
    };
};

const Home: React.FC<{ homeProps: HomeProps }> = ({ homeProps }) => {
    const [isLoading, setLoading] = useState(false);

    const { meta, cards } = homeProps;
    const router = useRouter();

    useEffect(() => {
        Router.events.on('routeChangeStart', startLoading);
        Router.events.on('routeChangeComplete', stopLoading);

        return () => {
            Router.events.off('routeChangeStart', startLoading);
            Router.events.off('routeChangeComplete', stopLoading);
        };
    }, []);

    function pagginationHandler(page: any) {
        // Verifica se existe a query page se não inicia com 0
        const selectedPage = page.selected || 0;

        // Qual a rota atual
        const currentPath = router.pathname;

        // Qual a query que esta na rota atual
        const currentQuery = router.query;

        // Prepara a query para ser inclusa na rota
        currentQuery.page = selectedPage + 1;

        // modifica a rota
        router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    }

    const startLoading = () => setLoading(true);
    const stopLoading = () => setLoading(false);

    return (
        <Wrapper>
            <h1>MTG CARDS</h1>
            <div className='cards-wrapper'>
                {isLoading ? (
                    <div className='loading'>Buscando as cartas, aguarde...</div>
                ) : (
                    <ul className='cards-list'>
                        {cards.map((card: Cards) => (
                            <li key={card.id}>
                                <span>{card.name}</span>

                                {card.image_uris ? (
                                    <Image className='card-image' src={card.image_uris.png} layout='fill' />
                                ) : (
                                    <Image
                                        className='card-image'
                                        src='/images/magic_card_back.webp'
                                        layout='fill'
                                    />
                                )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <ReactPaginate
                pageCount={parseInt(meta.pageCount)}
                pageRangeDisplayed={5}
                marginPagesDisplayed={2}
                previousLabel={'anterior'}
                nextLabel={'próxima'}
                breakLabel={'...'}
                breakClassName={'break'}
                onPageChange={pagginationHandler}
                initialPage={parseInt(meta.currentPage) - 1}
                activeClassName={'active'}
                containerClassName={'pagination'}
            />
        </Wrapper>
    );
};

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    /* width: 1200px; */

    margin: 0 auto;

    .loading {
    }

    .cards-wrapper {
        min-height: 808px;

        ul.cards-list {
            list-style: none;

            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-content: center;
            align-items: center;

            li {
                flex-shrink: 0;

                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                margin: 12px auto;
                padding: 12px auto;
                width: 260px;
                height: 380px;

                /* max-width: 260px; */

                position: relative;

                cursor: default;

                span {
                    display: block;
                    justify-self: flex-start;
                }

                div {
                    align-self: flex-end;
                    justify-self: flex-end;
                    display: block;
                    width: 100%;
                    height: 350px;
                    position: relative !important;
                }
            }
        }
    }

    .pagination {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;

        list-style: none;

        margin: 16px 0 0;

        li {
            margin: 0 2px;

            border: 1px solid black;
            border-radius: 5px;

            cursor: pointer;

            a {
                padding: 4px 10px;
            }

            &:hover {
                background: blue;
                color: white;
            }

            &.active {
                color: white;
                background: red;
            }
        }
    }
`;

export default Home;
