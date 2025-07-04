public class ElonsToyCar {
    private int battery;
    private int distanceDriven;

    public ElonsToyCar() {
        this.battery = 100;
        this.distanceDriven = 0;
    }

    public static ElonsToyCar buy() {
        return new ElonsToyCar();
    }

    public String distanceDisplay() {
        return "Driven " + this.distanceDriven + " meters";
    }

    public String batteryDisplay() {
        if (this.battery == 0) {
            return "Battery empty";
        } else {
            return "Battery at " + this.battery + "%";  
        }
    }

    public void drive() {
        if (this.battery > 0) {
            this.battery -= 1;
            this.distanceDriven += 20;
        }
    }
}
