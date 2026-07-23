SELECT
	CONCAT(c.first_name , ' ', c.last_name) AS full_name,
	c.email,
	ci.city,
	co.country,
	COUNT(DISTINCT r.rental_id) as rental_sum,
	COUNT(DISTINCT i.film_id) as unique_films,
	MAX(r.rental_date) as last_rental,
	SUM(p.amount) as total_gasto
FROM customer c

INNER JOIN address a ON c.address_id = a.address_id
INNER JOIN city ci ON a.city_id = ci.city_id
INNER JOIN country co ON ci.country_id = co.country_id
INNER JOIN rental r ON c.customer_id = r.customer_id
INNER JOIN inventory i ON r.inventory_id = i.inventory_id
INNER JOIN payment p ON r.rental_id = p.rental_id

GROUP BY c.customer_id, c.first_name, c.last_name, ci.city, co.country
ORDER BY rental_sum DESC
LIMIT 5
;
