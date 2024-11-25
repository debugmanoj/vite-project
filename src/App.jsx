import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from './Redux/store';

function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Counter: {count}</h1>
      <button onClick={() => dispatch(increment())} style={{ margin: '5px', padding: '10px 20px' }}>
        Increment
      </button>
      <button onClick={() => dispatch(decrement())} style={{ margin: '5px', padding: '10px 20px' }}>
        Decrement
      </button>
    </div>
  );
}

export default App;
