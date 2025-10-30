import React, { useState, useEffect, useRef } from 'react';

const EmojiEyes = () => {
  const [eyePosition, setEyePosition] = useState({ left: 0, top: 0 });
  const faceRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!faceRef.current) return;
    
    const faceRect = faceRef.current.getBoundingClientRect();
    const faceCenterX = faceRect.left + faceRect.width / 2;
    const faceCenterY = faceRect.top + faceRect.height / 2;
    
    // Calculate angle between cursor and face center
    const angle = Math.atan2(e.clientY - faceCenterY, e.clientX - faceCenterX);
    
    // Limit the distance the pupils can move (in pixels)
    const maxDistance = 8;
    const eyeOffsetX = Math.cos(angle) * maxDistance;
    const eyeOffsetY = Math.sin(angle) * maxDistance;
    
    setEyePosition({
      left: eyeOffsetX,
      top: eyeOffsetY
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={faceRef}
      className="relative w-24 h-24 flex items-center justify-center"
      style={{
        fontSize: '4rem',
        lineHeight: '1',
        userSelect: 'none',
        pointerEvents: 'none',
        margin: '0 auto 1.5rem',
      }}
    >
      <div className="relative">
        {/* Emoji face */}
        <div className="text-6xl">😊</div>
        
        {/* Left eye pupil */}
        <div 
          className="absolute w-3 h-3 bg-black rounded-full"
          style={{
            left: '50%',
            top: '45%',
            transform: `translate(calc(-50% - 12px + ${eyePosition.left}px), calc(-50% - 2px + ${eyePosition.top}px))`,
            transition: 'transform 0.1s ease-out',
          }}
        />
        
        {/* Right eye pupil */}
        <div 
          className="absolute w-3 h-3 bg-black rounded-full"
          style={{
            left: '50%',
            top: '45%',
            transform: `translate(calc(-50% + 12px + ${eyePosition.left}px), calc(-50% - 2px + ${eyePosition.top}px))`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      </div>
    </div>
  );
};

export default EmojiEyes;
