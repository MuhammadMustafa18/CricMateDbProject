import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Player, Ball, Team, Innings, Match } from "../types";

function MatchDetails() {
  const { id } = useParams(); // how does it know? - it probably matches the name
    /* <Route path="/match/:id" element={<MatchDetails />} /> */
  


  const [match, setMatch] = useState<Match | null>(null);
  const [result, setResult] = useState(null)
  useEffect(() => {
    fetch(`http://localhost:8080/matches/${id}`)
      .then((res) => res.json())
      .then((data) => {setMatch(data); console.log(data); setResult(data)})
      .catch((err) => console.error(err));
  }, [id]);

  if (!match) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="bg-zinc-800 w-screen text-white p-6">
      <div>
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
      {match.innings?.map((inn, i) => (
        <div
          key={i}
          className="mt-6 border border-zinc-700 rounded-lg py-4 bg-zinc-900"
        >
          <h2 className="text-lg font-bold mb-2 text-white">
            {inn.battingTeam.team_name} Innings
          </h2>

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
                <div key={over} className="mb-3">
                  {balls.length >= 6 ? (
                    <div className="uppercase bg-green-700">
                      <div className="px-3 my-3">End of over {over}</div>
                    </div>
                  ) : null}
                  <div className="flex px-3 flex-col gap-y-3">
                    {balls
                      .sort(
                        (a: Ball, b: Ball) =>
                          Number(b.ballNumber) - Number(a.ballNumber)
                      )
                      .map((ball: any) => (
                        <div className="flex flex-row gap-x-3 items-center">
                          <div className="text-xs">
                            {`${over}.${ball.ballNumber}`}
                          </div>
                          <div
                            key={ball.ball_id}
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
                            {`${ball.wicket ? "W" : ball.runs}`}
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
      <div className="mt-6 bg-zinc-900 p-4 rounded text-xs overflow-auto max-h-64">
        <h3 className="font-bold mb-2 text-green-400">Debug Response:</h3>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>

      {/*doesnt work: React can’t render raw JavaScript objects {result} */}

      {/* future: ScoreCard or Commentary toggle ball by ball*/}
    </div>
  );
}

export default MatchDetails;
