import { Link } from "react-router-dom";
import landingImage from "../assets/images/landingHeadingImage.jpg";
import sectionImage from "../assets/images/landingSection1.jpg";
import sectionImage2 from "../assets/images/landingSection2.jpg";
import sectionImage3 from "../assets/images/landingSection3.jpg";

function Landing() {
    return (
        <div className="mx-auto md:w-[70%]">
            {/* Main Heading */}
            <div
                className="h-80 p-10 rounded-lg bg-cover bg-center"
                style={{ backgroundImage: `url('${landingImage}')` }}
            >
                <h1 className="text-secondary-alt text-shadow-lg">
                    Welcome to CivicVoice
                </h1>
                <p className="text-secondary-alt text-shadow-lg">
                    The online platform to make your voice heard
                </p>
            </div>

            {/* Sections */}

            <div className="landing-section">
                <div
                    className="landing-section-image"
                    style={{ backgroundImage: `url('${sectionImage}')` }}
                ></div>
                <div>
                    <h3>Amplify Your Voice in Governance</h3>
                    <p>
                        CivicVoice is a dynamic platform that empowers citizens
                        to actively participate in governance by voting their
                        opinions, reporting community issues, and engaging
                        directly with local authorities. We believe that
                        democracy thrives when everyone has an accessible,
                        transparent, and secure channel to be heard.
                    </p>
                </div>
            </div>

            <div className="landing-section">
                <div>
                    <h3>Bridging Citizens and Leader</h3>
                    <p>
                        CivicVoice connects citizens with policymakers and
                        public institutions through structured feedback tools,
                        digital forums, and interactive surveys. Whether it's
                        reporting infrastructure problems, sharing ideas, or
                        supporting causes, your voice has the power to drive
                        real change.
                    </p>
                </div>
                <div
                    className="landing-section-image"
                    style={{ backgroundImage: `url('${sectionImage2}')` }}
                ></div>
            </div>

            <div className="landing-section">
                <div
                    className="landing-section-image"
                    style={{ backgroundImage: `url('${sectionImage3}')` }}
                ></div>
                <div>
                    <h3>Real-Time Issue Reporting</h3>
                    <p>
                        Our intuitive issue reporting system alows users to
                        document problems in tneir communities - like broken
                        streetlights, waste management failure, or unsafe public
                        spaces. Once submitted, reports are visible to relevant
                        authorities and the public for increased accountability.
                    </p>
                </div>
            </div>

            {/* Start today */}

            <div className="my-10 flex flex-col justify-center items-center">
                <h2>Start today</h2>
                <div>
                    <Link to="/login" className="button">
                        Login
                    </Link>
                    <Link to="/register" className="button-alt">
                        Signup
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Landing;
