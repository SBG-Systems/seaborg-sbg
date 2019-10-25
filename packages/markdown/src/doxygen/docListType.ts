/*
  <xsd:complexType name="docListType">
    <xsd:sequence>
      <xsd:element name="listitem" type="docListItemType" maxOccurs="unbounded" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildren } from '../mappers';
import { docListItemType } from '.';

const itemizedTemplate = Handlebars.compile(
  `
{{#each items}}
{{bullet-item this}}
{{/each}}
`,
  { noEscape: true }
);

const orderedTemplate = Handlebars.compile(
  `
{{#each items}}
{{numbered-item this @index}}
{{/each}}
`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  listitem: docListItemType,
});

export function itemizedlist(element: Element) {
  const items = applyToChildren(mappers())(element);

  return itemizedTemplate({ items });
}

export function orderedlist(element: Element) {
  const items = applyToChildren(mappers())(element);

  return orderedTemplate({ items });
}