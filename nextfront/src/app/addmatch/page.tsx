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

import { Tournament, Team } from "../../../types";


export default function AddMatchPage() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamA, setTeamA] = useState<number | null>(null);
  const [teamB, setTeamB] = useState<number | null>(null);
  const [tournament, setTournament] = useState<number | null>(null);
  const [tournaments, setTournaments] = useState<Tournament[]>([]);


  const [matchDate, setMatchDate] = useState("");
  const [matchTime, setMatchTime] = useState("");
  const [matchState, setMatchState] = useState("");
  const [venue, setVenue] = useState("");

  const [openA, setOpenA] = useState(false);
  const [openB, setOpenB] = useState(false);
  const [openC, setOpenC] = useState(false);


  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

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
  }, []);
  useEffect(() => {
    async function fetchTournaments() {
      try {
        const res = await fetch("http://localhost:8080/tournaments");
        if (!res.ok) throw new Error("Failed to fetch Tournaments");
        const data = await res.json();
        setTournaments(data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchTournaments();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/matches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
        // tries creating an instance
        //   teamA: teamA,
        //   teamB: teamB,
        teamA: { "team_id": teamA },
        teamB: { "team_id": teamB },

          matchDate: `${matchDate}T${matchTime}:00`,
          matchState: matchState,
          venue: venue,
          tournament: { tournament_id: tournament }

        }),
      });

      if (!res.ok) throw new Error("Failed to add match");

      const data = await res.json();

      setMessage(
        `Match added successfully! ID: ${data.match_id}`
      );

      // Reset
      setTeamA(null);
      setTeamB(null);
      setMatchDate("");
      setMatchTime("");
      setMatchState("");
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
  const getTournamentLabel = (tournamentId: number | null) => {
    if (!tournamentId) return "Select team...";
    const t = tournaments.find((x) => x.tournament_id === tournamentId);
    return t?.tournament_name || "Select team...";
  };

  return (
    <div className="mt-70 max-w-lg mx-auto bg-black p-6 rounded-md text-white">
      <h1 className="text-3xl font-bold mb-6">Add a New Match</h1>
      <div className="flex flex-col gap-4">
        <FieldSet>
          <FieldLegend>Add Match</FieldLegend>
          <FieldDescription>
            Enter match details and select two teams.
          </FieldDescription>

          {/* Match Name */}

          {/* Team A */}
          <Field>
            <FieldLabel>Team A</FieldLabel>
            <FieldContent>
              <Popover open={openA} onOpenChange={setOpenA}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-black"
                  >
                    {getTeamLabel(teamA)}
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
                              setTeamA(team.team_id);
                              setOpenA(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                teamA === team.team_id
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
            <FieldLabel>Team B</FieldLabel>
            <FieldContent>
              <Popover open={openB} onOpenChange={setOpenB}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-black"
                  >
                    {getTeamLabel(teamB)}
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
                              setTeamB(team.team_id);
                              setOpenB(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                teamB === team.team_id
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

          {/* Match Date */}
          <Field>
            <FieldLabel>Date</FieldLabel>
            <FieldContent>
              <Input
                type="date"
                value={matchDate}
                onChange={(e) => setMatchDate(e.target.value)}
              />
            </FieldContent>
          </Field>

          {/* Match Time */}
          <Field>
            <FieldLabel>Time</FieldLabel>
            <FieldContent>
              <Input
                type="time"
                value={matchTime}
                onChange={(e) => setMatchTime(e.target.value)}
              />
            </FieldContent>
          </Field>

          {/* Match State */}
          <Field>
            <FieldLabel>Match State</FieldLabel>
            <FieldContent>
              <Input
                placeholder="upcoming / live / finished"
                value={matchState}
                onChange={(e) => setMatchState(e.target.value)}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Match Venue</FieldLabel>
            <FieldContent>
              <Input
                placeholder="upcoming / live / finished"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Tournaments</FieldLabel>
            <FieldContent>
              <Popover open={openC} onOpenChange={setOpenC}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-black"
                  >
                    {getTournamentLabel(tournament)}
                    <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-black text-white">
                  <Command className="bg-black text-white">
                    <CommandInput placeholder="Search team..." />
                    <CommandList>
                      <CommandEmpty>No Tournament found.</CommandEmpty>
                      <CommandGroup>
                        {tournaments.map((t) => (
                          <CommandItem
                            key={t.tournament_id}
                            onSelect={() => {
                              setTournament(t.tournament_id);
                              setOpenC(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                tournament === t.tournament_id
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {t.tournament_name}
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
          disabled={!teamA || !teamB}
          className="mt-2"
        >
          {loading ? "Adding..." : "Add Match"}
        </Button>

        {message && <p className="mt-4">{message}</p>}
      </div>
    </div>
  );
}
