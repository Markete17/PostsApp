package com.postapp.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.postapp.models.entities.Exposure;

public interface IExposureDAO extends JpaRepository<Exposure, Long>  {

}
