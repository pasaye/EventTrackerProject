package com.skilldistillery.convention.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.convention.entities.Convention;
import com.skilldistillery.convention.entities.Image;
import com.skilldistillery.convention.repositories.ConventionRepository;
import com.skilldistillery.convention.repositories.ImageRepository;

@Service
public class ImageServiceImpl implements ImageService {

	@Autowired
	private ImageRepository imageRepo;
	
	@Autowired 
	private ConventionRepository convRepo;

	@Override
	public List<Image> listAllImage() {
		return imageRepo.findAll();
	}

	@Override
	public Image findById(int id) {
		Image image = imageRepo.findById(id);
		if (image != null) {
			return image;
		}
		return null;
	}

	@Override
	public Image create(Image image) {
		return imageRepo.saveAndFlush(image);
	}

	@Override
	public Image update(Image image, int id) {
		Image updated = imageRepo.findById(id);
		if(updated != null) {
			updated.setName(image.getName());
			updated.setImageUrl(image.getImageUrl());
			updated.setPicture(image.getPicture());
			return imageRepo.saveAndFlush(updated);
		}
		return null;
	}

	
	@Override
	public void deleteImage(int conventionId, int imageId) {
		Convention conv = convRepo.findById(conventionId);
		if(imageRepo.existsById(conventionId)) {
			imageRepo.deleteById(imageId);
		}

	}


	@Override
	public List<Image> findByConvention_Id(int conventionId) {
		if(!imageRepo.existsById(conventionId)) {
			return null;
		}
		List<Image> images = imageRepo.findByConvention_Id(conventionId);
		return images;
	}

	@Override
	public List<Image> findByNameLike(String keyword) {
		String key = "%" + keyword + "%";
		return imageRepo.findByNameLike(key);
	}

	@Override
	public Image create(int conventionId, Image image) {
		Convention conv = convRepo.findById(conventionId);
		if(imageRepo.existsById(conventionId)) {
			image.setConvention(conv);
			imageRepo.saveAndFlush(image);
			return image;
		}
		return null;
	}


}
