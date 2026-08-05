const container = document.getElementById('booking-container');
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
    bookings.forEach(booking => {
        const div= document.createElement('div');
        const p = document.createElement('p');
        const status = document.createElement('span');
         p.textContent = `Customer-Name: ${booking.fields['Customer-Name']}, Time: ${booking.fields['Time']}, Date: ${booking.fields['Date']}`;
        status.textContent = `Status: ${booking.fields['Status']}`;
        div.classList.add('booking');;
        div.appendChild(p);
        div.appendChild(status);
        container.appendChild(div);
    });
}
FetchBookings().then(bookings => {
    displayBookings(bookings);
});






