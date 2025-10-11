package com.cricmate.backend.model;

// import com.fasterxml.jackson.annotation.JsonProperty;

// used for mapping java classes to tables in db
import jakarta.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;

// entity marks this as a entity(table in db for this)
@Entity
public class Player{
    @Id // mark this field as primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto increments
    private int player_id;
    private String player_name;

    // Many to Many with Team
    @ManyToMany
    @JoinTable(
        name = "Team_player",
        joinColumns = @JoinColumn(name = "player_id"),
        inverseJoinColumns =  @JoinColumn(name = "team_id")

    )
    @JsonBackReference // prevents infinite recursion - data store ok hua hai but player sees team, team sees player in data
    private Set<Team> teams;

    
    public int getPlayer_id(){
        return player_id;
    }
    
    public String getPlayer_name() {
        return player_name;
    }
    public void setPlayer_id(int player_id){
        this.player_id = player_id;
    }
    // @JsonProperty("player_name")
    public void setPlayer_name(String player_name){
        this.player_name = player_name;
    }
    
    public Set<Team> getTeams() {
        return teams;
    }

    public void setTeams(Set<Team> teams) {
        this.teams = teams;
    }

}


