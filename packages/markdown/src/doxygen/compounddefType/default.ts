import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped, $default } from '../../mappers';
import { locationType } from '..';

import { mappers as defaultMappers } from '.';

const template = Handlebars.compile(
  `
# {{kind}} {{md compoundname}} {{title}}

{{location}}

{{> compounddef-description}}

{{> compounddef-sections}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  ...defaultMappers(),
  location: locationType,
});

export default (element: Element) => {
  // TODO map kind to string
  const {
    attributes: { kind },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, kind, TODO: context[$default] });
};
