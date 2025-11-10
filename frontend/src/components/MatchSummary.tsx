import { Player, Ball, Team, Innings, Match } from "../types";
import { useEffect, useState } from "react";

export default function MatchSummary({match}: {match: Match}) {
    
    return (
      <div className="bg-black w-[80%] mx-auto mt-5 text-white p-6">
        <div className="">Match State: {match.matchState || "State"}</div>
        <div className="text-sm font-bold mb-4">
          Match {match.match_id}, Date: {match.matchDate || "TBA"}, Venue:{" "}
          {match.venue || "TBA"}, Tournament: {match.tournament || "TBA"}
        </div>
        {/* does list incoming equate to array here? */}
        {Array.isArray(match.innings) && match.innings.length > 0 ? (
          <div>
            <p className="text-xl mb-2">
              {match?.innings[0]?.battingTeam?.team_name}
            </p>
            <p className="text-xl mb-2">
              {match?.innings[0]?.bowlingTeam?.team_name}
            </p>
          </div>
        ) : (
          // innings is an array
          <div>
            <p className="text-xl mb-2">{match.teamA?.team_name}</p>
            <p className="text-xl mb-2">{match.teamB?.team_name}</p>
          </div>
        )}
        {/* Match state dependent*/}
        <div className="text-xs font-bold my-4">
          Toss: {match.tossWinnerTeam?.team_name || "TeamA"}{" "}
          {"won the toss and elected to "} {match.tossDecision || "bowl"}{" "}
          {"first"}
        </div>
        {/* Conditinally render if the match result is available */}

        {/* future: show innings and balls here */}
        <div className="text-xs font-bold my-4 bg-zinc-700 p-2">
          CURR/RRR: {match.result || ""},
        </div>
      </div>
    );
}

