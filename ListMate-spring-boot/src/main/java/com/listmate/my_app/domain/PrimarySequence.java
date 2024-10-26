package com.listmate.my_app.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document
public class PrimarySequence {

    @Id
    private String id;

    private long seq;

    public String getId() {
        return id;
    }

    public void setId(final String id) {
        this.id = id;
    }

    public long getSeq() {
        return seq;
    }

    public void setSeq(final long seq) {
        this.seq = seq;
    }

}
