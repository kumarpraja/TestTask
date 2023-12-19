import React, { useState } from "react";
import "./Task.css";
import { users } from "./DummyData";

function Task() {
  const [items, setItems] = useState(users);
  const [showData, setShowData] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);
  const [showCheckList, setShowCheckList] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const handleShowData = () => {
    setShowData(!showData);
  };


  const toggleSort = () => {
    setSortAscending(!sortAscending);
    const sortedUsers = [...users].sort((a, b) => {
      if (sortAscending) {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setItems(sortedUsers);
  };

  const handleCheckboxChange = (id) => {
    setSelectedRows((prevSelectedRows) => {
      if (prevSelectedRows.includes(id)) {
        return prevSelectedRows.filter((rowId) => rowId !== id);
      } else {
        return [...prevSelectedRows, id];
      }
    });
  };

  const handleDeleteRow = (id) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.filter((rowId) => rowId !== id)
    );
  };
  return (
    <>
      <div className="main-wrapper">
        <div className="listing-button">
          <button className="btn btn-show" onClick={handleShowData}>
            {showData ? "Show All Data" : "Hide All Data"}
          </button>
          <button className="btn btn-sort" onClick={toggleSort}>
            {sortAscending ? "Sort Descending" : "Sort Ascending"}
          </button>
          <button className="btn btn-edit" onClick={() => {
              setShowCheckList(!showCheckList);
            }}
          >
            Edit
          </button>
        </div>
        <div id="aaa">
          <table>
            <thead>
              <tr className="listing-wrapper border-list tablehead">
                <th className="listing">Name</th>
                <th className="listing">User Name</th>
                <th className="listing">Email</th>
                <th className="listing">Phone</th>
                <th className="listing">Website</th>
                <th className="listing-check"></th>
              </tr>
            </thead>
            <tbody id="tablelist">
              {!showData &&
                items.map((currEle) => (
                    <tr
                    key={currEle.id}
                    className={`listing-wrapper${showCheckList && selectedRows.includes(currEle.id) ? ' border-list' : ''}`}>
                    <td className="listing">{currEle.name}</td>
                    <td className="listing">{currEle.username}</td>
                    <td className="listing">{currEle.email}</td>
                    <td className="listing">{currEle.phone}</td>
                    <td className="listing inputcheck">{currEle.website}</td>
                    <td className="listing-check">
                    {showCheckList && (
                        <>
                          <input
                            className="inputcheck"
                            id={`checkbox-${currEle.id}`}
                            type="checkbox"
                            checked={selectedRows.includes(currEle.id)}
                            onChange={() => handleCheckboxChange(currEle.id)}
                          />
                          {selectedRows.includes(currEle.id) && (
                            <button
                              className="btn btn-delete"
                              onClick={() => handleDeleteRow(currEle.id)}
                            >
                              Delete
                            </button>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Task