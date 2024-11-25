import { configureStore, createSlice, createListenerMiddleware } from '@reduxjs/toolkit';

// Create a counter slice
const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = counterSlice.actions;

// Create listener middleware
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  actionCreator: increment,
  effect: async (action, listenerApi) => {
    console.log('Increment action triggered:', action);
    console.log('State after increment:', listenerApi.getState());
    // Simulate side-effect (e.g., logging, API call)
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate async delay
    console.log('Async side-effect completed');
  },
});

listenerMiddleware.startListening({
  actionCreator: decrement,
  effect: (action, listenerApi) => {
    console.log('Decrement action triggered:', action);
    console.log('State after decrement:', listenerApi.getState());
  },
});

// Configure the Redux store
const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});

export default store;
