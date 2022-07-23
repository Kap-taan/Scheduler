import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../stores/AuthContext';
import { Link } from 'react-router-dom';
import { getFirestore, collection, onSnapshot, addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import classes from './Dashboard.module.css';

const Archive = () => {

    const [tasks, setTasks] = useState([]);

    const { user, logout } = useContext(AuthContext);

    const db = getFirestore();

    const logoutHandler = () => {
        logout().then(() => {
            console.log('Logout Successful');
        }).catch(err => {
            console.log(err);
        })
    }


    const clickHandler = (task) => {
        console.log(task.id);
        let docRef = doc(db, user.uid, task.id);
        updateDoc(docRef, {
            isDone: !task.isDone
        })
        .then(() => {
            console.log('Updated Successfully');
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {


        const q = query(collection(db, user.uid), where("isDone", "==", false), where("created_at", "!=", new Date().toDateString()));
        
        onSnapshot(q, (snapshot) => {
            let todos = []
            snapshot.docs.forEach(doc => {
                todos.push({ ...doc.data(), id: doc.id })
            })
            setTasks(todos);
        })
    }, []);

    return (
        <div className={classes.dashboard}>
            <div className={classes.main_dashboard}>
                <div className={classes.main_dashboard_first}>
                    <div className={classes.main_dashboard_first_first}>
                        <h2>Tasks</h2>
                        <h3>Archive</h3>
                    </div>
                    <div className={classes.main_dashboard_first_second}>
                        <button><Link to="/dashboard">Today</Link></button>
                        <button onClick={logoutHandler}>Logout</button>
                    </div>
                </div>
                <div className={classes.main_dashboard_second}>
                    {/* {tasks[0].title === undefined && <h3>No Tasks to Do 👏🏻</h3>} */}
                    <ul>
                        {tasks && tasks.map(task => (<li key={task.id} onClick={() => clickHandler(task)}>
                            {task.isDone && <img src="media/done.svg" alt="Done" />}
                            {!task.isDone && <img src="media/undone.svg" alt="Done" />}
                            <h2>{task.title}</h2>
                        </li>))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Archive;