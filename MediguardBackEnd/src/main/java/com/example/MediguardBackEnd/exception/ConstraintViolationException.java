package com.example.MediguardBackEnd.exception;

public class ConstraintViolationException extends RuntimeException{
    public ConstraintViolationException(String message){
        super(message);
    }
}
