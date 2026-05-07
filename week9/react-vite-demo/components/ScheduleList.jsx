import ScheduleItem from "./ScheduleItem";

function ScheduleList({ bookings }) {

    if (bookings.length === 0) {
        return (
            <h3>Schedule is clear.</h3>
        );
    }
    
    return (
        <>
            <h3>Schedule</h3>
            {bookings.map((b, index) => (
                <ScheduleItem key={index} booking={b} />
            ))}
        </>
    );
}

export default ScheduleList;

