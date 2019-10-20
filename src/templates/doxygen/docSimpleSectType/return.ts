import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped } from '../../mappers';
import { docParaType } from '..';

const template = Handlebars.compile(
  `
**Returns**

{{#each para}}
{{this}}
{{/each}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  para: docParaType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template(context);
};
