package com.skilldistillery.convention.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.convention.entities.Image;
import com.skilldistillery.convention.repositories.ImageRepository;

@Service
public class ImageServiceImpl implements ImageService {

	@Autowired
	private ImageRepository imageRepo;

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
	public boolean delete(int id) {
		imageRepo.deleteById(id);
		return !imageRepo.existsById(id);
	}

}
