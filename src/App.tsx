import React from 'react';
import './App.css';
import TimeLine from './components/task';

const App: React.FC = () => {
  return (
      <div className="App">
        <div style={{ backgroundColor: '#f0f0f0' }}>
          <TimeLine
              turnCount={4}
              turn={6}
              chapter={1}
              width="300px"
          />
        </div>
        <br />
      </div>
  );
};

export default App;
