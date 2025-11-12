import { Player, Ball, Team, Innings, Match } from "../../types";

export default function Commentary({ innings }: { innings: Innings[] }) {
    if (!innings) return <p>No innings data yet</p>;

  return (
    <div className="w-[80%] mx-auto mt-6">
      {innings?.map((inn, i) => (
        <div
          key={i}
          className="mt-6 border border-zinc-700 rounded-lg py-4 bg-zinc-900"
        >
          <h2 className="text-lg font-bold mb-2 px-4 text-white">
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
                <div key={over} className="my-3">
                  {balls.length >= 6 ? (
                    <div className="bg-blue-400/60 flex flex-row my-5 px-6 py-2 gap-2 items-baseline">
                      <div className="font-bold text-lg uppercase">
                        End of over {over}
                      </div>
                      <div className="text-sm">
                        {balls.reduce(
                          (sum: number, ball: Ball) => sum + ball.runs,
                          0
                        )}{" "}
                        runs
                      </div>
                    </div>
                  ) : null}
                  <div className="flex px-6 flex-col gap-y-3">
                    {balls
                      .sort(
                        (a: Ball, b: Ball) =>
                          Number(b.ballNumber) - Number(a.ballNumber)
                      )
                      .map((ball: Ball) => (
                        <div
                          key={ball.ball_id}
                          className="flex flex-row gap-x-3 items-center"
                        >
                          <div className="text-xs">{`${over}.${ball.ballNumber}`}</div>
                          <div
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
                            {ball.wicket ? "W" : ball.runs}
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
    </div>
  );
}
