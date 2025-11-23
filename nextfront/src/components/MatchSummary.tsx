import { Player, Ball, Team, Innings, Match, Tournament } from "../../types";

export default function MatchSummary({ match }: { match: Match }) {

  const calculateScore = (innings: Innings) => {
    if (!innings || !innings.balls) return { runs: 0, wickets: 0, overs: "0.0" };

    const runs = innings.balls.reduce((acc, ball) => acc + ball.runs, 0);
    const wickets = innings.balls.filter((ball) => ball.wicket).length;
    const validBalls = innings.balls.length; // Assuming all balls in array are valid deliveries for now
    const overs = `${Math.floor(validBalls / 6)}.${validBalls % 6}`;

    return { runs, wickets, overs };
  };

  return (
    <div className="bg-zinc-950 w-full max-w-7xl mx-auto mt-6 rounded-xl border border-white/5 shadow-lg p-6 relative overflow-hidden">
      {/* Subtle top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 opacity-50" />

      {/* Header Info */}
      <div className="flex flex-wrap items-center gap-3 mb-6 text-sm">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border ${match.matchState === 'LIVE' || match.matchState === 'ONGOING'
          ? 'bg-red-500/10 border-red-500/20 text-red-500 animate-pulse'
          : 'bg-zinc-900 border-white/10 text-zinc-400'
          }`}>
          {match.matchState || "State"}
        </span>
        <span className="text-zinc-500">|</span>
        <span className="text-zinc-300 font-medium">Match {match.match_id}</span>
        <span className="text-zinc-500">|</span>
        <span className="text-zinc-400">{match.matchDate ? new Date(match.matchDate).toLocaleDateString() : "TBA"}</span>
        <span className="text-zinc-500">|</span>
        <span className="text-zinc-400">{match.venue || "Venue TBA"}</span>
        <span className="text-zinc-500">|</span>
        <span className="text-zinc-300 font-medium">{match.tournament?.tournament_name}</span>
      </div>

      {/* Teams & Scores - Vertical Layout */}
      <div className="space-y-6 mb-8">
        {Array.isArray(match.innings) && match.innings.length > 0 ? (
          <>
            {/* Batting Team */}
            {match.innings.map((inn) => {
              const score = calculateScore(inn);
              return (
                <div key={inn.innings_id} className="flex justify-between items-center group">
                  <div className="flex items-center gap-4">
                    <div className={`text-3xl font-bold transition-colors ${inn.battingTeam.team_id === match.teamA?.team_id ? 'text-white group-hover:text-orange-400' : 'text-zinc-400 group-hover:text-purple-400'}`}>
                      {inn.battingTeam.team_name}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-3xl font-black ${inn.battingTeam.team_id === match.teamA?.team_id ? 'text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400' : 'text-zinc-300'}`}>
                      {score.runs}/{score.wickets}
                    </div>
                    <div className="text-xs text-zinc-500 font-medium mt-1">
                      {score.overs} Overs
                    </div>
                  </div>
                </div>
              );
            })}

            {/* If only one innings played, show second team waiting */}
            {match.innings.length === 1 && (
              <div className="flex justify-between items-center group opacity-60">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-zinc-500">
                    {match.innings[0].bowlingTeam.team_name}
                  </div>
                </div>
                <div className="text-3xl font-black text-zinc-700">
                  Yet to Bat
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="text-3xl font-bold text-white hover:text-orange-400 transition-colors">
              {match.teamA?.team_name}
            </div>
            <div className="text-3xl font-bold text-zinc-400 hover:text-purple-400 transition-colors">
              {match.teamB?.team_name}
            </div>
          </>
        )}
      </div>

      {/* Footer Info (Toss & Result) */}
      <div className="space-y-3 pt-4 border-t border-white/5">
        <div className="flex items-start gap-2">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-0.5 min-w-[60px]">Toss</span>
          <div className="text-sm text-zinc-300">
            {match.tossWinnerTeam ? (
              <>
                <span className="text-white font-semibold">{match.tossWinnerTeam.team_name}</span> won the toss and elected to <span className="text-white font-semibold">{match.tossDecision}</span> first
              </>
            ) : "Toss not yet decided"}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider mt-0.5 min-w-[60px]">Result</span>
          <div className="text-sm font-bold">
            {match.result ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-purple-400">
                {match.result}
              </span>
            ) : <span className="text-zinc-500">Match in progress or scheduled</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
