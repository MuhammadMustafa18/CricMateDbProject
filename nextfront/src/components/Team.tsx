"use client";
import { Player, Ball, TeamWithPlayers } from "../../types";
import { useEffect, useState } from "react";
import FixturesPanel from "./TeamFixtures";
import TopRunScorers from "./TopRunScores";
import TopWicketTakers from "./TopWicketTaker";

interface TeamPageProps {
  teamId: number;
}

interface Batsman {
  playerId: number;
  playerName: string;
  runs: number;
}
interface Bowler {
  playerId: number;
  playerName: string;
  wickets: number;
  image?: string;
}

export default function TeamDetails({ teamId }: TeamPageProps) {
  const [team, setTeam] = useState<TeamWithPlayers | null>(null);
  const [loading, setLoading] = useState(true);
  const [topBatsmen, setTopBatsmen] = useState<Batsman[]>([]);
    const [bowlers, setBowlers] = useState<Bowler[]>([]);

  const [activeTab, setActiveTab] = useState("fixtures");

  // ✅ Fetch Top Run Scorers
  useEffect(() => {
    async function fetchTopScorers() {
      try {
        const res = await fetch(
          `http://localhost:8080/batting/topscorers/${teamId}`
        );

        if (!res.ok) {
          console.error("Could not fetch top batsmen");
          return;
        }

        const data = await res.json();
                console.log(data);

        setTopBatsmen(data);
      } catch (error) {
        console.error("Error fetching top scorers:", error);
      }
    }
    async function fetchWicketTakers() {
      try {
        const res = await fetch(`http://localhost:8080/bowling/topwickettakers/${teamId}`);
        const data = await res.json();
        setBowlers(data);
      } catch (err) {
        console.error("Error fetching wicket takers:", err);
      } finally {
        setLoading(false);
      }
    }
fetchWicketTakers();
    fetchTopScorers();
  }, [teamId]);

  // ✅ Fetch Team Data
  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch(`http://localhost:8080/teams/full/${teamId}`);
        const data: TeamWithPlayers = await res.json();
        setTeam(data);
      } catch (err) {
        console.error("Error fetching team:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTeam();
  }, [teamId]);

  if (loading) return <p className="text-slate-300">Loading team...</p>;
  if (!team) return <p className="text-red-400">Team not found.</p>;

  return (
    <div className="mt-70 p-6 space-y-6">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <div className="lg:col-span-3">
            <FixturesPanel activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>

          {/* Main */}
          <div className="lg:col-span-6">
            <h1 className="text-2xl font-bold text-white">{team.team_name}</h1>

            <h2 className="text-xl font-semibold text-slate-300">Players</h2>
            <ul className="space-y-2">
              {team.players?.map((player) => (
                <li
                  key={player.player_id}
                  className="p-3 rounded bg-zinc-800/50 hover:bg-zinc-700/50 transition-colors cursor-pointer"
                >
                  {player.player_name}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-3 flex flex-col gap-y-5">
            {/* ✅ Passing batsmen data */}
            <TopRunScorers batsmen={topBatsmen} team={team.team_name} />
            <TopWicketTakers
              wicketTakers={bowlers}
              team={team.team_name}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
