enum MeetupSchedule {
    FIRST,
    SECOND,
    THIRD,
    FOURTH,
    LAST,
    TEENTH;

    private static final MeetupSchedule[] VALUES = values();

    public static MeetupSchedule fromOrdinal(int ordinal) {
        return (ordinal >= 0 && ordinal < VALUES.length) ? VALUES[ordinal] : null;
    }
}