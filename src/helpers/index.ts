import Handlebars from 'handlebars';

import index from '../app/services/index.service';

/** Handlebars helper for ref links */
const refHelper = (refid: string, kindref: string, text: string) => {
  switch (kindref) {
    case 'compound':
      return `[${text}](${refid}.md)`;
    case 'member': {
      const compound = index.findMemberCompound(refid);
      if (compound) {
        return `[${text}](${compound.refid}.md#${refid})`;
      } else {
        return `[${text}](#${refid})`;
      }
    }
  }
};

/** Handlebars helper for TODO lists */
const todoHelper = (list: string[]) => {
  return list && list.length
    ? '**TODO**:\n' + list.map(e => `* ${e}`).join('\n')
    : undefined;
};

/** Register Handlebars helpers */
export function registerHelpers() {
  Handlebars.registerHelper('ref', refHelper);
  Handlebars.registerHelper('TODO', todoHelper);
}
