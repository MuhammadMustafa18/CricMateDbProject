export interface Player {
  player_id: number;
  player_name: string;
}

export interface Tournament {
  tournament_id: number;
  tournament_name: string;
}

export interface Ball {
  ball_id: number
  overNumber: number;
  ballNumber: number;
  batsman: Player;
  bowler: Player;
  runs: number;
  wicket: boolean;
}

export interface Team {
  team_id: number;
  team_name: string;
}

export interface Innings {
  innings_id: number;
  battingTeam: Team;
  bowlingTeam: Team;
  balls: Ball[];
}

export interface Match {
  match_id: number;
  matchState?: string;
  matchDate?: string;
  venue?: string;
  tournament?: string;
  tossWinnerTeam?: Team | null;
  tossDecision?: string;
  result?: string;
  teamA?: Team;
  teamB?: Team;
  innings?: Innings[];
}
