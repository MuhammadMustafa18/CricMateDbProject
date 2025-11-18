"use client";
import { useState, useEffect } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Check, ChevronsUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
import { Team, Match } from "../../../types";

// POST http://localhost:8080/innings
// {
//   "match": { "match_id": 1 },
//   "battingTeam": { "team_id": 1 }, // foreign key
//   "bowlingTeam": { "team_id": 2 },

// }
export default function addInnings(){
  const [matchId, setMatchId] = useState<number | null>(null);
  const [battingTeam, setBattingTeam] = useState<number | null>(null);
  const [bowlingTeam, setBowlingTeam] = useState<number | null>(null);
  const [teams, setTeams] = useState<Team[]>([]);
  const [matches, setMatches] = useState<Match[]>([]);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

    const [openA, setOpenA] = useState(false);
    const [openB, setOpenB] = useState(false);
    const [openC, setOpenC] = useState(false);


  // Fetch teams
  useEffect(() => {
    async function fetchTeams() {
      try {
        const res = await fetch("http://localhost:8080/teams");
        if (!res.ok) throw new Error("Failed to fetch teams");
        const data = await res.json();
        setTeams(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTeams();
  }, [matchId]);
  // Fetch Matches
  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch("http://localhost:8080/matches");
        if (!res.ok) throw new Error("Failed to fetch matches");
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchMatches();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/innings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          match: { "match_id": matchId },
          battingTeam: { "team_id": battingTeam }, // foreign key
          bowlingTeam: { "team_id": bowlingTeam },
        }),
      });

      if (!res.ok) throw new Error("Failed to add match");

      const data = await res.json();

      setMessage(`Innings added successfully! ID: ${data.innings_id}`);

      // Reset
      setBattingTeam(null);
      setBowlingTeam(null);
      setMatchId(null);
    } catch (err) {
      setMessage(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const getTeamLabel = (teamId: number | null) => {
    if (!teamId) return "Select team...";
    const t = teams.find((x) => x.team_id === teamId);
    return t?.team_name || "Select team...";
  };
  const getMatchLabel = (matchid: number | null) => {
    if (!matchid) return "Select Match...";
    const t = matches.find((x) => x.match_id === matchid);
    return t?.match_id || "Select Match...";
  };
  return (
    <div className="mt-70 max-w-lg mx-auto bg-black p-6 rounded-md text-white">
      <h1 className="text-3xl font-bold mb-6">Add a New Match</h1>
      <div className="flex flex-col gap-4">
        <FieldSet>
          <FieldLegend>Add Innings</FieldLegend>
          <FieldDescription>
            Enter match id and select two teams.
          </FieldDescription>

          {/* Match Name */}
          <Field>
            <FieldLabel>Match</FieldLabel>
            <FieldContent>
              <Popover open={openC} onOpenChange={setOpenC}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-black"
                  >
                    {getMatchLabel(matchId)}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-black text-white">
                  <Command className="bg-black text-white">
                    <CommandInput placeholder="Search team..." />
                    <CommandList>
                      <CommandEmpty>No Match found.</CommandEmpty>
                      <CommandGroup>
                        {matches.map((m) => (
                          <CommandItem
                            className="text-white"
                            key={m.match_id}
                            onSelect={() => {
                              setMatchId(m.match_id);
                              setOpenC(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                matchId === m.match_id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {m.match_id}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FieldContent>
          </Field>

          {/* Team A */}
          <Field>
            <FieldLabel>Batting Team</FieldLabel>
            <FieldContent>
              <Popover open={openA} onOpenChange={setOpenA}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-black"
                  >
                    {getTeamLabel(battingTeam)}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-black text-white">
                  <Command className="bg-black text-white">
                    <CommandInput placeholder="Search team..." />
                    <CommandList>
                      <CommandEmpty>No team found.</CommandEmpty>
                      <CommandGroup>
                        {teams.map((team) => (
                          <CommandItem
                            className="text-white"
                            key={team.team_id}
                            onSelect={() => {
                              setBattingTeam(team.team_id);
                              setOpenA(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                battingTeam === team.team_id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {team.team_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FieldContent>
          </Field>

          {/* Team B */}
          <Field>
            <FieldLabel>Bowling Team</FieldLabel>
            <FieldContent>
              <Popover open={openB} onOpenChange={setOpenB}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-black"
                  >
                    {getTeamLabel(bowlingTeam)}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-black text-white">
                  <Command className="bg-black text-white">
                    <CommandInput placeholder="Search team..." />
                    <CommandList>
                      <CommandEmpty>No team found.</CommandEmpty>
                      <CommandGroup>
                        {teams.map((team) => (
                          <CommandItem
                            className="text-white"
                            key={team.team_id}
                            onSelect={() => {
                              setBowlingTeam(team.team_id);
                              setOpenB(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                bowlingTeam === team.team_id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {team.team_name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FieldContent>
          </Field>
        </FieldSet>

        {/* Submit Button */}
        <Button
          onClick={handleSubmit}
          disabled={!matchId || !battingTeam || !bowlingTeam}
          className="mt-2"
        >
          {loading ? "Adding..." : "Add Innings"}
        </Button>

        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
}
