CREATE TABLE IF NOT EXISTS publication_job_media (
  job_id TEXT NOT NULL,
  slot INTEGER NOT NULL CHECK (slot BETWEEN 1 AND 5),
  drive_file_id TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  expected_sha256 TEXT,
  PRIMARY KEY (job_id, slot),
  FOREIGN KEY (job_id) REFERENCES publication_jobs(id)
);

CREATE INDEX IF NOT EXISTS idx_publication_job_media_drive_file
  ON publication_job_media (drive_file_id);
