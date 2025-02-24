import React, { useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  VStack,
  useColorModeValue,
  Icon,
  Button,
  Link,
  useBreakpointValue,
  keyframes,
} from "@chakra-ui/react";
import { FaCloudDownloadAlt, FaDownload, FaFilePdf } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { withPageTransition } from "../context/TransitionContext";

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulseAnimation = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const StudySuppliesPage = () => {

  const [routinePdfUrl, setRoutinePdfUrl] = useState("/routine/routine1.pdf");
  
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const buttonBg = useColorModeValue("red.500", "red.300");
  const accentColor = useColorModeValue("red.500", "red.300");
  
  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const subheadingSize = useBreakpointValue({ base: "lg", md: "xl" });

  return (
    <>
      <Navbar />
      <Box bg={bgColor} minH="100vh" py={8}>
        <Container maxW="container.xl">
        {/* Header */}
        <VStack spacing={4} textAlign="center" mb={10} animation={`${fadeIn} 1s ease-in-out`}>
          <Heading 
            as="h1" 
            size={headingSize}
            color={accentColor}
            fontWeight="bold"
          >
            Study Resources
          </Heading>
          <Text fontSize="lg" maxW="800px">
            Access exam schedules and study materials for all courses
          </Text>
        </VStack>
        
        {/* Main Content */}
        <Flex 
          direction={{ base: "column", md: "row" }} 
          gap={10} 
          align="start"
          justify="center"
        >
          {/* Left Side - Exam Routine */}
          <Box 
            flex={1} 
            bg={cardBg} 
            p={6} 
            borderRadius="lg" 
            boxShadow="md"
            animation={`${fadeIn} 1s ease-in-out 0.2s`}
            opacity="0"
            sx={{ animationFillMode: "forwards" }}
          >
            <VStack spacing={4} align="stretch">
              <Heading as="h2" size={subheadingSize} color={accentColor} mb={2}>
                Current Exam Routine (PDF)
              </Heading>
              
              {/* PDF Viewer */}
              <Box 
                borderRadius="md" 
                overflow="hidden" 
                boxShadow="md"
                border="1px solid"
                borderColor="gray.200"
                height="500px"
                position="relative"
              >
                <iframe
                  src={`${routinePdfUrl}#view=FitH`}
                  width="100%"
                  height="100%"
                  style={{ border: "none" }}
                  title="Exam Routine PDF"
                />
                
                {/* Fallback for browsers that don't support PDF embedding */}
                <Box 
                  position="absolute" 
                  top={0} 
                  left={0} 
                  width="100%" 
                  height="100%" 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center"
                  flexDirection="column"
                  bg="gray.50"
                  zIndex="-1"
                >
                  <Icon as={FaFilePdf} boxSize={20} color="red.500" opacity={0.7} mb={4} />
                  <Text fontSize="lg" fontWeight="medium">PDF Viewer</Text>
                  <Text color="gray.500">If you can't see the PDF, please use the download button below</Text>
                </Box>
              </Box>
              
              <Link 
                href={routinePdfUrl} 
                download="Exam_Routine.pdf"
                _hover={{ textDecoration: "none" }}
              >
                <Button 
                  leftIcon={<Icon as={FaDownload} />}
                  colorScheme="red"
                  size="md"
                  width="full"
                  mt={4}
                >
                  Download PDF Routine
                </Button>
              </Link>
            </VStack>
          </Box>
          
          {/* Right Side - Drive Link */}
          <Box 
            flex={1} 
            bg={cardBg} 
            p={6} 
            borderRadius="lg" 
            boxShadow="md"
            animation={`${fadeIn} 1s ease-in-out 0.4s`}
            opacity="0"
            sx={{ animationFillMode: "forwards" }}
          >
            <VStack spacing={6} align="stretch">
              <Heading as="h2" size={subheadingSize} color={accentColor} mb={2}>
                Study Materials
              </Heading>
              
              <Text fontSize="lg">
                Access our complete collection of study materials, including notes, past papers, 
                and reference books. All resources are organized by semester and subject.
              </Text>
              
              {/* Google Drive Button */}
              <Link 
                href="https://drive.google.com/drive/folders/1x-he8otkK74lBYpS7bQCuGzKNmpIcMgX" 
                isExternal 
                _hover={{ textDecoration: "none" }}
                display="block"
                my={4}
              >
                <Button
                  size="lg"
                  height="80px"
                  width="100%"
                  bg={buttonBg}
                  color="white"
                  leftIcon={<Icon as={FaCloudDownloadAlt} boxSize={8} />}
                  _hover={{
                    transform: "translateY(-4px)",
                    boxShadow: "xl",
                    bg: "red.600",
                  }}
                  transition="all 0.3s"
                  borderRadius="lg"
                  fontSize="xl"
                  fontWeight="bold"
                  animation={`${pulseAnimation} 2s infinite ease-in-out`}
                >
                  Access All Study Resources
                </Button>
              </Link>
              
              <Text fontSize="sm" color="gray.500" textAlign="center">
                *Note: Materials are regularly updated by ANNFSU
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Container>
      </Box>
      <Footer />
    </>
  );
};

export default withPageTransition(StudySuppliesPage);