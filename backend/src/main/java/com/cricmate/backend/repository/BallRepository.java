package com.cricmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.cricmate.backend.dto.BattingStatsDTO;
import com.cricmate.backend.model.Ball;
import java.util.List;

public interface BallRepository extends JpaRepository<Ball, Integer> {

    // custom query written in JPQL (not plain SQL).
    // "SELECT new com.cricmate.backend.dto.BattingStatsDTO(" creates an object of our DTO directly inside the query
    // instead of returning it will fill the BattingStatsDTO object with the data
    // @Query("SELECT new com.cricmate.backend.dto.BattingStatsDTO(" +
    //        "b.batsman.player_name, SUM(b.runs), COUNT(b.ball_id), " +
    //        "SUM(CASE WHEN b.runs = 4 THEN 1 ELSE 0 END), " +
    //        "SUM(CASE WHEN b.runs = 6 THEN 1 ELSE 0 END), " +
    //        "CASE WHEN MAX(b.wicket) = true THEN true ELSE false END)" +
    //        "FROM Ball b WHERE b.innings.innings_id = :inningsId " + // :inningsId is a parameter — you’ll pass it when calling
    //                                                          // the method.
    //        "GROUP BY b.batsman.player_id")                       
    //        // different for different batsmen, or like one row per batsman
    // List<BattingStatsDTO> getBattingStats(@Param("inningsId") int inningsId);
    @Query("SELECT DISTINCT b.batsman.player_name FROM Ball b WHERE b.innings.innings_id = :inningsId")
    List<String> getBatsmanNames(@Param("inningsId") int inningsId);
}