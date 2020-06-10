import React from "react";

export default function ShowCards({ note, editHandler, deleteHandler }) {
  return (
    <div className="w18rem card  mr-auto mb-3 ">
      <div className="card-body">
        <img src="" alt="" className="card-img-top" />
        <h5 className="card-title">{note.title}</h5>
        <p className="card-text">{note.body}</p>
        <button
          onClick={() => editHandler(note._id)}
          className="btn btn-outline-primary mr-2">
          Edit
        </button>
        <button
          onClick={() => deleteHandler(note._id)}
          className="btn btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}
