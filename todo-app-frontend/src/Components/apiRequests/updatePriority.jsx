import React from 'react'
import { json } from 'react-router-dom';

const updatePriority = (token, userId, elementBeingDraggedId, elementBeingDraggedOnId) => {
    const updatepriority = () => {

        const url = 'http://127.0.0.1:8000/api/';

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

        fetch(`${url}updatepriority`, requestData)
            .then((response) => {
                if (!response.ok) {

                }
                else if (response.status === 200) {
                    return response.json();
                }
            }).then((message) => {
                console.log(message)
            })
        console.log(requestData);
    }


    updatepriority()
}

export default updatePriority


//export default updateIndex()