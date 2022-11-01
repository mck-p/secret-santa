/* @name getPasswordByEmail */
SELECT password FROM users WHERE email = :email;

/* @name findUserById */
SELECT id, email, created_at, last_updated, metadata FROM users WHERE id = :id;

/* @name findUserByEmail */
SELECT id, email, created_at, last_updated, metadata FROM users WHERE email = :email;

/* @name createUser */
INSERT INTO users (email, password, metadata) VALUES (:email, :password, :metadata) RETURNING id, email, created_at, last_updated, metadata;