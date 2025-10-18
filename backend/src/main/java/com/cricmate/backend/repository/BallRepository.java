package com.cricmate.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cricmate.backend.model.Ball;

public interface BallRepository extends JpaRepository<Ball, Integer> {
}