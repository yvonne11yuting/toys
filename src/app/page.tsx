import ThreeScene from "@/components/ThreeScene";

const Home = () => {
    return (
        <section className="flex-col my-12">
            <p data-testid="HOME_DESC">
                <ThreeScene />
            </p>
        </section>
    )
};

export default Home;