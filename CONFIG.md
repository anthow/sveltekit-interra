# Configuration SvelteKit - INTERRA

## 🔧 Variables d'environnement

### Fichiers de configuration

1. **`.env.local`** (développement local)
   ```bash
   AIRTABLE_PAT=votre_token_airtable
   AIRTABLE_BASE_ID=votre_base_id_airtable
   NODE_ENV=development
   ```

2. **`src/lib/config.ts`** (configuration centralisée)
   ```typescript
   export const APP_CONFIG = {
     SITE_URL: 'https://www.interra-asbl.be',
     SITE_NAME: 'INTERRA',
     LANGUAGE: 'fr'
   };
   ```

### Configuration Netlify

Pour le déploiement sur Netlify, ajoutez ces variables dans les paramètres du site :

- `AIRTABLE_PAT` = Votre Personal Access Token Airtable
- `AIRTABLE_BASE_ID` = Votre Base ID Airtable
- `NODE_ENV` = `production`

### Configuration Airtable

Le site utilise Airtable comme source de données :
- **Base ID** : Configuré via `AIRTABLE_BASE_ID`
- **Token** : Configuré via `AIRTABLE_PAT` (Personal Access Token)
- **Mode** : Contenu statique généré au build

### Utilisation dans le code

```typescript
// Dans les API routes
const BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_PAT = process.env.AIRTABLE_PAT;

// Dans les composants
import { APP_CONFIG } from '$lib/config';
const siteUrl = APP_CONFIG.SITE_URL;
```

### Sécurité

- ✅ Aucun token/ID hardcodé dans le code source
- ✅ Les fichiers `.env` sont ignorés par Git
- ✅ Configuration centralisée dans `config.ts`
- ✅ Variables d'environnement pour Netlify
- ✅ Scan de secrets configuré pour ignorer `AIRTABLE_BASE_ID` (ID public)

### Développement

1. **Local** : Utilise `.env` ou `.env.local`
2. **Production** : Utilise les variables Netlify
3. **Build** : Script `prebuild` télécharge les images depuis Airtable

### Processus de build

1. Le script `prebuild` (`download-all-images.mjs`) s'exécute automatiquement
2. Il télécharge toutes les images/vidéos depuis Airtable
3. Les sauvegarde dans `static/images/` et `static/videos/`
4. Met à jour les fichiers de contenu avec les chemins locaux
5. Le build SvelteKit se poursuit normalement
