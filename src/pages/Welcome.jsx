import { Link } from "react-router-dom";

import cityImg from "../assets/city.jpg";
import heroImg from "../assets/hero.png"; 

import { motion, useScroll, useSpring ,useTransform } from "framer-motion";
import { useRef } from "react";
export default function WelcomePage() {
  const targetRef = useRef(null);
  const { scrollY: rawScrollY } = useScroll({
    target: targetRef,
    // offset: ["", ""],
  });
  const scrollY = useSpring(rawScrollY, { bounce: 0.25 });
  const scale = useTransform(scrollY, [0, 525], [1, 2.5]); 
  const translateY = useTransform(scrollY, [0, 525], [0, 340]);
  return (
    <div>
      <motion.header ref={targetRef} id="welcome-header">
        <motion.div
          style={{ scale: scale, translateY: translateY }}
          id="welcome-header-content"
        >
          <h1>Ready for a challenge?</h1>
          <Link id="cta-link" to="/challenges">
            Get Started
          </Link>
        </motion.div>
        <img
          src={cityImg}
          alt="A city skyline touched by sunlight"
          id="city-image"
        />
        <img src={heroImg} alt="A superhero wearing a cape" id="hero-image" />
      </motion.header>
      <main id="welcome-content">
        <section>
          <h2>There&apos;s never been a better time.</h2>
          <p>
            With our platform, you can set, track, and conquer challenges at
            your own pace. Whether it&apos;s personal growth, professional
            achievements, or just for fun, we&apos;ve got you covered.
          </p>
        </section>

        <section>
          <h2>Why Challenge Yourself?</h2>
          <p>
            Challenges provide a framework for growth. They push boundaries,
            test limits, and result in genuine progress. Here, we believe
            everyone has untapped potential, waiting to be unlocked.
          </p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li>Custom challenge creation: Set the rules, define your pace.</li>
            <li>
              Track your progress: See your growth over time with our analytics
              tools.
            </li>
            <li>
              Community Support: Join our community and get motivated by peers.
            </li>
          </ul>
        </section>

        <section>
          <h2>Join Thousands Embracing The Challenge</h2>
          <p>
            “I never realized what I was capable of until I set my first
            challenge here. It&apos;s been a transformative experience!” - Alex
            P.
          </p>
          {/* You can add more testimonials or even a carousel for multiple testimonials */}
        </section>
      </main>
    </div>
  );
}
