import { createContext, useContext, useState } from 'react';
import { motion } from 'framer-motion';

const TransitionContext = createContext();

export const TransitionProvider = ({ children }) => {
  const [transition, setTransition] = useState({
    type: 'fade', // Default to a softer fade transition
    direction: 'right',
    duration: 0.6
  });

  // New and more diverse page transitions
  const pageTransitions = {
    // Slide transitions
    slideInitial: (direction) => {
      const xValues = { right: '30vw', left: '-30vw' };
      const yValues = { up: '30vh', down: '-30vh' };
      
      return {
        x: xValues[direction] || 0,
        y: yValues[direction] || 0,
        opacity: 0
      };
    },
    slideAnimate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    slideExit: (direction) => {
      const xValues = { right: '-30vw', left: '30vw' };
      const yValues = { up: '-30vh', down: '30vh' };
      
      return {
        x: xValues[direction] || 0,
        y: yValues[direction] || 0,
        opacity: 0,
        transition: {
          type: "tween",
          ease: "easeInOut",
          duration: 0.4
        }
      };
    },
    
    // Fade transitions
    fadeInitial: () => ({
      opacity: 0
    }),
    fadeAnimate: {
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: "easeInOut"
      }
    },
    fadeExit: () => ({
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }),
    
    // Zoom transitions
    zoomInitial: () => ({
      opacity: 0,
      scale: 1.1
    }),
    zoomAnimate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    zoomExit: () => ({
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }),
    
    // Flip transitions
    flipInitial: (direction) => {
      const rotateX = direction === 'up' || direction === 'down' ? (direction === 'up' ? 15 : -15) : 0;
      const rotateY = direction === 'left' || direction === 'right' ? (direction === 'right' ? -15 : 15) : 0;
      
      return {
        opacity: 0,
        rotateX,
        rotateY,
        perspective: 1200,
        transformOrigin: 'center'
      };
    },
    flipAnimate: {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.5
      }
    },
    flipExit: (direction) => {
      const rotateX = direction === 'up' || direction === 'down' ? (direction === 'down' ? 15 : -15) : 0;
      const rotateY = direction === 'left' || direction === 'right' ? (direction === 'left' ? -15 : 15) : 0;
      
      return {
        opacity: 0,
        rotateX,
        rotateY,
        transition: {
          type: "tween",
          ease: "easeIn",
          duration: 0.4
        }
      };
    },
    
    // Rotate transitions
    rotateInitial: () => ({
      opacity: 0,
      rotate: -5,
      scale: 0.98
    }),
    rotateAnimate: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.5
      }
    },
    rotateExit: () => ({
      opacity: 0,
      rotate: 5,
      scale: 0.98,
      transition: {
        type: "tween",
        ease: "easeIn",
        duration: 0.4
      }
    })
  };

  // Helper to get the correct transition variant based on type
  const getVariants = (type) => {
    switch (type) {
      case 'fade':
        return {
          initial: pageTransitions.fadeInitial,
          animate: pageTransitions.fadeAnimate,
          exit: pageTransitions.fadeExit
        };
      case 'zoom':
        return {
          initial: pageTransitions.zoomInitial,
          animate: pageTransitions.zoomAnimate,
          exit: pageTransitions.zoomExit
        };
      case 'flip':
        return {
          initial: pageTransitions.flipInitial,
          animate: pageTransitions.flipAnimate,
          exit: pageTransitions.flipExit
        };
      case 'rotate':
        return {
          initial: pageTransitions.rotateInitial,
          animate: pageTransitions.rotateAnimate,
          exit: pageTransitions.rotateExit
        };
      case 'slide':
      default:
        return {
          initial: pageTransitions.slideInitial,
          animate: pageTransitions.slideAnimate,
          exit: pageTransitions.slideExit
        };
    }
  };

  const value = {
    transition,
    setTransition,
    pageTransitions,
    getVariants
  };

  return (
    <TransitionContext.Provider value={value}>
      {children}
    </TransitionContext.Provider>
  );
};

export const useTransition = () => {
  const context = useContext(TransitionContext);
  if (!context) {
    throw new Error('useTransition must be used within a TransitionProvider');
  }
  return context;
};

// Higher-order component for page transitions
export const withPageTransition = (WrappedComponent) => {
  return function WithPageTransition(props) {
    const { transition, getVariants } = useTransition();
    const variants = getVariants(transition.type);
    
    return (
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants}
        custom={transition.direction}
        className="w-full min-h-screen"
      >
        <WrappedComponent {...props} />
      </motion.div>
    );
  };
}

// Example of how to use this in a component:
// 
// import { useTransition } from '../context/TransitionContext';
//
// function MyComponent() {
//   const { setTransition } = useTransition();
//   
//   // Change the transition type (for next page transition)
//   const changeTransition = () => {
//     setTransition({
//       type: 'flip',
//       direction: 'up',
//       duration: 0.8
//     });
//   };
//
//   return (
//     <div>
//       <button onClick={changeTransition}>Change Animation</button>
//     </div>
//   );
// }