//Reducer => a function that takes two parameters, old state and an action, and returns a new state

const contextReducer = (state, action) => {
  let transactions;
  switch (action.type) {
    case "DELETE_TRANSACTION":
      transactions = state.filter((trans) => trans.id !== action.payload);

      localStorage.setItem("transaction", JSON.stringify(transactions));

      return transactions;
    case "ADD_TRANSACTION":
      transactions = [action.payload, ...state];

      localStorage.setItem("transaction", JSON.stringify(transactions));

      return transactions;
    default:
      return state;
  }
};

export default contextReducer;
