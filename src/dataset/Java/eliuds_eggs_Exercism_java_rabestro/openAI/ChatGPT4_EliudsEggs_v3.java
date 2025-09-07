public class EliudsEggs {
    public int eggCount(int number) {
        int count = 0;
        while (number != 0) {
            count++;
            number &= (number - 1);
        }
        return count;
    }
}