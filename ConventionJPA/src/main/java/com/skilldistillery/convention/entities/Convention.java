package com.skilldistillery.convention.entities;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Convention {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	private String description;
	private LocalDate date;
	private LocalTime time;
	
	@ManyToMany
	@JoinTable(name = "convention_has_location", joinColumns = @JoinColumn(name = "convention_id"), inverseJoinColumns = @JoinColumn(name = "location_id"))
	@JsonIgnore
	private List<Location> locations;
	
	@ManyToOne
	@JoinColumn(name = "category_id")
	private Category category;
	
	@JsonIgnore
	@OneToMany(mappedBy = "convention")
	private List<Image> images;
	
	public Convention() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public LocalDate getDate() {
		return date;
	}

	public void setDate(LocalDate date) {
		this.date = date;
	}

	public LocalTime getTime() {
		return time;
	}

	public void setTime(LocalTime time) {
		this.time = time;
	}
		
	public List<Location> getLocations() {
		return locations;
	}

	public void setLocations(List<Location> locations) {
		this.locations = locations;
	}

	public Category getCategory() {
		return category;
	}

	public void setCategory(Category category) {
		this.category = category;
	}


	public List<Image> getImages() {
		return images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}
	
	public void addLocation(Location locat) {
		if (locations == null) {
			locations = new ArrayList<>();
		}
		if (!locations.contains(locat)) {
			locations.add(locat);
			locat.addConvention(this);
		}
	}

	public void removeLocation(Location locat) {
		if (locations != null && locations.contains(locat)) {
			locations.remove(locat);
			locat.setConventions(null);
		}

	}

	@Override
	public String toString() {
		return "Convention [id=" + id + ", name=" + name + ", description=" + description + ", date=" + date + ", time="
				+ time + "]";
	}

	@Override
	public int hashCode() {
		return Objects.hash(id);
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Convention other = (Convention) obj;
		return id == other.id;
	}
	
	

}
