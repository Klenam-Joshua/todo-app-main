import React from 'react'

const updatePriority = (token, userId, elementBeingDraggedId, elementBeingOnId) => {
    const updatepriority = () => {

        const url = 'http://127.0.0.1:8000/api/';

        const requestData = {
            method: 'PUT',
            headers: {
                'content-Type': 'application/json',
                'token': ` Bearer ${token}`,
                'userId': userId,

            },
            body: {
                'elementBeingDraggedId': elementBeingDraggedId,
                'elementBeingOnId': elementBeingOnId,
            }
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
    }


}

export default updatePriority
