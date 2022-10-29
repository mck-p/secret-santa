/* @name findUserById */
SELECT id, email, created_at, last_updated, metadata FROM users WHERE id = :id;

/* @name findUserByEmail */
SELECT id, email, created_at, last_updated, metadata FROM users WHERE email = :email;
