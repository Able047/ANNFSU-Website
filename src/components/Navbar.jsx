import { useRef } from "react";
import {
  Flex,
  Link,
  IconButton,
  Spacer,
  HStack,
  Image,
  useBreakpointValue,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerBody,
  VStack,
  DrawerCloseButton,
  Box,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const Navbar = () => {
  const location = useLocation();
  const logoSize = useBreakpointValue({
    base: "50px",
    md: "70px",
    lg: "70px",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Admission Helpdesk", path: "/admissionHelpDesk" },
    { name: "ANNFSU In FSU", path: "/annfsuInFSU" },
    { name: "Our Protests", path: "/massMovements" },
    { name: "Our Programs", path: "/Follow" },
    { name: "Study Supplies", path: "/studySupplies" },
    { name: "Contact", path: "/contact" },
  ];

  // Smoother animation variants
  const linkVariants = {
    initial: { 
      y: 0,
      backgroundColor: "transparent",
    },
    hover: { 
      y: -2,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.2,
      }
    },
    tap: { 
      y: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.1,
      }
    }
  };

  return (
    <Flex as="nav" p="4" align="center" boxShadow="sm">
      <Link href="/" mr="8">
        <Image
          src={logo}
          alt="ANNFSU Logo"
          height={logoSize}
          mr="8"
        />
      </Link>

      <Spacer />

      <HStack
        spacing={{ base: "4", md: "8" }}
        display={{ base: "none", md: "flex" }}
      >
        {navItems.map((item) => (
          <motion.div
            key={item.name}
            variants={linkVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              as={RouterLink}
              to={item.path}
              fontSize={{ base: "xs", md: "sm" }}
              textTransform="uppercase"
              fontWeight="medium"
              px={3}
              py={2}
              rounded={"md"}
              position="relative"
              color={location.pathname === item.path ? "white" : "gray.700"}
              bg={location.pathname === item.path ? "red.500" : "transparent"}
              transition="all 0.2s ease"
              _hover={{
                textDecoration: "none",
                color: location.pathname === item.path ? "white" : "red.500",
                bg: location.pathname === item.path ? "red.500" : "gray.50",
              }}
              _after={{
                content: location.pathname === item.path ? '""' : "none",
                position: "absolute",
                height: "2px",
                width: "100%",
                bottom: "0",
                left: "0",
                bg: "red.500",
                transform: "scaleX(1)",
                transformOrigin: "bottom left",
              }}
            >
              {item.name}
            </Link>
          </motion.div>
        ))}
      </HStack>

      <Spacer />
      <IconButton
        ref={btnRef}
        display={{ base: "flex", md: "none" }}
        icon={<FiMenu />}
        onClick={onOpen}
        aria-label="Open Menu"
        variant="ghost"
        color="gray.600"
        _hover={{ bg: "gray.100" }}
      />

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody pt={12}>
            <VStack spacing={4} align="stretch">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ x: 5 }}
                  transition={{ type: "tween", duration: 0.2 }}
                >
                  <Link
                    as={RouterLink}
                    to={item.path}
                    fontSize="md"
                    fontWeight="medium"
                    textTransform="uppercase"
                    onClick={onClose}
                    color={location.pathname === item.path ? "white" : "gray.700"}
                    bg={location.pathname === item.path ? "red.500" : "transparent"}
                    w="100%"
                    display="block"
                    px={4}
                    py={3}
                    rounded="md"
                    transition="all 0.2s ease"
                    _hover={{
                      textDecoration: "none",
                      bg: location.pathname === item.path ? "red.600" : "gray.100",
                    }}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Navbar;