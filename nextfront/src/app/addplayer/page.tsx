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

interface Team {
  team_id: number;
  team_name: string;
}

export default function AddPlayerPage() {
  const [playerName, setPlayerName] = useState("");
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamIds, setSelectedTeamIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  // Fetch all teams on component mount
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

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          player_name: playerName,
          teams: selectedTeamIds.map((id) => ({ team_id: id })), // ✅ Send team objects
        }),
      });

      if (!res.ok) throw new Error("Failed to add player");
      const data = await res.json();
      setMessage(
        `Player "${data.player_name}" added successfully! ID: ${data.player_id}`
      );
      setPlayerName("");
      setSelectedTeamIds([]);
    } catch (err) {
      setMessage(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const toggleTeamSelection = (teamId: number) => {
    setSelectedTeamIds((prev) =>
      prev.includes(teamId)
        ? prev.filter((id) => id !== teamId)
        : [...prev, teamId]
    );
  };

  const getSelectedTeamsLabel = () => {
    if (selectedTeamIds.length === 0) return "Select teams...";
    if (selectedTeamIds.length === 1) {
      const team = teams.find((t) => t.team_id === selectedTeamIds[0]);
      return team?.team_name || "Select teams...";
    }
    return `${selectedTeamIds.length} teams selected`;
  };

  return (
    <div className="mt-70 max-w-lg mx-auto bg-black p-6 rounded-md text-white">
      <h1 className="text-3xl font-bold mb-6">Add a New Player</h1>
      <div className="flex flex-col gap-4">
        <FieldSet>
          <FieldLegend>Add Player</FieldLegend>
          <FieldDescription>
            Enter the player's name and assign teams.
          </FieldDescription>

          <Field>
            <FieldLabel htmlFor="playerName">Player Name</FieldLabel>
            <FieldContent>
              <Input
                id="playerName"
                placeholder="Sachin Tendulkar"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
              />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Assign Teams</FieldLabel>
            <FieldContent>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between bg-black"
                  >
                    {getSelectedTeamsLabel()}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0 bg-black">
                  <Command className="bg-black text-white">
                    <CommandInput placeholder="Search teams..." />
                    <CommandList>
                      <CommandEmpty>No team found.</CommandEmpty>
                      <CommandGroup>
                        {teams.map((team) => (
                          <CommandItem
                            className="text-white"
                            key={team.team_id}
                            value={team.team_name}
                            onSelect={() => toggleTeamSelection(team.team_id)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                selectedTeamIds.includes(team.team_id)
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
            <FieldDescription>
              Select multiple teams for this player
            </FieldDescription>
          </Field>
        </FieldSet>
        <div className="flex flex-row gap-1">
          {selectedTeamIds.map((id) => {
            const team = teams.find((t) => t.team_id === id);
            return team ? (
              <div
                key={id}
                className="px-2 py-1 border-2 border-zinc-400 rounded-lg"
              >
                {team.team_name}
              </div>
            ) : null;
          })}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={loading || !playerName}
          className="mt-2"
        >
          {loading ? "Adding..." : "Add Player"}
        </Button>
      </div>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
