"use client";
import { useEffect, useState } from "react";
import { Ball, Innings, Player } from "../../types";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type InningsState = {
  overNumber: number;
  ballNumber: number;
  batsman: number | null;
  bowler: number | null;
  runs: number;
  wicket: boolean;
  allBatsmen: Player[];
  allBowlers: Player[];
};

const initialState: InningsState = {
  overNumber: 1,
  ballNumber: 1,
  batsman: null,
  bowler: null,
  runs: 0,
  wicket: false,
  allBatsmen: [],
  allBowlers: []

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
const [openC, setOpenC] = useState<{ [id: number]: boolean }>({});
const [openB, setOpenB] = useState<{ [id: number]: boolean }>({});

  const [players, setPlayers] = useState<Player[]>([])
  useEffect(()=>{

  })



  
  useEffect(() => {
    if (!innings || innings.length === 0) return;

    innings.forEach((inn) => {
      (async () => {
        try {
          // Fetch Batsmen (batting team)
          const batRes = await fetch(
            `http://localhost:8080/teams/full/${inn.battingTeam.team_id}`
          );
          const battingData = await batRes.json(); // {id, name, playerIds:[]}

          // Fetch Bowlers (bowling team)
          const bowlRes = await fetch(
            `http://localhost:8080/teams/full/${inn.bowlingTeam.team_id}`
          );
          const bowlingData = await bowlRes.json();
          // Update innings state
          setInningsState((prev) => ({
            ...prev,
            [inn.innings_id]: {
              ...initialState,
              allBatsmen: battingData.players,
              allBowlers: bowlingData.players,
            },
          }));
        } catch (err) {
          console.error("Error loading players:", err);
        }
      })();
    });
  }, [innings]);

  const getBowlerLabel = (innId: number, playerId: number | null) => {
    if (!playerId) return "Select Bowler...";

    const s = inningsState[innId];
    if (!s) return "Select Bowler...";

    const t = s.allBowlers.find((p) => p.player_id === playerId);


    return t?.player_name || "Select Bowler...";
  };
  const getBatsmanLabel = (innId: number, playerId: number | null) => {
    if (!playerId) return "Select Batsman...";

    const s = inningsState[innId];
    if (!s) return "Select Batsman...";

    // Only look in allBatsmen
    const t = s.allBatsmen.find((p) => p.player_id === playerId);

    return t?.player_name || "Select Batsman...";
  };
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
              {/* Match Name */}

              <div className="flex items-center gap-2 text-sm">
                <Field>
                  <FieldContent>
                    <Popover
                      open={openC[inn.innings_id] || false}
                      onOpenChange={(v) =>
                        setOpenC((prev) => ({ ...prev, [inn.innings_id]: v }))
                      }
                    >
                      {" "}
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between bg-black"
                        >
                          {getBowlerLabel(inn.innings_id, state.bowler)}
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0 bg-black text-white">
                        <Command className="bg-black text-white">
                          <CommandInput placeholder="Search bowler..." />
                          <CommandList>
                            <CommandEmpty>No Bowler found.</CommandEmpty>
                            <CommandGroup>
                              {(state.allBowlers ?? []).map((b) => (
                                <CommandItem
                                  className="text-white"
                                  key={b.player_id}
                                  onSelect={() => {
                                    updateState({
                                      bowler: Number(b.player_id),
                                    });
                                    setOpenC((prev) => ({
                                      ...prev,
                                      [inn.innings_id]: false,
                                    }));
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      state.bowler === b.player_id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {b.player_name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FieldContent>
                </Field>
                <span>to</span>
                <Field>
                  <FieldContent>
                    <Popover
                      open={openB[inn.innings_id] || false}
                      onOpenChange={(v) =>
                        setOpenB((prev) => ({ ...prev, [inn.innings_id]: v }))
                      }
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between bg-black"
                        >
                          {getBatsmanLabel(inn.innings_id, state.batsman)}
                          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                        </Button>
                      </PopoverTrigger>

                      <PopoverContent className="w-full p-0 bg-black text-white">
                        <Command className="bg-black text-white">
                          <CommandInput placeholder="Search batsman..." />
                          <CommandList>
                            <CommandEmpty>No Batsman found.</CommandEmpty>
                            <CommandGroup>
                              {(state.allBatsmen ?? []).map((b) => (
                                <CommandItem
                                  className="text-white"
                                  key={b.player_id}
                                  onSelect={() => {
                                    updateState({
                                      batsman: Number(b.player_id),
                                    });
                                    setOpenB((prev) => ({
                                      ...prev,
                                      [inn.innings_id]: false,
                                    }));
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      state.batsman === b.player_id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {b.player_name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FieldContent>
                </Field>
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
