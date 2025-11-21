"use client";
import { useEffect, useState } from "react";
import { Ball, Innings, Player } from "../../types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type InningsState = {
  overNumber: number;
  ballNumber: number;
  batsman: number | null;
  bowler: number | null;
  runs: number;
  wicket: boolean;
};

const initialState: InningsState = {
  overNumber: 1,
  ballNumber: 1,
  batsman: null,
  bowler: null,
  runs: 0,
  wicket: false,
};

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
  const [inningsState, setInningsState] = useState<{
    [id: number]: InningsState;
  }>({}); // like a map
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<Player[]>([])
  useEffect(()=>{
    
  })
  async function handleSubmitBall(inningsId: number) {
    const state = inningsState[inningsId];
    if (!state || state.batsman === null || state.bowler === null) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/balls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          innings: { innings_id: inningsId },
          overNumber: state.overNumber,
          ballNumber: state.ballNumber,
          batsman: { player_id: state.batsman },
          bowler: { player_id: state.bowler },
          runs: state.runs,
          wicket: state.wicket,
        }),
      });

      const data = await res.json();
      console.log("Ball submitted:", data);

      // Optionally, reset the inputs for next ball
      setInningsState((prev) => ({
        ...prev,
        [inningsId]: {
          ...prev[inningsId],
          ballNumber: prev[inningsId].ballNumber + 1,
          runs: 0,
          wicket: false,
          batsman: null,
          bowler: null,
        },
      }));
    } catch (err) {
      console.error("Error submitting ball:", err);
    } finally {
      setLoading(false);
    }
  }


  if (!innings || innings.length === 0) return <p>No innings data yet</p>;

  return (
    <div className="w-[80%] mx-auto mt-6">
      {innings.map((inn) => {
        const state = inningsState[inn.innings_id] || initialState;

        const updateState = (updates: Partial<InningsState>) => {
          setInningsState((prev) => ({
            ...prev,
            [inn.innings_id]: { ...state, ...updates },
          }));
        };

        return (
          <div
            key={inn.innings_id}
            className="mt-6 border border-zinc-700 rounded-lg py-4 bg-zinc-900"
          >
            <h2 className="text-lg font-bold mb-2 px-4 text-white">
              {inn.battingTeam.team_name} Innings
            </h2>

            {/* Current ball input */}
            <div className="flex flex-row gap-x-3 items-center text-white px-4">
              <span className="text-xs">
                {state.overNumber}.{state.ballNumber}
              </span>

              <div
                className={`rounded font-bold text-sm flex items-center justify-center px-4 py-3
                  ${
                    state.wicket
                      ? "bg-red-600"
                      : state.runs === 4
                      ? "bg-green-600"
                      : state.runs === 6
                      ? "bg-blue-600"
                      : "bg-zinc-700"
                  }`}
              >
                {state.wicket ? "W" : state.runs}
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Input
                  type="number"
                  value={state.bowler || ""}
                  onChange={(e) =>
                    updateState({ bowler: Number(e.target.value) })
                  }
                  className="w-28 h-7 text-xs px-2 no-spinner"
                  placeholder="Bowler"
                />
                <span>to</span>
                <Input
                  type="number"
                  value={state.batsman || ""}
                  onChange={(e) =>
                    updateState({ batsman: Number(e.target.value) })
                  }
                  className="w-28 h-7 text-xs px-2"
                  placeholder="Batsman"
                />
              </div>

              <span>Runs:</span>
              <Input
                type="number"
                value={state.runs}
                onChange={(e) => updateState({ runs: Number(e.target.value) })}
                className="w-16 h-7 text-xs px-2 no-spinner"
                placeholder="Runs"
              />

              <label className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={state.wicket}
                  onChange={(e) => updateState({ wicket: e.target.checked })}
                />
                <span className="text-xs">W</span>
              </label>

              <span>Over:</span>
              <Input
                type="number"
                value={state.overNumber}
                onChange={(e) =>
                  updateState({ overNumber: Number(e.target.value) })
                }
                className="w-7 h-7 text-xs px-2 no-spinner"
              />
              <span>Ball:</span>
              <Input
                type="number"
                value={state.ballNumber}
                onChange={(e) =>
                  updateState({ ballNumber: Number(e.target.value) })
                }
                className="w-7 h-7 text-xs px-2 no-spinner"
              />
              <Button
              className=""
                onClick={() => handleSubmitBall(inn.innings_id)}
                variant="destructive"
              >
                Submit
              </Button>
            </div>

            {/* Balls list */}
            {inn.balls && inn.balls.length > 0 ? (
              Object.entries(
                inn.balls.reduce((acc: any, ball) => {
                  const over = ball.overNumber;
                  if (!acc[over]) acc[over] = [];
                  acc[over].push(ball);
                  return acc;
                }, {})
              )
                .sort((a, b) => Number(b[0]) - Number(a[0]))
                .map(([over, balls]: any) => (
                  <div key={over} className="my-3 px-4">
                    {balls.length >= 6 && (
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
                    )}
                    <div className="flex flex-col gap-y-3">
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
              <p className="text-gray-400 italic px-4">
                No balls recorded yet.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
