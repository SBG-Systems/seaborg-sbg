import { Element } from '@rgrove/parse-xml';
import { TemplateMap, applyToChildrenGrouped, $default } from '..';
import Handlebars from 'handlebars';

import xsdString from '../xsd-string';
import descriptionType from '../descriptionType';

Handlebars.registerHelper('fred', (language: string) => {
  return new Handlebars.SafeString('```c');
});

const template = Handlebars.compile(
  `
### Function {{name}}

\`\`\`c
{{definition}}{{argsstring}}
\`\`\`

{{briefdescription}}

{{detaileddescription}}
`,
  { noEscape: true }
);

const templates: TemplateMap = {
  name: xsdString,
  definition: xsdString,
  argsstring: xsdString,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  //TODO
  [$default]: element => '* ' + element.name + ' ' + JSON.stringify(element),
};

export default (element: Element) => {
  const context = applyToChildrenGrouped(templates)(element);

  return template(context) + '\n\n' + context[$default].join('\n');
};
