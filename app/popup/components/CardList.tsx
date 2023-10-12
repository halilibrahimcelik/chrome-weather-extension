import { Box } from "@mui/material";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const CardList = ({ children }: Props) => {
  return (
    <Box
      component={"ul"}
      sx={{
        listStyle: "none",
        maxHeight: "400px ",
        overflow: "auto",
      }}
    >
      {children}
    </Box>
  );
};

export default CardList;
