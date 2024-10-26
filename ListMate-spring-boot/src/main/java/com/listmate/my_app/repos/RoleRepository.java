package com.listmate.my_app.repos;

import com.listmate.my_app.domain.Role;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface RoleRepository extends MongoRepository<Role, Long> {
}
