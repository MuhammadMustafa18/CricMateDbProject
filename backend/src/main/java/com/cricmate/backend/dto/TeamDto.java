package com.cricmate.backend.dto;

import java.util.List;
import java.util.stream.Collectors;

import com.cricmate.backend.model.Player;
import com.cricmate.backend.model.Team;

public class TeamDto {
    private Number id;
    private String name;
    private List<Integer> playerIds;

    public Number getId() {
        return this.id;
    }

    public void setId(Number id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Integer> getPlayerIds() {
        return playerIds;
    }

    public void setPlayerIds(List<Integer> playerIds) {
        this.playerIds = playerIds;
    }
    public TeamDto(Team team) {
    this.id = team.getTeam_id();
    this.name = team.getTeam_name();
    this.playerIds = team.getPlayers().stream()
                         .map(Player::getPlayer_id)
                         .collect(Collectors.toList());
}
}
