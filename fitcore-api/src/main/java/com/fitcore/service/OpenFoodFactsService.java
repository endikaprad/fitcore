package com.fitcore.service;

import com.fitcore.dto.FoodDto;
import com.fitcore.model.Food;
import com.fitcore.repository.FoodRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class OpenFoodFactsService {

    private final FoodRepository foodRepo;
    private final WebClient.Builder webClientBuilder;

    @Value("${fitcore.openfoodfacts.base-url}")
    private String baseUrl;

    public List<FoodDto> search(String query, int page) {
        // Check local cache first
        var cached = foodRepo.findByNameContainingIgnoreCase(query,
            org.springframework.data.domain.PageRequest.of(page, 20));
        if (!cached.isEmpty()) {
            return cached.stream().map(FoodDto::from).toList();
        }

        // Fetch from Open Food Facts API
        try {
            Map<?, ?> response = webClientBuilder.build()
                .get()
                .uri(baseUrl + "/cgi/search.pl?search_terms={q}&json=1&page={p}&page_size=20&fields=code,product_name,brands,nutriments",
                    query, page + 1)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

            if (response != null && response.get("products") instanceof List<?> products) {
                return products.stream()
                    .filter(p -> p instanceof Map)
                    .map(p -> (Map<?, ?>) p)
                    .map(this::mapToFood)
                    .filter(Optional::isPresent)
                    .map(Optional::get)
                    .map(f -> FoodDto.from(foodRepo.save(f)))
                    .toList();
            }
        } catch (Exception e) {
            log.warn("Open Food Facts search failed for '{}': {}", query, e.getMessage());
        }
        return List.of();
    }

    public Optional<FoodDto> findByBarcode(String barcode) {
        Optional<Food> cached = foodRepo.findByBarcode(barcode);
        if (cached.isPresent()) return cached.map(FoodDto::from);

        try {
            Map<?, ?> response = webClientBuilder.build()
                .get()
                .uri(baseUrl + "/api/v0/product/{code}.json", barcode)
                .retrieve()
                .bodyToMono(Map.class)
                .block();

            if (response != null && Integer.valueOf(1).equals(response.get("status"))
                && response.get("product") instanceof Map<?, ?> product) {
                return mapToFood(product)
                    .map(f -> {
                        f.setBarcode(barcode);
                        return FoodDto.from(foodRepo.save(f));
                    });
            }
        } catch (Exception e) {
            log.warn("Open Food Facts barcode lookup failed for '{}': {}", barcode, e.getMessage());
        }
        return Optional.empty();
    }

    private Optional<Food> mapToFood(Map<?, ?> product) {
        String name = getString(product, "product_name");
        if (name == null || name.isBlank()) return Optional.empty();

        Map<?, ?> nutriments = product.get("nutriments") instanceof Map<?, ?> n ? n : Map.of();

        return Optional.of(Food.builder()
            .barcode(getString(product, "code"))
            .name(name)
            .brand(getString(product, "brands"))
            .calories100g(getDecimal(nutriments, "energy-kcal_100g"))
            .protein100g(getDecimal(nutriments, "proteins_100g"))
            .carbs100g(getDecimal(nutriments, "carbohydrates_100g"))
            .sugar100g(getDecimal(nutriments, "sugars_100g"))
            .fat100g(getDecimal(nutriments, "fat_100g"))
            .fatSat100g(getDecimal(nutriments, "saturated-fat_100g"))
            .fiber100g(getDecimal(nutriments, "fiber_100g"))
            .source(Food.Source.OPENFOODFACTS)
            .build());
    }

    private String getString(Map<?, ?> map, String key) {
        Object v = map.get(key);
        return v instanceof String s ? s : null;
    }

    private BigDecimal getDecimal(Map<?, ?> map, String key) {
        Object v = map.get(key);
        if (v == null) return null;
        try {
            return new BigDecimal(v.toString()).setScale(2, java.math.RoundingMode.HALF_UP);
        } catch (NumberFormatException e) {
            return null;
        }
    }
}
