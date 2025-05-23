import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-center text-3xl font-bold mt-10">
              Welcome to Profile Map App
            </h1>
          }
        />
        <Route
          path="/admin"
          element={
            <h1 className="text-center text-2xl mt-10">
              Admin Panel (Coming Soon)
            </h1>
          }
        />
        <Route
          path="/profile/:id"
          element={<h1 className="text-center mt-10">Profile Detail View</h1>}
        />
      </Routes>
    </Router>
  );
}

export default App;
