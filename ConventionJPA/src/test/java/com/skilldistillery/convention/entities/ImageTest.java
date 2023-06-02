package com.skilldistillery.convention.entities;

import static org.junit.jupiter.api.Assertions.*;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ImageTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Image image;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("ConventionJPA");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		image = em.find(Image.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		
	}
	
	@Test
	void mapping() {
		assertNotNull(image);
		assertEquals("My First Comic con", image.getName());
	}

}
