import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  // Import Router and Routes
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Next from "./components/Next/Next";

const App = () => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // State to track loading

  return (
    <Router>  {/* Wrap entire app in Router */}
      <Navbar />
      <Routes>  {/* Define routes */}
        <Route path="/" element={<Home />} />         {/* Home page route */}
        <Route path="/next" element={<Next />} />     {/* Next page route */}
      </Routes>
    </Router>
  );
};

export default App;
