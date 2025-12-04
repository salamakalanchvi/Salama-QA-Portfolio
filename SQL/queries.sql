-- ===============================
-- 📌 BASIC SQL QUERIES
-- ===============================

-- 1. Fetch all users
SELECT * FROM users;

-- 2. Get user by email
SELECT * FROM users WHERE email = 'example@test.com';


-- ===============================
-- 📌 JOINS — DATA VALIDATION CASES
-- ===============================

-- 3. Fetch orders with user information (INNER JOIN)
SELECT 
  o.order_id,
  o.order_date,
  u.user_id,
  u.name,
  u.email
FROM orders o
INNER JOIN users u
  ON o.user_id = u.user_id;


-- ===============================
-- 📌 FIND INCONSISTENCIES (QA VALIDATION)
-- ===============================

-- 4. Find orders without a valid user (DATA ISSUE)
SELECT 
  o.order_id,
  o.user_id
FROM orders o
LEFT JOIN users u
  ON o.user_id = u.user_id
WHERE u.user_id IS NULL;


-- ===============================
-- 📌 AGGREGATION & REPORTING QUERIES
-- ===============================

-- 5. Count total users
SELECT COUNT(*) AS total_users FROM users;

-- 6. Most purchased product
SELECT 
  product_id,
  COUNT(*) AS purchase_count
FROM order_items
GROUP BY product_id
ORDER BY purchase_count DESC
LIMIT 1;


-- ===============================
-- 📌 TEST DATA INSERT QUERIES
-- ===============================

-- 7. Insert sample test user 
INSERT INTO users (name, email, password)
VALUES ('Test User', 'test.user@example.com', 'hashed_password_123');


-- ===============================
-- 📌 CLEANUP QUERIES FOR TESTING
-- ===============================

-- 8. Delete orders created during automated tests
DELETE FROM orders WHERE created_by = 'playwright-automation';


-- ===============================
-- 📌 ADVANCED: FIND DUPLICATE RECORDS
-- ===============================

-- 9. Find users with duplicate emails
SELECT 
    email,
    COUNT(*) AS count
FROM users
GROUP BY email
HAVING COUNT(*) > 1;


-- ===============================
-- 📌 ADVANCED: CHECK REFERENTIAL INTEGRITY
-- ===============================

-- 10. Products listed but never ordered
SELECT p.product_id, p.product_name
FROM products p
LEFT JOIN order_items oi
  ON p.product_id = oi.product_id
WHERE oi.product_id IS NULL;
