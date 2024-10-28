package com.example.MediguardBackEnd.mapper;

import com.example.MediguardBackEnd.domains.PredictionDataDTO;
import com.example.MediguardBackEnd.entity.PredictionData;

public class PredictionDataMapper {

    public static PredictionDataDTO mapToPredictionDataDTO(PredictionData predictionData) {
        if (predictionData == null) {
            return null;
        }
        PredictionDataDTO dto = new PredictionDataDTO();
        dto.setId(predictionData.getId());
        dto.setAge(predictionData.getAge());
        dto.setSex(predictionData.getSex());
        dto.setCp(predictionData.getCp());
        dto.setTrestbps(predictionData.getTrestbps());
        dto.setChol(predictionData.getChol());
        dto.setFbs(predictionData.isFbs());
        dto.setRestecg(predictionData.getRestecg());
        dto.setThalach(predictionData.getThalach());
        dto.setExang(predictionData.isExang());
        dto.setOldpeak(predictionData.getOldpeak());
        dto.setSlope(predictionData.getSlope());
        dto.setCa(predictionData.getCa());
        dto.setThal(predictionData.getThal());

        return dto;
    }

    public static PredictionData mapToPredictionData(PredictionDataDTO predictionDataDTO) {
        if (predictionDataDTO == null) {
            return null;
        }
        PredictionData entity = new PredictionData();
        entity.setId(predictionDataDTO.getId());
        entity.setAge(predictionDataDTO.getAge());
        entity.setSex(predictionDataDTO.getSex());
        entity.setCp(predictionDataDTO.getCp());
        entity.setTrestbps(predictionDataDTO.getTrestbps());
        entity.setChol(predictionDataDTO.getChol());
        entity.setFbs(predictionDataDTO.isFbs());
        entity.setRestecg(predictionDataDTO.getRestecg());
        entity.setThalach(predictionDataDTO.getThalach());
        entity.setExang(predictionDataDTO.isExang());
        entity.setOldpeak(predictionDataDTO.getOldpeak());
        entity.setSlope(predictionDataDTO.getSlope());
        entity.setCa(predictionDataDTO.getCa());
        entity.setThal(predictionDataDTO.getThal());

        return entity;
    }
}