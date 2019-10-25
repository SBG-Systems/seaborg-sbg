import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { applyToChildrenGrouped, $default } from '../../mappers';

import { mappers } from '.';

const template = Handlebars.compile(
  `
<a id="{{id}}"></a>
### {{kind}} {{md name}}

{{location}}

{{> memberdef-description}}

{{> memberdef-references}}

{{TODO TODO}}
`,
  { noEscape: true }
);

export default (element: Element) => {
  // TODO map kind to string
  const {
    attributes: { kind, id },
  } = element;
  const context = applyToChildrenGrouped(mappers())(element);

  return template({ ...context, kind, id, TODO: context[$default] });
};