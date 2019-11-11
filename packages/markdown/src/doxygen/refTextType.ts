/*
  <xsd:complexType name="refTextType">
    <xsd:simpleContent>
      <xsd:extension base="xsd:string">
       <xsd:attribute name="refid" type="xsd:string" />
       <xsd:attribute name="kindref" type="DoxRefKind" />
       <xsd:attribute name="external" type="xsd:string" use="optional"/>
       <xsd:attribute name="tooltip" type="xsd:string" use="optional"/>
      </xsd:extension>
    </xsd:simpleContent>
  </xsd:complexType>
*/

//TODO
import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildren, $text } from '../mappers';
import { textNode } from '../generic';

const template = Handlebars.compile('{{ref refid kindref (md text)}}', {
  noEscape: true,
});

const mappers = (): Mappers => ({
  [$text]: textNode,
});

export default (element: Element) => {
  // TODO other attributes?
  const {
    attributes: { refid, kindref },
  } = element;
  const text = applyToChildren(mappers())(element).join('');
  return template({ refid, kindref, text });
};
