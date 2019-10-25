/*
  <xsd:complexType name="docParamListItem">
    <xsd:sequence>
      <xsd:element name="parameternamelist" type="docParamNameList" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="parameterdescription" type="descriptionType" />
    </xsd:sequence>
  </xsd:complexType>
*/

import { Element } from '@rgrove/parse-xml';
import Handlebars from 'handlebars';

import { Mappers, applyToChildrenGrouped } from '../mappers';
import { docParamNameList, descriptionType } from '.';

const template = Handlebars.compile(
  `**{{parameternamelist}}**{{#if parameterdescription}}: {{parameterdescription}}{{/if}}`,
  { noEscape: true }
);

const mappers = (): Mappers => ({
  parameternamelist: docParamNameList,
  parameterdescription: descriptionType,
});

export default (element: Element) => {
  const context = applyToChildrenGrouped(mappers())(element);

  return template(context);
};