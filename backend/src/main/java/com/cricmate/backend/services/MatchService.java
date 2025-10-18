package com.cricmate.backend.services;

import org.springframework.stereotype.Service;

import com.cricmate.backend.model.Match;
import com.cricmate.backend.repository.MatchRepository;
import java.util.List;

@Service
public class MatchService {
    private final MatchRepository matchRepository;
    public MatchService(MatchRepository matchRepository){
        this.matchRepository = matchRepository;
    }
    public Match saveMatch(Match match){
        return matchRepository.save(match);
    }
    public Match getMatchById(Integer id){
        return matchRepository.findById(id).orElseThrow(()->new RuntimeException("Match Not found"));
    }
    
    public List<Match> getAllMatches() {
        return matchRepository.findAll();
    } 
}
