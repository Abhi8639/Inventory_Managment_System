package com.Inventory.Management.System.service;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.Inventory.Management.System.model.Warehouse;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class LocationService {

    @Value("${google.api.key}")  
    private String apiKey;

    public List<Warehouse> getWarehousesByProximity(String orderZipcode, List<Warehouse> warehouses) {
        String destinations = warehouses.stream()
                .map(Warehouse::getZipcode)
                .collect(Collectors.joining("|"));

        String url = String.format(
            "https://maps.googleapis.com/maps/api/distancematrix/json?origins=%s&destinations=%s&key=%s",
            orderZipcode, destinations, apiKey);

        RestTemplate restTemplate = new RestTemplate();
        String response = restTemplate.getForObject(url, String.class);

        JSONObject jsonResponse = new JSONObject(response);

        if (!jsonResponse.has("rows") || jsonResponse.getJSONArray("rows").isEmpty()) {
            throw new RuntimeException("No data received from Distance Matrix API");
        }

        JSONArray rows = jsonResponse.getJSONArray("rows");
        JSONArray elements = rows.getJSONObject(0).optJSONArray("elements");

        if (elements == null || elements.isEmpty()) {
            throw new RuntimeException("No elements found in Distance Matrix API response");
        }

        List<Integer> distances = IntStream.range(0, elements.length())
                .mapToObj(i -> elements.getJSONObject(i).getJSONObject("distance").getInt("value"))
                .collect(Collectors.toList());

        return IntStream.range(0, warehouses.size())
                .boxed()
                .sorted(Comparator.comparing(distances::get))
                .map(warehouses::get)
                .collect(Collectors.toList());
    }
}
