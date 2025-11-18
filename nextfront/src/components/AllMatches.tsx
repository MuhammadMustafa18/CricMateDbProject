"use client";
import { Team,Match } from "../../types";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";



export default function AllMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch("http://localhost:8080/matches");
        if (!res.ok) throw new Error("Failed to fetch matches");
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchMatches();
  }, []);

  const handleMatchClick = (matchId: number) => {
    window.location.href = `/match/${matchId}`;
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <header className="border-zinc-800 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <nav className="text-sm text-zinc-400">
            <a href="/" className="hover:text-zinc-200 transition-colors">
              Home
            </a>
            <span className="mx-2">/</span>
            <span className="text-zinc-100">Cricket Matches</span>
          </nav>
        </div>
      </header>

      {/* Add Match Button */}
      <Item className="max-w-6xl mx-auto my-6">
        <ItemContent>
          <ItemTitle className="text-zinc-100 text-4xl">
            Cricket Matches
          </ItemTitle>
          <ItemDescription>All Matches On Cricmate</ItemDescription>
        </ItemContent>
        <ItemActions>
          <a href="/addmatch">
            <Button variant="outline" size="sm" className="text-white bg-black">
              Add Match
            </Button>
          </a>
        </ItemActions>
      </Item>

      {/* Matches Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6">
            All Matches
          </h2>

          {loading ? (
            <p className="text-zinc-400">Loading matches...</p>
          ) : matches.length === 0 ? (
            <p className="text-zinc-400">No matches found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {matches.map((match) => (
                <div
                  key={match.match_id}
                  className="group cursor-pointer"
                  onClick={() => handleMatchClick(match.match_id)}
                >
                  <div className="p-6 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 hover:border-zinc-600 transition-all duration-200">
                    <div className="flex flex-col items-center gap-3">
                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white">
                          {match.teamA?.team_name}
                        </h3>
                      </div>

                      <div className="text-zinc-500 text-sm font-medium">
                        VS
                      </div>

                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-white">
                          {match.teamB?.team_name}
                        </h3>
                      </div>
                    </div>

                    {match.venue && (
                      <p className="text-sm text-zinc-400 text-center mt-4">
                        📍 {match.venue}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
