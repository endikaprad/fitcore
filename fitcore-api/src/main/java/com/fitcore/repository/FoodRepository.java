package com.fitcore.repository;

import com.fitcore.model.Food;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface FoodRepository extends JpaRepository<Food, Long> {
    Optional<Food> findByBarcode(String barcode);
    Page<Food> findByNameContainingIgnoreCase(String name, Pageable pageable);
}
