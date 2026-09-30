CREATE TABLE IF NOT EXISTS publication_job_payloads (
  job_id TEXT PRIMARY KEY,
  caption_text TEXT NOT NULL,
  caption_revision TEXT NOT NULL,
  caption_sha256 TEXT NOT NULL CHECK (
    length(caption_sha256) = 64
  ),
  register_document_id TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (job_id) REFERENCES publication_jobs(id)
);

CREATE TRIGGER IF NOT EXISTS trg_publication_job_payloads_immutable
BEFORE UPDATE ON publication_job_payloads
BEGIN
  SELECT RAISE(ABORT, 'publication_job_payloads is immutable');
END;
