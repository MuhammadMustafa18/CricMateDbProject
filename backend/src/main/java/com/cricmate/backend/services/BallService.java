package com.cricmate.backend.services;

import org.springframework.stereotype.Service;
import com.cricmate.backend.model.Ball;
import com.cricmate.backend.repository.BallRepository;
import java.util.List;


@Service
public class BallService {
    private final BallRepository ballRepository;
    BallService(BallRepository ballRepository){
        this.ballRepository = ballRepository;
    }
    
    public Ball saveBall(Ball ball) {
        return ballRepository.save(ball);
    }

    public List<Ball> getAllBalls() {
        return ballRepository.findAll();
    }
    
}
