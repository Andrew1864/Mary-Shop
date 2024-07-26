
const Home = () => {
    return (
        <div id="HomePage" className="container mx-auto px-4">
            <div>
                <div>
                    <img src="../../assets/products/homePage.png" alt="homePage" />
                </div>
                <div className="pt-7">
                    <p className="text-gray-400">
                        Browse through our diverse range of meticulously crafted garments,
                        disined to bring out your individuality and cater to your sence of style.
                    </p>
                </div>
                <div>
                    <button>Buy Now</button>
                </div>
                <div className="pt-7 flex">
                    <div>
                        <span className="font-sans font-black">200+</span>
                        <p>International Brands</p>
                    </div>
                    <div>
                        <span className="font-sans font-black">2000+</span>
                        <p>High-Quality Products</p>
                    </div>
                    <div>
                        <span className="font-sans font-black">30000+</span>
                        <p>Happy Customers</p>
                    </div>
                </div>
                <div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
}

export default Home;