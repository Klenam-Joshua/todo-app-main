import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const updateStatus = (navigate, token, userId, id) => {

    let notFound = false;
    let responseError = false;
    let responseText = null;
    const updatestatus = async function () {


        // const [notFound, setNotFound] = useState(false);



        const url = 'http://127.0.0.1:8000/api/';
        const headers = {
            'content-Type': 'application/json',
            'token': ` Bearer ${token}`,
            'userId': userId

        }
        try {

            let response = await fetch(`${url}updatestatus/${id}`, {
                method: "PUT",
                headers
            });
            if (response.status === 401) {
                navigate('/login');
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

    updatestatus()


}




export default updateStatus
