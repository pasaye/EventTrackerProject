package com.skilldistillery.convention.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.convention.entities.Category;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
	Category findById(int id);
}
