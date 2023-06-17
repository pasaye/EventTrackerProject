package com.skilldistillery.convention.services;

import java.util.List;

import com.skilldistillery.convention.entities.Convention;
import com.skilldistillery.convention.entities.Location;

public interface ConventionService {
	List<Convention> listAll();
	Convention findById(int conventionId);
	Convention create(Convention convention);
	Convention update(Convention convention, int conventionId);
//	Convention create(int categoryId, Convention convention);
//	Convention put(int categoryId, Convention convention, int conventionId);
	boolean delete(int id);
//	List<Convention> findByCategory_Id(int cateId);
	List<Convention> findByLocationsState(String states);
	
	
	
}
