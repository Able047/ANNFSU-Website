import { Box } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MassMovements from "../components/MassMovements";

const MassMovementsPage = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <MassMovements />
      <Footer />
    </Box>
  );
};

export default MassMovementsPage;
