import Navbar from "./Navbar"
import RecentMatches from "./RecentMatches"



export default function FullNavbar() {
  return (
    <div className="absolute top-0">
      <RecentMatches />
      <Navbar />
    </div>
  );
}