"use client"
import { useState } from "react";
import { Player, Ball, Team, Innings, Match } from "../../types";
import { Input } from "./ui/input";

// POST
// {
//   "innings": { "innings_id": 1 },
//   "overNumber": 1,
//   "ballNumber": 1,
//   "batsman": {"player_id": 1}, // foriegn key
//   "bowler":  {"player_id": 2},
//   "runs": 4,
//   "wicket": false
// }

export default function Commentary({ innings }: { innings: Innings[] }) {
  const [overNumber, setOverNumber] = useState(1);
  const [ballNumber, setBallNumber] = useState(1);
  const [batsman, setBatsman] = useState<number | null>(null);
  const [bowler, setBowler] = useState<number | null>(null);
  const [runs, setRuns] = useState(0);
  const [wicket, setWicket] = useState(false);

  const [inningsState, setInningsState] = useState<{
    [inningsId: number]: {
      overNumber: number;
      ballNumber: number;
      batsman: number | null;
      bowler: number | null;
      runs: number;
      wicket: boolean;
    };
  }>({});
//   inningsState = {
//   1: { overNumber: 2, ballNumber: 3, batsman: 5, bowler: 2, runs: 4, wicket: false },
//   2: { overNumber: 1, ballNumber: 1, batsman: 6, bowler: 3, runs: 0, wicket: true }
// }
  {innings.map((inn) => {
  const state = inningsState[inn.innings_id] || {
    overNumber: 1,
    ballNumber: 1,
    batsman: null,
    bowler: null,
    runs: 0,
    wicket: false,
  };

  const updateState = (updates: Partial<typeof state>) => {
    setInningsState((prev) => ({
      ...prev,
      [inn.innings_id]: { ...state, ...updates },
    }));
  };
    if (!innings) return <p>No innings data yet</p>;

  return (
    <div className="w-[80%] mx-auto mt-6">
      {innings?.map((inn, i) => (
        <div
          key={i}
          className="mt-6 border border-zinc-700 rounded-lg py-4 bg-zinc-900"
        >
          <h2 className="text-lg font-bold mb-2 px-4 text-white">
            {inn.battingTeam.team_name} Innings
          </h2>
          <div className="flex flex-row gap-x-3 items-center text-white">
            {/* Over.Ball */}
            <span className="text-xs ml-6">
              {overNumber}.{ballNumber}
            </span>

            {/* Runs / Wicket box (same style) */}
            <div
              className={`rounded font-bold text-sm flex items-center justify-center px-4 py-3
      ${
        wicket
          ? "bg-red-600"
          : runs == 4
          ? "bg-green-600"
          : runs == 6
          ? "bg-blue-600"
          : "bg-zinc-700"
      }`}
            >
              {wicket ? "W" : runs}
            </div>

            {/* Bowler → Batsman */}
            <div className="flex items-center gap-2 text-sm">
              <div className="flex flex-col">
                <Input
                  type="number"
                  value={bowler || ""}
                  onChange={(e) => setBowler(Number(e.target.value))}
                  className="w-28 h-7 text-xs px-2 no-spinner"
                  placeholder="Bowler"
                />
              </div>

              <span>to</span>

              <div className="flex flex-col">
                <Input
                  type="number"
                  value={batsman || ""}
                  onChange={(e) => setBatsman(Number(e.target.value))}
                  className="w-28 h-7 text-xs px-2"
                  placeholder="Batsman"
                />
              </div>
            </div>
            <span>Runs: </span>
            {/* Runs input (small) */}
            <Input
              type="number"
              value={runs}
              onChange={(e) => setRuns(Number(e.target.value))}
              className="w-16 h-7 text-xs px-2 no-spinner"
              placeholder="Runs"
            />

            {/* Wicket checkbox */}
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={wicket}
                onChange={(e) => setWicket(e.target.checked)}
              />
              <span className="text-xs">W</span>
            </div>

            <div className="ml-3 text-xs flex items-center gap-1">
              <span>Over: </span>

              <Input
                type="number"
                value={overNumber}
                onChange={(e) => setOverNumber(Number(e.target.value))}
                className="w-7 h-7 text-xs px-2 no-spinner"
                placeholder="Over"
              />
              <span>Ball: </span>

              <Input
                type="number"
                value={ballNumber}
                onChange={(e) => setBallNumber(Number(e.target.value))}
                className="w-7 h-7 text-xs px-2 no-spinner"
                placeholder="Ball"
              />
            </div>
          </div>

          {inn.balls && inn.balls.length > 0 ? (
            Object.entries(
              inn.balls.reduce((acc: any, ball) => {
                const overNumber = ball.overNumber;
                if (!acc[overNumber]) acc[overNumber] = [];
                acc[overNumber].push(ball);
                return acc;
              }, {})
            )
              .sort((a, b) => Number(b[0]) - Number(a[0]))
              .map(([over, balls]: any) => (
                <div key={over} className="my-3">
                  {balls.length >= 6 ? (
                    <div className="bg-blue-400/60 flex flex-row my-5 px-6 py-2 gap-2 items-baseline">
                      <div className="font-bold text-lg uppercase">
                        End of over {over}
                      </div>
                      <div className="text-sm">
                        {balls.reduce(
                          (sum: number, ball: Ball) => sum + ball.runs,
                          0
                        )}{" "}
                        runs
                      </div>
                    </div>
                  ) : null}
                  <div className="flex px-6 flex-col gap-y-3">
                    {balls
                      .sort(
                        (a: Ball, b: Ball) =>
                          Number(b.ballNumber) - Number(a.ballNumber)
                      )
                      .map((ball: Ball) => (
                        <div
                          key={ball.ball_id}
                          className="flex flex-row gap-x-3 items-center"
                        >
                          <div className="text-xs">{`${over}.${ball.ballNumber}`}</div>
                          <div
                            className={`px-4 py-3 rounded text-sm font-bold ${
                              ball.wicket
                                ? "bg-red-600"
                                : ball.runs === 4
                                ? "bg-green-600"
                                : ball.runs === 6
                                ? "bg-blue-600"
                                : "bg-zinc-700"
                            }`}
                          >
                            {ball.wicket ? "W" : ball.runs}
                          </div>
                          <div className="text-sm">
                            {`${ball.bowler.player_name} to ${ball.batsman.player_name}`}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))
          ) : (
            <p className="text-gray-400 italic">No balls recorded yet.</p>
          )}
        </div>
      ))}
    </div>
  );
}
