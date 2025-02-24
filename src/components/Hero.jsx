import { Box, Image, Heading, Text, Button } from "@chakra-ui/react";
import coverPhoto from "../assets/cover.jpg";
import { keyframes } from "@emotion/react";

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

const Hero = ({ onExploreClick }) => {
  return (
    <Box position="relative">
      <Image
        src={coverPhoto}
        alt="ANNFSU"
        objectFit="cover"
        w="100%"
        h={{ base: "300px", md: "400px", lg: "600px" }}
      />
      <Box
        position="absolute"
        top="0"
        left="0"
        width="100%"
        height="100%"
        bg="black"
        opacity="0.5"
      />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="white"
        >
          <Heading
            as="h1"
            size={{ base: "l", md: "2xl" }}
            mb="4"
            animation={`${fadeIn} 2s ease-in-out`}
          >
            अखिल नेपाल राष्ट्रिय स्वतन्त्र विद्यार्थी युनियन
          </Heading>
          <Text fontSize="lg" mb="6" animation={`${fadeIn} 2s ease-in-out`}>
            अनेरास्ववियु : स्थापनाकाल देखिनै विद्यार्थी हकहितको लागि समर्पित
            संगठन हो। देशको हरेक परिवर्तनमा विद्यार्थीको योगदानलाई संस्थागत
            गर्दै राष्ट्र र राष्ट्रियताको निम्ति सदैव सतीसालझैँ निर्भिक छ।
          </Text>
          <Button colorScheme="red" size="lg" onClick={onExploreClick}>
            हाम्रो इतिहास
          </Button>
        </Box>
    </Box>
  );
};

export default Hero;
