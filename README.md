# Puerta Dubai (Nuxt 4)

Application Nuxt 4 pour le site Puerta Dubai.
Le projet combine un site vitrine immobilier premium (home, services, catalogue projets, fiches detaillees)
et un back-office simple pour consulter les leads et administrer les projets.

La partie publique consomme des donnees projet via des endpoints server Nuxt relies a Supabase
(tables `projects`, `project_highlights`, `project_amenities`, `project_gallery`), tandis que
les leads sont enregistres dans Supabase puis envoyes par email via `nodemailer`.

## Description du projet

- Site vitrine immobilier axe sur des programmes a Dubai.
- Catalogue de projets avec listing, detail par slug et medias associes.
- Back-office avec pages d'administration pour les projets et la boite de reception des leads.
- Architecture full-stack Nuxt: pages frontend dans `app/` et API server dans `server/api/`.
- Stockage des medias projet via le bucket Supabase `project-images`.

## Features

- Page d'accueil composee de sections editoriales animees: hero, about, benefits, projets mis en avant, founder, services, Golden Visa et partners.
- Catalogue de projets avec liste, navigation detaillee et page dynamique `/projects/:slug`.
- Mapping des donnees projet depuis Supabase vers un format public et un format admin.
- Carte Leaflet sur la liste des projets.
- Animations GSAP sur la home, le layout et les pages projet.
- Preloader, menu lateral, curseur personnalise, scroll progress et bouton back-to-top.
- Formulaire de lead avec validation `zod`, insertion en base et notification email.
- API CRUD admin pour creer, lire, modifier, supprimer des projets.
- Upload d'images vers Supabase Storage pour les assets de projets.
- Middleware d'acces au back-office cote client (`sessionStorage`).
- Selecteur de langue et integration Google Translate cote client.

## Arborescence

```text
.
|-- app/
|   |-- app.vue
|   |-- assets/
|   |   `-- css/
|   |-- components/
|   |   |-- admin/
|   |   |-- home/
|   |   |-- layout/
|   |   `-- projects/
|   |-- composables/
|   |   `-- animations/
|   |-- data/
|   |-- layouts/
|   |-- middleware/
|   |-- pages/
|   |   |-- index.vue
|   |   |-- legal-notice.vue
|   |   |-- services/
|   |   |-- projects/
|   |   `-- admin/
|   `-- plugins/
|-- server/
|   |-- api/
|   |   |-- lead.post.ts
|   |   |-- projects/
|   |   `-- admin/
|   `-- utils/
|-- public/
|-- nuxt.config.ts
`-- package.json
```

Points de repere:

- `app/pages` contient les routes frontend generees par Nuxt.
- `app/components` regroupe les composants par domaine fonctionnel.
- `app/composables` centralise la logique partagee et les animations GSAP.
- `server/api` expose les endpoints backend utilises par le site et le back-office.
- `server/utils` contient l'acces Supabase et les fonctions de transformation de donnees.
- `app/data/projects.json` est encore present dans le repo, mais le flux principal actuel passe par Supabase.

## Routes

Routes frontend:

- `/` : page d'accueil.
- `/services` : page services.
- `/projects` : listing des projets.
- `/projects/:slug` : detail d'un projet.
- `/legal-notice` : mentions legales.
- `/admin/login` : ecran de connexion back-office.
- `/admin` : hub back-office.
- `/admin/leads` : liste des leads.
- `/admin/projects` : liste des projets.
- `/admin/projects/new` : creation d'un projet.
- `/admin/projects/:id` : edition d'un projet.
- `/admin/communication` : page back-office de communication.
- `/admin/visual-identity` : page back-office identite visuelle.

Routes API:

- `GET /api/projects` : retourne les projets publics.
- `GET /api/projects/:slug` : retourne un projet public par slug.
- `POST /api/lead` : cree un lead et envoie un email.
- `GET /api/admin/leads` : retourne les leads recents.
- `GET /api/admin/projects` : retourne les projets au format admin.
- `POST /api/admin/projects` : cree un projet.
- `GET /api/admin/projects/:id` : retourne un projet pour edition.
- `PUT /api/admin/projects/:id` : met a jour un projet.
- `DELETE /api/admin/projects/:id` : supprime un projet.
- `POST /api/admin/projects/upload` : upload un fichier dans Supabase Storage.

## Technos et dependances

Base:

- `nuxt` `^4.2.2`
- `vue` `^3.5.26`
- `vue-router` `^4.6.4`

Frontend:

- `gsap` `^3.14.2` pour les animations.
- `leaflet` `^1.9.4` pour les cartes.
- `@types/leaflet` `^1.9.21` pour le typage TypeScript.

Backend / validation:

- `zod` `^4.3.5` pour la validation du formulaire de lead.
- `nodemailer` `^7.0.12` pour l'envoi d'emails.

Configuration notable:

- `nuxt.config.ts` active `devtools`, enregistre les CSS globaux et configure `runtimeConfig`.
- Les variables actuellement declarees dans `runtimeConfig` sont `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `RESEND_API_KEY`, `LEAD_MAIL_TO` et `LEAD_MAIL_FROM`.
- L'endpoint [`server/api/lead.post.ts`](/Users/rod/Desktop/Puerta Dubai/Puerta Dubai Refactoring NUXT/server/api/lead.post.ts) utilise aussi des cles SMTP/mail supplementaires via `useRuntimeConfig()`. Avant un deployement production, il faut aligner ces cles avec `nuxt.config.ts`.

## Install

Prerequis:

- Node.js 20+ recommande.
- npm (fourni avec Node.js).
- Un projet Supabase configure si vous utilisez les APIs projets / leads.

Installation:

```bash
npm install
```

Configuration minimale:

```bash
SUPABASE_URL=...
SUPABASE_SERVICE_KEY=...
```

Lancement en developpement:

```bash
npm run dev
```

Scripts utiles:

- `npm run dev` : demarre le serveur de developpement.
- `npm run build` : build de production.
- `npm run preview` : previsualise le build.
- `npm run generate` : genere une version statique.

URL locale par defaut: `http://localhost:3000`
