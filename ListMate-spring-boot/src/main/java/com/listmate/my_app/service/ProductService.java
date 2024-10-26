package com.listmate.my_app.service;

import com.listmate.my_app.domain.Product;
import com.listmate.my_app.domain.User;
import com.listmate.my_app.model.ProductDTO;
import com.listmate.my_app.repos.ProductRepository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(final ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDTO> findAll() {
        final List<Product> products = productRepository.findAll(Sort.by("id"));
        return products.stream()
                .map(product -> mapToDTO(product, new ProductDTO()))
                .toList();
    }

    public List<ProductDTO> getProductByUser(final User user) {
        return productRepository.findByUser(user)
                .stream()
                .map(product -> mapToDTO(product, new ProductDTO()))
                .toList();
    }

    public Integer create(final ProductDTO productDTO, User user) {
        final Product product = new Product();
        mapToEntity(productDTO, product);
        product.setUpdatedAt(LocalDateTime.now());
        product.setCreatedAt(LocalDateTime.now());
        product.setUser(user);
        return productRepository.save(product).getId();
    }

    public void update(final Product product, final ProductDTO productDTO) {
        mapToEntity(productDTO, product);
        product.setUpdatedAt(LocalDateTime.now());
        productRepository.save(product);
    }

    public void delete(final Integer id) {
        productRepository.deleteById(id);
    }

    private ProductDTO mapToDTO(final Product product, final ProductDTO productDTO) {
        productDTO.setId(product.getId());
        productDTO.setName(product.getName());
        productDTO.setDescription(product.getDescription());
        productDTO.setPrice(product.getPrice());
        productDTO.setCategory(product.getCategory());
        productDTO.setQuantityInStock(product.getQuantityInStock());
        productDTO.setCreatedAt(product.getCreatedAt());
        productDTO.setUpdatedAt(product.getUpdatedAt());
        productDTO.setStatus(product.getStatus());
        productDTO.setDiscount(product.getDiscount());
        productDTO.setRating(product.getRating());
        return productDTO;
    }

    private Product mapToEntity(final ProductDTO productDTO, final Product product) {
        product.setName(productDTO.getName());
        product.setDescription(productDTO.getDescription());
        product.setPrice(productDTO.getPrice());
        product.setCategory(productDTO.getCategory());
        product.setQuantityInStock(productDTO.getQuantityInStock());
        product.setCreatedAt(productDTO.getCreatedAt());
        product.setUpdatedAt(productDTO.getUpdatedAt());
        product.setStatus(productDTO.getStatus());
        product.setDiscount(productDTO.getDiscount());
        product.setRating(productDTO.getRating());
        return product;
    }

}
