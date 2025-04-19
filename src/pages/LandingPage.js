function LandingPage({ setCurrentPage }) {
    try {
        return (
            <div data-name="landing-page">
            <div className="max-w-4xl mx-auto">
                <section className="text-center py-12" data-name="hero-section">
                <h1 className="text-5xl font-bold mb-6">
                    Welcome to Campus Code Hub
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    A collaborative platform for college students to learn, share, and grow together
                </p>
                <div className="flex justify-center space-x-4">
                    <button className="button" onClick={() => window.location.hash = '#features'}>
                    Learn More
                    </button>
                    <button className="button button-secondary" 
                    // onClick={() => setCurrentPage('register')}
                    >
                    Join Us
                    </button>
                </div>
                </section>

                <section className="py-12" id="features">
                <h2 className="text-3xl font-bold text-center mb-8">Key Features</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard icon="fas fa-code" title="Code Problems" description="Access a wide range of coding problems posted by peers." />
                    <FeatureCard icon="fas fa-comments" title="Discussions" description="Engage in meaningful discussions about solutions." />
                    <FeatureCard icon="fas fa-trophy" title="Reputation" description="Build your reputation through active participation." />
                </div>
                </section>

                <section className="py-12" data-name="how-it-works">
                <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
                <div className="grid md:grid-cols-3 gap-8 text-center">
                    <StepCard step="1" title="Sign Up" description="Create a free account and start exploring." />
                    <StepCard step="2" title="Contribute" description="Solve problems, discuss solutions, and build your rep." />
                    <StepCard step="3" title="Grow" description="Learn from the community and enhance your skills." />
                </div>
                </section>

                <section className="py-12 bg-gray-100" data-name="testimonials">
                <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    <Testimonial name="John Doe" text="Campus Code Hub helped me land my first internship!" />
                    <Testimonial name="Jane Smith" text="Amazing community and great coding discussions." />
                </div>
                </section>

                <section className="py-12" data-name="latest-articles">
                <h2 className="text-3xl font-bold text-center mb-8">Latest Articles</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    <ArticleCard title="Mastering Data Structures" date="March 30, 2025" />
                    <ArticleCard title="Top 10 Coding Interview Tips" date="March 25, 2025" />
                    <ArticleCard title="Why Open Source Matters" date="March 20, 2025" />
                </div>
                </section>
            </div>

            <Footer />
            </div>
        );
    } catch (error) {
        console.error('Landing page error:', error);
        return <div>Something went wrong. Please try again later.</div>;
    }
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="card p-6 text-center">
            <i className={`${icon} text-3xl mb-4`}></i>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

function StepCard({ step, title, description }) {
    return (
        <div className="card p-6 text-center">
            <h3 className="text-4xl font-bold text-blue-600 mb-2">{step}</h3>
            <h4 className="text-xl font-bold mb-2">{title}</h4>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}

function Testimonial({ name, text }) {
    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <p className="text-gray-600 italic">"{text}"</p>
            <p className="text-gray-900 font-bold mt-4">- {name}</p>
        </div>
    );
}

function ArticleCard({ title, date }) {
    return (
        <div className="card p-6 text-center">
            <h4 className="text-xl font-bold mb-2">{title}</h4>
            <p className="text-gray-600">{date}</p>
        </div>
    );
}

function Footer() {
    return (
        <footer >

        </footer>
    );
}

// Export the LandingPage component as the default export
export default LandingPage;


