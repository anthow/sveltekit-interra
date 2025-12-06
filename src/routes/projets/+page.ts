import type { PageLoad } from './$types';
import { projetsContent } from '$lib/content/projets';

export const load: PageLoad = async () => {
  return {
    nosProjet: projetsContent.nosProjet,
    interAct: projetsContent.interAct,
    duoLangue: projetsContent.duoLangue,
    incubateurInclusif: projetsContent.incubateurInclusif,
    formationInterculturelle: projetsContent.formationInterculturelle
  };
};
