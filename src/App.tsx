import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<About />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
