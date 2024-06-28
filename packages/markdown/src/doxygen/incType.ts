/*
  <xsd:complexType name="incType">
    <xsd:simpleContent>
      <xsd:extension base="xsd:string">
        <xsd:attribute name="refid" type="xsd:string" />
        <xsd:attribute name="local" type="DoxBool" />
      </xsd:extension>
    </xsd:simpleContent>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';
import { joinStrings, ref } from '../helpers';

const mappers = (): Mappers => ({
  [$text]: textNode,
});

export default (element: Element) => {
  const {
    attributes: { refid, local },
  } = element;
  const text = joinStrings(applyToChildren(mappers())(element));
  const textLabel = (local === 'yes'? `"${text}"` : `\\<${text}\\>`);

  return refid ? ref(refid, 'compound', textLabel) : textLabel;
};
