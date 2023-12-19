import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context, server } from "../main";
import toast from "react-hot-toast";
import Todoitem from "../components/Todoitem";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh(prev=> !prev);

    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const deleteHandler = async(id) => {
    try {
      const { data } = await axios.delete(
        `${server}/task/${id}`,
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setRefresh(prev=> !prev);

    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${server}/task/new`,
        {
          title,
          description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      toast.success(data.message);
      setLoading(false);
      setTitle("");
      setDescription("");
      setRefresh(prev=> !prev);

    } catch (err) {
      toast.success(err.response.data.message);
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get(`${server}/task/my`, {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data.tasks);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  }, [refresh]);

  if(!isAuthenticated) return <Navigate to={"/login"} />

  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      {/* ToDo's */}
      <section className="todosContainer">
        {tasks.map((i) => (
          <Todoitem
            key={i._id}
            id={i._id}
            title={i.title}
            description={i.description}
            isCompleted={i.isCompleted}
            updateHandler={updateHandler}
            deleteHandler={deleteHandler}
          />
        ))}
      </section>
    </div>
  );
};

export default Home;
