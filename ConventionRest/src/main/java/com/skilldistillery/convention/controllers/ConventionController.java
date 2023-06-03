package com.skilldistillery.convention.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.convention.entities.Convention;
import com.skilldistillery.convention.services.ConventionService;

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
		if(conv == null) {
			res.setStatus(404);
		}
		return conv;
	}

}
