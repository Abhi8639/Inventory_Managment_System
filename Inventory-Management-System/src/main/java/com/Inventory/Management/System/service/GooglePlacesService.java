package com.Inventory.Management.System.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
public class GooglePlacesService {

    @Value("${google.api.key}")
    private String googleApiKey;

    private static final String GOOGLE_PLACES_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input={input}&types=(regions)&key={apiKey}";

    public Map<String, Object> fetchZipSuggestions(String input) {
        RestTemplate restTemplate = new RestTemplate();
        Map<String, String> params = new HashMap<>();
        params.put("input", input);
        params.put("apiKey", googleApiKey);

        return restTemplate.getForObject(GOOGLE_PLACES_URL, Map.class, params);
    }
}

