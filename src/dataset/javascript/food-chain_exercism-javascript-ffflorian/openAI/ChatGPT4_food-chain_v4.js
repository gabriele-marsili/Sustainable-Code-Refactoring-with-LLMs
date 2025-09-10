//@ts-check

/**
 * @typedef {{
 *   catch?: string
 *   end?: string;
 *   last?: true;
 *   message: string;
 *   type: string;
 *   why?: string;
 * }} Verse
 */

export class Song {
  constructor() {
    /**
     * @private
     * @type {Verse[]}
     */
    this._verses = [
      { end: " Perhaps she'll die.\n", message: '', type: 'fly' },
      { catch: 'fly', message: 'It wriggled and jiggled and tickled inside her.\n', type: 'spider' },
      { catch: 'spider that wriggled and jiggled and tickled inside her', message: 'How absurd to swallow a bird!\n', type: 'bird' },
      { catch: 'bird', message: 'Imagine that, to swallow a cat!\n', type: 'cat' },
      { catch: 'cat', message: 'What a hog, to swallow a dog!\n', type: 'dog' },
      { catch: 'dog', message: 'Just opened her throat and swallowed a goat!\n', type: 'goat' },
      { catch: 'goat', message: "I don't know how she swallowed a cow!\n", type: 'cow' },
      { last: true, message: "She's dead, of course!\n", type: 'horse', why: 'catch' },
    ];
  }

  /**
   * @param {number} index
   * @returns {string}
   */
  verse(index) {
    const verseData = this._verses[index - 1];
    const lines = [`I know an old lady who swallowed a ${verseData.type}.\n${verseData.message}`];
    for (let i = index - 1; i >= 0; i--) {
      const v = this._verses[i];
      if (v.last) break;
      lines.push(v.catch ? `She swallowed the ${v.type} to catch the ${v.catch}.\n` : `I don't know why she swallowed the ${v.type}.${v.end || ''}`);
    }
    return lines.join('');
  }

  /**
   * @param {number} begin
   * @param {number} end
   * @returns {string}
   */
  verses(begin, end) {
    return Array.from({ length: end - begin + 1 }, (_, i) => this.verse(begin + i)).join('\n') + '\n';
  }
}