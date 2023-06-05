package com.skilldistillery.convention.entities;

import java.util.Arrays;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
public class Image {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String name;

	@Column(name = "image_url")
	private String imageUrl;

	@Column(length = 1000000)
	private Byte[] picture;
	
	@ManyToOne
	@JoinColumn(name = "convention_id")
	private Convention convention;


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

	public Convention getConvention() {
		return convention;
	}

	public void setConvention(Convention convention) {
		this.convention = convention;
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
