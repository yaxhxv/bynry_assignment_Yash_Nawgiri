import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfileList from "./components/ProfileList";
import ProfileDetail from "./components/ProfileDetail";
import MapView from "./components/MapView";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-3">
            <h1 className="text-2xl font-bold text-gray-800">Profile Map App</h1>
          </div>
        </nav>
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ProfileList />} />
            <Route path="/profile/:id" element={<ProfileDetail />} />
            <Route path="/map/:id" element={<MapView />} />
            <Route
              path="/admin"
              element={
                <div className="text-center py-10">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Admin Panel (Coming Soon)
                  </h1>
                </div>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
