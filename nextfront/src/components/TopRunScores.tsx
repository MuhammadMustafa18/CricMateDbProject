"use client";

import React from "react";

interface Batsman {
  playerId: number;
  playerName: string;
  runs: number;
  image?: string; // optional image if you add later
}

interface Props {
  batsmen: Batsman[];
  team: string
}

export default function TopRunScorers({ batsmen, team }: Props) {
  const [activeTab, setActiveTab] = React.useState("Overall");

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      <h3 className="text-lg font-bold text-white mb-3">Top Run Scorers</h3>
      <p className="text-xs text-slate-400 mb-4">All formats</p>

      <div className="flex gap-2 mb-4 border-b border-slate-700">
        {["Overall"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 text-xs font-medium transition ${
              activeTab === tab
                ? "border-b-2 border-cyan-500 text-cyan-400"
                : "text-slate-400 hover:text-slate-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {batsmen.length === 0 && (
          <p className="text-slate-400 text-sm">No scorers available.</p>
        )}

        {batsmen.map((scorer) => (
          <div key={scorer.playerId} className="flex items-center gap-3">
            <img
              src={scorer.image || "/placeholder.svg"}
              alt={scorer.playerName}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div className="flex flex-col">
              <div className="flex flex-row items-center">
                <p className="text-base font-semibold text-white mr-3">
                  {scorer.playerName}
                </p>
                
                <p className="text-sm text-zinc-300 font-light ">
                  {team}
                </p>
              </div>

              <p className="text-lg font-bold text-white">{scorer.runs}</p>
            </div>

            <div className="text-right"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
