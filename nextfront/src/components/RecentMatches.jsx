"use client"
import Link from "next/link";
import { useEffect, useState } from "react";

function RecentMatches() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/matches")
      .then((res) => res.json())
      .then((data) => setMatches(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="bg-neutral-800 w-screen mx-auto text-white shadow-lg overflow-hidden p-5">
      <h2 className="text-sm font-semibold border-b border-zinc-700 pb-2 mb-3">
        Recent Matches
      </h2>

      {matches.length === 0 ? (
        <p className="text-gray-400 text-sm">No matches available</p>
      ) : (
        <ul className="space-x-3 flex flex-row">
          {matches.map((m) => (
            <Link
              href={`/match/${m.match_id}`}
              key={m.match_id}
              className="bg-zinc-800 p-3 rounded-xl min-w-50 hover:bg-zinc-700 transition"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  Match #{m.match_id}
                </span>
                <span className="text-xs text-gray-500">
                  {m.matchDate
                    ? new Date(m.matchDate).toLocaleDateString()
                    : "TBA"}
                </span>
              </div>

              <div className="flex flex-col mt-1 text-white font-semibold">
                <div>{m.teamA?.team_name || "Team A"} </div>
                <div>{m.teamB?.team_name || "Team B"}</div>
              </div>

              <div className="text-xs text-gray-400 mt-1">
                {m.venue || "Venue: Not decided"}
              </div>
            </Link>
          ))}
        </ul>
      )}
    </div>
    
  );
}

export default RecentMatches;
