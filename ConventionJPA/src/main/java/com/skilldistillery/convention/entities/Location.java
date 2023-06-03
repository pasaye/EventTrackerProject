package com.skilldistillery.convention.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;



@Entity
public class Location {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String state;
	private String city;
	private String address;
	
	@JsonIgnore
	@ManyToMany(mappedBy = "locations")
	private List<Convention> conventions;
	
	public Location() {
		super();
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	public List<Convention> getConventions() {
		return conventions;
	}

	public void setConventions(List<Convention> conventions) {
		this.conventions = conventions;
	}
	
	public void addConvention(Convention conv) {
		if (conventions == null) {
			conventions = new ArrayList<>();
		}
		if (!conventions.contains(conv)) {
			conventions.add(conv);
			conv.addLocation(this);
		}
	}

	public void removeConvention(Convention conv) {
		if (conventions != null && conventions.contains(conv)) {
			conventions.remove(conv);
			conv.setLocations(null);
		}

	}

	@Override
	public String toString() {
		return "Location [id=" + id + ", state=" + state + ", city=" + city + ", address=" + address + "]";
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
		Location other = (Location) obj;
		return id == other.id;
	}
	
	

}
