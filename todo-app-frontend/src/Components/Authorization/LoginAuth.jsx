import { useNavigate } from "react-router-dom";
const checkAuthorization = (token, user) => {
    const navigate = useNavigate()
    if ((!token || !user.id)) {
        navigate('/login');

    }
}

export default checkAuthorization;
