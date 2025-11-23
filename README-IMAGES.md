# 📸 Gestion des images statiques

## 🔄 Mise à jour automatique des images

Les images sont maintenant **statiques** et stockées dans `static/images/`. 

### ⚙️ Processus automatique

**À chaque build Netlify**, le script `download-all-images.mjs` s'exécute automatiquement pour :
1. ✅ Télécharger toutes les nouvelles images depuis Airtable
2. ✅ Mettre à jour les fichiers de contenu avec les nouveaux chemins
3. ✅ Construire le site avec les images à jour

### 🚀 Déclencher une mise à jour

#### Option 1 : Build manuel sur Netlify
1. Allez dans votre dashboard Netlify
2. Cliquez sur "Trigger deploy" → "Deploy site"
3. Les images seront automatiquement mises à jour

#### Option 2 : Webhook Airtable → Netlify (Recommandé)
1. **Dans Netlify** :
   - Allez dans Site settings → Build & deploy → Build hooks
   - Créez un nouveau build hook (ex: "airtable-update")
   - Copiez l'URL du webhook

2. **Dans Airtable** :
   - Allez dans votre base → Automations
   - Créez une nouvelle automation qui se déclenche quand une image est modifiée
   - Ajoutez une action "Webhook" avec l'URL du build hook Netlify

3. **Résultat** : Chaque modification d'image dans Airtable déclenchera automatiquement un nouveau build Netlify

#### Option 3 : Commande locale
```bash
npm run update-images
```
Puis commitez et poussez les changements.

### 📋 Variables d'environnement requises

Assurez-vous que `AIRTABLE_PAT` est configuré dans Netlify :
- Site settings → Environment variables
- Ajoutez `AIRTABLE_PAT` avec votre token Airtable

### ⚠️ Important

- Les images sont téléchargées **pendant le build**, pas en runtime
- Si une image Airtable expire (410 Gone), elle ne pourra pas être téléchargée
- Les images déjà téléchargées restent disponibles même si l'URL Airtable expire
- Pour forcer une mise à jour complète, déclenchez un nouveau build

### 🔍 Vérification

Pour vérifier que les images sont à jour :
1. Vérifiez les fichiers dans `src/lib/content/*.ts` - les URLs doivent être `/images/...`
2. Vérifiez que les fichiers existent dans `static/images/`
3. Les images doivent s'afficher correctement sur le site

