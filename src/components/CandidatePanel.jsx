import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  SimpleGrid,
  Box,
  Image,
  Text,
  VStack,
  Heading,
  HStack,
  Icon,
} from "@chakra-ui/react";
import { FaUsers } from "react-icons/fa";

// Import candidate panel image
import candidatePanel from "../assets/candidates/panel.png";

const CandidatePanel = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box my={6}>
      <Button
        onClick={onOpen}
        leftIcon={<Icon as={FaUsers} />}
        colorScheme="red"
        size="lg"
        boxShadow="md"
        _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
        transition="all 0.2s"
      >
        View Candidate Panel
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(5px)" />
        <ModalContent borderRadius="md" mx={4}>
          <ModalHeader bg="red.500" color="white" borderTopRadius="md">
            Our Candidate Panel
          </ModalHeader>
          <ModalCloseButton color={isOpen ? "white" : "gray.500"} />
          <ModalBody p={6}>
            <VStack spacing={6}>
              <Image
                src={candidatePanel}
                alt="ANNFSU Candidate Panel"
                borderRadius="md"
                w="100%"
                boxShadow="md"
              />

              <Text fontSize="md" textAlign="center">
                Meet our dedicated team of candidates who are committed to
                representing student voices and addressing important issues at
                Pulchowk Campus.
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default CandidatePanel;
