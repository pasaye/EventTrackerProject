package com.skilldistillery.convention.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.convention.entities.Convention;

public interface ConventionRepository extends JpaRepository<Convention, Integer> {
	Convention findById(int id);
}
