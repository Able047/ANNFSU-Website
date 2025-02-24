import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { motion } from 'framer-motion'
import Hero from "../components/Hero";
import Bio from "../components/Bio";
import Footer from "../components/Footer";
import { useRef } from "react";
import { withPageTransition } from "../context/TransitionContext";
import VideoSection from "../components/VideoSection";

const HomePage = () => {
  const targetRef = useRef(null);

  const handleExploreClick = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
      <Box>
        <Navbar />
        <Hero onExploreClick={handleExploreClick} />
        <Bio ref={targetRef} />
        <VideoSection />
        <Footer />
      </Box>
  );
};

export default withPageTransition(HomePage);
