const container = document.getElementById('booking-container');
const addBookingBtn = document.getElementById('add-booking-btn');
const bookingInput = document.getElementById('booking-input');
const bookingDate = document.getElementById('booking-date');
const bookingTime = document.getElementById('booking-time');
const bookingStatus = document.getElementById('booking-status');
async function FetchBookings(params) {
    try {
        const response = await fetch('/.netlify/functions/getBookings');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    }
    catch (error) {
        console.error('Error fetching bookings:', error);
        return [];
    } 
}
function displayBookings(bookings) {
    container.innerHTML = '';
    bookings.forEach((booking, index) => {
        const div = document.createElement('div');
        div.classList.add('booking-div');

        const ticketNumber = document.createElement('div');
        ticketNumber.classList.add('ticket-number');
        ticketNumber.textContent = `TICKET NO. ${String(index + 1).padStart(3, '0')}`;

        const p = document.createElement('p');
        p.textContent = booking.fields['Customer-Name'];

        const meta = document.createElement('div');
        meta.classList.add('booking-meta');
        meta.textContent = `${booking.fields['Date']} · ${booking.fields['Time']}`;

        const divider = document.createElement('div');
        divider.classList.add('divider');

        const status = document.createElement('span');
        const isConfirmed = booking.fields['Status'] === 'Confirmed';
        status.textContent = booking.fields['Status'];
        status.classList.add(isConfirmed ? 'stamp-confirmed' : 'stamp-pending');

        div.append(ticketNumber, p, meta, divider, status);
        container.appendChild(div);
    });
}
a

FetchBookings().then(bookings => {
    displayBookings(bookings);
});
addBookingBtn.addEventListener('click', () => {
    const bookingValue = bookingInput.value.trim();
    
    if (bookingValue) {
        const bookingData = {
            fields: {
                'Customer-Name': bookingValue,
                'Date': bookingDate.value,
                'Time': bookingTime.value,
                'Status': bookingStatus.checked ? 'Confirmed' : 'Pending'
            }
        };

        fetch('/.netlify/functions/addBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookingData)
        })
        .then(response => response.json())
        .then(data => {
            bookingInput.value = '';
            bookingDate.value = '';
            bookingTime.value = '';
            bookingStatus.checked = false;
            FetchBookings().then(bookings => {
                displayBookings(bookings);
            });
        })
        .catch(error => {
            console.error('Error adding booking:', error);
        });
    }
});
