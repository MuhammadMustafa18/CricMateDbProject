package com.cricmate.backend.model;


import java.time.LocalDateTime;
// import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Match {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int match_id;


    
    // owning side
    // Key point: The entity that has the @JoinColumn is always the owning side. 
    // Hibernate will use that side to manage the foreign key in the database.

    @ManyToOne // many match objects can reference a single team
    @JoinColumn(name = "team_a_id") // which column in the match table holds foreign key, JPA will handle the match
    private Team teamA; // the java object
    // Database column: team_a_id → stores the actual foreign key integer.(i actualled made them both same)
    // Java field: teamA → object reference to a Team.

    @ManyToOne // Many matches can reference the referenced column
    @JoinColumn(name = "team_b_id")
    private Team teamB;

    private String venue;

    // matchDate → Java field name (camelCase, standard in Java).
    // "match_date" → database column name (snake_case, often used in SQL).
    @Column(name = "match_date")
    private LocalDateTime match_date;   
    
    // one match many innings
    @OneToMany(mappedBy = "match", cascade = CascadeType.ALL) // innings entity has a field called match that owns the relationship
    private List<Innings> innings;
    // This tells JPA: “don’t create a separate join table; use the match_id foreign
    // key in the Innings table.”
    // any operation on Match (save, delete, update) will automatically propagate to
    // all its innings.

    // Getters & Setters
    public int getMatch_id() {
        return match_id;
    }

    public void setMatch_id(int match_id) {
        this.match_id = match_id;
    }
    
    public Team getTeamA() {
        return teamA;
    }

    public void setTeamA(Team teamA) {
        this.teamA = teamA;
    }

    public Team getTeamB() {
        return teamB;
    }

    public void setTeamB(Team teamB) {
        this.teamB = teamB;
    }

    public String getVenue() {
        return venue;
    }

    public void setVenue(String venue) {
        this.venue = venue;
    }

    public LocalDateTime getMatch_date() {
        return match_date;
    }

    public void setMatch_date(LocalDateTime match_date) {
        this.match_date = match_date;
    }

    public List<Innings> getInnings() {
        return innings;
    }

    public void setInnings(List<Innings> innings) {
        this.innings = innings;
    }
}
