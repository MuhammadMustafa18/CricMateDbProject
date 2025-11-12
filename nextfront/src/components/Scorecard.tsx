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

interface ScorecardDataBowler {
  bowlerId: number;
  bowlerName: string;
  runsConceded: number;
  balls: number;
  wickets: number;
  fours: number;
  sixes: number;
  economyRate: number;
}

export default function Scorecard({
  inningsId,
  battingTeamName,
}: {
  inningsId: number;
  battingTeamName: string;
}) {
  const [scoreboardData, setScoreboardData] = useState<
    ScorecardDataBatsman[] | null
  >(null);
  const [bowlingData, setBowlingData] = useState<ScorecardDataBowler[] | null>(
    null
  );

  useEffect(() => {
    fetch(`http://localhost:8080/scoreboard/batsman/${inningsId}`)
      .then((res) => res.json())
      .then((data) => setScoreboardData(data))
      .catch((err) => console.error(err));

    fetch(`http://localhost:8080/scoreboard/bowler/${inningsId}`)
      .then((res) => res.json())
      .then((data) => setBowlingData(data))
      .catch((err) => console.error(err));
  }, [inningsId]);

  if (!scoreboardData || !bowlingData)
    return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="w-[80%] mx-auto mt-5 bg-zinc-800 text-white rounded-xl overflow-hidden">
      {/* Batting Section */}
      <div className="rounded-xl mb-5">
        <div className="bg-blue-400/60 px-4 py-2 ">
          <h2 className="text-md font-semibold">{battingTeamName} Innings</h2>
        </div>

        {/* Batting Table Header */}
        <div className="bg-zinc-700 px-4 py-2 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 text-xs font-medium">
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
            className={`px-4 py-2 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 items-center text-xs border-b border-gray-600 ${
              index % 2 === 0 ? "bg-zinc-800" : "bg-zinc-750"
            }`}
          >
            <div>
              <div className="font-medium">{batsman.batsman_name}</div>
              {batsman.dismissal && (
                <div className="text-gray-400 mt-1">{batsman.dismissal}</div>
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

      {/* Bowling Section */}
      <div className="rounded-xl">
        {/* Bowling Table Header */}
        <div className="bg-zinc-700 px-4 py-2 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 text-xs font-medium">
          <div className="text-left">Bowling</div>
          <div className="text-right">R</div>
          <div className="text-right">B</div>
          <div className="text-right">W</div>
          <div className="text-right">4s</div>
          <div className="text-right">6s</div>
          <div className="text-right">Econ</div>
        </div>

        {/* Bowler Rows */}
        {bowlingData.map((bowler, index) => (
          <div
            key={bowler.bowlerId}
            className={`px-4 py-2 grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 items-center text-xs border-b border-gray-600 ${
              index % 2 === 0 ? "bg-zinc-800" : "bg-zinc-750"
            }`}
          >
            <div>
              <div className="font-medium">{bowler.bowlerName}</div>
            </div>
            <div className="text-right font-semibold">
              {bowler.runsConceded}
            </div>
            <div className="text-right">{bowler.balls}</div>
            <div className="text-right">{bowler.wickets}</div>
            <div className="text-right">{bowler.fours}</div>
            <div className="text-right">{bowler.sixes}</div>
            <div className="text-right">{bowler.economyRate.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
