import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../stores/AuthContext';
import { Link } from 'react-router-dom';
import { getFirestore, collection, onSnapshot, addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import classes from './Dashboard.module.css';

const Dashboard = () => {

    const [tasks, setTasks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const { user, logout } = useContext(AuthContext);

    const db = getFirestore();

    const logoutHandler = () => {
        logout().then(() => {
            console.log('Logout Successful');
        }).catch(err => {
            console.log(err);
        })
    }

    const addHandler = () => {
        setIsOpen(true);
    }

    const minusHandler = () => {
        setIsOpen(false);
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

    const submitHandler = (e) => {
        e.preventDefault();
        const title = e.target.task.value;
        console.log(new Date().toDateString());
        const task = {
            title,
            isDone: false,
            userID: user.uid,
            created_at: new Date().toDateString()
        }
        const colRef = collection(db, user.uid)

        setIsOpen(false);

        addDoc(colRef, task).then(() => {
            e.target.reset();
        }).error(err => {
            console.log(err);
        })

    }

    useEffect(() => {

        // const db = getFirestore();
        // const colRef = collection(db, user.uid);

        const q = query(collection(db, user.uid), where("created_at", "==", new Date().toDateString()));
        
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
                        <h3>Today</h3>
                    </div>
                    <div className={classes.main_dashboard_first_second}>
                        <button><Link to="/archive">Archive</Link></button>
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
                <div className={classes.main_dashboard_third}>
                    {!isOpen && <img src="media/add.svg" alt="Add" onClick={addHandler} />}
                    {isOpen && <form onSubmit={submitHandler}>
                        <input type="text" placeholder='Task' name='task' required />
                        <button type="submit">Add</button>
                    </form>}
                    {isOpen && <img src="media/remove.svg" onClick={minusHandler} alt="Remove" />}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;