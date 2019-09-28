import { Element } from '@rgrove/parse-xml';
import { Mappers, applyToChildrenGrouped, $default } from '..';
import Handlebars from 'handlebars';

import xsdString from '../xsd-string';
import descriptionType from '../descriptionType';
import sectiondefType from '../sectiondefType';

const template = Handlebars.compile(
  `
# {{kind}} {{compoundname}} {{title}}

{{briefdescription}}

{{detaileddescription}}

{{#each sectiondef}}
{{this}}
{{/each}}

{{TODO TODO}}
`,
  { noEscape: true }
);

const mappers: Mappers = {
  compoundname: xsdString,
  title: xsdString,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  sectiondef: sectiondefType,
  //TODO
  [$default]: element => element.name + ' ' + JSON.stringify(element),
};

export default (element: Element) => {
  // TODO map kind to string
  const {
    attributes: { kind },
  } = element;
  const context = applyToChildrenGrouped(mappers)(element);

  return template({ ...context, kind, TODO: context[$default] });
};
