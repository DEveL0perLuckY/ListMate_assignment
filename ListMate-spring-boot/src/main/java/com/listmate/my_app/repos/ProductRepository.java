package com.listmate.my_app.repos;

import com.listmate.my_app.domain.Product;
import com.listmate.my_app.domain.User;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ProductRepository extends MongoRepository<Product, Integer> {
    List<Product> findByUser(User user);
}
