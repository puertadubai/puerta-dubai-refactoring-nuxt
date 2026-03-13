# Task Queue

Utilisation:
- Une seule tache active a la fois.
- Je traite uniquement la tache marquee `status: in_progress`.
- Les taches suivantes restent en `pending` jusqu'a ta validation explicite.
- Tu peux demander des ajustements sur la tache en cours sans casser la sequence.
- Pour passer a la suivante, ecris par exemple: `valide 1` ou `on passe a la 2`.

## Statuts

- `pending`: en attente
- `in_progress`: tache active
- `blocked`: bloquee par une question ou une dependance
- `approved`: validee par toi, prete a etre archivee
- `done`: completement terminee

---

## Task 1

status: approved
instructions:
- la bande de logos qui défile sur l'accueil ne fait pas une boucle infinie. au bout d'un moment, il y a un vide derrière le dernier logo à droite et le défilement saute, puis recommence, peut on améliorer ça ?
- voir capture :
  ![Header mobile](./tasks-assets/1.png)


contraintes:
- attendre validation avant de passer a la tache suivante

validation attendue:
- ecris `valide 1` pour autoriser le passage a la tache suivante

---

## Task 2

status: approved
instructions:
- pour la section golden visa à l'accueil, il faudrait reprendre ce texte :
-  "Discover our free, interactive guide to the UAE Golden Visa — your step-by-step resource to secure long-term residence, understand eligibility, and explore investment opportunities in the Emirates.

Special offer: Receive complimentary Golden Visa processing when purchasing a property above USD 550,000 or depositing 10% of that value. "

contraintes:
- ne demarrer qu'apres validation de la tache precedente

validation attendue:
- ecris `valide 2` pour autoriser le passage a la tache suivante

---

## Task 3

status: approved
instructions:
- il y a une série de boutons dont le fond est noir par défaut, et au survol, il y a un effet de bande qui passe et le texte devient noir aussi mais illisible, peux tu passer le texte en "rosé champagne" au survol
- voir capture :
  ![Header mobile](./tasks-assets/1.png)

contraintes:
- ne demarrer qu'apres validation de la tache precedente

validation attendue:
- ecris `valide 3` pour autoriser le passage a la tache suivante

---

## Task 4

status: approved
instructions:
- Dans la section "why dubai - key avantages" de l'accueil, j'aimerais que tu reprennes l'effet sur le fond que tu as utilisé pour la connexion au back office
- voir captures :
  ![Header mobile](./tasks-assets/4A.png)
   ![Header mobile](./tasks-assets/4B.png)


contraintes:
- ne demarrer qu'apres validation de la tache precedente

validation attendue:
- ecris `valide 4` pour autoriser le passage a la tache suivante

---
## Task 5

status: approved
instructions:
- Pour le preloader, j'aimerais que celui-ci soir avec un z-index plus élevé que tout le reste, notamment le menu de nav principal. Aussi, je voudrais que la barre blanche horizontale, indique réellement le niveau de chargement de la page et des médias. Particulièrement pour les pages de projets qui contiennent des images appellées dans supabase


contraintes:
- ne demarrer qu'apres validation de la tache precedente

validation attendue:
- ecris `valide 5` pour autoriser le passage a la tache suivante

---
## Task 6

status: approved
instructions:
- pour le footer, je souhaite que le dégradé aille de gauche à droite, du carbon au noir pur et la couleur du logo doit être inversée
- voir capture :
  ![Header mobile](./tasks-assets/6.png)

contraintes:
- ne demarrer qu'apres validation de la tache precedente

validation attendue:
- ecris `valide 6` pour autoriser le passage a la tache suivante

---
## Task 7

status: approved
instructions:
- dans les pages détails de projets, les vignettes pour appeler d'autres projets, n'ont pas un aspect homogène
- voir capture :
  ![Header mobile](./tasks-assets/7.png)

contraintes:
- ne demarrer qu'apres validation de la tache precedente

validation attendue:
- ecris `valide 7` pour autoriser le passage a la tache suivante

---
## Task 8

status: approved
instructions:
- je voudrais masque le fil d'arianne, uniquement sur la home page, pas sur les autres pages internes
- voir capture :
  ![Header mobile](./tasks-assets/8.png)

contraintes:
- ne demarrer qu'apres validation de la tache precedente

validation attendue:
- ecris `valide 8` pour autoriser le passage a la tache suivante

---
## Task 9

status: approved
instructions:
- sur le login du back office, je veux que la page soit en anglais et non pas en français

contraintes:
- ne demarrer qu'apres validation de la tache precedente

validation attendue:
- ecris `valide 9` pour autoriser le passage a la tache suivante

---
## Task 10

status: approved
instructions:
- sur l'accueil, la section "lastest news" doit plutôt être nommée "press releases"

contraintes:
- ne demarrer qu'apres validation de la tache precedente

validation attendue:
- ecris `valide 10` pour autoriser le passage a la tache suivante

---
## Task 11

status: approved
instructions:
- au chargement de la page d'accueil, peut-on faire un effet "textilate", très léger et doux d'apparition de chaque lettres sur le titre "invest the vision of UAE"

contraintes:
- ne demarrer qu'apres validation de la tache precedente

validation attendue:
- ecris `valide 11` pour autoriser le passage a la tache suivante

---
## Task 12

status: approved
instructions:
Je veux que la section "OUR SERVICES" de l'accueil vienne se loger juste avant "Dayan Candamil"

contraintes:
- ne demarrer qu'apres validation de la tache precedente

validation attendue:
- ecris `valide 12` pour autoriser le passage a la tache suivante

---

## Task 13

status: approved
instructions:
-je veux plusieurs optimisations sur la page liste de projets : j'aimerais que le titre principal ne chevauche pas la ligne du fil d'ariane, une petite marge en haut peut-être
- sur la version mobile, je veux, pour éviter de perturber le scroll utilisateur dans la page, désactiver le ballayage sur la carte openstreet map
- pour les tuiles des projets, je veux que l'affichage, par défaut, ou au survol soit mieux agencé, maitrisé
- voir capture :
  ![Header mobile](./tasks-assets/13.png)
contraintes:
- ne demarrer qu'apres validation de la tache precedente

validation attendue:
- ecris `valide 13` pour autoriser le passage a la tache suivante
