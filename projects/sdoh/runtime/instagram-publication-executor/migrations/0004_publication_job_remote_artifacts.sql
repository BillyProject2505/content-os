CREATE TABLE IF NOT EXISTS publication_job_remote_artifacts (
  job_id TEXT NOT NULL,
  kind TEXT NOT NULL CHECK (
    kind IN ('CHILD', 'PARENT', 'PUBLISHED_MEDIA')
  ),
  slot INTEGER NOT NULL CHECK (slot BETWEEN 0 AND 5),
  remote_id TEXT NOT NULL,
  state TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  PRIMARY KEY (job_id, kind, slot),
  FOREIGN KEY (job_id) REFERENCES publication_jobs(id)
);

CREATE INDEX IF NOT EXISTS idx_publication_job_remote_artifacts_remote_id
  ON publication_job_remote_artifacts (remote_id);
