import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Year;
import java.time.format.DateTimeFormatter;

class AppointmentScheduler {
    public LocalDateTime schedule(String appointmentDateDescription) {
        DateTimeFormatter parser = DateTimeFormatter.ofPattern("M/d/yyyy H:mm:ss");
        LocalDateTime dateTime = LocalDateTime.parse(appointmentDateDescription, parser);
        return dateTime;
    }

    public boolean hasPassed(LocalDateTime appointmentDate) {
        return appointmentDate.isBefore(LocalDateTime.now());
    }

    public boolean isAfternoonAppointment(LocalDateTime appointmentDate) {
        int hour = appointmentDate.getHour();
        if (hour >= 12 && hour < 18) {
            return true;
        }
        return false;
    }

    public String getDescription(LocalDateTime appointmentDate) {
        DateTimeFormatter dateString = DateTimeFormatter.ofPattern("MMMM d, yyyy");
        DateTimeFormatter timeString = DateTimeFormatter.ofPattern("h:mm a");
        String dayOfWeek = appointmentDate.getDayOfWeek().toString();

        // Convert dayOfWeek string to Title Case
        dayOfWeek = dayOfWeek.substring(0, 1).toUpperCase() 
            + dayOfWeek.substring(1).toLowerCase();

        return String.format(
            "You have an appointment on %s, %s, at %s.", 
            dayOfWeek, 
            dateString.format(appointmentDate), 
            timeString.format(appointmentDate).toUpperCase()
            );
    }

    public LocalDate getAnniversaryDate() {
        return LocalDate.of(Year.now().getValue(), 9, 15);
    }
}
