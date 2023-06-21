import React from 'react'
import { json } from 'react-router-dom';
const apiUrl = import.meta.env.VITE_API_URL;

const updatePriority = (token, userId, elementBeingDraggedId, elementBeingDraggedOnId) => {
    const updatepriority = () => {



        const requestData = {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
                'token': `Bearer ${token}`,
                'userId': userId,

            },
            body: JSON.stringify({
                'elementBeingDraggedId': elementBeingDraggedId,
                'elementBeingDraggedOnId': elementBeingDraggedOnId,
            })
        }

        fetch(`${apiUrl}updatepriority`, requestData)
            .then((response) => {
                if (!response.ok) {

                }
                else if (response.status === 200) {
                    return response.json();
                }
            }).then((message) => {

            })

    }


    updatepriority()
}

export default updatePriority


//export default updateIndex()