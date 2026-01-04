import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Loader from "./Components/Loader";

const App = () => {
  const [showLoader, setShowLoader] = useState(true);

  // Fallback to auto-hide loader after 4s in case onComplete isn't hit
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* <Loader isVisible={showLoader} onComplete={() => setShowLoader(false)} /> */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
