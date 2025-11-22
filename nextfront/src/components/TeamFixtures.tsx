"use client";

interface Fixture {
  id: number;
  date: string;
  time: string;
  matchType: string;
  location: string;
  team1: string;
  team2: string;
  flag1: string;
  flag2: string;
  status: string;
}

const fixtures: Fixture[] = [
  {
    id: 1,
    date: "THU, 04 DEC",
    time: "9:00 AM",
    matchType: "2nd Test (D/N)",
    location: "Brisbane, December 04 - 08, 2...",
    team1: "AUS",
    team2: "ENG",
    flag1: "🇦🇺",
    flag2: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    status: "Match yet to begin",
  },
  {
    id: 2,
    date: "WED, 17 DEC",
    time: "4:30 AM",
    matchType: "3rd Test",
    location: "Adelaide, December 17 - 21, 2025. T...",
    team1: "AUS",
    team2: "ENG",
    flag1: "🇦🇺",
    flag2: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    status: "Match yet to begin",
  },
  {
    id: 3,
    date: "FRI, 26 DEC",
    time: "4:30 AM",
    matchType: "4th Test",
    location: "Melbourne, December 26 - 30, 2025...",
    team1: "AUS",
    team2: "ENG",
    flag1: "🇦🇺",
    flag2: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    status: "Match yet to begin",
  },
  {
    id: 4,
    date: "SUN, 04 JAN",
    time: "4:30 AM",
    matchType: "5th Test",
    location: "Sydney, January 04 - 08, 2026. The A...",
    team1: "AUS",
    team2: "ENG",
    flag1: "🇦🇺",
    flag2: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    status: "Match yet to begin",
  },
];

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function FixturesPanel({ activeTab, setActiveTab }: Props) {
  return (
    <div className="bg-slate-800 rounded-lg p-4 border border-slate-700">
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab("fixtures")}
          className={`px-4 py-2 rounded font-medium transition ${
            activeTab === "fixtures"
              ? "bg-cyan-500 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Fixtures
        </button>
        <button
          onClick={() => setActiveTab("results")}
          className={`px-4 py-2 rounded font-medium transition ${
            activeTab === "results"
              ? "bg-cyan-500 text-white"
              : "bg-slate-700 text-slate-300 hover:bg-slate-600"
          }`}
        >
          Results
        </button>
      </div>

      <div className="space-y-3">
        {fixtures.map((fixture) => (
          <div
            key={fixture.id}
            className="bg-slate-700 rounded-lg p-3 border border-slate-600 hover:border-slate-500 transition"
          >
            <div className="text-xs font-semibold text-slate-300 mb-1">
              {fixture.date}, {fixture.time}
            </div>
            <div className="text-xs text-slate-400 mb-2">
              {fixture.matchType}
            </div>
            <div className="text-xs text-slate-400 mb-3 line-clamp-1">
              {fixture.location}
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{fixture.flag1}</span>
                <span className="font-semibold text-white">
                  {fixture.team1}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">
                  {fixture.team2}
                </span>
                <span className="text-xl">{fixture.flag2}</span>
              </div>
            </div>

            <div className="text-xs text-slate-400">{fixture.status}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
