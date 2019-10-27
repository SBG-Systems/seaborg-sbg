/*
  <xsd:simpleType name="DoxLanguage">
    <xsd:restriction base="xsd:string">
      <xsd:enumeration value="Unknown" />
      <xsd:enumeration value="IDL" />
      <xsd:enumeration value="Java" />
      <xsd:enumeration value="C#" />
      <xsd:enumeration value="D" />
      <xsd:enumeration value="PHP" />
      <xsd:enumeration value="Objective-C" />
      <xsd:enumeration value="C++" />
      <xsd:enumeration value="Javascript" />
      <xsd:enumeration value="Python" />
      <xsd:enumeration value="Fortran" />
      <xsd:enumeration value="VHDL" />
      <xsd:enumeration value="XML" />
      <xsd:enumeration value="SQL" />
      <xsd:enumeration value="Tcl" />
      <xsd:enumeration value="Markdown" />
    </xsd:restriction>
  </xsd:simpleType>
*/

export type DoxLanguage =
  | 'Unknown'
  | 'IDL'
  | 'Java'
  | 'C#'
  | 'D'
  | 'PHP'
  | 'Objective-C'
  | 'C++'
  | 'Javascript'
  | 'Python'
  | 'Fortran'
  | 'VHDL'
  | 'XML'
  | 'SQL'
  | 'Tcl'
  | 'Markdown';

/** Map Doxygen to Markdown language codes */
export const codes: { [key: string]: string } = {
  Unknown: '',
  IDL: '',
  Java: 'java',
  'C#': 'csharp',
  D: 'd',
  PHP: 'php',
  'Objective-C': 'objectivec',
  'C++': 'cpp',
  Javascript: 'javascript',
  Python: 'python',
  Fortran: 'fortran',
  VHDL: 'vhdl',
  XML: 'xml',
  SQL: 'sql',
  Tcl: 'tcl',
  Markdown: 'markdown',
};
