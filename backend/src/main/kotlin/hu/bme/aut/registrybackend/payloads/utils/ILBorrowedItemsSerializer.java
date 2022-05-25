package hu.bme.aut.registrybackend.payloads.utils;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import hu.bme.aut.registrybackend.entities.Lending.ItemLending;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class ILBorrowedItemsSerializer extends JsonSerializer<Set<ItemLending>> {

    @Override
    public void serialize(Set<ItemLending> values,
                          JsonGenerator jgen,
                          SerializerProvider serializerProvider) throws IOException {
        List<Long> ids = new ArrayList<>();
        for (ItemLending value : values) {
            ids.add(value.getItem().getId());
        }
        //jgen.writeFieldName("item_ids");
        jgen.writeObject(ids);

    }
}
