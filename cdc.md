# CAHIER DES CHARGES TECHNIQUE & FONCTIONNEL
## Projet : Blackjack Advantage Play Trainer (Web App & Cross-Platform)

**Auteur :** Élève Ingénieur (Informatique / Cycle Ingénieur)  
**Stack Principale :** Svelte 5 / SvelteKit, TypeScript, TailwindCSS, Vitest, Vercel  
**Période de développement :** 2026  
**Cible principale :** Portfolio d'ingénierie (Recrutement GAFAM / Suisses & Genève), Communauté Open Source (`r/blackjack`, `r/SvelteJs`).

---

## 1. PRÉSENTATION & OBJECTIFS DU PROJET

### 1.1 Contexte & Vision
Le projet consiste en la conception, le développement et le déploiement d'une application web interactive gamifiée dédiée à l'entraînement à la **théorie des jeux**, à la **stratégie optimale** et au **comptage de cartes (Système Hi-Lo)** au Blackjack.

L'objectif n'est pas de créer un jeu de casino récréatif classique, mais un **moteur d'entraînement cognitif et probabiliste**, axé sur la performance de rendu ($< 50\text{ ms}$ de latence), la précision algorithmique ($O(1)$) et l'expérience utilisateur sans parasite publicitaire.

### 1.2 Objectifs Techniques & Portfolio
1. **Démonstration d'Ingénierie Logicielle :** Implémentation d'un moteur de règles complexes, de matrices de décision probabilistes et d'un système à double état (actions + état du sabot).
2. **Architecture & Performance :** Exploitation des fonctionnalités de Svelte 5 et de TypeScript pour offrir une UI fluide sans surcoût de re-render.
3. **Qualité & Fiabilité :** Couverture de tests unitaires (Vitest) sur les algorithmes critiques et déploiement continu (CI/CD) sur Vercel.
4. **Attractivité Recruteur :** Servir de sujet d'entretien d'ingénierie (GAFAM, banques/trading à Genève) et d'amorce pour un post de démonstration technique (*Build in Public* sur LinkedIn).

---

## 2. SPÉCIFICATIONS FONCTIONNELLES (LES 4 MODES DE JEU)

L'application s'articule autour de 4 modes de jeu progressifs :

### 🟢 Mode 1 : Partie Libérée (Pratique Libre)
* **Description :** Simulation complète d'une table de jeu de Blackjack sans contrainte de temps.
* **Fonctionnalités :**
  * Gestion du sabot (*shoe* de 6 jeux de cartes), mélange, distribution, gestion de la banque (*bankroll*).
  * Exécution de l'ensemble des actions réglementaires : *Hit, Stand, Double Down, Split* (séparation de paires), *Insurance*.
  * **Option Pédagogique :** Toggle "Conseil Stratégique" affichant en temps réel la décision mathématique idéale.

### 🟡 Mode 2 : Mort Subite (Vitesse & Stratégie de Base)
* **Description :** Mode arcade basé sur la rapidité et l'automatisation des réflexes stratégiques.
* **Fonctionnalités :**
  * Génération en chaîne de situations de jeu (Main Joueur vs Carte Croupier).
  * Chronomètre strict par décision (3 à 5 secondes).
  * **Validation $O(1)$ instantanée :** Toute décision non optimale ou tout dépassement de temps provoque la fin immédiate de la partie (*Game Over*).
  * Sauvegarde des séries (*Streaks*) et du *High Score* en `localStorage`.

### 🔵 Mode 3 : Card Counting Speed Run (Mémoire & Vitesse)
* **Description :** Entraînement dédié au calcul du *Running Count* et du *True Count*.
* **Fonctionnalités :**
  * Défilé automatique des cartes au centre de l'écran à vitesse paramétrable (ex: 0,5s à 2s / carte).
  * L'utilisateur effectue le décompte mentalement (Méthode Hi-Lo : $2\text{--}6 = +1$, $7\text{--}9 = 0$, $10\text{--}\text{As} = -1$).
  * Interruption sur pavé numérique exigeant la saisie exacte du *Running Count* ou du *True Count* courant.

### 🔴 Mode 4 : Master Advantage Play (Le Boss Final)
* **Description :** Simulation intégrale de l'expérience d'un joueur professionnel (*Advantage Player*).
* **Fonctionnalités :**
  * Jouabilité similaire au Mode 1 + exigence de la Mort Subite du Mode 2.
  * Prise en compte combinée de la **Stratégie de Base** et des **Déviations d'Don Schlesinger (*Illustrious 18*)** modulées selon le *True Count*.
  * **Interruption asynchrone :** Pause surprise toutes les $N$ mains exigeant la validation du *True Count* exact du sabot. Une erreur sur l'action OU sur le décompte met fin à la session.

---

## 3. SPÉCIFICATIONS TECHNIQUES & ARCHITECTURE

### 3.1 Stack Technologique
* **Front-end / Framework :** Svelte 5 / SvelteKit (Svelte CLI v0.17+).
* **Langage :** TypeScript (Typage strict pour cartes, mains, décisions, états).
* **Styles & UI :** TailwindCSS (Design système sobre, Dark Mode nativement géré).
* **Testing :** Vitest (Tests unitaires automatisés des matrices et algorithmes).
* **Hébergement & Adapter :** Vercel via `@sveltejs/adapter-vercel`.
* **Mobile (Option Phase 4) :** Capacitor (Encapsulation hybride natif Android/iOS).

### 3.2 Modélisation des Données & Algorithmes Clés

#### A. Système de Comptage (Hi-Lo & True Count)
$$\text{True Count (TC)} = \left\lfloor \frac{\text{Running Count}}{\text{Nombre de decks restants dans le sabot}} \right\rceil$$

#### B. Algorithme d'Évaluation de la Décision
Le moteur valide l'action retenue via la fonction $O(1)$ :

$$\text{Action} = f(\text{MainJoueur}, \text{CarteCroupier}, \text{TrueCount}, \text{OptionDeviations})$$

```typescript
// Ordre de priorité de l'évaluation :
1. Si (OptionDeviations === true) -> Rechercher dans la table ILLUSTRIOUS_18.
   Si une règle correspond ET que TrueCount >= thresholdTC -> Retourner la Déviation.
2. Sinon -> Rechercher dans les tables de Stratégie de Base (Hard, Soft, Split).