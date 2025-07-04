public class ElonsToyCar {
    private int distance = 0;
    private int battery = 100;

    public static ElonsToyCar buy() {
//        throw new UnsupportedOperationException("Please implement the (static) RemoteControlCar.buy()  method");
        return new ElonsToyCar();
    }

    public String distanceDisplay() {
//        throw new UnsupportedOperationException("Please implement the RemoteControlCar.distanceDisplay()  method");
        return "Driven " + distance + " meters";
    }

    public String batteryDisplay() {
//        throw new UnsupportedOperationException("Please implement the RemoteControlCar.batteryDisplay()  method");
        return battery == 0 ? "Battery empty" : "Battery at " + battery + "%";
    }

    public void drive() {
//        throw new UnsupportedOperationException("Please implement the RemoteControlCar.drive()  method");
        if (battery > 0) {
            distance += 20;
            battery -= 1;
        }
    }
}
