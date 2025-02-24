import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Text,
  VStack,
  Link,
} from "@chakra-ui/react";
import heroImage from "../assets/HeroImage.jpg";
import { keyframes } from "@emotion/react";
import { forwardRef } from "react";

// Animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Bio = forwardRef((props, ref) => {
  return (
    <Box
      mx="auto"
      p={8}
      mt={8}
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
      ref={ref}
    >
      <Heading as="h2" fontSize="3xl" textAlign="center" mb={6}>
      अध्यक्षको मन्तव्य
      </Heading>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        animation={`${fadeIn} 2s ease-in-out`}
      >
        {/* Left Section - Image */}
        <Box flex="1" mb={{ base: 6, md: 0 }}>
          <Image
            src={heroImage}
            alt="Able Khanal"
            borderRadius="lg"
            boxShadow="md"
          />
        </Box>

        {/* Right Section - Text Content */}
        <VStack flex="2" align="start" spacing={4} pl={{ md: 8 }}>
          <Heading as="h3" fontSize="2xl">
            हामीलाई गर्व छ, हामी{" "}
            <Text as="span" color="red">
              आवाजबिहिनहरुको आवाज हौँ।
            </Text>
          </Heading>
          <Text fontSize="md" color="gray.600">
            आदरणीय विद्यार्थी साथीहरू ! इतिहास र वर्तमान दुवैमा आफूलाई सदैव
            अब्बल तुल्याएको देशकै गर्विलो विद्यार्थी संगठन अखिल नेपाल राष्ट्रिय
            स्वतन्त्र विद्यार्थी युनियनको वेब पोर्टलमा यहाँलाई स्वागत छ। देशमा
            जीवनोपयोगी शिक्षाको ब्यवस्था नहुदाँ आज दैनिक हजार युवा प्रदेशको
            शरणमा जानु परेको छ, अनेरास्ववियु यस प्रक्रियालाई रोक्न र देशमै
            रोजगारी उत्पन्न गर्ने वातावरण निर्माण गर्न गम्भीरतापूर्वक लागि
            राखेको छ। यसै दौडानका हाम्रा सम्पूर्ण गतिविधिहरू यहाँहरू समक्ष चुस्त
            दुरुस्त तरिकाबाट सम्प्रेषण गर्न सकियोस् भन्ने हेतुले हामीले यो
            पोर्टल तयार पारेका हौँ। यहाँहरू पनि यस पोर्टल मार्फत सदस्य बनेर देश
            बनाउने प्रक्रियामा थप एक इँट्टाको भूमिका निर्वाह गर्न सक्नुहुनेछ।
            लाल सलाम !
          </Text>
          <Link href="/contact">
            <Button colorScheme="red" size="lg" mt={4}>
              Let's Connect
            </Button>
          </Link>
        </VStack>
      </Flex>
    </Box>
  );
});

Bio.displayName = "Bio";

export default Bio;
