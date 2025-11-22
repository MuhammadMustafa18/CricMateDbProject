"use client";

import { Match } from "../../types";

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  matches: Match[];
}

export default function FixturesPanel({ activeTab, setActiveTab, matches }: Props) {
  const safeMatches = Array.isArray(matches) ? matches : [];
  const filteredMatches = safeMatches.filter((m) => {
    if (activeTab === "fixtures") {
      return m.matchState === "UPCOMING" || m.matchState === "ONGOING";
    } else {
      return (
        m.matchState === "COMPLETED" ||
        m.matchState === "ABANDONED" ||
        m.matchState === "NO_RESULT"
      );
    }
  });

  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("fixtures")}
          className={`px-4 py-2 rounded font-medium transition ${activeTab === "fixtures"
            ? "bg-cyan-500 text-white"
            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
        >
          Fixtures
        </button>
        <button
          onClick={() => setActiveTab("results")}
          className={`px-4 py-2 rounded font-medium transition ${activeTab === "results"
            ? "bg-cyan-500 text-white"
            : "bg-slate-700 text-slate-300 hover:bg-slate-600"
            }`}
        >
          Results
        </button>
      </div>

      <div className="space-y-3">
        {filteredMatches.length === 0 ? (
          <div className="text-slate-400 text-center py-4">
            No {activeTab} found.
          </div>
        ) : (
          filteredMatches.map((match) => (
            <div
              key={match.match_id}
              className="bg-slate-700 rounded-lg p-3 border border-slate-600 hover:border-slate-500 transition"
            >
              <div className="text-xs font-semibold text-slate-300 mb-1">
                {match.matchDate
                  ? new Date(match.matchDate).toLocaleString()
                  : "TBA"}
              </div>
              <div className="text-xs text-slate-400 mb-2">
                {match.matchFormat}
              </div>
              <div className="text-xs text-slate-400 mb-3 line-clamp-1">
                {match.venue}
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {/* <span className="text-xl">🏳️</span> */}
                  <span className="font-semibold text-white">
                    {match.teamA?.team_name}
                  </span>
                </div>
                <div className="text-xs text-slate-500">vs</div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    {match.teamB?.team_name}
                  </span>
                  {/* <span className="text-xl">🏳️</span> */}
                </div>
              </div>

              <div className="text-xs text-slate-400">
                {match.matchState}
                {match.matchWinnerTeam
                  ? ` - ${match.matchWinnerTeam.team_name} Won`
                  : match.result
                    ? ` - ${match.result}`
                    : ""}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
