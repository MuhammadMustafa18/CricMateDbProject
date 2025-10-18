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