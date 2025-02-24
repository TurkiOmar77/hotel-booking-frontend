const SectionWelcome = () => {
    return (
        <section id="home" className="m-16">
            <div className="relative rounded-3xl w-full h-48 md:h-80 bg-cover bg-center p-6 pt-16"
                style={{ backgroundImage: 'url(bgim.jpg)' }}
            >
                {/*shadow*/}
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-3xl"></div>
                <h1 className="relative text-3xl md:text-5xl lg:text-7xl font-bold mt-4 text-gray-300  pb-3">
                Welcome To My Hotel ..  </h1>
            </div>
        </section>
    );
};

export default SectionWelcome;
