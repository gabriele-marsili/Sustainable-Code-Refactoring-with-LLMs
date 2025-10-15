import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

class AppointmentScheduler {
    public LocalDateTime schedule(String appointmentDateDescription) {
        var formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss");
        return LocalDateTime.parse(appointmentDateDescription, formatter);
    }

    public boolean hasPassed(LocalDateTime appointmentDate) {
        var now = LocalDateTime.now();
        return appointmentDate.isBefore(now);
    }

    public boolean isAfternoonAppointment(LocalDateTime appointmentDate) {
        var hour = appointmentDate.getHour();
        return hour >= 12 && hour < 18;
    }

    String uppercaseToCapitilize(String str) {
        StringBuilder result = new StringBuilder();
        result.append(str.charAt(0));
        for (int i = 1; i < str.length(); i++) {
            result.append((char) (str.charAt(i) + 32));
        }
        return result.toString();
    }

    public String getDescription(LocalDateTime appointmentDate) {
        var day = appointmentDate.getDayOfMonth();
        var dayOfWeek = uppercaseToCapitilize(appointmentDate.getDayOfWeek().name());
        var month = uppercaseToCapitilize(appointmentDate.getMonth().name());
        var year = appointmentDate.getYear();
        var hour = appointmentDate.getHour();
        String ampm = hour > 11 ? "PM" : "AM";
        if (ampm.equals("PM")) {
            hour %= 12;
        }
        var minutes = appointmentDate.getMinute();
        String zero = minutes < 10 ? "0" : "";
        return "You have an appointment on " + dayOfWeek + ", " + month + " " + day + ", " + year
                + ", at " + hour + ":" + zero + minutes + " " + ampm + ".";
    }

    public LocalDate getAnniversaryDate() {
        var year = LocalDate.now().getYear();
        return LocalDate.of(year, 9, 15);
    }
}
