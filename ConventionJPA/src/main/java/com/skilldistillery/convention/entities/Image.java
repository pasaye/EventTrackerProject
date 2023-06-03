package com.skilldistillery.convention.entities;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
public class Image {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;

	@Column(name = "image_url")
	private String imageUrl;

	private Byte[] picture;

	@JsonIgnore
	@OneToMany(mappedBy = "image")
	private List<Convention> conventions;

	public Image() {
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

	public String getImageUrl() {
		return imageUrl;
	}

	public void setImageUrl(String imageUrl) {
		this.imageUrl = imageUrl;
	}

	public Byte[] getPicture() {
		return picture;
	}

	public void setPicture(Byte[] picture) {
		this.picture = picture;
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
			if (conv.getImage() != null) {
				conv.getImage().removeConvention(conv);
			}
			conv.setImage(this);
		}
	}

	public void removeConvention(Convention conv) {
		if (conventions != null && conventions.contains(conv)) {
			conventions.remove(conv);
			conv.setImage(null);
		}
	}

	@Override
	public String toString() {
		return "Image [id=" + id + ", name=" + name + ", imageUrl=" + imageUrl + ", picture=" + Arrays.toString(picture)
				+ "]";
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
		Image other = (Image) obj;
		return id == other.id;
	}

}
