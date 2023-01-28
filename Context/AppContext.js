import React, { createContext, useState } from "react";
import axios from "axios";

export const AppContext = createContext();

const BACKEND_URL = "https://michal-patryk.azurewebsites.net/api/";

const AppProvider = (props) => {
  const [todoList, setTodoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userToken, setUserToken] = useState(
    "c01a6229-80cd-4654-bcf1-c5d1ea1590db"
  );

  const getTodos = () => {
    console.log("GET_LIST");
    setTodoList([]);
    setLoading(true);

    axios
      .get(BACKEND_URL + "todos/" + userToken)
      .then((res) => {
        setTodoList(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log("error", e);
        alert("Wystąpił błąd");
        setLoading(false);
      });
  };

  const checkTask = (item) => {
    console.log("CHECK", item);

    axios
      .get(BACKEND_URL + "todos/" + item._id)
      .then((res) => {
        setTodoList(res.data);
        console.log("Successfull");
        getTodos();
      })
      .catch((e) => {
        console.log("error", e);
        alert("Wystąpił błąd");
      });
  };

  const addTask = (task) => {
    console.log("ADDED_NEW ", task);
    axios
      .post(BACKEND_URL + "create_task", { description: task })
      .then((res) => {
        setTodoList(res.data);
        console.log("Successfull");
        getTodos();
      })
      .catch((e) => {
        console.log("error", e);
        alert("Wystąpił błąd");
      });
  };

  const deleteTask = (id) => {
    console.log("DELETE", id);
    setLoading(true);

    axios
      .delete(BACKEND_URL + "todos/" + id)
      .then((res) => {
        getTodos();
        setLoading(false);
      })
      .catch((e) => {
        console.log("error", e);
        alert("Wystąpił błąd");
        setLoading(false);
      });
  };

  const updateTask = (id, value) => {
    console.log("UPDATE", id, value);

    setLoading(true);

    axios
      .put(BACKEND_URL + "todos/" + id, { description: value })
      .then((res) => {
        getTodos();
        setLoading(false);
      })
      .catch((e) => {
        console.log("error", e);
        alert("Wystąpił błąd");
        setLoading(false);
      });
  };

  const loginUser = (login, password) => {
    console.log("LOGIN", login, password);
    setUserToken("asd");
  };

  const storeObject = {
    todoList,
    loading,
    getTodos,
    deleteTask,
    checkTask,
    updateTask,
    addTask,
  };

  return (
    <AppContext.Provider value={storeObject}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
