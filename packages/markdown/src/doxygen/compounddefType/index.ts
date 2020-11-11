/*
  <xsd:complexType name="compounddefType">
    <xsd:sequence>
      <xsd:element name="compoundname" type="xsd:string"/>
      <xsd:element name="title" type="xsd:string" minOccurs="0" />
      <xsd:element name="basecompoundref" type="compoundRefType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="derivedcompoundref" type="compoundRefType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="includes" type="incType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="includedby" type="incType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="incdepgraph" type="graphType" minOccurs="0" />
      <xsd:element name="invincdepgraph" type="graphType" minOccurs="0" />
      <xsd:element name="innerdir" type="refType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="innerfile" type="refType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="innerclass" type="refType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="innernamespace" type="refType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="innerpage" type="refType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="innergroup" type="refType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="templateparamlist" type="templateparamlistType" minOccurs="0" />
      <xsd:element name="sectiondef" type="sectiondefType" minOccurs="0" maxOccurs="unbounded" />
      <xsd:element name="tableofcontents" type="tableofcontentsType" minOccurs="0" maxOccurs="1" />
      <xsd:element name="briefdescription" type="descriptionType" minOccurs="0" />
      <xsd:element name="detaileddescription" type="descriptionType" minOccurs="0" />
      <xsd:element name="inheritancegraph" type="graphType" minOccurs="0" />
      <xsd:element name="collaborationgraph" type="graphType" minOccurs="0" />
      <xsd:element name="programlisting" type="listingType" minOccurs="0" />
      <xsd:element name="location" type="locationType" minOccurs="0" />
      <xsd:element name="listofallmembers" type="listofallmembersType" minOccurs="0" />
    </xsd:sequence>
    <xsd:attribute name="id" type="xsd:string" />
    <xsd:attribute name="kind" type="DoxCompoundKind" />
    <xsd:attribute name="language" type="DoxLanguage" use="optional"/>
    <xsd:attribute name="prot" type="DoxProtectionKind" />
    <xsd:attribute name="final" type="DoxBool" use="optional"/>
    <xsd:attribute name="sealed" type="DoxBool" use="optional"/>
    <xsd:attribute name="abstract" type="DoxBool" use="optional"/>
  </xsd:complexType>
*/
/* TODO tests */

import { Element } from '@rgrove/parse-xml';

import { context } from '@seaborg/core/lib/services';

import { Mappers, $default } from '../../mappers';
import { ignore } from '../../operators';
import { xsdString } from '../../generic';
import { languageBadge, protectionBadge } from '../../helpers/badges';
import { descriptionType, sectiondefType, refType, listingType } from '..';
import { incdepgraph, invincdepgraph } from '../graphType';

export const compounddefDescription = ({
  briefdescription,
  detaileddescription,
}: any) =>
  `
${briefdescription || ''}

${detaileddescription || ''}
`;

export const compounddefList = ({
  list,
  label,
}: {
  list: string[];
  label: string;
}) =>
  list
    ? `
## ${label}

${list.map((e) => `* ${e}`).join('\n')}
`
    : '';

export const compounddefInnercompounds = ({
  innerdir,
  innerfile,
  innerclass,
  innernamespace,
  innerpage,
  innergroup,
}: any) =>
  `
${compounddefList({ list: innerdir, label: 'Directories' })}

${compounddefList({ list: innerfile, label: 'Files' })}

${compounddefList({ list: innerclass, label: 'Classes' })}

${compounddefList({ list: innernamespace, label: 'Namespaces' })}

${compounddefList({ list: innerpage, label: 'Pages' })}

${compounddefList({ list: innergroup, label: 'Modules' })}
`;

export const compounddefSections = ({ sectiondef }: { sectiondef: string[] }) =>
  sectiondef ? sectiondef.join('\n') : '';

export const compounddefSource = ({ programlisting }: any) =>
  programlisting
    ? `
## Source

${programlisting}
`
    : '';

// TODO other attributes?
export const compounddefBadges = ({ language, attributes }: any) => `
${language ? languageBadge(language) : ''}
${attributes.prot ? protectionBadge(attributes.prot) : ''}
`;

export const mappers = (): Mappers => ({
  compoundname: xsdString,
  title: xsdString,
  briefdescription: descriptionType,
  detaileddescription: descriptionType,
  sectiondef: sectiondefType,
  innerdir: refType,
  innerfile: refType,
  innerclass: refType,
  innernamespace: refType,
  innerpage: refType,
  innergroup: refType,
  programlisting: listingType,

  incdepgraph: incdepgraph,
  invincdepgraph: invincdepgraph,
  inheritancegraph: ignore, // TODO graphs
  collaborationgraph: ignore, // TODO graphs
  //TODO
  [$default]: (element) => element.name + ' ' + JSON.stringify(element),
});

export const templateContext = (element: Element) => {
  const { attributes } = element;
  const { id, kind, language } = attributes;
  return { id, kind, language, attributes };
};

export default (element: Element) => {
  const {
    attributes: { kind, language },
  } = element;
  context.pushState({ language });
  let template;
  try {
    template = require('./' + kind).default;
  } catch {
    template = require('./default').default;
  }
  const result = template(element);
  context.popState();
  return result;
};
