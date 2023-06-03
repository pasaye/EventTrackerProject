package com.skilldistillery.convention.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.convention.entities.Category;
import com.skilldistillery.convention.repositories.CategoryRepository;
@Service
public class CategoryServiceImpl implements CategoryService {
	
	@Autowired
	private CategoryRepository cateRepo;

	@Override
	public List<Category> listAllCategories() {
		return cateRepo.findAll();
	}

	@Override
	public Category findById(int id) {
		Category category = cateRepo.findById(id);
		if (category != null) {
			return category;
		}
		return null;
	}

	@Override
	public Category create(Category category) {
			return cateRepo.saveAndFlush(category);		
	}

	@Override
	public Category update(Category category, int id) {
		Category cate = cateRepo.findById(id);
		if(cate != null) {
			cate.setName(category.getName());
			return cateRepo.saveAndFlush(cate);
		}
		return null;
	}

}
