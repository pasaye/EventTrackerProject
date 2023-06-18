package com.skilldistillery.convention.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.convention.entities.Convention;
import com.skilldistillery.convention.entities.Location;
import com.skilldistillery.convention.repositories.ConventionRepository;
import com.skilldistillery.convention.repositories.LocationRepository;

@Service
public class LocationServiceImpl implements LocationService {

	@Autowired
	private LocationRepository locatRepo;
	
	@Autowired 
	private ConventionRepository convRepo;

	@Override
	public List<Location> listAllLocations() {
		return locatRepo.findAll();
	}

	@Override
	public Location findById(int id) {
		Location location = locatRepo.findById(id);
		if (location != null) {
			return location;
		}
		return null;
	}

	@Override
	public Location create(int conventionId, Location location) {
		Convention conv = convRepo.findById(conventionId);
	
		if(locatRepo.existsById(conventionId)) {
			conv.addLocation(location);
			
			return locatRepo.saveAndFlush(location);
			
		}
		return null;
	}

	@Override
	public Location update(Location location, int id) {
		Location updated = locatRepo.findById(id);
		if(updated != null) {
			updated.setState(location.getState());
			updated.setCity(location.getCity());
			updated.setAddress(location.getAddress());
			return locatRepo.saveAndFlush(updated);
		}
		return null;
	}

	@Override
	public boolean delete(int conventionId,int id) {
		Convention conv = convRepo.findById(conventionId);
		if(locatRepo.existsById(conventionId)) {
			locatRepo.deleteById(id);
			
		}
		return !locatRepo.existsById(id);
	}

	@Override
	public List<Location> findByStateLike(String keyword) {
		String key = "%" + keyword + "%";
		return locatRepo.findByStateLike(key);
	}

	@Override
	public List<Location> findByConventions_id(int convId) {
		List<Location> list = locatRepo.findByConventions_id(convId);
		if(locatRepo.existsById(convId)) {
			return list;
		}
		return null;
	}

	

}