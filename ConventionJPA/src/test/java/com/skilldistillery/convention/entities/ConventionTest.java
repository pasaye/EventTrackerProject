package com.skilldistillery.convention.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class ConventionTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Convention convention;

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
		convention = em.find(Convention.class, 1);
	}

	@AfterEach
	void tearDown() throws Exception {
		em.close();
		
	}
	
	@Test
	void mapping() {
		assertNotNull(convention);
		assertEquals("San Diego Comic-con", convention.getName());
	}
	
	@Test
	void mapping_location_manytomany() {
		assertNotNull(convention);
		assertNotNull(convention.getLocations());
		assertTrue(convention.getLocations().size() > 0);
	}
	
	@Test
	void mapping_image() {
		assertNotNull(convention);
		assertTrue(convention.getImages().size() > 0);
	}
//	
//	@Test
//	void mapping_category() {
//		assertNotNull(convention);
//		assertEquals("Comic Con", convention.getCategory().getName());
//		
//	}
	

}
