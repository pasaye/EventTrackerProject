package com.skilldistillery.convention.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.convention.entities.Convention;
import com.skilldistillery.convention.repositories.ConventionRepository;

@Service
public  class ConventionServiceImpl implements ConventionService {

	@Autowired
	private ConventionRepository conRepo;


	@Override
	public List<Convention> listAll() {
		List<Convention> cons = conRepo.findAll();
		return cons;
	}

	@Override
	public Convention findById(int conventionId) {
		Convention conv = conRepo.findById(conventionId);
		if (conv != null) {
			return conv;
		}
		return null;
	}

	@Override
	public Convention create(Convention convention) {
		Convention conv = conRepo.saveAndFlush(convention);
		return conv;
	}

	@Override
	public Convention update(Convention convention, int conventionId) {
		Convention updated = conRepo.findById(conventionId);
		if (updated != null) {
			updated.setName(convention.getName());
			updated.setDescription(convention.getDescription());
			updated.setDate(convention.getDate());
			updated.setTime(convention.getTime());
			updated.setCategory(convention.getCategory());
			updated.setLocations(convention.getLocations());
			updated.setImages(convention.getImages());
			return conRepo.saveAndFlush(updated);
		}
		return null;
	}

	@Override
	public boolean delete(int id) {
		conRepo.deleteById(id);
		return !conRepo.existsById(id);
	}

	@Override
	public List<Convention> findByLocationsState(String states) {
		List<Convention> locat = conRepo.findByLocationsState(states);
		if (locat != null) {
			return locat;
		}
		return null;
	}

	@Override
	public List<Convention> findByCategory_Id(int cateId) {
		List<Convention> convention = conRepo.findByCategory_Id(cateId);
		if(conRepo.existsById(cateId)) {
			return convention;
		}
		return null;
	}
}
