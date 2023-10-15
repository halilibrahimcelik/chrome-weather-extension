import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom/client";
import "../popup/style.css";
import MainContextProvider, {
  useMainContext,
} from "../popup/context/MainContext";
import CityCard from "../popup/components/CityCard";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import HideSourceIcon from "@mui/icons-material/HideSource";
import { Messages } from "../popup/utils/messages";
export default defineContentScript({
  // Set manifest options
  matches: ["<all_urls>"],

  main(ctx) {
    // Executed when content script is loaded

    const root = document.createElement("div");

    const App: React.FC<{}> = () => {
      const { cityList, setCityList, setUnit, setPopup, popup } =
        useMainContext();
      const constrainRef = useRef(null);

      useEffect(() => {
        chrome.storage.local.get(["cityList", "tempScale", "popup"], (res) => {
          setCityList(res.cityList);
          setUnit(res.tempScale);
          setPopup(res.popup);
        });
      }, []);
      useEffect(() => {
        chrome.runtime.onMessage.addListener((message) => {
          console.log(message, "message");

          if (message === Messages.TOGGLE_OVERLAY) {
            console.log("hey");
            setPopup(!popup);

            chrome.storage.local.set({ popup: !popup });
          }
        });
      }, [popup]);
      const handlePopup = () => {
        setPopup(false);
        chrome.storage.local.set({ popup: false });
      };
      if (cityList && cityList.length > 0 && popup)
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
              className="group"
              dragConstraints={constrainRef}
              drag
              sx={{
                listStyle: "none",
                width: "auto",
                position: "fixed",
                top: "15%",
                left: "0%",
                cursor: "grab",
              }}
            >
              <div className="relative">
                <Box
                  component={"span"}
                  sx={{ color: "text.primary" }}
                  onClick={handlePopup}
                  className="opacity-0 h-0  cursor-pointer z-10  transition-all duration-300 ease-in  group-hover:opacity-100 group-hover:h-auto absolute right-2 top-3"
                >
                  <HideSourceIcon titleAccess="Hide" />
                </Box>
                <CityCard index={0} info={cityList[0]} />{" "}
              </div>
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
