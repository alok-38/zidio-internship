import React, { useState } from "react";
import { MdLayersClear } from "react-icons/md";
import { AnimatePresence, motion } from "framer-motion";

const Filters = () => {
  const [isClearHovered, setIsClearHovered] = useState(false);
  return (
    <div className="w-full flex items-center justify-start py-4">
      <div
        className="border border-orange-300 rounded-md
		px-3 py-2 mr-2 cursor-pointer group hover:shadow-md
		bf-orange-200 relative"
        onMouseEnter={() => setIsClearHovered(true)}
        onMouseLeave={() => setIsClearHovered(false)}
      >
        <MdLayersClear className="text-2xl" />
        <AnimatePresence>
          {isClearHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.6, y: 20 }}
              className="absolute -top-8 -left-2 bg-white shadow-md
			rounded-md px-2 py-1"
            >
              <p className="whitespace-nowrap text-xs">Clear all</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Filters;
