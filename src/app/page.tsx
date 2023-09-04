type SearchParams = {
    category?: string | null;
    endcursor?: string | null;
}

type Props = {
    searchParams: SearchParams
}
export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const revalidate = 0;

const Home = async ({ searchParams }: Props) => {
    return (
        <section className="flexStart flex-col mb-16">
            Hi, there
        </section>
    )
};

export default Home;