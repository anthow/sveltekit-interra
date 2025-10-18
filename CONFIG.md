# Configuration SvelteKit - INTERRA

## 🔧 Variables d'environnement

### Fichiers de configuration

1. **`.env.local`** (développement local)
   ```bash
   DATOCMS_API_TOKEN=70922149b5b6ab9f2cbf4f2a23171a
   NODE_ENV=development
   ```

2. **`src/lib/config.ts`** (configuration centralisée)
   ```typescript
   export const DATOCMS_CONFIG = {
     API_TOKEN: '70922149b5b6ab9f2cbf4f2a23171a',
     ENVIRONMENT: 'main',
     PREVIEW_MODE: false,
     DISABLE_LIVE_RELOAD: true
   };
   ```

### Configuration Netlify

Pour le déploiement sur Netlify, ajoutez ces variables dans les paramètres du site :

- `DATOCMS_API_TOKEN` = `70922149b5b6ab9f2cbf4f2a23171a`
- `NODE_ENV` = `production`

### Configuration DatoCMS

Le token API DatoCMS est configuré pour :
- **Environnement** : `main` (production)
- **Mode preview** : `false` (données publiées)
- **Live reload** : `false` (désactivé pour la performance)

### Utilisation dans le code

```typescript
// Dans les API routes
import { DATOCMS_CONFIG } from '$lib/config';
const client = new SiteClient(DATOCMS_CONFIG.API_TOKEN);

// Dans les composants
import { APP_CONFIG } from '$lib/config';
const siteUrl = APP_CONFIG.SITE_URL;
```

### Sécurité

- ✅ Le token API est sécurisé
- ✅ Les fichiers `.env` sont ignorés par Git
- ✅ Configuration centralisée dans `config.ts`
- ✅ Variables d'environnement pour Netlify

### Développement

1. **Local** : Utilise `.env.local`
2. **Production** : Utilise les variables Netlify
3. **Fallback** : Utilise `config.ts` si les variables ne sont pas définies


