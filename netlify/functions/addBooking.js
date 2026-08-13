exports.handler = async (event, context) => {
    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.BASE_ID;
    const table = 'BookingSystem';
        const url = `https://api.airtable.com/v0/${baseId}/${table}`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            body: event.body
        });
        const data = await response.json();
        return { statusCode: 200, body: JSON.stringify(data) };
    } catch (error) {
        console.error('Error adding Booking:', error);
        return { statusCode: 500, body:  JSON.stringify({ error: 'Failed to add booking' }) };
       
    }
}
