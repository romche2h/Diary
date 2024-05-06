export const INITIAL_STATE = {
  isValid: {
    title: true,
    date: true,
    tag: true,
    text: true,
  },
  values: {
    /// значения
    title: "",
    date: "",
    tag: "",
    text: "",
  },
  isFormReadyToSubmit: false,
};

export function formReducer(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, values: { ...state.values, ...action.payload } };
    case "CLEAR":
      return {
        ...state,
        values: INITIAL_STATE.values,
        isFormReadyToSubmit: false,
      };
    case "RESET_VALIDITY": // сброс валидации,введенные ли пользователем в форму
      return { ...state, isValid: INITIAL_STATE.isValid };
    case "SUBMIT": {
      const titleValidity = state.values.title?.trim().length;
      const dateValidity = state.values.date;
      const tagValidity = state.values.tag?.trim().length;
      const textValidity = state.values.text?.trim().length;
      return {
        ...state,
        isValid: {
          title: titleValidity,
          date: dateValidity,
          tag: tagValidity,
          text: textValidity,
        },
        isFormReadyToSubmit:
          titleValidity && dateValidity && tagValidity && textValidity,
      };
    }
  }
}
