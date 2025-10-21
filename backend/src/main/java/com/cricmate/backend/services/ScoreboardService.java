package com.cricmate.backend.services;

import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cricmate.backend.repository.BallRepository;

import lombok.RequiredArgsConstructor;
import java.util.Map;

@Service
@RequiredArgsConstructor // ye kya? 
public class ScoreboardService {
     private final BallRepository ballRepository;
    //  public Map<String, Object> getScoreboard(int inningsId) {
    //     Map<String, Object> scoreboard = new HashMap<>();
    //     scoreboard.put("batting", ballRepository.getBattingStats(inningsId));
    //     return scoreboard;
    // }
    public List<String> getScoreboard(int inningsId) {
        return ballRepository.getBatsmanNames(inningsId);
    }
}
