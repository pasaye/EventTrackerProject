package com.skilldistillery.convention.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.convention.entities.Image;

public interface ImageRepository extends JpaRepository<Image, Integer> {
	Image findById(int id);
}
