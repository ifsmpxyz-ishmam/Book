exports.handler = async (event, context) => {
    const token = process.env.AIRTABLE_TOKEN;
    const baseId = process.env.BASE_ID;
    const table = 'BookingSystem';
    const recordId = event.path.split('/').pop();
    const url = `https://api.airtable.com/v0/${baseId}/${table}/${recordId}`;
   try{
    const response = await fetch(url, {
        method: 'DELETE',
        headers: {
           'Authorization': `Bearer ${token}`,
            
        },
   });
   const data = await response.json();
   if (!response.ok) {
        throw new Error(data.error.message || 'Failed to delete record from Airtable');
   }
   return { statusCode: 200, body: JSON.stringify(data) }; 
   }
catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to delete data from Airtable' }) };
   }
}
