import { useEffect, useState } from 'react';
import { checkApiHealth } from './lib/api-client';
import './App.css';

function App() {
  const [apiStatus, setApiStatus] = useState<string>('checking…');

  useEffect(() => {
    void checkApiHealth().then((result) => {
      setApiStatus(result?.status ?? 'unreachable');
    });
  }, []);

  return (
    <main className="app">
      <h1>CabinConnect</h1>
      <p>Digital community platform for Norwegian cabin resorts.</p>
      <p className="status">
        API health: <strong>{apiStatus}</strong>
      </p>
    </main>
  );
}

export default App;
