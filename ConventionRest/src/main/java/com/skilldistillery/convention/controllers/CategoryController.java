package com.skilldistillery.convention.controllers;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.convention.entities.Category;
import com.skilldistillery.convention.services.CategoryService;
@CrossOrigin({"*", "http://localhost/"})
@RestController
@RequestMapping("api")
public class CategoryController {
	@Autowired
	private CategoryService service;
	
	@GetMapping("categories")
	public List<Category> listAll(){
		return service.listAllCategories();
	}
	
	@GetMapping("categories/{id}")
	public Category findById(@PathVariable int id, HttpServletResponse res) {
		Category category = service.findById(id);
		if(category == null) {
			res.setStatus(404);
		}
		return category;	
	}
	
	@PostMapping("categories")
	public Category createCategory(@RequestBody Category category, HttpServletResponse res) {
		try {
			category = service.create(category);
			res.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			category = null;
		}
		return category;
	}
	
	@PutMapping("categories/{id}")
	public Category updatedCategory(@PathVariable int id, @RequestBody Category category, HttpServletResponse res) {
		try {
			category = service.update(category, id);
			res.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			category = null;
		}
		return category;
	}

}
