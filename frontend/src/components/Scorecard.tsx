import { useEffect, useState } from "react";

interface ScorecardDataBatsman {
  batsman_id: number;
  batsman_name: string;
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
  dismissal?: string;
}

export default function Scorecard({
  inningsId,
  battingTeamName,
}: {
  inningsId: number;
  battingTeamName: String;
}) {
  const [scoreboardData, setScoreboardData] = useState<
    ScorecardDataBatsman[] | null
  >(null);

  useEffect(() => {
    fetch(`http://localhost:8080/scoreboard/${inningsId}`)
      .then((res) => res.json())
      .then((data) => setScoreboardData(data))
      .catch((err) => console.error(err));
  }, [inningsId]);

  if (!scoreboardData) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="w-[80%] mx-auto mt-5 bg-slate-800 text-white">
      {/* Header */}
      <div className="bg-teal-700 px-4 py-3">
        <h2 className="text-lg font-semibold">
          {battingTeamName} <span className="text-sm font-normal"></span>
        </h2>
      </div>

      {/* Table Header */}
      <div className="bg-slate-700 px-4 py-2 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 text-sm font-medium">
        <div>Batting</div>
        <div className="text-right">R</div>
        <div className="text-right">B</div>
        <div className="text-right">M</div>
        <div className="text-right">4s</div>
        <div className="text-right">6s</div>
        <div className="text-right">SR</div>
      </div>

      {/* Batsmen Rows */}
      {scoreboardData.map((batsman, index) => (
        <div
          key={batsman.batsman_id}
          className={`px-4 py-3 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 items-center ${
            index % 2 === 0 ? "bg-slate-800" : "bg-slate-750"
          }`}
        >
          <div>
            <div className="font-medium">{batsman.batsman_name}</div>
            {batsman.dismissal && (
              <div className="text-sm text-gray-400 mt-1">
                {batsman.dismissal}
              </div>
            )}
          </div>
          <div className="text-right font-semibold">{batsman.runs}</div>
          <div className="text-right">{batsman.balls}</div>
          <div className="text-right">-</div>
          <div className="text-right">{batsman.fours}</div>
          <div className="text-right">{batsman.sixes}</div>
          <div className="text-right">{batsman.strikeRate.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
