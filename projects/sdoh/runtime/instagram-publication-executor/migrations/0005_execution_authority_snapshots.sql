CREATE TABLE IF NOT EXISTS execution_authority_snapshots (
  job_id TEXT PRIMARY KEY,
  content_id TEXT NOT NULL,
  register_document_id TEXT NOT NULL,
  register_updated_at TEXT NOT NULL,
  publication_state TEXT NOT NULL CHECK (publication_state = 'SCHEDULED'),
  material_state TEXT NOT NULL CHECK (material_state = 'APPROVED'),
  qa_state TEXT NOT NULL CHECK (qa_state = 'PASS'),
  destination_account TEXT NOT NULL,
  scheduled_at TEXT NOT NULL,
  caption_revision TEXT NOT NULL,
  approved_caption TEXT NOT NULL,
  caption_sha256 TEXT NOT NULL,
  governance_ref TEXT NOT NULL,
  authority_checked_at TEXT NOT NULL,
  authority_expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (job_id) REFERENCES publication_jobs(id)
);

CREATE INDEX IF NOT EXISTS idx_execution_authority_snapshots_expiry
  ON execution_authority_snapshots (authority_expires_at);
