import 'mocha';
import { expect } from 'chai';

import parseXml, { Element } from '@rgrove/parse-xml';

import note from './note';

describe('note', () => {
  const render = (xml: string) => {
    const {
      children: [root],
    } = parseXml(xml);
    return note(root as Element);
  };

  specify('empty', () => {
    const xml = `<simplesect kind="note"></simplesect>`;
    const md = `\n:::note\n\n:::\n`;
    expect(render(xml)).to.equal(md);
  });
  specify('one paragraph', () => {
    const xml = `<simplesect kind="note">
          <para>First paragraph.</para>
      </simplesect>`;
    const md = `\n:::note\nFirst paragraph.\n\n:::\n`;
    expect(render(xml)).to.equal(md);
  });
  specify('several paragraphs', () => {
    const xml = `<simplesect kind="note">
          <para>First paragraph.</para>
          <para>Second paragraph.</para>
      </simplesect>`;
    const md = `\n:::note\nFirst paragraph.\n\\\nSecond paragraph.\n\n:::\n`;
    expect(render(xml)).to.equal(md);
  });
});
