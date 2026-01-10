# Puerta Dubai (Nuxt 4)

Projet Nuxt 4 pour le site Puerta Dubai, oriente immobilier haut de gamme a Dubai.
Le site met en avant des projets, une page d'accueil riche en sections, et des
pages legales. La base de contenu des projets est dans un JSON local.

## Fonctionnalites principales

- Page d'accueil composee de sections (hero, a propos, benefices, projets mis en avant,
  fondateur, services, Golden Visa, partenaires).
- Page projet dynamique `/projects/:slug` avec hero, intro, details, galerie,
  localisation, investissement et navigation vers le projet precedent/suivant.
- Preloader global, curseur personnalise, progression de scroll, bouton retour en haut.
- Animations GSAP pour les sections et composants.
- Cartes Leaflet avec tuiles OpenStreetMap/CARTO et geocodage Nominatim si coords absentes.
- Traduction via Google Translate (langues supportees : en, fr, es, pt).
- Pages legales et base d'administration (placeholders).

## Stack technique

- Nuxt 4, Vue 3, Vue Router
- GSAP pour les animations
- Leaflet pour les cartes
- CSS global et CSS par composant

## Installation

```bash
npm install
```

## Lancer en developpement

```bash
npm run dev
```

Serveur local : `http://localhost:3000`

## Scripts disponibles

- `npm run dev` : serveur de developpement Nuxt
- `npm run build` : build production
- `npm run preview` : previsualisation du build
- `npm run generate` : generation statique (Nuxt generate)

## Structure du projet

- `app/pages` : pages Nuxt (home, projets, services, admin, legal notice)
- `app/components` : composants UI (home, projets, layout)
- `app/composables` : logique partagee (ex: `useProject`)
- `app/plugins` : plugins client (GSAP, cursor, menu, translate, etc.)
- `app/assets/css` : styles globaux et par section
- `app/data/projects.json` : contenu des projets
- `public` : assets statiques (images, fonts, scripts)

## Donnees des projets

Le fichier `app/data/projects.json` centralise le contenu. Chaque entree contient
notamment :

- `slug` : utilise pour la route `/projects/:slug`
- `hero` : titre, localisation, image
- `intro` : texte d'introduction
- `amenities` : liste d'icones/labels (par colonnes)
- `highlights` : infos cles (developer, prix, livraison, etc.)
- `gallery` : images du projet
- `location` : texte, map, coordonnees (ou query)
- `investment` : texte et CTA
- `previous` / `next` : navigation entre projets

Les images sont referencees dans `public/img/projects/...`.

## Traduction

Le projet charge un script Google Translate et un selecteur de langue.
Les langues supportees sont `en`, `fr`, `es`, `pt`.

Fichiers associes :
- `app/plugins/google-translate.client.ts`
- `public/js/translations.js`

## Cartes et geocodage

Les cartes projet utilisent Leaflet avec tuiles CARTO.
Si aucune coordonnee n'est fournie, un geocodage Nominatim est declenche
via requete HTTP (necessite l'acces reseau cote client).

## Routes principales

- `/` : page d'accueil
- `/projects/:slug` : detail d'un projet
- `/projects` : placeholder
- `/services` : placeholder
- `/legal-notice` : page mentions legales
- `/admin`, `/admin/login`, `/admin/projects/new`, `/admin/projects/:id` : placeholders

## Notes

- `app/app.vue` charge `public/js/translations.js` au runtime.
- Les styles globaux sont listes dans `nuxt.config.ts`.
