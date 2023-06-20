import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteRequest from '../apiRequests/DeleteRequest';
import checkAuthorization from '../Authorization/LoginAuth';
import updateStatus from '../apiRequests/updateStatus';
import updatePriority from '../apiRequests/updatePriority';
import deleteCompletedTasks from '../apiRequests/clearAllRequest';
import { imgBgDesktopDark, imgBgDesktopLight, imgBgMobileDark, imgBgMobileLight, iconCheck, iconCross, iconLogout }
    from '../../Components/Images';

import Login from '../Login/Login';
import './Todo.css';
import createTask from '../apiRequests/createTask';


const Todo = ({ modes, style, icon }) => {
    const navigate = useNavigate();

    let isDarkMode = localStorage.getItem("DARKMODE");
    const dataText = localStorage.getItem("LoginItem");
    const dataJson = JSON.parse(dataText);
    useEffect(() => {
        checkAuthorization(navigate, dataJson);
    }, [])


    const [token, setToken] = useState(dataJson?.usertoken);
    const [user, setUser] = useState(dataJson?.user);
    const [data, setData] = useState(null);
    const [filteredData, setFilteredData] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [responseError, setResponseError] = useState(false);
    const [filterOption, setFilterOption] = useState("All");
    const [time, setTime] = useState(null)
    const [darkMode, setDarkMode] = useState(isDarkMode === "true");
    const [open, setOpen] = useState(false);
    const [todoTitle, setTodoTitle] = useState(null);


    /**========drag and drop===== */

    const [beingDragged, setBeingDragged] = useState(null);
    const [dragEntered, setDragEntered] = useState(-1);
    const [dropped, setDropped] = useState(null);
    const [beingDraggedId, setBeingDraggedId] = useState(-1);

    const handleDragEnter = (e, id) => {

        setDragEntered(id)


    }
    const handleDragOver = (e) => {
        e.preventDefault()

    }

    const handleDragDrop = (itemId) => {
        setDragEntered(-1);
        updatePriority(token, user.id, beingDraggedId, itemId);

    }

    /** end of drag and drop */



    const createTodo = (e) => {
        e.preventDefault();
        const requestData = {
            title: todoTitle,
            status: "active",
            priority: data.All.length + 1,
            startTime: time

        }
        createTask(requestData, token, user.id)
    }


    const setActiveButton = (option) => {
        return localStorage.getItem("filterOption") === option ? "active" : "option"
    }

    const toggleMode = () => {
        setDarkMode(prevMode => !prevMode);

    }


    useEffect(
        () => {
            modes(darkMode);

        }, [darkMode])
    useEffect(() => {

        async function fetchTodos() {
            const url = 'http://127.0.0.1:8000/api/';
            const headers = {
                'content-Type': 'application/json',
                'token': ` Bearer ${token}`,
                'userId': user?.id

            }
            try {

                let response = await fetch(`${url}tasks`, { headers });
                if (response.status === 401) {
                    navigate('/login');
                }
                else if (response.status === 404) {
                    setNotFound(true);
                }

                if (!response.ok) {
                    setResponseError(true);
                }

                else if (response.status === 200) {
                    let data = await response.json();
                    setData(data);

                    let filterOption1 = localStorage.getItem("filterOption");
                    if (!filterOption) {
                        setFilteredData(data["All"]);
                    }
                    else {
                        setFilteredData(data[filterOption1]);

                    }

                }
            }
            catch (error) {
                console.log(error);
            }
        }

        fetchTodos();
        let interval = setInterval(fetchTodos, 1500);
        return (() => {
            clearInterval(interval);
        })
    }, [])



    const conditions = {
        All: function () { setFilteredData(data.All) },
        Completed: function () { setFilteredData(data.Completed) },
        Active: function () { setFilteredData(data.Active) }
    }


    /**=============logout function =========== */
    const logout = () => {
        localStorage.removeItem("LoginItem");
        navigate('/login');
    }

    const options = ["All", "Completed", "Active"];

    return (
        <main className="container" style={style ? style.body : {}}>
            <header style={style.head} id='header'>
                <div id="userInfo">
                    <p onClick={() => setOpen(!open)}
                        className="text-right ">{user?.name}
                        <span id='logoutIcon'>
                            <img src={iconLogout} alt="logout-icon" />
                        </span>
                    </p>
                    <div className={open ? "exitbox d-block" : "d-none exitbox"}
                    >
                        <ul>
                            <li role="button"
                                onClick={() => logout()}
                            >logout</li>

                        </ul>
                    </div>

                </div>
                <div className="row  w-5  justify-between align-center" id='modeIconCont'>
                    <h1 className='text-light' id='title'>
                        TODO
                    </h1>
                    <div style={style ? style.icons : {}} className="image-container"
                        onClick={() => toggleMode()}
                    >
                        <img src={icon} alt="modeIcon" />
                    </div>

                </div>

                <div style={style ? style.todosContainer : {}} className="row  w-5  justify-between " id='search_bar_con'>
                    <div className="circle-con   row justify-center align-center">
                        <div className="circle  " id="circle1">

                        </div>
                    </div>
                    <div className='text-field_con'>
                        <form
                            onSubmit={(e) => {
                                createTodo(e)
                            }}
                        >
                            <input
                                style={style ? style.todosContainer : {}}
                                type="text" placeholder='Create new todo'
                                onChange={(e) => setTodoTitle(e.target.value)}
                            />
                            <input
                                onChange={(e) => setTime(e.target.value)}
                                type="time" id="time_selector" />
                            <span className="tooltip">pick start time</span>
                        </form>
                    </div>
                </div>
            </header>
            <section style={style ? style.todosContainer : {}}
                className=" w-5  " id='contents'>
                {filteredData?.length < 1 ? <p className='text-center py-1  instruction' > nothing to show</p> :


                    filteredData?.map((item, index) => {
                        return (

                            item.status === 'completed' ?
                                <div
                                    key={index}
                                    onDragStart={(e) => {
                                        setBeingDragged(e.target)

                                        setBeingDraggedId(item.id)
                                    }}

                                    onDragEnter={(e) => handleDragEnter(e, index)}
                                    onDragOver={(e) => handleDragOver(e)}
                                    onDrop={() => handleDragDrop(item.id)}

                                    style={style.todos} className={dragEntered === index ? " row  py-1 task  border_solid_blue" : "row  py-1 task"} draggable='true' >
                                    <div
                                        onClick={() => updateStatus(navigate, token, user.id, item.id)}
                                        className="circle-con pl-0_5 row justify-center align-center">
                                        <div style={style.circle} className="circle   border-none row justify-center align-center">
                                            <div className="checkContent">
                                                <img src={iconCheck} alt="check icon" />
                                            </div>
                                        </div>

                                    </div>
                                    <p
                                        onClick={() => updateStatus(navigate, token, user.id, item.id)}
                                        style={style.todoTitle}
                                        className="text_line-through  w-10 text_align_justify">
                                        {item.title}
                                    </p>
                                    <div className='row justify-between '>
                                        <span>
                                            {/* {item.startTime} */}
                                        </span>

                                        <div className="cross-con ">

                                            <span onClick={
                                                () => {
                                                    DeleteRequest(token, user.id, item.id);


                                                }}>
                                                <img src={iconCross} alt="icon-cross" className='icon-cross' />
                                            </span>
                                        </div>
                                    </div>

                                </div>
                                :
                                <div
                                    key={index}

                                    onDragStart={(e) => {
                                        setBeingDragged(e.target)
                                        setBeingDraggedId(item.id)
                                    }}
                                    onDragEnter={(e) => handleDragEnter(e, index)}
                                    onDragOver={(e) => handleDragOver(e)}
                                    onDrop={() => handleDragDrop(item.id)}

                                    style={style.todos} className={dragEntered === index ? " row  py-1 task  border_solid_blue" : "row  py-1 task"} draggable='true'  >
                                    <div
                                        onClick={() => updateStatus(navigate, token, user.id, item.id)}
                                        className="circle-con pl-0_5 row justify-center align-center">
                                        <div
                                            className="circle    row justify-center align-center">

                                        </div>

                                    </div>
                                    <p
                                        onClick={() => updateStatus(navigate, token, user.id, item.id)}
                                        style={style.todoTitle ? style.todoTitle : {}}
                                        className="  w-10 text_align_justify">
                                        {item.title}
                                    </p>
                                    <div className="cross-con ">
                                        <span onClick={
                                            () => {
                                                DeleteRequest(token, user.id, item.id)

                                            }
                                        }>
                                            <img src={iconCross} alt="icon-cross" />
                                        </span>
                                    </div>

                                </div>

                        )
                    })

                }
                <div id='options_con' className='py-1'>
                    <div className="active_items text-center">
                        <span >
                            {data?.Active.length} items left
                        </span>
                    </div>

                    <div
                        style={style ? style.todosContainer : {}}
                        className="options">
                        {
                            options.map((option, index) => {
                                return (
                                    <span


                                        key={index} className={setActiveButton(option)}

                                        onClick={() => {
                                            conditions[option](); localStorage.setItem("filterOption", option);
                                        }}
                                        role="button">
                                        {option}
                                    </span>
                                )
                            })
                        }
                    </div>
                    <div
                        onClick={() => deleteCompletedTasks(token, user.id)}
                        className="clear_con">
                        <span role="button" className='text-center'>
                            clear Completed
                        </span>
                    </div>

                </div>
            </section>
            <div className="instruction  text-center">
                <p>
                    Drag and drop to reorder list
                </p>
            </div>
        </main >
    )
}

export default Todo
