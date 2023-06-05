package com.skilldistillery.convention.services;

import java.util.List;

import com.skilldistillery.convention.entities.Convention;

public interface ConventionService {
	List<Convention> listAll();
	Convention findById(int conventionId);
	Convention create(Convention convention);
	Convention update(Convention convention, int conventionId);
	boolean delete(int id);

	List<Convention> findByLocationsState(String states);
	
	
	
}
