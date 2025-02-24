import {
  Box,
  Flex,
  Text,
  VStack,
  HStack,
  Divider,
  Icon,
  Stack,
  keyframes,
  Button,
  UnorderedList,
  ListItem,
  Link as ChakraLink,
  Image,
  Grid,
  GridItem,
  useBreakpointValue,
  Container,
  Heading,
  SimpleGrid,
} from "@chakra-ui/react";

import {
  FaGlobeAsia,
  FaUserTie,
  FaYoutube,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaBook,
  FaQuestionCircle,
} from "react-icons/fa";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { withPageTransition } from "../context/TransitionContext";
import { useEffect, useState } from "react";

// Dynamically import all images from admission helpdesk directory
const images = import.meta.glob(
  "../assets/admissionHelpDesk/*.{jpg,jpeg,png,svg,JPG,PNG}"
);

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const features = [
  {
    title: "Guidance on Admission Procedures",
    description:
      "ANNFSU volunteers provide clear instructions on how to complete admission forms, understand eligibility criteria, and submit necessary documents, ensuring that no detail is missed.",
    icon: FaInfoCircle,
  },
  {
    title: "Information on Programs and Courses",
    description:
      "We help students understand the various engineering programs offered at Pulchowk Campus, providing insights into specializations, electives, and the curriculum.",
    icon: FaBook,
  },
  {
    title: "Campus Tours and Facilities Overview",
    description:
      "For students who are unfamiliar with the campus, ANNFSU arranges short tours, highlighting key locations like classrooms, laboratories, libraries, hostels, and student centers.",
    icon: FaMapMarkerAlt,
  },
  {
    title: "General Support and Assistance",
    description:
      "Our team is available to answer any general questions students may have about life at Pulchowk, including hostel arrangements, transportation, student clubs, and other campus activities.",
    icon: FaQuestionCircle,
  },
];

const AdmissionHelpDesk = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const imageSize = useBreakpointValue({
    base: "100%",
    md: "350px",
    lg: "450px",
  });
  const textWidth = useBreakpointValue({ base: "100%", md: "60%", lg: "55%" });
  const featureColumns = useBreakpointValue({ base: 1, md: 2 });

  useEffect(() => {
    const loadImages = async () => {
      const importedImages = await Promise.all(
        Object.keys(images).map(async (key, index) => {
          const image = await images[key]();
          return {
            id: index + 1,
            src: image.default,
            alt: `Admission Helpdesk image ${index + 1}`,
          };
        })
      );

      // Shuffle the images for variety
      const shuffledImages = [...importedImages].sort(
        () => Math.random() - 0.5
      );
      setGalleryImages(shuffledImages);
      setLoading(false);
    };

    loadImages();
  }, []);

  return (
    <Box>
      <Navbar />

      {/* Hero Section */}
      <Box
        position="relative"
        height={{ base: "50vh", md: "60vh" }}
        overflow="hidden"
      >
        {!loading && galleryImages.length > 0 && (
          <Image
            src={galleryImages[0].src}
            alt="Admission Helpdesk Hero"
            objectFit="cover"
            w="100%"
            h="100%"
            filter="brightness(0.7)"
          />
        )}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          textAlign="center"
          color="white"
          width="80%"
        >
          <Heading
            as="h1"
            fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
            fontWeight="bold"
            textShadow="2px 2px 4px rgba(0,0,0,0.5)"
            mb={4}
          >
            ANNFSU Admission Helpdesk
          </Heading>
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            textShadow="1px 1px 2px rgba(0,0,0,0.7)"
          >
            Supporting and guiding new students through their admission journey
          </Text>
        </Box>
      </Box>

      {/* Introduction Section */}
      <Container maxW="container.xl" pt={12} pb={8}>
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          gap={8}
        >
          <Box
            width={textWidth}
            animation={`${fadeIn} 1s ease-in-out forwards`}
          >
            <Heading as="h2" fontSize="2xl" mb={4}>
              Supporting Your Academic Journey
            </Heading>
            <Text fontSize="lg" mb={4}>
              During the admission period at Pulchowk Campus, the All Nepal
              National Free Students' Union (ANNFSU) plays a crucial role in
              supporting incoming students through the admission process.
              Recognizing that navigating university admissions can be a
              challenging and overwhelming experience, ANNFSU sets up an
              Admission Helpdesk to assist new students and their families.
            </Text>
            <Text fontSize="lg">
              The ANNFSU Admission Helpdesk is staffed by knowledgeable and
              approachable members who guide prospective students step-by-step
              through the various stages of the admission process. From helping
              with filling out application forms to answering queries about
              course selection, campus facilities, and student services, the
              helpdesk serves as a friendly point of contact for all incoming
              students.
            </Text>
          </Box>
          {!loading && galleryImages.length > 1 && (
            <Box
              width={{ base: "100%", md: "40%" }}
              height={imageSize}
              borderRadius="md"
              overflow="hidden"
              boxShadow="lg"
              animation={`${slideIn} 1s ease-in-out 0.3s forwards`}
              opacity="0"
            >
              <Image
                src={galleryImages[1].src}
                alt="Students at helpdesk"
                objectFit="cover"
                width="100%"
                height="100%"
              />
            </Box>
          )}
        </Flex>
      </Container>

      {/* Features Section */}
      <Box bg="gray.50" py={12}>
        <Container maxW="container.xl">
          <Heading
            as="h2"
            fontSize="2xl"
            textAlign="center"
            mb={8}
            animation={`${fadeIn} 1s ease-in-out 0.2s forwards`}
          >
            Key Features of the Admission Helpdesk
          </Heading>

          <SimpleGrid columns={featureColumns} spacing={8}>
            {features.map((feature, index) => (
              <Box
                key={index}
                borderWidth="1px"
                borderRadius="lg"
                p={6}
                bg="white"
                boxShadow="md"
                animation={`${fadeIn} 1s ease-in-out ${
                  0.3 + index * 0.1
                }s forwards`}
                opacity="0"
                height="100%"
                transition="transform 0.3s"
                _hover={{ transform: "translateY(-5px)" }}
              >
                <Icon as={feature.icon} w={10} h={10} color="blue.500" mb={4} />
                <Heading as="h3" fontSize="xl" mb={3}>
                  {feature.title}
                </Heading>
                <Text color="gray.600">{feature.description}</Text>
              </Box>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* Gallery Section */}
      <Container maxW="container.xl" py={12}>
        <Heading
          as="h2"
          fontSize="2xl"
          textAlign="center"
          mb={8}
          animation={`${fadeIn} 1s ease-in-out 0.2s forwards`}
        >
          Our Helpdesk in Action
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={6}>
          {!loading &&
            galleryImages.slice(2, 8).map((image, index) => (
              <Box
                key={index}
                borderRadius="md"
                overflow="hidden"
                boxShadow="md"
                animation={`${fadeIn} 1s ease-in-out ${
                  0.3 + index * 0.1
                }s forwards`}
                opacity="0"
                height="250px"
                transition="transform 0.3s"
                _hover={{ transform: "scale(1.02)" }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </Box>
            ))}
        </SimpleGrid>
      </Container>

      {/* Final CTA Section */}
      <Box bg="blue.50" py={12}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            gap={8}
          >
            {!loading && galleryImages.length > 8 && (
              <Box
                width={{ base: "100%", md: "40%" }}
                height={imageSize}
                borderRadius="md"
                overflow="hidden"
                boxShadow="lg"
                animation={`${slideIn} 1s ease-in-out 0.3s forwards`}
                opacity="0"
              >
                <Image
                  src={galleryImages[8].src}
                  alt="ANNFSU Team"
                  objectFit="cover"
                  width="100%"
                  height="100%"
                />
              </Box>
            )}

            <Box
              width={textWidth}
              animation={`${fadeIn} 1s ease-in-out 0.5s forwards`}
              opacity="0"
            >
              <Heading as="h2" fontSize="2xl" mb={4}>
                Your Journey Starts Here
              </Heading>
              <Text fontSize="lg" mb={6}>
                The Admission Helpdesk is designed to ensure that new students
                feel welcomed, supported, and confident as they begin their
                academic journey at Pulchowk Campus. By offering this service,
                ANNFSU reinforces its commitment to making the transition into
                university life as smooth and stress-free as possible, helping
                students settle in quickly and effectively. Through this
                initiative, ANNFSU continues to foster a spirit of unity,
                cooperation, and community within the student body from day one.
              </Text>
              <ChakraLink href="/contact">
                <Button
                  colorScheme="blue"
                  size="lg"
                  _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                  transition="all 0.3s"
                >
                  Visit Our Helpdesk
                </Button>
              </ChakraLink>
            </Box>
          </Flex>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
};

export default withPageTransition(AdmissionHelpDesk);
