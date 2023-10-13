import { Box } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
type Props = {
  children: React.ReactNode;
};

const CardList = ({ children }: Props) => {
  return (
    <Box
      component={motion.ul}
      sx={{
        listStyle: "none",
      }}
    >
      {children}
    </Box>
  );
};

export default CardList;
