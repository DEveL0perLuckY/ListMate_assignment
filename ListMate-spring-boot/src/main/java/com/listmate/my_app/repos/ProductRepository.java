package com.listmate.my_app.repos;

import com.listmate.my_app.domain.Product;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface ProductRepository extends MongoRepository<Product, Integer> {
}
