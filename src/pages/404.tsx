import Link from 'next/link';
import styled from 'styled-components';
import { useEffect, useState } from 'react';

import HeadSession from '../components/HeadSession';

const FourOhFour: React.FC = () => {
    const [cat, setCat] = useState('');

    useEffect(() => {
        const callCatAPI = async () => {
            const cat = await fetch('https://aws.random.cat/meow?ref=apilist.fun').then((response) => {
                if (!response.ok) {
                    return;
                }

                return response.json();
            });
            setCat(cat.file);
        };

        callCatAPI();
        // setCat(`/images/404_cat_${Math.floor(Math.random() * 7 + 1)}.jpg`);
    }, []);

    return (
        <>
            <HeadSession title='404 - Page Not Found' />
            <Wrapper>
                <img className='cat' src={cat} alt='Cat' />
                <h1>404 - Page Not Found</h1>
                <Link href='/'>
                    <a>Volte para a Home</a>
                </Link>
            </Wrapper>
        </>
    );
};

export const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    max-height: 100vh;
    margin: 0;
    padding: 0;

    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .cat {
        overflow: hidden;
        z-index: -1;
        max-height: 350px;
        /* image-rendering: smooth; */
        image-rendering: crisp-edges;
    }

    a {
        z-index: 5;
    }

    /* background-image: ('../../public/images/404_cat.jpg') no-repeat center; */
`;

export default FourOhFour;
