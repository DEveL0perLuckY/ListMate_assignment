package com.listmate.my_app.repos;

import com.listmate.my_app.domain.Product;
import com.listmate.my_app.service.PrimarySequenceService;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;

@SuppressWarnings("null")
@Component
public class ProductListener extends AbstractMongoEventListener<Product> {

    private final PrimarySequenceService primarySequenceService;

    public ProductListener(final PrimarySequenceService primarySequenceService) {
        this.primarySequenceService = primarySequenceService;
    }

    @Override
    public void onBeforeConvert(final BeforeConvertEvent<Product> event) {
        if (event.getSource().getId() == null) {
            event.getSource().setId(((int) primarySequenceService.getNextValue()));
        }
    }

}
