import java.util.LinkedList;
import java.util.List;

class SumOfMultiples {
    private int number;
    private int[] set;
    SumOfMultiples(int number, int[] set) {
        this.number = number;
        this.set = set;
//        throw new UnsupportedOperationException("Delete this statement and write your own implementation.");
    }

    int getSum() {
        int sum = 0;
        LinkedList linkedList = new LinkedList();
        if(set.length==0||number<set[0]){
            return 0;
        }else {
            for (int aSet : set) {
                for (int j = aSet; j < number; j++) {
                    if (j % aSet == 0 && !linkedList.contains(j)) {
                        sum += j;
                        linkedList.add(j);
                    }
                }
            }
        }return sum;
//        throw new UnsupportedOperationException("Delete this statement and write your own implementation.");
    }
}
