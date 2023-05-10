const ConditionsHelper = {
  formatState: (state) => {
    const states = {
      NEW: "New",
      PRE_OWNED: "Pre owned",
      DIGITAL: "Digital",
    };
    return states[state];
  },
};

export default ConditionsHelper;
