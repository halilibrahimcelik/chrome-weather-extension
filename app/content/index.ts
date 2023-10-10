export default defineContentScript({
  // Set manifest options
  matches: ["<all_urls>"],

  main(ctx) {
    // Executed when content script is loaded
    console.log("Content script loaded!");
  },
});
