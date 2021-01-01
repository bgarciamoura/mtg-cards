import Head from 'next/head';

interface HeadSessionProps {
    title: string;
}

const HeadSession: React.FC<HeadSessionProps> = ({ title }) => {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta charSet='utf-8' />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
            </Head>
        </>
    );
};

export default HeadSession;
