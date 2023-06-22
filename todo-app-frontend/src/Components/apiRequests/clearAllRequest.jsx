import React from 'react'
import { useState } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;

const deleteCompletedTasks = (token, userId) => {
    let notFound = false;
    let responseError = false;
    let responseText = null;
    const deletecomletedtasks = async function () {


        // const [notFound, setNotFound] = useState(false);




        const headers = {
            'content-Type': 'application/json',
            'token': ` Bearer ${token}`,
            'userId': userId

        }
        try {

            let response = await fetch(`${apiUrl}clearallcompletes/`, {
                method: "DELETE",
                headers
            });
            if (response.status === 401) {
                /// navigate('/login');
            }
            else if (response.status === 404) {
                notFound = true;
            }

            if (!response.ok) {
                responseError = true;
            }

            else if (response.status === 200) {
                responseText = await response.text();

                // console.log(currentFilteredData + "ji")



                //console.log(data)
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    deletecomletedtasks()



}




export default deleteCompletedTasks;
