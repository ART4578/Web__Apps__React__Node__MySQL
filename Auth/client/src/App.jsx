import { useEffect, useState } from "react";
import Router from "./Router/Router";
import { initCsrf } from "./Api/CSRF";
import "./App.css";

function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        await initCsrf();
      } finally {
        setReady(true);
      };
    };

    load();
  }, []);

  if (!ready) {
    return (
      <div className="app-loading">Loading...</div>
    );
  };

  return <Router />;
};

export default App;