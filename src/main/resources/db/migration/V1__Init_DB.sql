CREATE TABLE computers (
                           id BIGSERIAL PRIMARY KEY,
                           name VARCHAR(255) NOT NULL,
                           release_year INTEGER,
                           designer VARCHAR(255),
                           description VARCHAR(5000),
                           ops_per_second BIGINT,
                           memory_kb DOUBLE PRECISION,
                           power_consumption_kw DOUBLE PRECISION,
                           image_url VARCHAR(255)
);