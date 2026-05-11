CREATE TYPE tipo_usuario AS ENUM ('aluno', 'personal');
CREATE TYPE status_agendamento AS ENUM ('pendente', 'confirmado', 'recusado', 'concluido');

CREATE TABLE IF NOT EXISTS usuarios (
  id              SERIAL PRIMARY KEY,
  nome            VARCHAR(150)     NOT NULL,
  email           VARCHAR(255)     NOT NULL UNIQUE,
  senha_hash      TEXT             NOT NULL,
  tipo            tipo_usuario     NOT NULL,
  criado_em       TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agendamentos (
  id                SERIAL PRIMARY KEY,
  aluno_id          INTEGER          NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  personal_id       INTEGER          NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
  data_hora         TIMESTAMPTZ      NOT NULL,
  duracao_minutos   SMALLINT         NOT NULL CHECK (duracao_minutos > 0),
  status            status_agendamento NOT NULL DEFAULT 'pendente',
  criado_em         TIMESTAMPTZ      NOT NULL DEFAULT NOW(),
  atualizado_em     TIMESTAMPTZ      NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS treinos (
  id               SERIAL PRIMARY KEY,
  agendamento_id   INTEGER     NOT NULL REFERENCES agendamentos(id) ON DELETE CASCADE,
  peso_kg          NUMERIC(5,2) CHECK (peso_kg > 0),
  observacoes      TEXT,
  criado_em        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Mantém atualizado_em sincronizado automaticamente
CREATE OR REPLACE FUNCTION set_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
  NEW.atualizado_em = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_agendamentos_atualizado_em
BEFORE UPDATE ON agendamentos
FOR EACH ROW EXECUTE FUNCTION set_atualizado_em();
