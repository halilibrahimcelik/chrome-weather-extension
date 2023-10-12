import { Box } from "@mui/material";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
type Props = {
  children: React.ReactNode;
};

const CardList = ({ children }: Props) => {
  return (
    <AnimatePresence>
      <Box
        component={motion.ul}
        sx={{
          listStyle: "none",
          maxHeight: "400px ",
          overflow: "auto",
        }}
      >
        {children}
      </Box>
    </AnimatePresence>
  );
};

export default CardList;
