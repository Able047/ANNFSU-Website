import { Box, Container, VStack } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import { motion } from 'framer-motion'
import Hero from "../components/Hero";
import Bio from "../components/Bio";
import Footer from "../components/Footer";
import { useRef } from "react";
import { withPageTransition } from "../context/TransitionContext";
import VideoSection from "../components/VideoSection";
import CandidatePanel from "../components/CandidatePanel";
import ManifestoDownload from "../components/ManifestoDownload";
import WelcomeModal from "../components/WelcomeModal"; // Import the welcome modal
import { Helmet } from "react-helmet";

const HomePage = () => {
  const targetRef = useRef(null);

  const handleExploreClick = () => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <Helmet>
        <title>अनेरास्ववियु पुल्चोक क्याम्पस | ANNFSU Pulchowk Campus</title>
        <meta name="description" content="अखिल नेपाल राष्ट्रिय स्वतन्त्र विद्यार्थी युनियन (अनेरास्ववियु) पुल्चोक क्याम्पसको आधिकारिक वेबसाइट। Official website of ANNFSU Pulchowk Campus." />
      </Helmet>
      <Box>
        {/* Welcome Modal will appear when the page loads */}
        <WelcomeModal />
        
        <Navbar />
        <Hero onExploreClick={handleExploreClick} />
        <Bio ref={targetRef} />
        <VideoSection />
        
        {/* Candidate Panel and Manifesto */}
        <Container maxW="container.lg" centerContent py={8}>
          <VStack spacing={6} w="100%">
            <CandidatePanel />
            <ManifestoDownload />
          </VStack>
        </Container>
        
        <Footer />
      </Box>
    </>
  );
};

export default withPageTransition(HomePage);