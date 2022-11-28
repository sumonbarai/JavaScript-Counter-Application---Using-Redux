const inputHtml = document.getElementById("inputHtml");
const value = document.getElementById("value");
const addCounter = document.getElementById("addCounter");
const resetCounter = document.getElementById("resetCounter");
// action identifier
const INCREMENT = "increment";
const DECREMENT = "decrement";
const ADDCOUNTER = "addCounter";
const RESET = "reset";

// action creator
const addCounterAction = () => {
  return {
    type: ADDCOUNTER,
  };
};
const resetAction = () => {
  return {
    type: RESET,
  };
};
const incrementAction = (id) => {
  return {
    type: INCREMENT,
    payload: id,
  };
};
const decrementAction = (id) => {
  return {
    type: DECREMENT,
    payload: id,
  };
};

// initialState
const initialState = [
  {
    id: 1,
    count: 0,
  },
];
// reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADDCOUNTER:
      return [
        ...state,
        {
          id: state.length + 1,
          count: 0,
        },
      ];
    case RESET:
      const resetState = state.map((obj) => {
        return {
          ...obj,
          count: 0,
        };
      });
      return resetState;
    case INCREMENT:
      const incrementState = state.map((obj) => {
        if (obj.id !== action.payload) {
          return {
            ...obj,
          };
        } else {
          return {
            ...obj,
            count: obj.count + obj.id * 3,
          };
        }
      });
      return incrementState;
    case DECREMENT:
      const decrementState = state.map((obj) => {
        if (obj.id !== action.payload) {
          return {
            ...obj,
          };
        } else {
          return {
            ...obj,
            count: obj.count - obj.id * 3,
          };
        }
      });
      return decrementState;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);
// update in ui
const render = () => {
  const { count } = store.getState();
  inputHtmlFn();
};

store.subscribe(render);

const inputHtmlFn = () => {
  const stateArray = store.getState();
  let totalCounter = "";
  stateArray.forEach((element) => {
    totalCounter += `<div class="counter">
    <div id="value">${element.count}</div>
    <button onclick="incrementFn(${element.id})" class="btn btn-size">increment</button>
    <button onclick="decrementFn(${element.id})" class="btn btn-size">decrement</button>
    </div>`;
  });
  inputHtml.innerHTML = totalCounter;
};
inputHtmlFn();

// add eventListeners
addCounter.addEventListener("click", () => {
  store.dispatch(addCounterAction());
});
resetCounter.addEventListener("click", () => {
  store.dispatch(resetAction());
});
// increment function
const incrementFn = (id) => {
  store.dispatch(incrementAction(id));
};
const decrementFn = (id) => {
  store.dispatch(decrementAction(id));
};
