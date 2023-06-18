package com.skilldistillery.convention.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.convention.entities.Convention;
import com.skilldistillery.convention.services.ConventionService;

@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class ConventionController {

	@Autowired
	private ConventionService service;

	@GetMapping("conventions")
	public List<Convention> findAll() {
		return service.listAll();
	}

	@GetMapping("conventions/{id}")
	public Convention getConvention(@PathVariable int id, HttpServletResponse res) {
		Convention conv = service.findById(id);
		if (conv == null) {
			res.setStatus(404);
		}
		return conv;
	}

//	@GetMapping("conventions/{states}")
//	public List<Convention> findByState(@PathVariable String states, HttpServletResponse res) {
//		return service.findByLocationsState(states);
//	}

//	@GetMapping("categories/{id}/conventions")
//	public List<Convention> conventionByCategory(@PathVariable("id") int cateId, HttpServletResponse res) {
//			return service.findByCategory_Id(cateId);
//	}

	@PostMapping("conventions")
	public Convention createConvention(@RequestBody Convention conv, HttpServletResponse res) {
		try {
			conv = service.create(conv);
			res.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			conv = null;
		}
		return conv;
	}
	
	
	
	
//	@PostMapping("conventions/{id}/categories")
//	public Convention createConventionByCategory(@RequestBody Convention convention, HttpServletResponse res, @PathVariable int id) {
//		try {
//			convention = service.create(id, convention);
//			res.setStatus(201);
//		} catch (Exception e) {
//			e.printStackTrace();
//			res.setStatus(400);
//			convention = null;
//		}
//		return convention;
//	}
	
//	@PutMapping("conventions/{id}/{cateid}/categories")
//	public Convention update(@PathVariable("id") int conventionId, @PathVariable("cateid") int categoryId ,@RequestBody Convention conv, HttpServletResponse res) {
//		try {
//			conv = service.put(categoryId, conv, conventionId);
//			res.setStatus(201);
//		}catch(Exception e) {
//			e.printStackTrace();
//			res.setStatus(400);
//			conv=null;
//		}
//		return conv;
//	}

	@PutMapping("conventions/{id}")
	public Convention updatedConvention(@PathVariable int id, @RequestBody Convention conv, HttpServletResponse res) {
		try {
			conv = service.update(conv, id);
			res.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			conv = null;
		}
		return conv;
	}

	@DeleteMapping("conventions/{id}")
	public void delete(HttpServletResponse res, @PathVariable int id) {
		if (id != 0) {
			service.delete(id);
			res.setStatus(204);
		} else {
			res.setStatus(404);
		}
	}

}
