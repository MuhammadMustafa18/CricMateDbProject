package com.cricmate.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cricmate.backend.services.ScoreboardService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/scoreboard")
@RequiredArgsConstructor // enerates a constructor with all the final fields or fields marked with
                         // @NonNull.
public class ScoreboardController {
    private final ScoreboardService scoreboardService;
    
    @GetMapping("/{inningsId}")
    public ResponseEntity<?> getScoreboard(@PathVariable int inningsId) {
        return ResponseEntity.ok(scoreboardService.getScoreboard(inningsId));
    }
    // response entity sends both response body and HTTP status code
}
