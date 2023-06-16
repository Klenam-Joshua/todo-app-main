import { useNavigate } from "react-router-dom";
const checkAuthorization = (navigate, data) => {

    if (data) {
        if ((!data.usertoken || !data.user.id)) {
            navigate('/login');

        }
    }
    else {
        navigate('/login');
    }
}

export default checkAuthorization;
