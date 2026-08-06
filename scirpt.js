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
