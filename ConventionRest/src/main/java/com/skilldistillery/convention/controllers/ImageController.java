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

import com.skilldistillery.convention.entities.Image;
import com.skilldistillery.convention.services.ImageService;

@RestController
@RequestMapping("api")
public class ImageController {
	
	@Autowired
	private ImageService service;
	
	@GetMapping("images")
	public List<Image> findAll() {
		return service.listAllImage();
	}

	@GetMapping("images/{id}")
	public Image getImage(@PathVariable int id, HttpServletResponse res) {
		Image image = service.findById(id);
		if (image == null) {
			res.setStatus(404);
		}
		return image;
	}
	
	@PostMapping("images")
	public Image createImage(@RequestBody Image image, HttpServletResponse res) {
		try {
			image = service.create(image);
			res.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			image = null;
		}
		return image;
	}
	
	@PutMapping("images/{id}")
	public Image updatedImage(@PathVariable int id, @RequestBody Image image, HttpServletResponse res) {
		try {
			image = service.update(image, id);
			res.setStatus(201);
		} catch (Exception e) {
			e.printStackTrace();
			res.setStatus(400);
			image = null;
		}
		return image;
	}

	@DeleteMapping("images/{id}")
	public void delete(HttpServletResponse res, @PathVariable int id) {
		if (id != 0) {
			service.delete(id);
			res.setStatus(204);
		} else {
			res.setStatus(404);
		}
	}
}
