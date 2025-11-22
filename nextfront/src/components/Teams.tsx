"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "@/components/ui/item";

interface CricketTeam {
  team_id: number;
  team_name: string;
  flag?: string;
  name?: string;
}

export const metadata = {
  title: "Cricket Teams",
  description: "Popular international cricket teams",
};

export default function AllTeams() {
  const [teams, setTeams] = useState<CricketTeam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await fetch("http://localhost:8080/teams"); // your backend endpoint
        if (!res.ok) throw new Error("Failed to fetch teams");
        const data = await res.json();
        setTeams(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeams();
  }, []);

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <header className=" border-zinc-800 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <nav className="text-sm text-zinc-400 ">
            <Link href="/" className="hover:text-zinc-200 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-100">Cricket Teams</span>
          </nav>
        </div>
      </header>

      <Item className="max-w-6xl mx-auto ">
        <ItemContent>
          <ItemTitle className="text-zinc-100 text-4xl">
            Cricket Teams
          </ItemTitle>
          <ItemDescription>Top Recognized Teams On Cricamate</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Link href="/addteam">
            <Button variant="outline" size="sm" className="text-white bg-black">
              Add Teams
            </Button>
          </Link>
        </ItemActions>
      </Item>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6">
            Popular Men's International Teams
          </h2>

          {loading ? (
            <p className="text-zinc-400">Loading teams...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map((team) => (
                <Link
                  key={team.team_id || team.name}
                  href={`/team/${team.team_id}`}
                  className="block"
                >
                  <div className="group cursor-pointer">
                    <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 hover:border-zinc-600 transition-all duration-200">
                      <span className="text-4xl">{team.flag || "🏏"}</span>
                      <span className="text-lg font-medium text-zinc-100 group-hover:text-white transition-colors">
                        {team.team_name || team.name}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
