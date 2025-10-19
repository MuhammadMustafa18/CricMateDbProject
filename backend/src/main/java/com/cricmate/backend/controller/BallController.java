package com.cricmate.backend.controller;

import com.cricmate.backend.model.Ball;
// import com.cricmate.backend.repository.PlayerRepository;
import com.cricmate.backend.services.BallService;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/balls")
public class BallController {
    private final BallService ballService;

    public BallController(BallService ballService) {
        this.ballService = ballService;
    }

    @PostMapping
    public Ball createBall(@RequestBody Ball ball) {
        return ballService.saveBall(ball);
    }

    @GetMapping
    public List<Ball> getAllBalls() {
        return ballService.getAllBalls();
    }
}

// POST
// {
//   "innings": { "innings_id": 1 },
//   "overNumber": 1,
//   "ballNumber": 1,
//   "batsman": {"player_id": 1}, // foriegn key
//   "bowler":  {"player_id": 2},
//   "runs": 4,
//   "wicket": false
// }

// RESPONSE:
// {
//     "ball_id": 1,
//     "innings": {
//         "innings_id": 1,
//         "battingTeam": null,
//         "bowlingTeam": null,
//         "totalRuns": 0,
//         "wickets": 0,
//         "overs": 0.0,
//         "balls": null
//     },
//     "batsman": {
//         "player_id": 1,
//         "player_name": null
//     },
//     "bowler": {
//         "player_id": 2,
//         "player_name": null
//     },
//     "overNumber": 1,
//     "ballNumber": 1,
//     "runs": 4,
//     "wicket": false
// }

// GET http://localhost:8080/balls
// [
//     {
//         "ball_id": 1,
//         "batsman": {
//             "player_id": 1,
//             "player_name": "Sachin Tendulkar"
//         },
//         "bowler": {
//             "player_id": 2,
//             "player_name": "Shadab khan"
//         },
//         "overNumber": 1,
//         "ballNumber": 1,
//         "runs": 4,
//         "wicket": false
//     }
// ]

// updated innings as innings will now have these balls:
// [
//     {
//         "innings_id": 1,
//         "battingTeam": {
//             "team_id": 1,
//             "team_name": "Pakistan"
//         },
//         "bowlingTeam": {
//             "team_id": 2,
//             "team_name": "Karachi Kings"
//         },
//         "totalRuns": 0,
//         "wickets": 0,
//         "overs": 0.0,
//         "balls": [
//             {
//                 "ball_id": 1,
//                 "batsman": {
//                     "player_id": 1,
//                     "player_name": "Sachin Tendulkar"
//                 },
//                 "bowler": {
//                     "player_id": 2,
//                     "player_name": "Shadab khan"
//                 },
//                 "overNumber": 1,
//                 "ballNumber": 1,
//                 "runs": 4,
//                 "wicket": false
//             }
//         ]
//     }
// ]