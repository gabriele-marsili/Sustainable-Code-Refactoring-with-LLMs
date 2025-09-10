var FoodChain = function() {};

FoodChain.prototype.verse = function( verseNum ) {
	var verse = "I know an old lady who swallowed ";
	switch (verseNum) {
		case 1:
			verse += "a fly.\n";
			break;
		case 2:
			verse += "a spider.\nIt wriggled and jiggled and tickled inside her.\n";
			verse += "She swallowed the spider to catch the fly.\n";
			verse += "I don't know why she swallowed the fly. Perhaps she'll die.\n";
			break;
		case 3:
			verse += "a bird.\nHow absurd to swallow a bird!\n";
			verse += "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n";
			verse += "She swallowed the spider to catch the fly.\n";
			verse += "I don't know why she swallowed the fly. Perhaps she'll die.\n";
			break;
		case 4:
			verse += "a cat.\nImagine that, to swallow a cat!\n";
			verse += "She swallowed the cat to catch the bird.\n";
			verse += "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n";
			verse += "She swallowed the spider to catch the fly.\n";
			verse += "I don't know why she swallowed the fly. Perhaps she'll die.\n";
			break;
		case 5:
			verse += "a dog.\nWhat a hog, to swallow a dog!\n";
			verse += "She swallowed the dog to catch the cat.\n";
			verse += "She swallowed the cat to catch the bird.\n";
			verse += "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n";
			verse += "She swallowed the spider to catch the fly.\n";
			verse += "I don't know why she swallowed the fly. Perhaps she'll die.\n";
			break;
		case 6:
			verse += "a goat.\nJust opened her throat and swallowed a goat!\n";
			verse += "She swallowed the goat to catch the dog.\n";
			verse += "She swallowed the dog to catch the cat.\n";
			verse += "She swallowed the cat to catch the bird.\n";
			verse += "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n";
			verse += "She swallowed the spider to catch the fly.\n";
			verse += "I don't know why she swallowed the fly. Perhaps she'll die.\n";
			break;
		case 7:
			verse += "a cow.\nI don't know how she swallowed a cow!\n";
			verse += "She swallowed the cow to catch the goat.\n";
			verse += "She swallowed the goat to catch the dog.\n";
			verse += "She swallowed the dog to catch the cat.\n";
			verse += "She swallowed the cat to catch the bird.\n";
			verse += "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n";
			verse += "She swallowed the spider to catch the fly.\n";
			verse += "I don't know why she swallowed the fly. Perhaps she'll die.\n";
			break;
		case 8:
			verse += "a horse.\nShe's dead, of course!\n";
			break;
		default:
			return "";
	}
	return verse;
};

FoodChain.prototype.verses = function(start, stop) {
	var verses = '';
	for(var i = start; i <= stop; i++) {
		verses += this.verse(i) + "\n";
	}
	return verses;
};

export default FoodChain;