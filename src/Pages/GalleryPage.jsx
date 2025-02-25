import { Box } from '@chakra-ui/react'
import Gallery from '../components/Gallery'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { withPageTransition } from '../context/TransitionContext'
import { Helmet } from "react-helmet";

const GalleryPage = () => {
  return (
    <>
    <Helmet>
        <title>ANNFSU in Free Students Union | अनेरास्ववियु पुल्चोक क्याम्पस</title>
        <meta name="description" content="Learn about ANNFSU's representation and activities in the Free Students Union at Pulchowk Campus. अनेरास्ववियुको विद्यार्थी युनियनमा प्रतिनिधित्व र क्रियाकलापहरू।" />
      </Helmet>
    <Box>
        <Navbar/>
        <Gallery/>
        <Footer/>
    </Box>
    </>
  )
}

export default withPageTransition(GalleryPage); 