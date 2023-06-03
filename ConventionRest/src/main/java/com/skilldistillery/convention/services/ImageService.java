package com.skilldistillery.convention.services;

import java.util.List;

import com.skilldistillery.convention.entities.Image;

public interface ImageService {
	List<Image> listAllImage();
	Image findById(int id);
	Image create(Image image);
	Image update(Image image, int id);
	boolean delete(int id);

}
