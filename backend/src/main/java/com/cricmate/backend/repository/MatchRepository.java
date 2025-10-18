package com.cricmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.cricmate.backend.model.Match;


public interface MatchRepository extends JpaRepository<Match, Integer> {
}