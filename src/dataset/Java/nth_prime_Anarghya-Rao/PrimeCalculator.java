class PrimeCalculator {

    int nth(int nth) {
//        throw new UnsupportedOperationException("Delete this statement and write your own implementation.");
        int counter = 0, remainder = 0;
        int dividend = 2, divisor = 2;
        boolean flag = true;

        if(nth < 1)
            throw new IllegalArgumentException();

        while(counter != nth){

            flag = true;

            for(divisor=2; divisor<dividend; divisor++){
                remainder = dividend % divisor;

                if(remainder == 0){
                    flag = false;
                    break;
                }
            }

            if(flag)
                counter += 1;

            dividend += 1;
        }

        return dividend-1;

    }

}
