import Link from "next/link";


interface CricketTeam {
  name: string;
  flag: string;
}

const teams: CricketTeam[] = [
  { name: "Afghanistan", flag: "🇦🇫" },
  { name: "Australia", flag: "🇦🇺" },
  { name: "Bangladesh", flag: "🇧🇩" },
  { name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { name: "India", flag: "🇮🇳" },
  { name: "Ireland", flag: "🇮🇪" },
  { name: "New Zealand", flag: "🇳🇿" },
  { name: "Pakistan", flag: "🇵🇰" },
  { name: "South Africa", flag: "🇿🇦" },
  { name: "Sri Lanka", flag: "🇱🇰" },
  { name: "West Indies", flag: "🇧🇧" },
  { name: "Zimbabwe", flag: "🇿🇼" },
];

export const metadata = {
  title: "Cricket Teams",
  description: "Popular international cricket teams",
};

export default function AllTeams() {
  return (
    <div className="min-h-screen w-full bg-linear-to-br from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-950/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <nav className="text-sm text-zinc-400 mb-4">
            <Link href="/" className="hover:text-zinc-200 transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-100">Cricket Teams</span>
          </nav>
          <h1 className="text-4xl font-bold text-white">Cricket Teams</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-zinc-100 mb-6">
            Popular Men's International Teams
          </h2>

          {/* Teams Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teams.map((team) => (
              <div key={team.name} className="group cursor-pointer">
                <div className="flex items-center gap-4 p-4 rounded-lg bg-zinc-800/50 hover:bg-zinc-700/50 border border-zinc-700 hover:border-zinc-600 transition-all duration-200">
                  <span className="text-4xl">{team.flag}</span>
                  <span className="text-lg font-medium text-zinc-100 group-hover:text-white transition-colors">
                    {team.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
