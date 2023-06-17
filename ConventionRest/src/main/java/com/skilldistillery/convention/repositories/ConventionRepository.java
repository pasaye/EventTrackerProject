package com.skilldistillery.convention.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.convention.entities.Convention;

public interface ConventionRepository extends JpaRepository<Convention, Integer> {
	Convention findById(int id);
	
//	List<Convention> findByCategory_Id(int cateId);
	List<Convention> findByLocationsState(String states);
}
