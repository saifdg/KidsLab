

const initialState = {
  payment: false,
  subscribtion: ""
};
const payment = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case "SUCC":
      return { ...state, payment: true };
    case "FAIL":
      return { ...state, payment: false };
    case "MONTH":
      return { ...state, subscribtion: 'mensuel' };
    case "YEAR":
      return { ...state, subscribtion: 'annuel' };
    default:
      return state;
  }
}
export default payment