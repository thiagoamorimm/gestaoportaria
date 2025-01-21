package com.thiagoamorimm.gestaoportaria.exception;

public class MoradorNotFoundException extends RuntimeException {
    public MoradorNotFoundException(String mensagem) {
        super(mensagem);
    }
}
