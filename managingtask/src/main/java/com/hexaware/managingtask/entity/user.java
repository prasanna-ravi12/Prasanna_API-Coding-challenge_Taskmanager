package com.hexaware.managingtask.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class user {
	

	private String name;
	@Id
	private String email;
	private String password;
	private String gender;
	private String phone;
	private String address;
	private String role;

	public user() {
		super();
		// TODO Auto-generated constructor stub
	}
	public user(String name, String email, String password, String gender, String phone, String address, String role) {
		super();
		this.name = name;
		this.email = email;
		this.password = password;
		this.gender = gender;
		this.phone = phone;
		this.address = address;
		this.role = role;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "user [name=" + name + ", email=" + email + ", password=" + password + ", gender=" + gender + ", phone="
				+ phone + ", address=" + address + ", role=" + role + "]";
	}
	
	
	
	
	
	

}
