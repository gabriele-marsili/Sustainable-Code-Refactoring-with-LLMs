# Clusters with Invalid Entries - Quick Reference
**Total clusters with issues:** 53
**Total invalid entries:** 3833

---

## Top 20 Most Problematic Clusters

| Rank | Cluster | Invalid Entries | Primary Language | Main Issue |
|------|---------|-----------------|------------------|------------|
| 1 | `raindrops` | 600 | c | Zero time (600) |
| 2 | `leap` | 540 | c | Zero time (540) |
| 3 | `pangram` | 421 | c | Zero time (420) |
| 4 | `anagram` | 210 | cpp | NULL values (630) |
| 5 | `all_your_base` | 139 | cpp | Failed tests (139) |
| 6 | `allergies` | 130 | cpp | NULL values (390) |
| 7 | `clock` | 98 | cpp | NULL values (294) |
| 8 | `word_count` | 98 | cpp | Zero time (96) |
| 9 | `grains` | 90 | cpp | Zero time (80) |
| 10 | `meetup` | 83 | cpp | Zero time (81) |
| 11 | `prime_factors` | 77 | cpp | Zero time (71) |
| 12 | `queen_attack` | 76 | cpp | Zero time (76) |
| 13 | `collatz_conjecture` | 74 | c | Zero time (74) |
| 14 | `binary` | 73 | c | NULL values (219) |
| 15 | `armstrong_numbers` | 72 | cpp | Failed tests (72) |
| 16 | `gigasecond` | 69 | cpp | Zero time (54) |
| 17 | `perfect_numbers` | 62 | c | Failed tests (62) |
| 18 | `atbash_cipher` | 60 | c | NULL values (180) |
| 19 | `bracket_push` | 60 | cpp | NULL values (180) |
| 20 | `hamming` | 60 | cpp | Zero time (54) |

## Language Distribution in Problematic Clusters

| Language | Invalid Entries | % of Total Invalid |
|----------|-----------------|--------------------|
| cpp | 1824 | 47.59% |
| c | 1775 | 46.31% |
| java | 121 | 3.16% |
| javascript | 49 | 1.28% |
| Java | 31 | 0.81% |
| typescript | 19 | 0.50% |
| go | 10 | 0.26% |
| python | 4 | 0.10% |

## Complete List of Problematic Clusters

| Cluster Name | Invalid | Languages Affected | Error Breakdown |
|--------------|---------|--------------------|-----------------|
| `raindrops` | 600 | c(420), cpp(180) | NULL:0, Zero:600, Failed:420 |
| `leap` | 540 | c(360), cpp(180) | NULL:0, Zero:540, Failed:360 |
| `pangram` | 421 | c(300), cpp(120), Java(1) | NULL:2, Zero:420, Failed:300 |
| `anagram` | 210 | cpp(120), c(90) | NULL:630, Zero:0, Failed:210 |
| `all_your_base` | 139 | cpp(73), c(66) | NULL:0, Zero:139, Failed:139 |
| `allergies` | 130 | cpp(65), java(60), c(5) | NULL:390, Zero:0, Failed:130 |
| `clock` | 98 | cpp(98) | NULL:294, Zero:0, Failed:98 |
| `word_count` | 98 | cpp(64), c(32), javascript(2) | NULL:6, Zero:96, Failed:45 |
| `grains` | 90 | cpp(60), c(20), typescript(10) | NULL:30, Zero:80, Failed:30 |
| `meetup` | 83 | cpp(72), c(11) | NULL:6, Zero:81, Failed:14 |
| `prime_factors` | 77 | cpp(60), c(17) | NULL:18, Zero:71, Failed:36 |
| `queen_attack` | 76 | cpp(60), c(16) | NULL:0, Zero:76, Failed:16 |
| `collatz_conjecture` | 74 | c(59), cpp(15) | NULL:0, Zero:74, Failed:59 |
| `binary` | 73 | c(50), cpp(23) | NULL:219, Zero:0, Failed:73 |
| `armstrong_numbers` | 72 | cpp(72) | NULL:0, Zero:72, Failed:72 |
| `gigasecond` | 69 | cpp(38), c(16), java(15) | NULL:45, Zero:54, Failed:33 |
| `perfect_numbers` | 62 | c(62) | NULL:0, Zero:62, Failed:62 |
| `atbash_cipher` | 60 | c(30), cpp(30) | NULL:180, Zero:0, Failed:60 |
| `bracket_push` | 60 | cpp(60) | NULL:180, Zero:0, Failed:60 |
| `hamming` | 60 | cpp(30), c(24), java(6) | NULL:18, Zero:54, Failed:30 |
| `say` | 60 | cpp(60) | NULL:45, Zero:45, Failed:17 |
| `rna_transcription` | 59 | cpp(39), c(20) | NULL:0, Zero:59, Failed:23 |
| `scrabble_score` | 52 | cpp(42), c(10) | NULL:9, Zero:49, Failed:13 |
| `crypto_square` | 45 | cpp(45) | NULL:0, Zero:45, Failed:0 |
| `binary_search` | 44 | cpp(44) | NULL:132, Zero:0, Failed:44 |
| `isogram` | 44 | c(29), cpp(15) | NULL:0, Zero:44, Failed:29 |
| `grade_school` | 42 | cpp(38), c(4) | NULL:0, Zero:42, Failed:6 |
| `luhn` | 40 | c(23), cpp(17) | NULL:21, Zero:33, Failed:31 |
| `reverse_string` | 30 | c(15), cpp(15) | NULL:45, Zero:15, Failed:15 |
| `bob` | 26 | cpp(16), c(10) | NULL:78, Zero:0, Failed:21 |
| `beer_song` | 25 | cpp(25) | NULL:75, Zero:0, Failed:25 |
| `dnd_character` | 25 | c(15), java(10) | NULL:30, Zero:15, Failed:25 |
| `difference_of_squares` | 21 | cpp(17), c(4) | NULL:63, Zero:0, Failed:21 |
| `two_fer` | 21 | cpp(15), c(5), javascript(1) | NULL:3, Zero:20, Failed:6 |
| `pascals_triangle` | 19 | cpp(15), c(4) | NULL:0, Zero:19, Failed:4 |
| `acronym` | 15 | c(15) | NULL:45, Zero:0, Failed:15 |
| `cluster_hashtag_generator.test.js` | 15 | javascript(15) | NULL:45, Zero:0, Failed:15 |
| `eliuds_eggs` | 15 | c(15) | NULL:0, Zero:15, Failed:15 |
| `hashtag_generator.test.js` | 15 | javascript(15) | NULL:45, Zero:0, Failed:15 |
| `house` | 15 | Java(15) | NULL:45, Zero:0, Failed:15 |
| `human_readable_numbers.test.js` | 15 | javascript(15) | NULL:45, Zero:0, Failed:15 |
| `need_for_speed` | 15 | Java(15) | NULL:45, Zero:0, Failed:15 |
| `nth_prime` | 15 | c(15) | NULL:45, Zero:0, Failed:15 |
| `octal` | 15 | java(15) | NULL:45, Zero:0, Failed:15 |
| `strain` | 15 | java(15) | NULL:45, Zero:0, Failed:15 |
| `alphametics` | 10 | go(10) | NULL:30, Zero:0, Failed:10 |
| `square_root` | 6 | c(6) | NULL:0, Zero:6, Failed:6 |
| `two_bucket` | 6 | typescript(6) | NULL:18, Zero:0, Failed:6 |
| `accumulate_full` | 4 | typescript(3), javascript(1) | NULL:9, Zero:0, Failed:4 |
| `find_peak_element` | 4 | python(4) | NULL:12, Zero:0, Failed:4 |
| `rotational_cipher` | 4 | c(4) | NULL:0, Zero:4, Failed:4 |
| `list_ops` | 3 | c(3) | NULL:0, Zero:3, Failed:3 |
| `binary_search_tree` | 1 | cpp(1) | NULL:3, Zero:0, Failed:1 |
