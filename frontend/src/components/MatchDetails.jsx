import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function MatchDetails() {
  const { id } = useParams(); // how does it know? - it probably matches the name
    /* <Route path="/match/:id" element={<MatchDetails />} /> */
          

  const [match, setMatch] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/matches/${id}`)
      .then((res) => res.json())
      .then((data) => {setMatch(data); console.log(data)})
      .catch((err) => console.error(err));
  }, [id]);

  if (!match) return <p className="text-white p-4">Loading...</p>;

  return (
    <div className="bg-zinc-800 w-screen text-white p-6">
      <div className="">Match State: {match.state || "State"}</div>
      <div className="text-sm font-bold mb-4">
        Match {match.match_id}, Date: {match.matchDate || "TBA"}, Venue:{" "}
        {match.venue || "TBA"}, Tournament: {match.tournament || "TBA"}
      </div>
      {match.innings?.length == 0 ? (
        <div>
          <p className="text-xl mb-2">{match.teamA?.team_name}</p>
          <p className="text-xl mb-2">{match.teamB?.team_name}</p>
        </div>
      ) : (
        // innings is an array
        <div>
          <p className="text-xl mb-2">
            {match.innings[0]?.battingTeam.team_name}
          </p>
          <p className="text-xl mb-2">
            {match.innings[0]?.bowlingTeam.team_name}
          </p>
        </div>
      )}

      <div className="text-xs font-bold my-4">
        Result: {match.result || "TOSS/YET TO BEGIN/DRAWN/WINNER"},
      </div>
      {/* future: show innings and balls here */}
      <div className="text-xs font-bold my-4 bg-zinc-700 p-2">
        CURR/RRR: {match.result || ""},
      </div>
      {/* future: ScoreCard or Commentary toggle ball by ball*/}
    </div>
  );
}

export default MatchDetails;
