"use client";

import { motion } from "framer-motion";
import { EASE_MOTION } from "@/lib/constants";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: EASE_MOTION }}
    >
      {children}
    </motion.div>
  );
}
