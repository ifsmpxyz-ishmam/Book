exports.handler = async (event, context) => {
    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.BASE_ID;
    const table = 'BookingSystem';

    const url = `https://api.airtable.com/v0/${baseId}/${table}`;
    try {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Airtable error:', data);
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: data.error || 'Airtable request failed' })
            };
        }

        return { statusCode: 200, body: JSON.stringify(data.records) };
    }
    catch (error) {
        console.error('getBookings crashed:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch data from Airtable' }) };
    }
};
