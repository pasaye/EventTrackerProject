package com.skilldistillery.convention.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.convention.entities.Location;
import com.skilldistillery.convention.services.LocationService;

@RestController
@RequestMapping("api")
public class LocationController {
	
	@Autowired
	private LocationService service;
	
	@GetMapping("locations")
	public List<Location> findAll() {
		return service.listAllLocations();
		
	}

	@GetMapping("locations/{id}")
	public Location getLocation(@PathVariable int id, HttpServletResponse res) {
		Location l = service.findById(id);
		if (l == null) {
			res.setStatus(404);
		}
		return l;
	}
	
	@GetMapping("locations/search/{keyword}")
	public List<Location> kewordSearch(@PathVariable("keyword") String key, HttpServletResponse res ) {
		List<Location> state = service.findByStateLike(key);
		if(state == null) {
			res.setStatus(404);
		}
		return state;
	}
	
	@GetMapping("conventions/{id}/locations")
	public List<Location> locationByConvention(@PathVariable("id") int convId, HttpServletResponse res) {
			return service.findByConventions_id(convId);
	}
	
	@PostMapping("locations/{id}/conventions")
	public Location createLocation(@RequestBody Location location, HttpServletResponse res, @PathVariable int id) {
		try {
			location = service.create(id, location);
			res.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			location = null;
		}
		return location;
	}

	@PutMapping("locations/{id}")
	public Location updatedLocation(@PathVariable int id, @RequestBody Location location, HttpServletResponse res) {
		try {
			location = service.update(location, id);
			res.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			location = null;
		}
		return location;
	}

	@DeleteMapping("locations/{id}/conventions/{cid}")
	public void delete(HttpServletResponse res, @PathVariable("id") int imageId, @PathVariable("cid") int id) {
		if(id != 0) {
			service.delete(id, imageId);
			res.setStatus(204);
			
		} else {
			res.setStatus(404);		
		}		
	}
	
}