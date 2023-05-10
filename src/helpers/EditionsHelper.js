const EditionsHelper = {
  formatType: (type) => {
    const types = {
      NORMAL: "Normal",
      DELUXE_EDITION: "Deluxe edition",
      COLLECTORS_EDITION: "Collectors edition",
    };
    return types[type];
  },
};

export default EditionsHelper;
