import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import Modal from "../Modal/Modal";
import { FaComputer } from "react-icons/fa6";
import { MdTitle, MdOutlineDescription } from "react-icons/md";
import CardsList from "../CardsList/CardsList";
import { Draggable, Droppable } from "react-beautiful-dnd";
const Cards = ({ item, index, trelloCardDetails, setTrelloCardDetails }) => {
  const [showModal, setshowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const addProjectToList = (item, projectDetails, newItem) => {
    for (let i = 0; i < newItem.length; i++) {
      if (item.id === newItem[i].id) {
        newItem[i].cards.unshift(projectDetails);
      }
    }
  };
  const saveTaskHandler = () => {
    if (title && description) {
      let projectDetails = {
        id: new Date().getTime().toString(),
        projectTitle: title,
        projectDescription: description,
      };
      let newItem = [...trelloCardDetails];
      addProjectToList(item, projectDetails, newItem);
      setTrelloCardDetails(newItem);
      setTitle("");
      setDescription("");
      setshowModal(false);
    } else {
      alert("Please Enter Both Title And Description..");
    }
  };
  // console.log(trelloCardDetails);
  return (
    <>
      {showModal && (
        <Modal onClose={() => setshowModal(false)}>
          <div className="text-green-500">
            <div className="flex gap-3 text-blue-700">
              <FaComputer size={30} />
              <span className="text-2xl">{item.boardName}</span>
            </div>
            <div className="mt-5 flex flex-col gap-10">
              <div>
                <div className="flex gap-2 items-center">
                  <MdTitle size={35} />
                  <span className="text-[20px]">Title</span>
                </div>
                <div>
                  <input
                    className="h-[50px] w-[700px] text-white  border-b-2 border-blue-700 pl-3 pr-5 bg-transparent outline-none"
                    type="text"
                    placeholder="Enter Title..."
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <MdOutlineDescription size={35} />
                  <span className="text-[20px]">Description </span>
                </div>
                <div>
                  <input
                    className="h-[50px] w-[700px] text-white border-b-2 border-blue-700 pl-3 pr-5 bg-transparent outline-none"
                    type="text"
                    placeholder="Add More Details..."
                    onChange={(e) => setDescription(e.target.value)}
                    autoFocus
                  />
                </div>
              </div>
              <div className="flex gap-10 justify-end">
                <span
                  className="text-blue-500 text-[20px] cursor-pointer"
                  onClick={() => saveTaskHandler()}
                >
                  Save
                </span>
                <span
                  className="text-red-500 text-[20px] cursor-pointer"
                  onClick={() => setshowModal(false)}
                >
                  Cancel
                </span>
              </div>
            </div>
          </div>
        </Modal>
      )}
      <Droppable droppableId={item.boardName} key={item.id}>
        {(provided) => {
          return (
            <>
              {provided.placeholder}
              <div
                className="w-[390px] h-min rounded-lg border-2 border-blue-900  mb-5"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <div className="flex ml-5 mr-5 mt-3 justify-between items-center">
                  <span className="text-[25px] hover:text-green-500 cursor-pointer">
                    {item.boardName}
                  </span>
                  <span>Edit</span>
                </div>

                {/* Render inner Cards */}
                <div className="flex flex-col gap-5 m-5 mb-[100px]">
                  {item.cards.length > 0 &&
                    item.cards.map((item, index) => (
                      <Draggable
                        draggableId={item.id}
                        index={index}
                        key={item.id}
                      >
                        {(provided) => {
                          return (
                            <div
                              className="cursor-grab"
                              key={item.id}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <CardsList item={item} />
                            </div>
                          );
                        }}
                      </Draggable>
                    ))}
                </div>
                <div
                  className="flex justify-center mt-5 mb-5"
                  onClick={() => setshowModal(true)}
                >
                  <div className="h-[50px] w-[160px] flex gap-2 justify-center items-center rounded-md border-2 border-blue-700 cursor-pointer hover:bg-green-600 hover:border-none">
                    <IoAdd size={24} />
                    <span>Add Task</span>
                  </div>
                </div>
              </div>
              {provided.placeholder}
            </>
          );
        }}
      </Droppable>
    </>
  );
};

export default Cards;
