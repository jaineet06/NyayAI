import Stats from "../components/Stats";
import BuildProcess from "../sections/BuildProcess";
import CTA from "../sections/CTA";
import FAQs from "../sections/FAQs";
import Features from "../sections/Features";
import Hero from "../sections/Hero";
import Story from "../sections/Story";

const Home = () => {
  return (
    <div>
      <Hero />
      <Stats />
      <Story />
      <Features />
      <BuildProcess />
      <FAQs />
      <CTA />
    </div>
  );
};

export default Home;
