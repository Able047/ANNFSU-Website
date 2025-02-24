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
  Stack,
  Button,
  List,
  ListItem,
  ListIcon,
  useBreakpointValue,
  keyframes,
  Link
} from "@chakra-ui/react";
import { 
  FaUsers, 
  FaGraduationCap, 
  FaHandshake, 
  FaBalanceScale, 
  FaBullhorn,
  FaCheckCircle,
  FaUniversity,
  FaCalendarAlt
} from "react-icons/fa";
import { withPageTransition } from "../context/TransitionContext";

// Dynamic image import
const images = import.meta.glob(
  "../assets/aandolan/*.{jpg,jpeg,png,svg,JPG,PNG}"
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

// Key features of movements
const movementFeatures = [
  {
    title: "Advocating for Fair Fees and Financial Justice",
    description: "ANNFSU regularly campaigns against unjust fee hikes—be it for regular tuition fees, back exam fees, or other hidden charges. The union ensures that students are not overburdened by financial constraints and works toward making education affordable for all.",
    icon: FaBalanceScale,
    color: "red.500",
  },
  {
    title: "Fighting for Quality Education and Equal Treatment",
    description: "The union takes a strong stand against any form of discrimination or inequality in the academic environment. Whether it's class schedules, lab facilities, or access to resources, ANNFSU demands that all students have equal access to quality education.",
    icon: FaGraduationCap,
    color: "blue.500",
  },
  {
    title: "Ensuring Timely Exams and Regular Classes",
    description: "ANNFSU actively monitors and raises concerns when there are delays in exams, irregularities in class schedules, or disruptions in lab sessions. They ensure that no student faces unnecessary delays in completing their degree.",
    icon: FaCalendarAlt,
    color: "green.500",
  },
  {
    title: "Protecting Students from Unwarranted Administrative Pressure",
    description: "ANNFSU protects students from any undue pressure from the government or campus administration. This includes resisting policies that unfairly impact students' academic or personal well-being.",
    icon: FaUniversity,
    color: "purple.500",
  },
  {
    title: "Peaceful Protests and Demonstrations",
    description: "When necessary, ANNFSU organizes peaceful protests, sit-ins, and rallies to draw attention to students' issues and demand immediate action. These movements are always conducted in a disciplined and non-violent manner.",
    icon: FaBullhorn,
    color: "orange.500",
  },
  {
    title: "Building Awareness and Mobilizing Students",
    description: "ANNFSU empowers students through awareness campaigns, seminars, and workshops to become active participants in movements that protect their rights and uphold their dignity.",
    icon: FaUsers,
    color: "teal.500",
  },
  {
    title: "Collaborating with Other Student Organizations",
    description: "To amplify their efforts, ANNFSU collaborates with other student unions and organizations that share similar goals, ensuring students' voices are heard more effectively.",
    icon: FaHandshake,
    color: "yellow.600",
  },
];

// Purpose and significance points
const significancePoints = [
  "Upholding Students' Rights: ANNFSU works tirelessly to safeguard the rights of every student, bringing important issues to the forefront of administrative discussions.",
  "Creating an Equal and Just Campus Environment: The union strives to ensure that Pulchowk Campus is a place where all students are treated equally, with no bias or favoritism.",
  "Promoting Student Solidarity: Through mass movements, ANNFSU fosters unity and solidarity among students, encouraging them to support each other and take collective action.",
  "Ensuring Long-Term Change: The movements are aimed at effecting long-term changes in policies and practices, creating a system where students' voices are consistently heard and respected."
];

const MassMovements = () => {
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
              alt: `ANNFSU Movement - ${key.split("/").pop().split(".")[0]}`,
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
        
        // Set 3 featured images for the sections
        if (sortedImages.length > 3) {
          setFeaturedImages(sortedImages.slice(1, 4).map(img => img.src));
        }
        
        // Set remaining images for gallery
        setGalleryImages(sortedImages.slice(4));
        
        setLoading(false);
      } catch (error) {
        console.error("Error loading images:", error);
        setLoading(false);
      }
    };
    
    loadImages();
  }, []);

  return (
    <Box bg={bgColor}>
      
      {/* Hero Section */}
      <Box position="relative" height={{ base: "50vh", md: "70vh" }} overflow="hidden">
        {!loading && heroImage && (
          <Image
            src={heroImage}
            alt="ANNFSU Mass Movement"
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
            Mass Movements of ANNFSU
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
            Advocating for students' rights and ensuring fair treatment for all
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
            <Flex direction={{ base: "column", md: "row" }} gap={6} align="center">
              <Box flex="2">
                <Heading as="h2" size={subheadingSize} mb={4} color={accentColor}>
                  Standing Up for Student Rights
                </Heading>
                <Text fontSize="lg" color={textColor} mb={4}>
                  The All Nepal National Free Students' Union (ANNFSU) at Pulchowk Campus is a proactive and dedicated student organization that stands firm in advocating for students' rights and ensuring fair treatment for all students. One of the core aspects of ANNFSU's mission is to engage in peaceful mass movements aimed at addressing issues faced by students, whether they are related to fees, academic schedules, lab services, or any other aspect of student life.
                </Text>
                <Text fontSize="lg" color={textColor}>
                  ANNFSU believes that every student, regardless of their background or academic standing, should be treated with respect and fairness by both the government and campus administration. The union actively works to protect students from any undue pressure, financial burden, or arbitrary decisions that may affect their education and overall well-being.
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
                    alt="ANNFSU Protest" 
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
      
      {/* Key Features Section */}
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
                transform: "translateX(-50%)"
              }}
            >
              Key Features of Our Mass Movements
            </Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} pt={8}>
              {movementFeatures.map((feature, index) => (
                <Card 
                  key={index} 
                  variant="outline" 
                  borderRadius="lg"
                  boxShadow="md"
                  overflow="hidden"
                  bg={cardBg}
                  height="100%"
                  animation={`${index % 2 === 0 ? fadeInLeft : fadeInRight} 0.8s ease-in-out ${0.2 + index * 0.1}s`}
                  opacity="0"
                  sx={{ animationFillMode: "forwards" }}
                  _hover={{ transform: "translateY(-5px)", boxShadow: "xl" }}
                  transition="all 0.3s"
                >
                  <CardBody p={6}>
                    <HStack spacing={4} mb={4}>
                      <Icon as={feature.icon} boxSize={10} color={feature.color} />
                      <Heading as="h3" size="md" lineHeight="tight">
                        {feature.title}
                      </Heading>
                    </HStack>
                    <Text color={textColor}>{feature.description}</Text>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </Container>
      </Box>
      
      {/* Middle Image Section - Full Width */}
      {!loading && featuredImages[1] && (
        <Box 
          position="relative" 
          height={{ base: "300px", md: "400px" }} 
          overflow="hidden"
          boxShadow="inner"
        >
          <Image
            src={featuredImages[1]}
            alt="ANNFSU Mass Movement"
            objectFit="cover"
            width="100%"
            height="100%"
            filter="brightness(0.8)"
          />
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="rgba(0, 0, 0, 0.3)"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Heading
              as="h2"
              size="xl"
              color="white"
              textAlign="center"
              maxW="800px"
              p={4}
              textShadow="2px 2px 4px rgba(0,0,0,0.5)"
            >
              Uniting for a Common Cause
            </Heading>
          </Box>
        </Box>
      )}
      
      {/* Purpose and Significance Section */}
      <Container maxW="container.xl" py={10}>
        <Flex direction={{ base: "column", md: "row" }} gap={8}>
          {!loading && featuredImages[2] && (
            <Box 
              flex="1" 
              borderRadius="lg" 
              overflow="hidden"
              boxShadow="xl"
              animation={`${fadeInLeft} 1s ease-in-out`}
              alignSelf="center"
            >
              <Image 
                src={featuredImages[2]} 
                alt="Students protesting" 
                w="100%" 
                h="auto"
                objectFit="cover"
              />
            </Box>
          )}
          
          <VStack 
            flex="1" 
            align="start" 
            spacing={6}
            animation={`${fadeInRight} 1s ease-in-out 0.2s`}
            opacity="0"
            sx={{ animationFillMode: "forwards" }}
          >
            <Heading as="h2" size={subheadingSize} color={accentColor}>
              Purpose and Significance of the Movements
            </Heading>
            
            <List spacing={4}>
              {significancePoints.map((point, index) => (
                <ListItem key={index} display="flex">
                  <ListIcon as={FaCheckCircle} color={accentColor} mt={1} />
                  <Text fontSize="lg">{point}</Text>
                </ListItem>
              ))}
            </List>
            
            <Text fontSize="lg" fontStyle="italic" mt={4}>
              In summary, ANNFSU's mass movements at Pulchowk Campus are a crucial part of its mission to ensure that students' rights are protected and upheld. Through peaceful protest, dialogue, and active engagement, the union works to create a campus where every student is treated fairly, has access to quality education, and is free from any undue administrative pressures.
            </Text>
          </VStack>
        </Flex>
      </Container>
      
      {/* Photo Gallery Section */}
      <Box bg={useColorModeValue("gray.100", "gray.800")} py={10}>
        <Container maxW="container.xl">
          <VStack spacing={10}>
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
                transform: "translateX(-50%)"
              }}
            >
              Movement Gallery
            </Heading>
            
            <Text 
              fontSize="lg" 
              maxW="800px" 
              textAlign="center" 
              mt={2}
            >
              A visual journey through our peaceful protests and demonstrations for student rights
            </Text>
            
            {!loading && galleryImages.length > 0 ? (
              <SimpleGrid columns={imageColumns} spacing={4} w="100%" pt={4}>
                {galleryImages.map((image, index) => (
                  <Box 
                    key={index} 
                    borderRadius="md" 
                    overflow="hidden"
                    boxShadow="md"
                    animation={`${fadeIn} 0.8s ease-in-out ${0.1 + index * 0.05}s`}
                    opacity="0"
                    sx={{ animationFillMode: "forwards" }}
                    transition="all 0.3s"
                    _hover={{ transform: "scale(1.03)", boxShadow: "lg" }}
                  >
                    <Image 
                      src={image.src} 
                      alt={image.alt} 
                      w="100%" 
                      h="250px"
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
              Join the Movement
            </Heading>
            <Text fontSize="lg" maxW="800px">
              Be a part of the change you want to see. Join ANNFSU in advocating for students' rights and creating a fair academic environment for all.
            </Text>
            <HStack spacing={4} pt={4}>
              <Link href="/contact" >
              <Button 
                colorScheme="red" 
                size="lg" 
                _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}
                transition="all 0.3s"
              >
                Get Involved
              </Button>
              </Link>

              <Link href="/contact" >
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
  );
};

export default withPageTransition(MassMovements);