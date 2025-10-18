package com.cricmate.backend.controller;

import com.cricmate.backend.model.Innings;
// import com.cricmate.backend.repository.PlayerRepository;
import com.cricmate.backend.services.InningsService;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/innings")
public class InningsController {
    private final InningsService inningsService;

    public InningsController(InningsService inningsService) {
        this.inningsService = inningsService;
    }

    @PostMapping
    public Innings createInnings(@RequestBody Innings innings) {
        return inningsService.saveInnings(innings);
    }

    @GetMapping
    public List<Innings> getAllInnings() {
        return inningsService.getAllInnings();
    }
}