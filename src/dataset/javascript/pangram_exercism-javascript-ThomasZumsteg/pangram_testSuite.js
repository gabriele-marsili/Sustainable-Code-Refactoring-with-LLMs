import Pangram from './pangram';

describe('Pangram()', function()  {

  it('empty sentence', function() {
    var pangram = new Pangram('');
    expect(pangram.isPangram()).toBe(false);
  });

  it('pangram with only lower case', function()  {
    var pangram = new Pangram("the quick brown fox jumps over the lazy dog");
    expect(pangram.isPangram()).toBe(true);
  });

  it("missing character 'x'", function()  {
    var pangram = new Pangram("a quick movement of the enemy will jeopardize five gunboats");
    expect(pangram.isPangram()).toBe(false);
  });

  it('pangram with mixed case and punctuation', function()  {
    var pangram = new Pangram("\"Five quacking Zephyrs jolt my wax bed.\"");
    expect(pangram.isPangram()).toBe(true);
  });

  it('pangram with non-ascii characters', function()  {
    var pangram = new Pangram("Victor jagt zwölf Boxkämpfer quer über den großen Sylter Deich.");
    expect(pangram.isPangram()).toBe(true);
  });

});
