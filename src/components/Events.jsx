import { Box, Flex, Text, VStack } from "@chakra-ui/react";

const Events = () => {
  return (
    <Flex align="center" justify="center" minH="87vh">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
        bg="#f0f0f3"
        borderRadius="15px"
        boxShadow="10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff"
        p={6}
        mx="auto"
        mt={8}
        mb={80}
        maxW="400px"
      >
        <VStack spacing={5}>
          <Text fontSize="2xl" fontWeight="bold" color="gray.700">
            Stay Tuned!
          </Text>
          <Text fontSize="md" color="gray.500">
            More events are coming soon.
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Events;
