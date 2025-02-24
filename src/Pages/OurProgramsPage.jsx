import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Image,
  SimpleGrid,
  Flex,
  VStack,
  HStack,
  Divider,
  Badge,
  useColorModeValue,
  Icon,
  Card,
  CardBody,
  CardHeader,
  Stack,
  Button,
  List,
  ListItem,
  ListIcon,
  useBreakpointValue,
  keyframes,
  Link,
} from "@chakra-ui/react";
import {
  FaQuestionCircle,
  FaPaintBrush,
  FaComments,
  FaFeatherAlt,
  FaMusic,
  FaCheckCircle,
  FaUsers,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaLaptopCode,
  FaCode,
  FaFutbol,
} from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { withPageTransition } from "../context/TransitionContext";

// Dynamic image import
const images = import.meta.glob(
  "../assets/ourPrograms/*.{jpg,jpeg,png,svg,JPG,PNG}"
);

// Animation keyframes
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const fadeInLeft = keyframes`
  from { opacity: 0; transform: translateX(-20px); }
  to { opacity: 1; transform: translateX(0); }
`;

const fadeInRight = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
`;

// Competition data
const competitions = [
  {
    title: "Intertech",
    description:
      "Intertech is a flagship Basket-Ball Tournament organized by ANNFSU that brings together students from different engineering disciplines.",
    icon: FaLaptopCode,
    color: "teal.500",
  },
  {
    title: "C and Python Programming Workshop",
    description:
      "ANNFSU organizes intensive programming workshops focusing on C and Python languages to help students build strong foundations in coding. These workshops cater to beginners and intermediate programmers, featuring hands-on sessions, real-world problem-solving, and mentorship from experienced seniors. Students learn essential programming concepts, algorithmic thinking, and practical implementation skills that complement their academic curriculum.",
    icon: FaCode,
    color: "yellow.600",
  },
  {
    title: "Fresher Futsal",
    description:
      "The Fresher Futsal tournament is an exciting sports event designed especially to welcome new students to Pulchowk Campus. This tournament encourages freshers to form teams, compete in a friendly environment, and build connections with peers across departments. Beyond promoting physical fitness, the event helps new students integrate into campus life, develop teamwork skills, and form lasting friendships in a fun and engaging setting.",
    icon: FaFutbol,
    color: "green.600",
  },
  {
    title: "Quiz Competition",
    description:
      "The Quiz Competition tests students' general knowledge, critical thinking, and problem-solving skills. Covering a wide range of topics from science and technology to history, current affairs, and culture, the quiz is designed to be both challenging and fun. It encourages students to broaden their knowledge beyond their academic curriculum and engage in intellectual discourse.",
    icon: FaQuestionCircle,
    color: "red.500",
  },
  {
    title: "Art Competition",
    description:
      "The Art Competition offers a platform for students to showcase their creative abilities. Whether through painting, sketching, or digital art, this competition encourages artistic expression and inspires students to explore their imagination. It celebrates the diversity of talent on campus and promotes the importance of creativity as part of holistic development.",
    icon: FaPaintBrush,
    color: "blue.500",
  },
  {
    title: "Debate Competition",
    description:
      "The Debate Competition provides an excellent opportunity for students to refine their public speaking, persuasion, and argumentation skills. Students engage in thought-provoking discussions on contemporary issues, helping them develop critical thinking and enhance their ability to communicate effectively.",
    icon: FaComments,
    color: "green.500",
  },
  {
    title: "Poetry Competition",
    description:
      "The Poetry Competition gives students a chance to express their thoughts, emotions, and ideas through the art of poetry. Whether in Nepali, English, or other languages, poetry allows students to connect with their cultural roots and express their creativity. It encourages self-reflection and provides a platform for students to explore their literary talents.",
    icon: FaFeatherAlt,
    color: "purple.500",
  },
  {
    title: "Other Extracurricular Activities",
    description:
      "In addition to the above competitions, ANNFSU organizes a variety of other events such as music, dance, drama, photography, and storytelling contests. These activities ensure that students can participate in something that resonates with their personal interests, allowing for greater inclusion and engagement.",
    icon: FaMusic,
    color: "orange.500",
  },
];

// Purpose points
const purposePoints = [
  {
    title: "Holistic Development",
    description:
      "These competitions provide a much-needed balance between academic work and personal growth. By participating in extracurricular activities, students develop important life skills such as time management, teamwork, creativity, and communication.",
    icon: FaUsers,
    color: "red.500",
  },
  {
    title: "Student Engagement",
    description:
      "The events encourage students to actively engage with the campus community, fostering a sense of belonging and camaraderie among peers. This contributes to a lively, dynamic, and supportive campus environment.",
    icon: FaGraduationCap,
    color: "blue.500",
  },
  {
    title: "Building Confidence and Leadership",
    description:
      "Students who participate in these competitions gain confidence in their abilities, improve their public speaking and presentation skills, and often take on leadership roles in organizing or participating in future events.",
    icon: FaChalkboardTeacher,
    color: "green.500",
  },
  {
    title: "Recognition of Talent",
    description:
      "ANNFSU's extracurricular competitions offer a platform for students to gain recognition for their talents outside the classroom, helping to build their personal and professional profiles. It also encourages a culture of appreciation for diverse talents and creative expression.",
    icon: FaCheckCircle,
    color: "purple.500",
  },
];

const OurProgramsPage = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [heroImage, setHeroImage] = useState("");
  const [featuredImages, setFeaturedImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.700", "gray.100");
  const accentColor = useColorModeValue("red.500", "red.300");

  const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
  const subheadingSize = useBreakpointValue({ base: "lg", md: "xl" });
  const imageColumns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  useEffect(() => {
    const loadImages = async () => {
      try {
        const importedImages = await Promise.all(
          Object.keys(images).map(async (key) => {
            const image = await images[key]();
            return {
              src: image.default,
              alt: `ANNFSU Program - ${key.split("/").pop().split(".")[0]}`,
              filename: key,
            };
          })
        );

        // Sort images for consistent results
        const sortedImages = [...importedImages].sort((a, b) =>
          a.filename.localeCompare(b.filename)
        );

        // Set hero image (first image)
        if (sortedImages.length > 0) {
          setHeroImage(sortedImages[0].src);
        }

        // Set featured images for the competitions (next images)
        // Need more images now for the additional competitions
        if (sortedImages.length > 8) {
          setFeaturedImages(sortedImages.slice(1, 9).map((img) => img.src));
        } else if (sortedImages.length > 1) {
          // If not enough images, reuse what we have
          const availableImages = sortedImages.slice(1).map((img) => img.src);
          // Create an array with enough images by repeating available ones if needed
          setFeaturedImages(
            Array(8)
              .fill()
              .map((_, i) => availableImages[i % availableImages.length])
          );
        }

        // Set remaining images for gallery
        setGalleryImages(sortedImages.slice(9));

        setLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setLoading(false);
      }
    };

    loadImages();
  }, []);

  return (
    <>
      <Navbar />
      <Box bg={bgColor}>
        {/* Hero Section */}
        <Box
          position="relative"
          height={{ base: "50vh", md: "70vh" }}
          overflow="hidden"
        >
          {!loading && heroImage && (
            <Image
              src={heroImage}
              alt="ANNFSU Programs"
              objectFit="cover"
              width="100%"
              height="100%"
              filter="brightness(0.7)"
            />
          )}
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.5)"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            p={4}
          >
            <Heading
              as="h1"
              size="2xl"
              color="white"
              textAlign="center"
              maxW="800px"
              textShadow="2px 2px 4px rgba(0,0,0,0.5)"
              animation={`${fadeIn} 1s ease-in-out`}
            >
              Extracurricular Competitions & Programs
            </Heading>
            <Text
              fontSize="xl"
              color="white"
              mt={4}
              textAlign="center"
              maxW="800px"
              textShadow="1px 1px 2px rgba(0,0,0,0.8)"
              animation={`${fadeIn} 1s ease-in-out 0.3s`}
              opacity="0"
              sx={{ animationFillMode: "forwards" }}
            >
              Fostering creativity, technical skills, and student engagement
            </Text>
          </Box>
        </Box>

        {/* Introduction Section */}
        <Container maxW="container.xl" py={10}>
          <Card
            variant="elevated"
            p={6}
            boxShadow="lg"
            borderRadius="lg"
            bg={cardBg}
            animation={`${fadeIn} 1s ease-in-out`}
          >
            <CardBody>
              <Flex
                direction={{ base: "column", md: "row" }}
                gap={6}
                align="center"
              >
                <Box flex="2">
                  <Heading
                    as="h2"
                    size={subheadingSize}
                    mb={4}
                    color={accentColor}
                  >
                    About Our Programs
                  </Heading>
                  <Text fontSize="lg" color={textColor} mb={4}>
                    The All Nepal National Free Students' Union (ANNFSU)
                    organizes a diverse range of activities and competitions to
                    encourage active participation, creativity, and intellectual
                    engagement among students at Pulchowk Campus. From technical
                    events like Intertech and programming workshops to sports
                    competitions and artistic showcases, our programs are
                    designed to complement academic pursuits by providing
                    students with opportunities to explore their talents and
                    develop well-rounded skills.
                  </Text>
                  <Text fontSize="lg" color={textColor}>
                    With events catering to various interests – including
                    technology, sports, arts, debate, and more – ANNFSU aims to
                    cultivate a vibrant campus culture where students are
                    encouraged to express themselves, develop critical thinking,
                    build technical competence, and engage in healthy
                    competition. These activities create a balanced student
                    experience that prepares participants for both academic
                    success and professional excellence.
                  </Text>
                </Box>
                {!loading && featuredImages[0] && (
                  <Box
                    flex="1"
                    maxW={{ base: "100%", md: "300px" }}
                    borderRadius="md"
                    overflow="hidden"
                    boxShadow="md"
                  >
                    <Image
                      src={featuredImages[0]}
                      alt="ANNFSU Programs"
                      w="100%"
                      h="auto"
                      transition="transform 0.3s"
                      _hover={{ transform: "scale(1.02)" }}
                    />
                  </Box>
                )}
              </Flex>
            </CardBody>
          </Card>
        </Container>

        {/* Key Competitions Section */}
        <Box py={10} bg={useColorModeValue("gray.100", "gray.800")}>
          <Container maxW="container.xl">
            <VStack spacing={8}>
              <Heading
                as="h2"
                size={headingSize}
                textAlign="center"
                position="relative"
                _after={{
                  content: '""',
                  width: "100px",
                  height: "4px",
                  backgroundColor: accentColor,
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                Key Programs and Events
              </Heading>

              {competitions.map((competition, index) => (
                <Flex
                  key={index}
                  direction={{
                    base: "column",
                    md: index % 2 === 0 ? "row" : "row-reverse",
                  }}
                  gap={8}
                  width="100%"
                  mt={10}
                  animation={`${
                    index % 2 === 0 ? fadeInLeft : fadeInRight
                  } 0.8s ease-in-out ${0.2 + index * 0.1}s`}
                  opacity="0"
                  sx={{ animationFillMode: "forwards" }}
                >
                  {!loading && featuredImages[index] && (
                    <Box
                      flex="1"
                      borderRadius="lg"
                      overflow="hidden"
                      boxShadow="lg"
                      alignSelf="center"
                    >
                      <Image
                        src={featuredImages[index+1] || featuredImages[0]}
                        alt={competition.title}
                        w="100%"
                        h="auto"
                        objectFit="cover"
                      />
                    </Box>
                  )}

                  <Card
                    flex="1.5"
                    variant="outline"
                    borderRadius="lg"
                    boxShadow="md"
                    p={0}
                    overflow="hidden"
                    borderLeftWidth={index % 2 === 0 ? 0 : "4px"}
                    borderRightWidth={index % 2 === 0 ? "4px" : 0}
                    borderColor={competition.color}
                  >
                    <CardHeader
                      bg={useColorModeValue("gray.50", "gray.700")}
                      p={4}
                    >
                      <HStack spacing={4}>
                        <Icon
                          as={competition.icon}
                          boxSize={8}
                          color={competition.color}
                        />
                        <Heading as="h3" size="md">
                          {competition.title}
                        </Heading>
                      </HStack>
                    </CardHeader>
                    <CardBody p={6}>
                      <Text color={textColor}>{competition.description}</Text>
                    </CardBody>
                  </Card>
                </Flex>
              ))}
            </VStack>
          </Container>
        </Box>

        {/* Purpose Section */}
        <Container maxW="container.xl" py={10}>
          <VStack spacing={8} mb={10}>
            <Heading
              as="h2"
              size={headingSize}
              textAlign="center"
              position="relative"
              _after={{
                content: '""',
                width: "100px",
                height: "4px",
                backgroundColor: accentColor,
                position: "absolute",
                bottom: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
              }}
            >
              Purpose of Our Programs
            </Heading>

            <Text fontSize="lg" textAlign="center" maxW="800px" mt={6}>
              Our activities and competitions are designed to benefit students in
              multiple ways, fostering both personal and professional growth.
            </Text>
          </VStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            {purposePoints.map((point, index) => (
              <Card
                key={index}
                variant="outline"
                borderRadius="lg"
                boxShadow="md"
                p={0}
                overflow="hidden"
                borderTopWidth="4px"
                borderColor={point.color}
                animation={`${fadeIn} 0.8s ease-in-out ${0.3 + index * 0.1}s`}
                opacity="0"
                sx={{ animationFillMode: "forwards" }}
                height="100%"
                _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
                transition="all 0.3s"
              >
                <CardHeader bg={useColorModeValue("gray.50", "gray.700")} p={4}>
                  <HStack spacing={4}>
                    <Icon as={point.icon} boxSize={6} color={point.color} />
                    <Heading as="h3" size="md">
                      {point.title}
                    </Heading>
                  </HStack>
                </CardHeader>
                <CardBody p={6}>
                  <Text color={textColor}>{point.description}</Text>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          <Box
            mt={12}
            p={6}
            borderRadius="lg"
            bg={useColorModeValue("red.50", "gray.700")}
            borderLeft="4px solid"
            borderColor="red.500"
            animation={`${fadeIn} 1s ease-in-out 0.8s`}
            opacity="0"
            sx={{ animationFillMode: "forwards" }}
          >
            <Text fontSize="lg" fontStyle="italic">
              By organizing these events, ANNFSU ensures that students not only
              excel in their academic pursuits but also have ample opportunities
              to explore, showcase, and develop their technical, creative, and
              interpersonal skills. This balanced approach contributes to
              creating well-rounded individuals who are ready to take on
              leadership roles and make meaningful contributions to society.
            </Text>
          </Box>
        </Container>

        {/* Photo Gallery Section */}
        <Box py={10} bg={useColorModeValue("gray.100", "gray.800")}>
          <Container maxW="container.xl">
            <VStack spacing={8}>
              <Heading
                as="h2"
                size={headingSize}
                textAlign="center"
                position="relative"
                _after={{
                  content: '""',
                  width: "100px",
                  height: "4px",
                  backgroundColor: accentColor,
                  position: "absolute",
                  bottom: "-10px",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                Event Gallery
              </Heading>

              <Text fontSize="lg" maxW="800px" textAlign="center" mt={6}>
                Capturing memorable moments from our past events and
                competitions
              </Text>

              {!loading && galleryImages.length > 0 ? (
                <SimpleGrid columns={imageColumns} spacing={4} w="100%" pt={4}>
                  {galleryImages.map((image, index) => (
                    <Box
                      key={index}
                      borderRadius="md"
                      overflow="hidden"
                      boxShadow="md"
                      animation={`${fadeIn} 0.8s ease-in-out ${
                        0.1 + index * 0.05
                      }s`}
                      opacity="0"
                      sx={{ animationFillMode: "forwards" }}
                      transition="all 0.3s"
                      _hover={{ transform: "scale(1.03)", boxShadow: "lg" }}
                      height="250px" // Fixed height for gallery items
                    >
                      <Image
                        src={image.src}
                        alt={image.alt}
                        w="100%"
                        h="100%"
                        objectFit="cover"
                      />
                    </Box>
                  ))}
                </SimpleGrid>
              ) : (
                <Text>Loading gallery images...</Text>
              )}
            </VStack>
          </Container>
        </Box>

        {/* Call to Action Section */}
        <Box py={12} bg={cardBg}>
          <Container maxW="container.xl">
            <VStack spacing={6} textAlign="center">
              <Heading as="h2" size={subheadingSize} color={accentColor}>
                Join Our Next Event
              </Heading>
              <Text fontSize="lg" maxW="800px">
                Interested in participating in our upcoming events and
                competitions? Register now and showcase your talents!
              </Text>
              <HStack spacing={4} pt={4}>
                <Link href="/contact">
                  <Button
                    colorScheme="red"
                    size="lg"
                    _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                    transition="all 0.3s"
                  >
                    Register Now
                  </Button>
                </Link>

                <Link href="/contact">
                  <Button
                    variant="outline"
                    colorScheme="red"
                    size="lg"
                    _hover={{ transform: "translateY(-2px)" }}
                    transition="all 0.3s"
                  >
                    Learn More
                  </Button>
                </Link>
              </HStack>
            </VStack>
          </Container>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default withPageTransition(OurProgramsPage);