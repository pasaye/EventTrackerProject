package com.skilldistillery.convention.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.convention.entities.Image;

public interface ImageRepository extends JpaRepository<Image, Integer> {
	Image findById(int id);
	List<Image> findByConvention_Id(int conventionId);
	List<Image> findByNameLike(String keyword);
}
