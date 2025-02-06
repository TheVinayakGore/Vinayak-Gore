import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Tooltip = ({
  children,
  text,
  className, // Accept the className prop
}: {
  children: React.ReactNode;
  text: React.ReactNode; // Change to ReactNode to allow JSX
  className?: string; // Make it optional
}) => {
  const [show, setShow] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center justify-center m-auto absolute bottom-full mb-1 px-3 py-2 text-xs text-white bg-zinc-900/[0.8] rounded ${className}`} // Apply the className here
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;