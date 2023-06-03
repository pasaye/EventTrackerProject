package com.skilldistillery.convention.services;

import java.util.List;

import com.skilldistillery.convention.entities.Location;

public interface LocationService {
	List<Location> listAllLocations();
	Location findById(int id);
	Location create(Location location);
	Location update(Location location, int id);
	boolean delete(int id);
}
