import React from "react";
import { Box, Heading, Text } from "@chakra-ui/react";

const VideoSection = () => {
  return (
    <Box
      mx="auto"
      p={8}
      mt={8}
      borderRadius="2xl"
      boxShadow="2xl"
      bgGradient="red"
      textAlign="center"
    >
      <Heading
        as="h2"
        size="xl"
        mb={4}
        textShadow="1px 1px 2px rgba(0,0,0,0.2)"
      >
        हाम्रो पछिल्लो भिडियो सामाग्री - झन्डाको गीत
      </Heading>
      {/* <Text mb={6} fontStyle="italic">
        
      </Text> */}
      <Box
       display="flex"
       justifyContent="center"
       alignItems="center"
       borderRadius="lg"
       overflow="hidden"
       boxShadow="lg"
       mt={4}
       height="0"
       paddingBottom="56.25%" /* 16:9 Aspect Ratio */
       position="relative"
      >
        <Box
           as="iframe"
           src="https://www.youtube.com/embed/OTiz5Nr0DrE"
           position="absolute"
           top="0"
           width="80%"
           height="80%"
           frameBorder="10"
           allowFullScreen
        />
      </Box>
    </Box>
  );
};

export default VideoSection;