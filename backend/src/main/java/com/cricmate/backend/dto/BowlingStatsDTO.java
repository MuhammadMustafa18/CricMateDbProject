package com.cricmate.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BowlingStatsDTO {
    private String bowlerName;
    private int balls;
    private int runsConceded;
    private int wickets;
}
