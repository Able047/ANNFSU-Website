import { Box, Image, Heading, Text, Button, Container } from "@chakra-ui/react";
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
        h={{ base: "400px", md: "450px", lg: "600px" }}
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
      <Container 
        maxW="container.lg" 
        position="absolute" 
        top="0" 
        left="0" 
        right="0" 
        height="100%"
        centerContent
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          textAlign="center"
          color="white"
          width="100%"
          px={{ base: 4, md: 8 }}
        >
          <Heading
            as="h1"
            fontSize={{ base: "xl", sm: "2xl", md: "3xl", lg: "4xl" }}
            mb={{ base: 2, md: 4 }}
            animation={`${fadeIn} 2s ease-in-out`}
            lineHeight="1.3"
          >
            अखिल नेपाल राष्ट्रिय स्वतन्त्र विद्यार्थी युनियन
          </Heading>
          <Text 
            fontSize={{ base: "sm", sm: "md", md: "lg" }} 
            mb={{ base: 4, md: 6 }} 
            animation={`${fadeIn} 2s ease-in-out`}
            maxW="800px"
            mx="auto"
            lineHeight="1.6"
          >
            अनेरास्ववियु : स्थापनाकाल देखिनै विद्यार्थी हकहितको लागि समर्पित
            संगठन हो। देशको हरेक परिवर्तनमा विद्यार्थीको योगदानलाई संस्थागत
            गर्दै राष्ट्र र राष्ट्रियताको निम्ति सदैव सतीसालझैँ निर्भिक छ।
          </Text>
          <Button 
            colorScheme="red" 
            size={{ base: "md", md: "lg" }} 
            onClick={onExploreClick}
            animation={`${fadeIn} 2s ease-in-out 0.5s`}
            opacity="0"
            sx={{ animationFillMode: "forwards" }}
          >
            हाम्रो इतिहास
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;