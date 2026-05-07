
function ScheduleItem({ booking }) {
    return (
        <div>
            {booking.name}: {booking.date} @ {booking.time}
        </div>
    );
}

export default ScheduleItem;

