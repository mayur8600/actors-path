import React, { useEffect, useState } from "react";
import { getMazeSolution } from "../utils/helper";
import GetMaze from "./GetMaze";

function TextFileRead() {
  const [file, setFile] = useState();
  const [maze, setMaze] = useState([]);
  const [positionS, setPositionS] = useState([]);
  const [positionG, setPositionG] = useState([]);
  const [createdSolution, setCreatedSolution] = useState("");
  const [solution, setSolution] = useState(false);

  useEffect(() => {
    if (file) {
      let newMaze = [];
      const fileData = file?.target?.files[0];
      // Compare Extension
      let extension = fileData.name.match(/(?<=\.)\w+$/g)[0].toLowerCase();
      if (extension !== "txt") {
        alert("File Format Mismatch!");
        resetFile();
        setFile();
      } else {
        var fr = new FileReader();
        fr.readAsText(fileData);
        fr.onload = function () {
          const linearData = fr.result.split("\n");
          for (let i = 0; i < linearData?.length; i++) {
            const dataArr = linearData[i].trim().split("");
            dataArr.forEach((element, j) => {
              return element === "S"
                ? setPositionS([i, j])
                : element === "G"
                ? setPositionG([i, j])
                : null;
            });
            newMaze.push(dataArr);
          }
          setMaze(newMaze);
        };
      }
    }
  }, [file]);
//  reset the input value
  function resetFile() {
    const file = document.querySelector(".file");
    file.value = "";
    setSolution(false);
  }
  return (
    <div className="max-w-5xl m-auto relative">
      <div className="w-full text-center absolute cursive text-[40px]">
        Actor's Path
      </div>

      <div
        className={`w-full flex ${
          file && positionG.length && positionS.length
            ? "pt-[80px] pb-2 justify-start"
            : "h-screen justify-center"
        }  items-center pb-10 z-0`}
      >
        <input
          className="file"
          onChange={(e) => {
            setFile(e);
          }}
          type="file"
        />
        {file && (!positionS.length || !positionG.length) && (
          <p className="mx-[10px] font-medium text-white">
            Please Enter valid maze
          </p>
        )}
        {file && (
          <button
            className="px-3 py-1 bg-[#FDD36A] rounded-[3px] hover:bg-lime-300  cursor-pointer disabled:cursor-not-allowed"
            onClick={() => {
              setFile();
              setMaze([]);
              setCreatedSolution("");
              setPositionG([]);
              setPositionS([]);
              resetFile();
            }}
            disabled={!file}
          >
            Clear File
          </button>
        )}
      </div>
      {file && positionS.length && positionG.length && maze && (
        <GetMaze maze={maze} />
      )}
      {file && positionS.length && positionG.length && (
        <div className="w-full flex justify-center my-5">
          {
            <button
              className="px-3 py-1 bg-lime-400 rounded-[3px] hover:bg-lime-300  cursor-pointer disabled:cursor-not-allowed"
              onClick={() => {
                getMazeSolution(maze, positionG, positionS, setCreatedSolution);
                setSolution(true);
              }}
              disabled={!file}
            >
              Solve
            </button>
          }
        </div>
      )}
      {file && solution && (
        <p className="text-white font-medium w-full h-[30px]">
          Solution : {createdSolution}
        </p>
      )}
    </div>
  );
}

export default TextFileRead;
