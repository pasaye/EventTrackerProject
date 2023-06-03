package com.skilldistillery.convention.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.convention.entities.Convention;
import com.skilldistillery.convention.repositories.ConventionRepository;

@Service
public class ConventionServiceImpl implements ConventionService {

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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Convention update(int conventionId, Convention convention) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean delete(int id) {
		// TODO Auto-generated method stub
		return false;
	}

}
