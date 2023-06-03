package com.skilldistillery.convention.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.convention.entities.Location;

public interface LocationRepository extends JpaRepository<Location, Integer> {
		Location findById(int id);
}
