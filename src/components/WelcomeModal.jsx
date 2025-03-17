import { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Image,
  useDisclosure,
  Button,
  VStack,
  Box,
  Icon,
} from "@chakra-ui/react";
import { FaDownload } from "react-icons/fa";
import WelcomeImage from "../assets/candidates/panel.png";

const WelcomeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    // Open modal when component mounts
    onOpen();

    // Optional: You can add logic to prevent showing the modal on every visit
    // For example, using localStorage to track if the user has seen it recently
    // const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
    // if (!hasSeenWelcome) {
    //   onOpen();
    //   localStorage.setItem('hasSeenWelcome', 'true');
    // }
  }, [onOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay backdropFilter="blur(3px)" bg="blackAlpha.600" />
      <ModalContent borderRadius="md" overflow="hidden">
        <ModalCloseButton
          zIndex="modal"
          color="white"
          bg="blackAlpha.400"
          _hover={{ bg: "blackAlpha.600" }}
        />
        <ModalBody p={0}>
          <VStack spacing={0}>
            <Image src={WelcomeImage} alt="Welcome" w="100%" />

            <Box w="100%" bg="white" py={4} px={6}>
              <Button
                as="a"
                href="/documents/manifesto.pdf"
                download="ANNFSU_Manifesto.pdf"
                colorScheme="red"
                size="lg"
                width="100%"
                rightIcon={<Icon as={FaDownload} />}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "md",
                }}
                transition="all 0.2s"
              >
                घोषणापत्र डाउनलोड गर्नुहोस्
              </Button>
            </Box>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default WelcomeModal;
