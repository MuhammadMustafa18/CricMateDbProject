import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Player, Ball, Team, Innings, Match } from "../types";
import Commentary from "./Commentary";
import Scorecard from "./Scorecard";
import MatchSummary from "./MatchSummary";

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

  if (!match) return <p className="text-white">Loading...</p>;

  return (
    <div className="mt-70 w-screen">
        <MatchSummary match={match} />
        <Commentary innings={match.innings || []} />
        {match.innings?.map((inn) => (
          <Scorecard
            inningsId={inn.innings_id}
            battingTeamName={inn.battingTeam.team_name}
          />
        ))}

      <div className="mt-6 w-[80%] mx-auto bg-zinc-900 rounded text-xs max-h-60">
        <div className="font-bold mb-2 text-green-400">Debug Response:</div>
        <pre>{JSON.stringify(result, null, 2)}</pre>
      </div>

      {/*doesnt work: React can’t render raw JavaScript objects {result} */}

      {/* future: ScoreCard or Commentary toggle ball by ball*/}
    </div>
  );
}

export default MatchDetails;
