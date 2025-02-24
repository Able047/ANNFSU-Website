import { Box } from '@chakra-ui/react'
import Gallery from '../components/Gallery'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { withPageTransition } from '../context/TransitionContext'

const GalleryPage = () => {
  return (
    <Box>
        <Navbar/>
        <Gallery/>
        <Footer/>
    </Box>
  )
}

export default withPageTransition(GalleryPage); 