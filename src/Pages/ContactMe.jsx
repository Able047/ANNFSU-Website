import { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  VStack,
  Heading,
  HStack,
  Icon,
  Link,
  Flex,
  Text,
  SimpleGrid,
  Container,
  Image,
  Divider,
  Badge,
  useColorModeValue,
  Card,
  CardBody,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaUserAlt,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { withPageTransition } from "../context/TransitionContext";
import { Helmet } from "react-helmet";

// Dynamically import images from the directory
const images = import.meta.glob(
  "../assets/otherPrograms/*.{jpg,jpeg,png,svg,JPG,PNG}"
);

// Contact person data
const contactPersons = [
  {
    name: "Able \n Khanal",
    phone: "9808274740",
    role: "President",
  },
  {
    name: "Abhisekh Khadka",
    phone: "9861011312",
    role: "Secretary",
  },
  {
    name: "Anusandhan Nepal",
    phone: "9843675554",
    role: "Advisor",
  },
];

const ContactUs = () => {
  const [fromEmail, setFromEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [backgroundImage, setBackgroundImage] = useState("");
  const [teamImages, setTeamImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const cardBg = useColorModeValue("white", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    const loadImages = async () => {
      const importedImages = await Promise.all(
        Object.keys(images).map(async (key) => {
          const image = await images[key]();
          return {
            src: image.default,
            filename: key.split("/").pop(),
          };
        })
      );

      // Sort images by filename for consistent results
      const sortedImages = importedImages.sort((a, b) =>
        a.filename.localeCompare(b.filename)
      );

      // Use first image as background
      if (sortedImages.length > 0) {
        setBackgroundImage(sortedImages[0].src);
      }

      // Use next 3 images for team members
      if (sortedImages.length > 3) {
        setTeamImages(sortedImages.slice(1, 4));
      }

      setLoading(false);
    };

    loadImages();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const to = "annfsupulchowk2017@gmail.com";
    const from = fromEmail;
    const subjectText = subject;
    const body = message;

    const mailto_link =
      "mailto:" +
      to +
      "?cc=" +
      from +
      "&subject=" +
      encodeURIComponent(subjectText) +
      "&body=" +
      encodeURIComponent(body);

    window.location.href = mailto_link;

    // Clearing the form fields after submission
    setFromEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <>
    <Helmet>
    <title>Contact ANNFSU Pulchowk | अनेरास्ववियु पुल्चोक क्याम्पस</title>
    <meta name="description" content="Get in touch with ANNFSU Pulchowk Campus. Contact information, office location, and online form for inquiries and feedback." />
  </Helmet>
    <Box>
      <Navbar />

      {/* Hero Section */}
      <Box position="relative" height="300px" overflow="hidden" mb={10}>
        {!loading && backgroundImage && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bgImage={`url(${backgroundImage})`}
            bgSize="cover"
            bgPosition="center"
            filter="brightness(0.7)"
          />
        )}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="blackAlpha.600"
        />
        <Container
          maxW="container.xl"
          height="100%"
          position="relative"
          centerContent
          justifyContent="center"
        >
          <Heading
            as="h1"
            size="2xl"
            color="white"
            textAlign="center"
            textShadow="2px 2px 4px rgba(0,0,0,0.5)"
          >
            Contact Us
          </Heading>
          <Text
            color="white"
            mt={4}
            fontSize="xl"
            textAlign="center"
            maxW="600px"
            textShadow="1px 1px 2px rgba(0,0,0,0.8)"
          >
            Get in touch with ANNFSU Pulchowk Campus
          </Text>
        </Container>
      </Box>

      <Container maxW="container.xl" py={8}>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {/* Contact Form Section */}
          <Box>
            <Card
              variant="outline"
              bg={cardBg}
              borderColor={borderColor}
              boxShadow="lg"
              borderRadius="lg"
              overflow="hidden"
            >
              <CardBody p={8}>
                <Heading as="h2" size="lg" mb={6} textAlign="center">
                  Send Us a Message
                </Heading>
                <form onSubmit={handleSubmit}>
                  <VStack spacing={5}>
                    <FormControl>
                      <FormLabel>To</FormLabel>
                      <Input
                        type="email"
                        value="annfsupulchowk2017@gmail.com"
                        isReadOnly
                        bg="gray.100"
                        borderRadius="md"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>From</FormLabel>
                      <Input
                        type="email"
                        placeholder="Your email address"
                        value={fromEmail}
                        onChange={(e) => setFromEmail(e.target.value)}
                        borderRadius="md"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Subject</FormLabel>
                      <Input
                        type="text"
                        placeholder="Subject of your message"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        borderRadius="md"
                      />
                    </FormControl>
                    <FormControl isRequired>
                      <FormLabel>Message</FormLabel>
                      <Textarea
                        placeholder="Type your message here..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={6}
                        resize="vertical"
                        borderRadius="md"
                      />
                    </FormControl>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      width="full"
                      size="lg"
                      borderRadius="md"
                      mt={2}
                      _hover={{
                        transform: "translateY(-2px)",
                        boxShadow: "lg",
                      }}
                      transition="all 0.2s"
                    >
                      Send Message
                    </Button>
                  </VStack>
                </form>
              </CardBody>
            </Card>

            {/* Social Media Section */}
            <Card
              variant="outline"
              mt={6}
              bg={cardBg}
              borderColor={borderColor}
              boxShadow="md"
              borderRadius="lg"
            >
              <CardBody p={5}>
                <Heading as="h3" size="md" mb={4} textAlign="center">
                  Connect With Us
                </Heading>
                <HStack justify="center" spacing={8}>
                  <Link
                    href="https://www.facebook.com/annfsu.pulchowk?mibextid=qi2Omg&rdid=MJCgM0RqOxCjCVUB&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18BaSVw5sF%2F%3Fmibextid%3Dqi2Omg"
                    isExternal
                    _hover={{ transform: "scale(1.2)" }}
                    transition="all 0.2s"
                  >
                    <VStack>
                      <Icon as={FaFacebook} boxSize={8} color="blue.500" />
                      <Text fontSize="sm">Facebook</Text>
                    </VStack>
                  </Link>
                  {/* <Link
                    href="https://www.instagram.com/annfsu_pulchowk"
                    isExternal
                    _hover={{ transform: "scale(1.2)" }}
                    transition="all 0.2s"
                  >
                    <VStack>
                      <Icon as={FaInstagram} boxSize={8} color="pink.500" />
                      <Text fontSize="sm">Instagram</Text>
                    </VStack>
                  </Link> */}
                  <Link
                    href="mailto:annfsupulchowk2017@gmail.com"
                    isExternal
                    _hover={{ transform: "scale(1.2)" }}
                    transition="all 0.2s"
                  >
                    <VStack>
                      <Icon as={FaEnvelope} boxSize={8} color="red.500" />
                      <Text fontSize="sm">Email</Text>
                    </VStack>
                  </Link>
                </HStack>
              </CardBody>
            </Card>
          </Box>

          {/* Contact Details Section */}
          <Box>
            <Card
              variant="outline"
              bg={cardBg}
              borderColor={borderColor}
              boxShadow="lg"
              borderRadius="lg"
              mb={6}
            >
              <CardBody p={8}>
                <Heading as="h2" size="lg" mb={6} textAlign="center">
                  Contact Information
                </Heading>

                <VStack spacing={4} align="start">
                  <HStack spacing={4}>
                    <Icon as={FaMapMarkerAlt} boxSize={6} color="blue.500" />
                    <Box>
                      <Text fontWeight="bold">Address</Text>
                      <Text> Pulchowk Campus</Text>
                      <Text>Institute of Engineering, Lalitpur</Text>
                    </Box>
                  </HStack>

                  <HStack spacing={4}>
                    <Icon as={FaPhone} boxSize={6} color="blue.500" />
                    <Box>
                      <Text fontWeight="bold">Phone</Text>
                      <Text>980-8274740</Text>
                    </Box>
                  </HStack>

                  <HStack spacing={4}>
                    <Icon as={FaEnvelope} boxSize={6} color="blue.500" />
                    <Box>
                      <Text fontWeight="bold">Email</Text>
                      <Text>annfsupulchowk2017@gmail.com</Text>
                    </Box>
                  </HStack>
                </VStack>

                <Divider my={6} />

                <Heading as="h3" size="md" mb={4}>
                  Contact Persons
                </Heading>

                <SimpleGrid columns={{ base: 1, sm: 3 }} spacing={4}>
                  {contactPersons.map((person, index) => (
                    <Card
                      key={index}
                      variant="outline"
                      borderColor={borderColor}
                    >
                      <CardBody>
                        <VStack>
                          {!loading && teamImages[index] && (
                            <Avatar
                              size="xl"
                              src={teamImages[index].src}
                              name={person.name}
                              mb={2}
                            />
                          )}
                          <Text fontWeight="bold">{person.name}</Text>
                          <Badge colorScheme="blue">{person.role}</Badge>
                          <HStack>
                            <Icon as={FaPhone} color="green.500" />
                            <Text>{person.phone}</Text>
                          </HStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </CardBody>
            </Card>

            <Card
              variant="outline"
              bg={cardBg}
              borderColor={borderColor}
              boxShadow="md"
              borderRadius="lg"
            >
            </Card>
          </Box>
        </SimpleGrid>
      </Container>

      <Footer />
    </Box>
    </>
  );
};

export default withPageTransition(ContactUs);
