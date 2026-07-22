-- ============================================================
-- Hemissul CMS — Schema SQLite (Turso / arquivo local)
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_users (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL UNIQUE,
  password   TEXT NOT NULL,
  role       TEXT NOT NULL DEFAULT 'editor' CHECK (role IN ('super','editor')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO admin_users (name, email, password, role) VALUES
  ('Administrador', 'admin@hemissul.com.br',
   '$2b$12$LqFGgBzPiQ1T/6e4AJRqFedJqQKxLyMlP4RG5e1cM7CWIrF0XJ1sm', 'super');


CREATE TABLE IF NOT EXISTS site_settings (
  "key"      TEXT PRIMARY KEY,
  "value"    TEXT NOT NULL,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT OR IGNORE INTO site_settings ("key","value") VALUES
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
  ('campaign_expires', '');


CREATE TABLE IF NOT EXISTS posts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  slug         TEXT NOT NULL UNIQUE,
  title        TEXT NOT NULL,
  excerpt      TEXT,
  content      TEXT,
  category     TEXT,
  cover_url    TEXT,
  status       TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('published','draft')),
  featured     INTEGER NOT NULL DEFAULT 0,
  published_at TEXT,
  created_at   TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS banners (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  title       TEXT NOT NULL,
  text        TEXT,
  cta_label   TEXT,
  cta_url     TEXT,
  bg_color    TEXT DEFAULT '#1267a8',
  text_color  TEXT DEFAULT '#ffffff',
  position    TEXT DEFAULT 'all' CHECK (position IN ('home','all','checkout')),
  active      INTEGER NOT NULL DEFAULT 1,
  expires_at  TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS faqs (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  group_name TEXT NOT NULL DEFAULT 'Geral',
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  active     INTEGER NOT NULL DEFAULT 1,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS podcast_episodes (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  number      TEXT NOT NULL,
  video_id    TEXT NOT NULL,
  title       TEXT NOT NULL,
  description TEXT,
  aired_at    TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  active      INTEGER NOT NULL DEFAULT 1,
  created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS testimonials (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  author_name TEXT NOT NULL,
  author_role TEXT,
  city        TEXT,
  text        TEXT NOT NULL,
  rating      INTEGER DEFAULT 5,
  source      TEXT DEFAULT 'Site' CHECK (source IN ('Google','WhatsApp','Site','Indicação')),
  avatar_url  TEXT,
  active      INTEGER NOT NULL DEFAULT 1,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS before_after (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  label       TEXT,
  vehicle     TEXT,
  description TEXT,
  before_url  TEXT NOT NULL,
  after_url   TEXT NOT NULL,
  active      INTEGER NOT NULL DEFAULT 1,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS team_members (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  role       TEXT,
  bio        TEXT,
  photo_url  TEXT,
  email      TEXT,
  linkedin   TEXT,
  active     INTEGER NOT NULL DEFAULT 1,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS partners (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT NOT NULL,
  category    TEXT,
  description TEXT,
  logo_url    TEXT,
  website     TEXT,
  discount    TEXT,
  active      INTEGER NOT NULL DEFAULT 1,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS hero_slides (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  type                TEXT NOT NULL DEFAULT 'image' CHECK (type IN ('video','image')),
  media_url           TEXT NOT NULL,
  poster_url          TEXT,
  headline            TEXT,
  subheadline         TEXT,
  cta_primary_label   TEXT,
  cta_primary_url     TEXT,
  cta_secondary_label TEXT,
  cta_secondary_url   TEXT,
  active              INTEGER NOT NULL DEFAULT 1,
  sort_order          INTEGER NOT NULL DEFAULT 0,
  created_at          TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
