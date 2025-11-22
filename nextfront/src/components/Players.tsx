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

interface Player {
  player_id: number;
  player_name: string;
}

export const metadata = {
  title: "Cricket Players",
  description: "Popular international cricket players",
};

export default function AllPlayers() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPlayers() {
      try {
        const res = await fetch("http://localhost:8080/players"); // your backend endpoint
        if (!res.ok) throw new Error("Failed to fetch players");
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlayers();
  }, []);

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <header className="border-zinc-800 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 pt-6">
          <nav className="text-sm text-zinc-400">
            <Link href="/" className="hover:text-zinc-200 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-100">Cricket Players</span>
          </nav>
        </div>
      </header>

      {/* Add Player Button */}
      <Item className="max-w-6xl mx-auto my-6">
        <ItemContent>
          <ItemTitle className="text-zinc-100 text-4xl">
            Cricket Players
          </ItemTitle>
          <ItemDescription>Top Recognized Players On Cricamate</ItemDescription>
        </ItemContent>
        <ItemActions>
          <Link href="/addplayer">
            <Button variant="outline" size="sm" className="text-white bg-black">
              Add Player
            </Button>
          </Link>
        </ItemActions>
      </Item>

      {/* Players Grid */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6">
            Popular International Players
          </h2>

          {loading ? (
            <p className="text-zinc-400">Loading players...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {players.map((player) => (
                <Link
                  key={player.player_id}
                  href={`/player/${player.player_id}`} // your dynamic route
                  className="group cursor-pointer"
                >
                  <div className="p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 hover:border-zinc-600 transition-all duration-200">
                    <span className="text-lg font-medium text-zinc-100 group-hover:text-white">
                      {player.player_name}
                    </span>
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
