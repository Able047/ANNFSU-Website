import { Box, ChakraProvider } from "@chakra-ui/react";
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { TransitionProvider, useTransition } from "./context/TransitionContext";
import HomePage from "./Pages/HomePage";
import GalleryPage from "./Pages/GalleryPage";
import AdmissionHelpDesk from "./Pages/AdmissionHelpDesk";
import MassMovements from "./Pages/MassMovementsPage";
import ContactMe from "./Pages/ContactMe";
import OurProgramsPage from "./Pages/OurProgramsPage";
import StudySuppliesPage from "./Pages/StudySuppliesPage";
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <ChakraProvider>
      <BrowserRouter>
      <Helmet>
        <title>अनेरास्ववियु पुल्चोक क्याम्पस | ANNFSU Pulchowk Campus</title>
        <meta name="description" content="अखिल नेपाल राष्ट्रिय स्वतन्त्र विद्यार्थी युनियन (अनेरास्ववियु) पुल्चोक क्याम्पसको आधिकारिक वेबसाइट। Official website of All Nepal National Free Students' Union (ANNFSU) at Pulchowk Campus, IOE." />
        <meta name="keywords" content="ANNFSU, अनेरास्ववियु, Pulchowk Campus, पुल्चोक क्याम्पस, IOE, student union, Nepal engineering, Pulchowk engineering college, अखिल नेपाल राष्ट्रिय स्वतन्त्र विद्यार्थी युनियन" />
        <meta property="og:title" content="अनेरास्ववियु पुल्चोक क्याम्पस | ANNFSU Pulchowk Campus" />
        <meta property="og:description" content="अखिल नेपाल राष्ट्रिय स्वतन्त्र विद्यार्थी युनियन (अनेरास्ववियु) पुल्चोक क्याम्पसको आधिकारिक वेबसाइट। Visit the official website of ANNFSU at Pulchowk Campus." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.annfsupulchowk.org" />
        <meta property="og:image" content="https://www.annfsupulchowk.org/logo.png" />
        <link rel="canonical" href="https://www.annfsupulchowk.org" />
      </Helmet>
        <TransitionProvider>
          <Box>
            <AnimatedRoutes />
          </Box>
        </TransitionProvider>
      </BrowserRouter>
    </ChakraProvider>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const { setTransition } = useTransition();
  const navigate = useNavigate();

  // Updated transition direction based on navigation
  const handleNavigation = (path) => {
    const currentPath = location.pathname;
    const paths = [
      "/",
      "/annfsuInFSU",
      "/masterclass",
      "/upcommingevents",
      "/admissionHelpDesk",
      "/massMovements",
      "/contact",
      "/follow",
    ];
    const currentIndex = paths.indexOf(currentPath);
    const targetIndex = paths.indexOf(path);

    setTransition({
      direction: targetIndex > currentIndex ? "forward" : "backward",
      duration: 0.5,
    });

    navigate(path);
  };

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage onNavigate={handleNavigation} />} />
        <Route
          path="/annfsuInFSU"
          element={<GalleryPage onNavigate={handleNavigation} />}
        />
        <Route
          path="/admissionHelpdesk"
          element={<AdmissionHelpDesk onNavigate={handleNavigation} />}
        />
        <Route
          path="/massMovements"
          element={<MassMovements onNavigate={handleNavigation} />}
        />
        <Route
          path="/contact"
          element={<ContactMe onNavigate={handleNavigation} />}
        />
        <Route
          path="/Follow"
          element={<OurProgramsPage onNavigate={handleNavigation} />}
        />
        <Route
          path="/studySupplies"
          element={<StudySuppliesPage onNavigate={handleNavigation} />}
        />
      </Routes>
    </AnimatePresence>
  );
};

export default App;