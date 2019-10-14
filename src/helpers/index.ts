import Handlebars from 'handlebars';

import doxygenIndex from '../app/services/doxygen-index.service';

/** Handlebars helper for Markdown escape. Useful with identifiers. */
const mdHelper = (text: string | string[]): any =>
  Handlebars.Utils.isArray(text)
    ? (text as string[]).map(mdHelper)
    : (text as string).replace(/_/g, '\\_');

/** Handlebars helper for ref links */
const refHelper = (refid: string, kindref: string, text: string) => {
  switch (kindref) {
    case 'compound':
      return `[${text}](${refid}.md)`;
    case 'member': {
      const compound = doxygenIndex.findMemberCompound(refid);
      if (compound) {
        return `[${text}](${compound.refid}.md#${refid})`;
      } else {
        return `[${text}](#${refid})`;
      }
    }
  }
};

/** Handlebars helper for bullet list items */
const bulletItemHelper = (text: string) => `* ${text}`;

/** Handlebars helper for numbered list items */
const numberedItemHelper = (text: string, index: number) =>
  `${index + 1}. ${text}`;

/** Handlebars helper for TODO lists */
const todoHelper = (list: string[]) => {
  return list && list.length
    ? '**TODO**:\n' + list.map(e => `* ${e}`).join('\n')
    : undefined;
};

/** Register Handlebars helpers */
export function registerHelpers() {
  Handlebars.registerHelper('md', mdHelper);
  Handlebars.registerHelper('ref', refHelper);
  Handlebars.registerHelper('bullet-item', bulletItemHelper);
  Handlebars.registerHelper('numbered-item', numberedItemHelper);
  Handlebars.registerHelper('TODO', todoHelper);
}
