import {
    Box,
    Button,
    Text,
    Icon,
    VStack,
  } from "@chakra-ui/react";
  import { FaDownload, FaFilePdf } from "react-icons/fa";
  
  const ManifestoDownload = () => {
    // Replace with the actual path to your manifesto PDF
    const manifestoPath = "/documents/manifesto.pdf";
    
    return (
      <Box
        bg="gray.50"
        borderRadius="lg"
        p={5}
        boxShadow="md"
        my={6}
        textAlign="center"
      >
        <VStack spacing={4}>
          <Icon as={FaFilePdf} boxSize={10} color="red.500" />
          <Text fontSize="xl" fontWeight="bold">
            Our Election Manifesto
          </Text>
          <Text>
            Download our detailed manifesto to learn about our vision, plans, and commitments
            for the upcoming term.
          </Text>
          <Button
            as="a"
            href={manifestoPath}
            download="ANNFSU_Manifesto.pdf"
            colorScheme="red"
            rightIcon={<FaDownload />}
            size="lg"
            width={{ base: "full", md: "auto" }}
            _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
            transition="all 0.2s"
          >
            Download Manifesto
          </Button>
        </VStack>
      </Box>
    );
  };
  
  export default ManifestoDownload;