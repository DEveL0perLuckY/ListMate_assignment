package com.listmate.my_app.rest;

import com.listmate.my_app.domain.Product;
import com.listmate.my_app.domain.User;
import com.listmate.my_app.model.ProductDTO;
import com.listmate.my_app.repos.ProductRepository;
import com.listmate.my_app.repos.UserRepository;
import com.listmate.my_app.service.ProductService;
import com.listmate.my_app.util.NotFoundException;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(value = "/api/products", produces = MediaType.APPLICATION_JSON_VALUE)
public class ProductResource {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private ProductRepository productRepository;

    private Optional<User> getUserFromToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return Optional.empty();
        }
        String token = authHeader.substring(7);
        return userRepository.findByToken(token);
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }

    @GetMapping("/getProduct")
    public ResponseEntity<List<ProductDTO>> getProduct(@RequestHeader("Authorization") String authHeader) {
        Optional<User> user = getUserFromToken(authHeader);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return ResponseEntity.ok(productService.getProductByUser(user.get()));
    }

    @PostMapping
    public ResponseEntity<Integer> createProduct(
            @RequestBody @Valid final ProductDTO productDTO,
            @RequestHeader("Authorization") String authHeader) {
        Optional<User> user = getUserFromToken(authHeader);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            Integer createdId = productService.create(productDTO, user.get());
            return new ResponseEntity<>(createdId, HttpStatus.CREATED);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Integer> updateProduct(
            @PathVariable(name = "id") final Integer id,
            @RequestBody @Valid final ProductDTO productDTO,
            @RequestHeader("Authorization") String authHeader) {
        Optional<User> user = getUserFromToken(authHeader);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        try {
            Product product = productRepository.findById(id).orElseThrow(NotFoundException::new);
            if (user.get().getUserId() != product.getUser().getUserId()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            productService.update(product, productDTO);
            return ResponseEntity.ok(id);
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable(name = "id") final Integer id,
            @RequestHeader("Authorization") String authHeader) {
        Optional<User> user = getUserFromToken(authHeader);
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            Product product = productRepository.findById(id).orElseThrow(NotFoundException::new);
            if (user.get().getUserId() != product.getUser().getUserId()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            productService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (NotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
