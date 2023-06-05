package com.skilldistillery.convention.entities;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;
@Entity
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;
	
	@JsonIgnore
	@OneToMany(mappedBy = "category")
	private List<Convention> conventions;
	
	public Category() {
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
	

	public List<Convention> getConventions() {
		return conventions;
	}

	public void setConventions(List<Convention> conventions) {
		this.conventions = conventions;
	}
	
	public void addConvention(Convention conv) {
		if (conventions == null) { conventions = new ArrayList<>();}
		if (!conventions.contains(conv)) {
			conventions.add(conv);
			if (conv.getCategory() != null) {
				conv.getCategory().removeConvention(conv);
			}
			conv.setCategory(this);
		}
	}

	public void removeConvention(Convention conv) {
		if (conventions != null && conventions.contains(conv)) {
			conventions.remove(conv);
			conv.setCategory(null);
		}
	}

	@Override
	public String toString() {
		return "Category [id=" + id + ", name=" + name + "]";
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
		Category other = (Category) obj;
		return id == other.id;
	}
	
	
}
