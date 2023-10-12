import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useMainContext } from "../context/MainContext";
import { motion } from "framer-motion";
const DarkMode = () => {
  const theme = useTheme();
  const { toggleColorMode } = useMainContext();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: -200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeIn" }}
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        justifyContent: "end",
        bgcolor: "background.default",
        color: "text.primary",
        borderRadius: 0,
        py: 2,
        px: 1,
      }}
    >
      <span className="capitalize"> {theme.palette.mode} </span>

      <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
        {theme.palette.mode === "dark" ? (
          <Brightness7Icon titleAccess="Ligth Mode" />
        ) : (
          <Brightness4Icon titleAccess="Dark Mode" />
        )}
      </IconButton>
    </Box>
  );
};
export default DarkMode;
