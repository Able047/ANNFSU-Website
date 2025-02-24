import { Box, Text, IconButton, HStack } from '@chakra-ui/react';
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <Box bg="red.500" color="white" py="4" textAlign="center" mt="auto">
      <HStack justify="center" spacing="4">
      <Text>&copy; {new Date().getFullYear()} ANNFSU-Pulchowk Campus.</Text>
      <Text>Get the latest Updates, follow us on:</Text>
        <IconButton
          as="a"
          href="https://www.facebook.com/annfsu.pulchowk?mibextid=qi2Omg&rdid=cbQssM0dpFrDVz2T&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F18BaSVw5sF%2F%3Fmibextid%3Dqi2Omg"
          target="_blank"
          aria-label="Facebook"
          icon={<FaFacebook />}
          colorScheme="blackAlpha"
          variant="ghost"
          fontSize="2xl"
        />
        </HStack>
    </Box>
  );
};

export default Footer;