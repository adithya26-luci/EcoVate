import { motion, AnimatePresence, Variants } from "framer-motion";
import { useLocation } from "react-router-dom";

type PageTransitionProps = {
  children: React.ReactNode;
};

type AnimationVariant = {
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit: Record<string, any>;
};

const getPageVariants = (path: string): Variants => {
  // Common transition settings
  const baseTransition = {
    duration: 0.6, // Increased from 0.4s to 0.6s for a more deliberate feel
    ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number], // Smoother cubic-bezier curve
  };
  
  // Slightly longer delay for a more pronounced effect
  const enterDelay = 0.15;

  // Different animations based on path
  switch (path) {
    case '/dashboard':
      return {
        initial: { opacity: 0, y: 30, scale: 0.98 },
        animate: { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { ...baseTransition, delay: enterDelay }
        },
        exit: { 
          opacity: 0, 
          y: -30, 
          scale: 0.98,
          transition: baseTransition
        }
      };
    
    case '/projects':
      return {
        initial: { opacity: 0, x: 50, rotateY: -5 },
        animate: { 
          opacity: 1, 
          x: 0, 
          rotateY: 0,
          transition: { ...baseTransition, delay: enterDelay }
        },
        exit: { 
          opacity: 0, 
          x: -50, 
          rotateY: 5,
          transition: baseTransition
        }
      };

    case '/map':
      return {
        initial: { opacity: 0, scale: 1.05 },
        animate: { 
          opacity: 1, 
          scale: 1,
          transition: { ...baseTransition, delay: enterDelay }
        },
        exit: { 
          opacity: 0, 
          scale: 0.95,
          transition: baseTransition
        }
      };

    case '/analytics':
      return {
        initial: { opacity: 0, y: 30, skewY: -2 },
        animate: { 
          opacity: 1, 
          y: 0, 
          skewY: 0,
          transition: { ...baseTransition, delay: enterDelay }
        },
        exit: { 
          opacity: 0, 
          y: -30, 
          skewY: 2,
          transition: baseTransition
        }
      };

    case '/settings':
      return {
        initial: { opacity: 0, rotateX: -10, y: 20 },
        animate: { 
          opacity: 1, 
          rotateX: 0, 
          y: 0,
          transition: { ...baseTransition, delay: enterDelay }
        },
        exit: { 
          opacity: 0, 
          rotateX: 10, 
          y: -20,
          transition: baseTransition
        }
      };

    case '/progress':
      return {
        initial: { opacity: 0, y: 30, rotateZ: -2 },
        animate: { 
          opacity: 1, 
          y: 0, 
          rotateZ: 0,
          transition: { 
            ...baseTransition, 
            duration: 0.7, // Slightly longer for spring animations
            delay: enterDelay, 
            type: 'spring', 
            stiffness: 100,
            damping: 15 // Added damping for a more controlled spring
          }
        },
        exit: { 
          opacity: 0, 
          y: -30, 
          rotateZ: 2,
          transition: { 
            ...baseTransition, 
            duration: 0.7, // Slightly longer for spring animations
            type: 'spring', 
            stiffness: 100,
            damping: 15 // Added damping for a more controlled spring
          }
        }
      };

    default:
      return {
        initial: { opacity: 0, x: 50 },
        animate: { 
          opacity: 1, 
          x: 0,
          transition: { ...baseTransition, delay: enterDelay }
        },
        exit: { 
          opacity: 0, 
          x: -50,
          transition: baseTransition
        }
      };
  }
};

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const variants = getPageVariants(location.pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variants as Variants}
        className="flex-1 overflow-y-auto h-full"
        style={{
          transformOrigin: 'top center',
          backfaceVisibility: 'hidden' as const,
          WebkitFontSmoothing: 'subpixel-antialiased' as const,
          willChange: 'transform, opacity'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageTransition;
