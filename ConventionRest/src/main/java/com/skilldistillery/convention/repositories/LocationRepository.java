package com.skilldistillery.convention.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.convention.entities.Location;

public interface LocationRepository extends JpaRepository<Location, Integer> {
		Location findById(int id);
		
		List<Location>findByStateLike(String keyword);
		List<Location>findByConventions_id(int convId);
}
