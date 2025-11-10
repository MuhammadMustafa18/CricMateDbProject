import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import "./index.css"; // this needed for tailwind
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MatchDetails from './components/MatchDetails.tsx';
import RecentMatches from './components/RecentMatches.jsx';
import Navbar from './components/Navbar.jsx';
import FullNavbar from './components/FullNavbar.tsx';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <FullNavbar/>
       

        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/match/:id" element={<MatchDetails />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>
);
