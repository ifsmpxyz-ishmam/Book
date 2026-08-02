exports.handler = async (event,context) => {
    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const table = 'BookingSystem';

    const url = `https://api.airtable.com/v0/${baseId}/${table}`;
    try{
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        return { statusCode: 200, body: JSON.stringify(data.records) };
    }
    catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch data from Airtable' }) };
    }
};
