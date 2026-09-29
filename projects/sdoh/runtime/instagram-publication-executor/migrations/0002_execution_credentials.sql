CREATE TABLE IF NOT EXISTS execution_credentials (
  job_id TEXT PRIMARY KEY,
  drive_token_ciphertext TEXT NOT NULL,
  drive_token_expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL
);
