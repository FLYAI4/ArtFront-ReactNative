const BASE_URL = process.env.BASE_URL 

export const getContentText = async () => {
    const response = await fetch(`${BASE_URL}/user/content/text/demo?generated_id=demo`, {
      headers: {
        'id': '1',
        'token': '1'
      }
    });
    const data = await response.json();
    return data;
}