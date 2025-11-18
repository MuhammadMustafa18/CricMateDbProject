"use client"

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

import React, { useState } from "react"


export default function addtournament(){
  const [tournamentName, setTournamentName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent){
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:8080/tournaments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tournament_name: tournamentName }),
      });

      if (!res.ok) throw new Error("Failed to add tournament");

      const data = await res.json();
      setMessage(
        `Team "${data.tournament_name}" added successfully! id is ${data.tournament_id}`
      );
    //   setaddedTeamId(data.team_id);
    //   setaddedTeamName(data.team_name);
      setTournamentName("");
    } catch (err) {
      setMessage(`Error: ${err}`);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="mt-70 max-w-lg mx-auto bg-black p-6 rounded-md text-white">
      <h1 className="text-3xl font-bold mb-6">Add a New Tournament</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <FieldSet>
          <FieldLegend>Add Tournament</FieldLegend>
          <FieldDescription>
            Enter the Tournament name to add a new cricket Tournament.
          </FieldDescription>
          <Field>
            <FieldLabel htmlFor="teamName">Tournament Name</FieldLabel>
            <FieldContent>
              <Input
                id="teamName"
                placeholder="Evil Rabbit"
                value={tournamentName}
                onChange={(e) => setTournamentName(e.target.value)}
                required
              />
            </FieldContent>
            <FieldDescription>
              This will be shown on the tournament list.
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
