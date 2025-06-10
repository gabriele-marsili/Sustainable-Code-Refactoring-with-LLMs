class MicroBlog {
    public String truncate(String input) {
        return input.length() < 6 ? input : input.substring(0, input.offsetByCodePoints(0, 5));
    }
}

//        if (input.length() < 6) {
//            return input;
//        }
//        return input
//                .codePoints()
//                .limit(5)
//                .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
//                .toString();
