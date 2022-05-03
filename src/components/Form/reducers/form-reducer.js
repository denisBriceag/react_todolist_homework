export const titleReducer = (state, action) => {
  switch (action.type) {
    case "NEW_TITLE":
      return {
        value: action.value,
        isValid: action.value.length > 0 ? true : false,
        isTouched: true,
      };

    case "AFTER_SUBMIT":
      return {
        value: "",
        isValid: true,
        isTouched: false,
      };

    default:
      return state;
  }
};

export const bodyReducer = (state, action) => {
  switch (action.type) {
    case "NEW_BODY":
      return {
        value: action.value,
        isValid: action.value.length > 0 ? true : false,
        isTouched: true,
      };

    case "AFTER_SUBMIT":
      return {
        value: "",
        isValid: true,
        isTouched: false,
      };

    default:
      return state;
  }
};
