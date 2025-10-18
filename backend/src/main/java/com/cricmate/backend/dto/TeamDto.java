package com.cricmate.backend.dto;

import java.util.List;

public class TeamDto {
    private String name;
    private List<Integer> playerIds;

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
}
