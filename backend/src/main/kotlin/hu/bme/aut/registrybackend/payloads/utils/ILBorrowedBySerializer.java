package hu.bme.aut.registrybackend.payloads.utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import hu.bme.aut.registrybackend.entities.Lending.ItemLending;

import java.io.IOException;

public class ILBorrowedBySerializer extends JsonSerializer<ItemLending> {

    @Override
    public void serialize(ItemLending value,
                          JsonGenerator jgen,
                          SerializerProvider serializerProvider) throws IOException {
        jgen.writeObject(value.getUser().getId());
//        jgen.writeStartObject();
//        jgen.writeStringField("lendAt", value.getLentAt().toString());
//        jgen.writeNumberField("user", value.getUser().getId());
//        jgen.writeEndObject();
    }
}
