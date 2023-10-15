import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import "../popup/style.css";
import MainContextProvider, {
  useMainContext,
} from "../popup/context/MainContext";
import CityCard from "../popup/components/CityCard";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
export default defineContentScript({
  // Set manifest options
  matches: ["<all_urls>"],

  main(ctx) {
    // Executed when content script is loaded
    console.log("Content scripsst loaded!");
    const root = document.createElement("div");

    const App: React.FC<{}> = () => {
      const { cityList, setCityList } = useMainContext();
      const constrainRef = useRef(null);

      useEffect(() => {
        chrome.storage.local.get(["cityList"], (res) => {
          setCityList(res.cityList);
        });
      }, []);
      console.log(cityList?.length);
      if (cityList && cityList.length > 0)
        return (
          <>
            <motion.div
              ref={constrainRef}
              className="w-full h-[100vh] z-[-1] absolute top-0 left-0 right-0 bottom-0"
            ></motion.div>
            <Box
              component={motion.ul}
              initial={{ scale: 0.3, opacity: 0, y: 200 }}
              animate={{ scale: 0.7, opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeIn",
                staggerChildren: 0.4,
              }}
              dragConstraints={constrainRef}
              drag
              sx={{
                listStyle: "none",
                width: "200px",
                position: "fixed",
                top: "15%",
                left: "0%",
                cursor: "grab",
              }}
            >
              <CityCard index={0} info={cityList[0]} />{" "}
            </Box>
          </>
        );
    };

    document.body.appendChild(root);
    ReactDOM.createRoot(root).render(
      <MainContextProvider>
        <App />
      </MainContextProvider>
    );
  },
});
