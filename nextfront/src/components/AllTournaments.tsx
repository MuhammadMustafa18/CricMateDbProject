"use client"
import { Tournament } from "../../types";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";
export default function AllTournaments() {
  const [tournaments, setTournaments] = useState<Tournament[]>([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetchTournaments() {
      try {
        const res = await fetch("http://localhost:8080/tournaments"); // http/server errors
        if (!res.ok) throw new Error(
          `Failed to fetch tournaments: ${res.status} ${res.statusText}`
        );
        const data = await res.json(); // ye kyun await?
        setTournaments(data)
      }
      catch (error) {
        console.error(error); // cors erros
      } finally {
        setLoading(false)
      }
    }
    fetchTournaments()
  }, [])
  const handleTournamentClick = (tournamentId: number) => {
    window.location.href = `/tournaments/${tournamentId}`;
  };
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      <header className="border-zinc-800 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <nav className="text-sm text-zinc-400">
            <a href="/" className="hover:text-zinc-200 transition-colors">
              Home
            </a>
            <span className="mx-2">/</span>
            <span className="text-zinc-100">All Tournaments</span>
          </nav>
        </div>
      </header>

      {/* Add Match Button */}
      <Item className="max-w-6xl mx-auto my-6">
        <ItemContent>
          <ItemTitle className="text-zinc-100 text-4xl">
            Cricket Tournaments
          </ItemTitle>
          <ItemDescription>All Tournaments On Cricmate</ItemDescription>
        </ItemContent>
        <ItemActions>
          <a href="/addtournament">
            <Button
              variant="outline"
              size="sm"
              className="text-white bg-black"
            >
              Add Tournament
            </Button>
          </a>
        </ItemActions>
      </Item>
      {/* Matches Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6">
            All Tournaments
          </h2>

          {loading ? (
            <p className="text-zinc-400">Loading Tournaments...</p>
          ) : tournaments.length === 0 ? (
            <p className="text-zinc-400">No tournaments found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tournaments.map((tournament) => (
                <div
                  key={tournament.tournament_id}
                  className="group cursor-pointer"
                  onClick={() =>
                    handleTournamentClick(tournament.tournament_id)
                  }
                >
                  <div className="p-6 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 hover:border-zinc-600 transition-all duration-200">
                    <div className="flex flex-col items-center gap-3">
                      <div>{tournament.tournament_name}</div>
                    </div>
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