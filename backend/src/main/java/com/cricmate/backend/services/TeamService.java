package com.cricmate.backend.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.cricmate.backend.repository.PlayerRepository;
import com.cricmate.backend.repository.TeamRepository;
import com.cricmate.backend.model.Team;
import com.cricmate.backend.model.Player;

@Service
public class TeamService {
    private final TeamRepository teamRepository;
    private final PlayerRepository playerRepository;
    public TeamService(TeamRepository teamRepository, PlayerRepository playerRepository){
        this.teamRepository = teamRepository;
        this.playerRepository = playerRepository;
    }
    
    public Team getTeamById(Integer id){
        return teamRepository.findById(id).orElseThrow(()->new RuntimeException("Team not found"));
    }
    public List<Team> getAllTeams(){
        return teamRepository.findAll();
    }
    public Team saveTeam(Team team) {
        return teamRepository.save(team);
    }

    public void deleteTeamById(Integer id) {
        teamRepository.deleteById(id);
    }
    public void addPlayerToTeam(int PlayerId, int TeamId){
        Player player = playerRepository.findById(PlayerId);
        Team team = teamRepository.findById(TeamId);
    }
}
