import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProfileList from "./components/ProfileList";
import ProfileDetail from "./components/ProfileDetail";
import MapView from "./components/MapView";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <Link
                to="/"
                className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
              >
                Profile Map App
              </Link>
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Home
                </Link>
                <Link
                  to="/admin"
                  className="px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Admin
                </Link>
              </div>
            </div>
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
            <Route
              path="*"
              element={
                <div className="text-center py-10">
                  <h1 className="text-2xl font-bold text-red-600 mb-4">
                    Page Not Found
                  </h1>
                  <Link
                    to="/"
                    className="text-blue-500 hover:text-blue-600 transition-colors"
                  >
                    Back to Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </main>

        <footer className="bg-white shadow-md mt-auto">
          <div className="container mx-auto px-4 py-4">
            <p className="text-center text-gray-600">
              © 2024 Profile Map App. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
