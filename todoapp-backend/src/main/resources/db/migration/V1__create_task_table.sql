CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE task (
                      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                      title VARCHAR(200) NOT NULL,
                      description TEXT,
                      task_date DATE,
                      category VARCHAR(50) NOT NULL DEFAULT 'GENERAL',
                      state VARCHAR(30) NOT NULL DEFAULT 'TODO',
                      is_hidden BOOLEAN NOT NULL DEFAULT FALSE,
                      created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                      updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
                      deleted_at TIMESTAMP NULL
);

CREATE INDEX idx_task_task_date ON task(task_date);
CREATE INDEX idx_task_category ON task(category);
CREATE INDEX idx_task_state ON task(state);
CREATE INDEX idx_task_is_hidden ON task(is_hidden);
CREATE INDEX idx_task_deleted_at ON task(deleted_at);