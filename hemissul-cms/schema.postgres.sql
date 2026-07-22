-- ============================================================
-- Hemissul CMS — Schema Postgres (Supabase / RDS / Neon / etc.)
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(180) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  role       VARCHAR(20) NOT NULL DEFAULT 'editor' CHECK (role IN ('super','editor')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin_users (name, email, password, role) VALUES
  ('Administrador', 'admin@hemissul.com.br',
   '$2b$12$LqFGgBzPiQ1T/6e4AJRqFedJqQKxLyMlP4RG5e1cM7CWIrF0XJ1sm', 'super')
ON CONFLICT (email) DO NOTHING;


CREATE TABLE IF NOT EXISTS site_settings (
  "key"      VARCHAR(100) PRIMARY KEY,
  "value"    TEXT NOT NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO site_settings ("key","value") VALUES
  ('phone_0800',       '0800 940 2163'),
  ('phone_whatsapp',   '(95) 99138-1037'),
  ('phone_pronta',     '(95) 99157-4355'),
  ('email',            'contato@hemissul.com.br'),
  ('address_street',   'Av. Mário Homem de Melo, 3999, Buritis'),
  ('address_city',     'Boa Vista — RR'),
  ('address_cep',      '69309-198'),
  ('hours_weekday',    '8h às 18h'),
  ('hours_saturday',   '8h às 12h'),
  ('hours_sunday',     'Fechado'),
  ('instagram',        'https://www.instagram.com/hemissuloficial/'),
  ('facebook',         'https://www.facebook.com/hemissuloficial/'),
  ('youtube',          'https://www.youtube.com/@hemissuloficial'),
  ('linkedin',         ''),
  ('whatsapp_link',    'https://wa.me/5595991381037'),
  ('metric_vehicles',  '13.000+'),
  ('metric_repairs',   'R$ 12 mi+'),
  ('metric_since',     '2019'),
  ('campaign_active',  'false'),
  ('campaign_text',    ''),
  ('campaign_cta',     ''),
  ('campaign_expires', '')
ON CONFLICT ("key") DO NOTHING;


CREATE TABLE IF NOT EXISTS posts (
  id           SERIAL PRIMARY KEY,
  slug         VARCHAR(220) NOT NULL UNIQUE,
  title        VARCHAR(255) NOT NULL,
  excerpt      TEXT,
  content      TEXT,
  category     VARCHAR(80),
  cover_url    VARCHAR(500),
  status       VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('published','draft')),
  featured     SMALLINT NOT NULL DEFAULT 0,
  published_at TIMESTAMP,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS banners (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  text        TEXT,
  cta_label   VARCHAR(100),
  cta_url     VARCHAR(500),
  bg_color    VARCHAR(20) DEFAULT '#1267a8',
  text_color  VARCHAR(20) DEFAULT '#ffffff',
  position    VARCHAR(20) DEFAULT 'all' CHECK (position IN ('home','all','checkout')),
  active      SMALLINT NOT NULL DEFAULT 1,
  expires_at  TIMESTAMP,
  sort_order  SMALLINT NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS faqs (
  id         SERIAL PRIMARY KEY,
  group_name VARCHAR(100) NOT NULL DEFAULT 'Geral',
  question   VARCHAR(400) NOT NULL,
  answer     TEXT NOT NULL,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  active     SMALLINT NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS podcast_episodes (
  id          SERIAL PRIMARY KEY,
  number      VARCHAR(10) NOT NULL,
  video_id    VARCHAR(20) NOT NULL,
  title       VARCHAR(255) NOT NULL,
  description TEXT,
  aired_at    DATE,
  sort_order  SMALLINT NOT NULL DEFAULT 0,
  active      SMALLINT NOT NULL DEFAULT 1,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS testimonials (
  id          SERIAL PRIMARY KEY,
  author_name VARCHAR(120) NOT NULL,
  author_role VARCHAR(120),
  city        VARCHAR(80),
  text        TEXT NOT NULL,
  rating      SMALLINT DEFAULT 5,
  source      VARCHAR(20) DEFAULT 'Site' CHECK (source IN ('Google','WhatsApp','Site','Indicação')),
  avatar_url  VARCHAR(500),
  active      SMALLINT NOT NULL DEFAULT 1,
  sort_order  SMALLINT NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS before_after (
  id          SERIAL PRIMARY KEY,
  label       VARCHAR(120),
  vehicle     VARCHAR(80),
  description TEXT,
  before_url  VARCHAR(500) NOT NULL,
  after_url   VARCHAR(500) NOT NULL,
  active      SMALLINT NOT NULL DEFAULT 1,
  sort_order  SMALLINT NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS team_members (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(120) NOT NULL,
  role       VARCHAR(120),
  bio        TEXT,
  photo_url  VARCHAR(500),
  email      VARCHAR(180),
  linkedin   VARCHAR(300),
  active     SMALLINT NOT NULL DEFAULT 1,
  sort_order SMALLINT NOT NULL DEFAULT 0,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS partners (
  id          SERIAL PRIMARY KEY,
  name        VARCHAR(120) NOT NULL,
  category    VARCHAR(80),
  description TEXT,
  logo_url    VARCHAR(500),
  website     VARCHAR(300),
  discount    VARCHAR(100),
  active      SMALLINT NOT NULL DEFAULT 1,
  sort_order  SMALLINT NOT NULL DEFAULT 0,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS hero_slides (
  id                  SERIAL PRIMARY KEY,
  type                VARCHAR(10) NOT NULL DEFAULT 'image' CHECK (type IN ('video','image')),
  media_url           VARCHAR(500) NOT NULL,
  poster_url          VARCHAR(500),
  headline            VARCHAR(300),
  subheadline         TEXT,
  cta_primary_label   VARCHAR(100),
  cta_primary_url     VARCHAR(300),
  cta_secondary_label VARCHAR(100),
  cta_secondary_url   VARCHAR(300),
  active              SMALLINT NOT NULL DEFAULT 1,
  sort_order          SMALLINT NOT NULL DEFAULT 0,
  created_at          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
