

const createTask = (data, token, userId) => {
    const createtask = async function () {
        let responseError = false;

        const url = 'http://127.0.0.1:8000/api/';
        const requestOptions = {
            method: "POST",
            headers: {
                'content-Type': 'application/json',
                'token': ` Bearer ${token}`,
                'userId': userId

            },
            body: JSON.stringify(data)
        }
        try {

            let response = await fetch(`${url}createtask`, requestOptions);

            if (response.status === 401) {
                navigate('/login');
            }

            if (!response.ok) {

                responseError = true;
            }

            else if (response.status === 200) {
                let responseText = await response.text();


            }
        }
        catch (error) {
            console.log(error);
        }
    }

    createtask()

}

export default createTask
