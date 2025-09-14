var FoodChain = function() {};

FoodChain.prototype.verse = function( verseNum ) {
	/* Sing a verse of a song */
	var verse = lines.opening + lines.first[verseNum];
	// She's dead of course
	if (verseNum >= 8) { return verse; }
	
	var chorusLines = '';
	for (var i = verseNum - 1; i >= 0; i--) {
		chorusLines += lines.chorus[i];
	}
	return verse + chorusLines;
};

FoodChain.prototype.verses = function(stop, start) {
	/* Sings a set of verses of a song */
	var verses = [];
	for(var i = stop; i <= start; i++) {
		verses.push(this.verse(i));
	} 
	return verses.join("\n") + "\n";
};

var lines = {
	/* The lines for the song "I know an old lady who swallowed a fly" */
	opening : "I know an old lady who swallowed ",
	first : [ "",
			  "a fly.\n",
			  "a spider.\nIt wriggled and jiggled and tickled inside her.\n",
			  "a bird.\nHow absurd to swallow a bird!\n",
			  "a cat.\nImagine that, to swallow a cat!\n",
			  "a dog.\nWhat a hog, to swallow a dog!\n",
			  "a goat.\nJust opened her throat and swallowed a goat!\n",
			  "a cow.\nI don't know how she swallowed a cow!\n",
			  "a horse.\nShe's dead, of course!\n",
			],
	chorus : ["I don't know why she swallowed the fly. Perhaps she'll die.\n",
			  "She swallowed the spider to catch the fly.\n",
			  "She swallowed the bird to catch the spider that wriggled and jiggled and tickled inside her.\n",
			  "She swallowed the cat to catch the bird.\n",
			  "She swallowed the dog to catch the cat.\n",
			  "She swallowed the goat to catch the dog.\n",
			  "She swallowed the cow to catch the goat.\n",
			 ],
};

export default FoodChain;