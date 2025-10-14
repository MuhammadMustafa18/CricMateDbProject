package com.cricmate.backend.controller;

// import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.cricmate.backend.repository.TeamRepository;
import com.cricmate.backend.services.TeamService;
import com.cricmate.backend.model.Team;
import java.util.List;

@RestController
@RequestMapping("/teams")
public class TeamController {


    // after initial constructor we can't reassign teams
    // private final TeamRepository teamRepository;

    // @Autowired 
    // private TeamRepository teamRepository;
    private final TeamService teamService;
    public TeamController(TeamService teamService){
        this.teamService = teamService;
    }
    @GetMapping("/{id}")
    public Team getTeam(@PathVariable Integer id){
        return teamService.getTeamById(id);
    }

    @GetMapping
    public List<Team> getAllTeams(){
        return teamService.getAllTeams();
        // dont return TeamRepository.findAll();  that is the classname, not the instance
    }

    @PostMapping
    public Team addTeam(@RequestBody Team team){
        return teamService.saveTeam(team);
    }
    
    // DELETE: delete by ID
    @DeleteMapping("/{id}")
    public void deletePlayer(@PathVariable int id) {
        teamService.deleteTeamById(id);
    }
}
