package com.Inventory.Management.System.controller;

import com.Inventory.Management.System.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/places")
public class GooglePlacesController {

    @Autowired
    private GooglePlacesService googlePlacesService;

    @GetMapping
    public ResponseEntity<?> getZipSuggestions(@RequestParam String input) {
        if (input == null || input.isEmpty()) {
            return ResponseEntity.badRequest().body("Input query is required.");
        }

        Map<String, Object> suggestions = googlePlacesService.fetchZipSuggestions(input);
        return ResponseEntity.ok(suggestions);
    }
}