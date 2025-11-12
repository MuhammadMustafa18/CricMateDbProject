"use client";

import { useState } from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
  FieldLegend,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AddTeamPage() {
  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [addedTeamId, setaddedTeamId] = useState("")
  const [addedTeamName, setaddedTeamName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/teams/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ team_name: teamName }),
      });

      if (!res.ok) throw new Error("Failed to add team");

      const data = await res.json();
      setMessage(`Team "${data.team_name}" added successfully! id is ${data.team_id}`);
      setaddedTeamId(data.team_id);
      setaddedTeamName(data.team_name);
      setTeamName("");
    } catch (err) {
      setMessage(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-70 max-w-lg mx-auto bg-black p-6 rounded-md text-white">
      <h1 className="text-3xl font-bold mb-6">Add a New Team</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FieldSet>
          <FieldLegend>Add Team</FieldLegend>
          <FieldDescription>
            Enter the team name to add a new cricket team.
          </FieldDescription>
          <Field>
            <FieldLabel htmlFor="teamName">Team Name</FieldLabel>
            <FieldContent>
              <Input
                id="teamName"
                placeholder="Evil Rabbit"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                required
              />
            </FieldContent>
            <FieldDescription>
              This will be shown on the team list.
            </FieldDescription>
          </Field>
        </FieldSet>

        <Button type="submit" disabled={loading} className="mt-2">
          {loading ? "Adding..." : "Add Team"}
        </Button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
