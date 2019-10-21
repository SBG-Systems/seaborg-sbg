/*
  <xsd:complexType name="spType" mixed="true">
    <xsd:attribute name="value" type="xsd:integer" use="optional"/>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';

const mappers = (): Mappers => ({
  [$text]: textNode,
});

// TODO value attribute
export default (element: Element) =>
  ' ' + applyToChildren(mappers())(element).join('');
