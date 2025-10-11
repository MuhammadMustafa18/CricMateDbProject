package com.cricmate.backend.controller;

import com.cricmate.backend.model.Player;
import com.cricmate.backend.repository.PlayerRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController // http requests this class handles and json it returns, rest requests and returns json
@RequestMapping("/players") // everything inside this class will be accessed like localhost8080/players/something
public class PlayerController {
    // requestmapping also maps get requests to get method here, set to set requests method here
    @Autowired // autoinjects player repo
    private PlayerRepository playerRepository; // Player repository actually talks to H2, postgres
    
    // GET: return all players
    @GetMapping
    public List<Player> getAllPlayers() {
        return playerRepository.findAll();
    }

    // POST: add new player
    @PostMapping
    public Player addPlayer(@RequestBody Player player) {
        return playerRepository.save(player); // auto converts to sql insert and saves into db
        // what db? H2 initially
    } 

    // DELETE: delete by ID
    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable int id) {
        playerRepository.deleteById(id);
    }
}
