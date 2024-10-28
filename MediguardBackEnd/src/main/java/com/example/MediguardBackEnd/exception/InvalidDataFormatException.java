package com.example.MediguardBackEnd.exception;

public class InvalidDataFormatException extends RuntimeException{
    public InvalidDataFormatException(String message) {
        super(message);
    }
}
