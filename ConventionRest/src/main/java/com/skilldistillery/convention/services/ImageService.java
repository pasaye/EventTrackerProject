package com.skilldistillery.convention.services;

import java.util.List;

import com.skilldistillery.convention.entities.Image;

public interface ImageService {
	List<Image> listAllImage();
	Image findById(int id);
	Image create(Image image);
	Image update(Image image, int id);
	void deleteImage(int conventionId, int imageId);
	
	List<Image> findByConvention_Id(int conventionId);
	List<Image> findByNameLike(String keyword);
	Image create(int conventionId, Image image);

}
