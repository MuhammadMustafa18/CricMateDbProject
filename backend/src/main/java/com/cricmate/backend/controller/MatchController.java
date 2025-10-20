package com.cricmate.backend.controller;

import com.cricmate.backend.model.Match;
// import com.cricmate.backend.repository.PlayerRepository;
import com.cricmate.backend.services.MatchService;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/matches")
public class MatchController {
    private final MatchService matchService;

    public MatchController(MatchService matchService) {
        this.matchService = matchService;
    }
    
    @PostMapping
    public Match createMatch(@RequestBody Match match) {
        return matchService.saveMatch(match);
    }

    @GetMapping
    public List<Match> getAllMatches() {
        return matchService.getAllMatches();
    }

    @GetMapping("/{id}")
    public Match getMatchById(@PathVariable Integer id) {
        return matchService.getMatchById(id);
    }
}


// Testing
// POST
// {
//   "teamA": { "team_id": 1 },
//   "teamB": { "team_id": 2 },
//   "matchDate": "2025-10-19T16:00:00"
// }
// RESPONSE
// {
//     "match_id": 1,
//     "teamA": {
//         "team_id": 1,
//         "team_name": null
//     },
//     "teamB": {
//         "team_id": 2,
//         "team_name": null
//     },
//     "venue": null,
//     "match_date": null,
//     "innings": null
// }
// WHY DIDNT WE GET THE TEAM NAME HERE? JPA PARTIALLY FETCHES, NOT AN ERROR

// GET http://localhost:8080/matches
// [
//     {
//         "match_id": 1,
//         "teamA": {
//             "team_id": 1,
//             "team_name": "Pakistan"
//         },
//         "teamB": {
//             "team_id": 2,
//             "team_name": "Karachi Kings"
//         },
//         "venue": null,
//         "match_date": null,
//         "innings": []
//     }
// ]

// {
//    "teamA": { "team_id": 3 },
//    "teamB": { "team_id": 5 },
//    "matchDate": "2025-10-19T16:00:00",
//    "venue": "karachi",
//    "tossWinnerTeam": { "team_id": 3 },
//    "tossDecision": "bat"
// }