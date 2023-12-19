import React, { Fragment } from "react";

const Todoitem = ({
  title,
  description,
  isCompleted,
  updateHandler,
  deleteHandler,
  id,
}) => {
  return (
    <Fragment>

      <div className="todo">
        <div>
          <h4>{title}</h4>
          <p>{description}</p>
        </div>

        <div>
          <input onChange={()=> updateHandler(id)} type="checkbox" checked={isCompleted} />
          <button onClick={()=> deleteHandler(id)} className="btn">Delete</button>
        </div>
      </div>
      
    </Fragment>
  );
};

export default Todoitem;
