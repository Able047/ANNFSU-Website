import {
  Box,
  SimpleGrid,
  Image,
  keyframes,
  Spinner,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

// Dynamically importing all the images from the event directory
const images = import.meta.glob(
  "../assets/fsu/*.{jpg,jpeg,png,svg,JPG,PNG}"
);

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

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fadeOutSpinner, setFadeOutSpinner] = useState(false);
  // Store aspect ratios in state, keyed by image id
  const [aspectRatios, setAspectRatios] = useState({});

  // Define columns for different breakpoints
  const columns = useBreakpointValue({ base: 1, sm: 2, md: 3, lg: 4 });

  useEffect(() => {
    const loadImages = async () => {
      const importedImages = await Promise.all(
        Object.keys(images).map(async (key, index) => {
          const image = await images[key]();
          return {
            id: index + 1,
            src: image.default,
            alt: `Gallery image ${index + 1}`,
            filename: key.split("/").pop(),
            // Set a default aspect ratio that will be updated on image load
            aspectRatio: 1,
          };
        })
      );

      // Randomize the order of images for more interesting masonry effect
      const shuffledImages = [...importedImages].sort(() => Math.random() - 0.5);
      
      setGalleryItems(shuffledImages);
      
      // Simulate loading time and fade out spinner
      setTimeout(() => {
        setFadeOutSpinner(true);
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }, 1000);
    };
    
    loadImages();
  }, []);

  // Callback to update aspect ratio when image loads
  const handleImageLoad = useCallback((imageId, event) => {
    const img = event.target;
    const ratio = img.naturalWidth / img.naturalHeight;
    setAspectRatios((prev) => ({
      ...prev,
      [imageId]: ratio,
    }));
  }, []);

  // No masonry effect needed anymore

  return (
    <Flex direction="column" minHeight="100vh">
      <Box flex="1" p={5}>
        {loading ? (
          <Flex
            justifyContent="center"
            alignItems="center"
            height="100vh"
            animation={fadeOutSpinner ? `${fadeOut} 0.5s ease-in-out` : "none"}
          >
            <Spinner size="xl" thickness="4px" color="teal.500" />
          </Flex>
        ) : (
          <SimpleGrid
            columns={columns}
            spacing={4}
          >
            {galleryItems.map((item, index) => (
              <Box
                key={item.id}
                overflow="hidden"
                borderRadius="md"
                position="relative"
                animation={`${fadeIn} 1s ease-in-out ${index * 0.05}s forwards`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  objectFit="cover"
                  width="100%"
                  transition="transform 0.3s"
                  _hover={{ transform: "scale(1.05)" }}
                  loading="lazy"
                  onLoad={(e) => handleImageLoad(item.id, e)}
                />
              </Box>
            ))}
          </SimpleGrid>
        )}
      </Box>
    </Flex>
  );
};

export default Gallery;