    const request = async (method, url, data) => {

    const accessToken = JSON.parse(localStorage.getItem('auth'))?.accessToken || '';
    try {
        let buildReqest;
        
        if(method === 'GET') {
            if(!accessToken) {
                buildReqest = fetch(url);
            } else {
                buildReqest = fetch(url, {
                    headers: {
                        'X-Authorization': accessToken
                    }
                })
            }
        } else {
            const headers = {
                'content-type': 'application/json'
            };

            if(accessToken) {
                headers['X-Authorization'] = accessToken;
            }
        
            buildReqest = fetch(url, {
                method,
                headers,
                body: JSON.stringify(data)
            })
        }

        const response = await buildReqest;
        let result = null;

        if(response.status === 204) {   
           return result = await response;
        }

        result = await response.json();
        
        return result;
    } catch (err) {
        console.log(err);
    }
}

export const get = request.bind({}, 'GET');
export const post = request.bind({}, 'POST');
export const put = request.bind({}, 'PUT');
export const del = request.bind({}, 'DELETE');