import { Box } from "@mui/material";
import React, { useRef } from "react";
import { motion } from "framer-motion";
type Props = {
  children: React.ReactNode;
};

const CardList = ({ children }: Props) => {
  return (
    <Box
      component={motion.ul}
      className="cardList"
      sx={{
        listStyle: "none",
      }}
    >
      {children}
    </Box>
  );
};

export default CardList;
