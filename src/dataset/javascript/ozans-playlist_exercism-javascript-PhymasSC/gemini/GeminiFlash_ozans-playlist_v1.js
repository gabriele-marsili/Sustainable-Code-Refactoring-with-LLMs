// @ts-check
//
// The line above enables type checking for this file. Various IDEs interpret
// the @ts-check directive. It will give you helpful autocompletion when
// implementing this exercise.

/**
 * Removes duplicate tracks from a playlist.
 *
 * @param {string[]} playlist
 * @returns {string[]} new playlist with unique entries
 */
export function removeDuplicates(playlist) {
	if (!playlist) {
		return [];
	}
	const uniqueTracks = [];
	const seen = new Set();

	for (const track of playlist) {
		if (!seen.has(track)) {
			uniqueTracks.push(track);
			seen.add(track);
		}
	}

	return uniqueTracks;
}

/**
 * Checks whether a playlist includes a track.
 *
 * @param {string[]} playlist
 * @param {string} track
 * @returns {boolean} whether the track is in the playlist
 */
export function hasTrack(playlist, track) {
	if (!playlist) {
		return false;
	}
	return playlist.includes(track);
}

/**
 * Adds a track to a playlist.
 *
 * @param {string[]} playlist
 * @param {string} track
 * @returns {string[]} new playlist
 */
export function addTrack(playlist, track) {
	if (!playlist) {
		return [track];
	}

	if (playlist.includes(track)) {
		return playlist;
	}

	const newPlaylist = [...playlist, track];
	return removeDuplicates(newPlaylist);
}

/**
 * Deletes a track from a playlist.
 *
 * @param {string[]} playlist
 * @param {string} track
 * @returns {string[]} new playlist
 */
export function deleteTrack(playlist, track) {
	if (!playlist) {
		return [];
	}

	const newPlaylist = [];
	for (const song of playlist) {
		if (song !== track) {
			newPlaylist.push(song);
		}
	}
	return newPlaylist;
}

/**
 * Lists the unique artists in a playlist.
 *
 * @param {string[]} playlist
 * @returns {string[]} list of artists
 */
export function listArtists(playlist) {
	if (!playlist) {
		return [];
	}

	const artists = new Set();
	for (const track of playlist) {
		const artist = track.split("-")[1]?.trim();
		if (artist) {
			artists.add(artist);
		}
	}
	return Array.from(artists);
}