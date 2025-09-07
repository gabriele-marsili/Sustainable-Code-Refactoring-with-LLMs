public class EliudsEggs {
    public int eggCount(int number) {
        return Integer.bitCount(number); // Already optimized as Integer.bitCount uses efficient bitwise operations
    }
}