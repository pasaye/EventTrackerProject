package com.skilldistillery.convention.services;

import java.util.List;

import com.skilldistillery.convention.entities.Category;
import com.skilldistillery.convention.entities.Convention;

public interface CategoryService {
	List<Category> listAllCategories();
	Category findById(int id);
	Category create(Category category);
	Category update(Category category, int id);
	
	
}
