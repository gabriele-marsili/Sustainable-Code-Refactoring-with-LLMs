import { parse } from './acronym';

describe('Acronyms are produced from', function(){
  it('title cased phrases', function() {
    expect(parse('Portable Network Graphics')).toEqual('PNG');
  });

  it('other title cased phrases', function(){
    expect(parse('Ruby on Rails')).toEqual('ROR');
  });

  it('inconsistently cased phrases', function(){
    expect(parse('HyperText Markup Language')).toEqual('HTML');
  });

  it('phrases with punctuation', function() {
    expect(parse('First In, First Out')).toEqual('FIFO');
  });

  it('other phrases with punctuation', function() {
    expect(parse('PHP: Hypertext Preprocessor')).toEqual('PHP');
  });

  it('phrases with punctuation and sentence casing', function() {
    expect(parse('Complementary metal-oxide semiconductor')).toEqual('CMOS');
  });
});

