package com.skilldistillery.convention.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.convention.entities.Location;
import com.skilldistillery.convention.repositories.LocationRepository;

@Service
public class LocationServiceImpl implements LocationService {

	@Autowired
	private LocationRepository locatRepo;

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
	public Location create(Location location) {
		return locatRepo.saveAndFlush(location);
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
	public boolean delete(int id) {
		locatRepo.deleteById(id);
		return !locatRepo.existsById(id);
	}

}
