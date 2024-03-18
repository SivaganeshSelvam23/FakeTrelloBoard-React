import React, { useState, useEffect, useRef } from "react";
import { IoAddCircleOutline } from "react-icons/io5";
import Cards from "../Cards/Cards";
import { DragDropContext } from "react-beautiful-dnd";
const Home = () => {
  const [trelloCardDetails, setTrelloCardDetails] = useState([]);
  const [addBoardTigger, setBoardTigger] = useState(false);
  const [addBoardName, setAddBoardName] = useState("");

  // Adding New Board Name
  const addBoardNameHandler = () => {
    if (addBoardName) {
      const createNewEntry = {
        id: new Date().getTime().toString(),
        boardName: addBoardName,
        cards: [],
      };
      setTrelloCardDetails([...trelloCardDetails, createNewEntry]);
      setAddBoardName("");
      setBoardTigger(false);
    } else {
      alert("Enter Board Name And Continue...");
    }
  };
  const onDragEnd = (result) => {
    const { source, destination } = result;
    console.log("source:", source, "destination:", destination);
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const [sourceBoard] = trelloCardDetails.filter(
        (elem) => elem.boardName === source.droppableId
      );
      const sourceCard = [...sourceBoard.cards];
      const [removedCard] = sourceCard.splice(source.index, 1);
      sourceCard.splice(destination.index, 0, removedCard);
      const updatedCards = trelloCardDetails.map((elem) => {
        if (elem.boardName === source.droppableId) {
          return { ...elem, cards: sourceCard };
        }
        return elem;
      });
      setTrelloCardDetails(updatedCards);
    } else {
      const [sourceBoard] = trelloCardDetails.filter(
        (elem) => elem.boardName === source.droppableId
      );
      const [destinationBoard] = trelloCardDetails.filter(
        (elem) => elem.boardName === destination.droppableId
      );
      const sourceCard = [...sourceBoard.cards];
      const destinationCard = [...destinationBoard.cards];
      const [removedCard] = sourceCard.splice(source.index, 1);
      destinationCard.splice(destination.index, 0, removedCard);
      const updatedCards = trelloCardDetails.map((elem) => {
        if (elem.boardName === source.droppableId) {
          return { ...elem, cards: sourceCard };
        } else if (elem.boardName === destination.droppableId) {
          return { ...elem, cards: destinationCard };
        }
        return elem;
      });
      setTrelloCardDetails(updatedCards);
    }
  };
  return (
    <div className="w-screen h-screen overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-200">
      <div className="flex justify-center mt-5">
        {addBoardTigger ? (
          <div className="flex gap-5 justify-center items-center">
            <input
              className="h-[50px] w-[300px] rounded-md border-2 border-blue-700 pl-5 pr-5 bg-transparent outline-none"
              type="text"
              placeholder="Enter Board Name..."
              autoFocus
              onChange={(e) => setAddBoardName(e.target.value)}
            />
            <span
              className="cursor-pointer text-[20px]"
              onClick={() => addBoardNameHandler()}
            >
              Save
            </span>
            <span
              className="cursor-pointer text-[20px]"
              onClick={() => {
                setAddBoardName("");
                setBoardTigger(false);
              }}
            >
              Cancel
            </span>
          </div>
        ) : (
          <div
            className="h-[50px] w-[160px] flex gap-2 justify-center items-center align-middle  rounded-md border-2 border-blue-700 cursor-pointer hover:bg-green-600 hover:border-none"
            onClick={() => setBoardTigger(true)}
          >
            <IoAddCircleOutline size={20} />
            <span className="text-[15px]">Add New List</span>
          </div>
        )}
      </div>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div className="flex flex-row gap-2">
          {trelloCardDetails.map((item, index) => (
            <div key={item.id} className="mt-10 ml-5">
              <Cards
                item={item}
                index={index}
                trelloCardDetails={trelloCardDetails}
                setTrelloCardDetails={setTrelloCardDetails}
              />
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Home;
