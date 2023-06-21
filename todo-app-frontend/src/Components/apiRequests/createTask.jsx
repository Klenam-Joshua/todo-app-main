
const apiUrl = import.meta.env.VITE_API_URL;
const createTask = (data, token, userId) => {
    const createtask = async function () {
        let responseError = false;


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

            let response = await fetch(`${apiUrl}createtask`, requestOptions);

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
