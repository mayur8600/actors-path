export const getMazeSolution = (
  maze,
  positionG,
  positionS,
  setCreatedSolution
) => {
  // Size of the maze
  let N = maze?.length;
  let M = maze[0]?.length;
  let solution = "";

  /* A utility function to check
        if x, y is valid index for N*M maze */
  function isSafe(maze, x, y) {
    // if (x, y outside maze) return false
    return (
      x >= 0 &&
      x < N &&
      y >= 0 &&
      y < M &&
      (maze[x][y] === "_" || maze[x][y] === "S" || maze[x][y] === "G")
    );
  }

  /* This function solves the Maze problem using
      Backtracking. It mainly uses solveMazeUtil()
      to solve the problem. It returns false if no
      path is possible, otherwise return true and
      prints the path in the form of 1s. Please note
      that there may be more than one solutions, this
      function prints one of the feasible solutions.*/
  function solveMaze(maze) {
    let sol = new Array(N);
    for (let i = 0; i < N; i++) {
      sol[i] = new Array(M);
      for (let j = 0; j < M; j++) {
        sol[i][j] = 0;
      }
    }

    if (solveMazeUtil(maze, positionS[0], positionS[1], sol) === false) {
      solution = "Solution not found";
      return false;
    }
    return true;
  }

  function checkPosition(x, y) {
    if (x === positionS[0] && y === positionS[1]) {
      solution += `(${x}:${y}(S)),`;
    } else if (x === positionG[0] && y === positionG[1]) {
      solution += `(${x}:${y}(G))`;
    } else {
      solution += `(${x}:${y}),`;
    }
  }
  /* A recursive utility function to solve Maze
      problem */
  function solveMazeUtil(maze, x, y, sol) {
    // if (x, y is goal)
    if (
      x === positionG[0] &&
      y === positionG[1] &&
      (maze[x][y] === "_" || maze[x][y] === "S" || maze[x][y] === "G")
    ) {
      sol[x][y] = 1;
      checkPosition(x, y);
      return true;
    }

    // Check if maze[x][y] is valid
    if (isSafe(maze, x, y) === true) {
      // Check if the current block is already part of solution path.
      if (sol[x][y] === 1) return false;

      // mark x, y as part of solution path
      sol[x][y] = 1;
      checkPosition(x, y);

      /* Move forward in x direction */
      if (solveMazeUtil(maze, x + 1, y, sol)) return true;

      /* If moving in x direction doesn't give
          solution then Move down in y direction */
      if (solveMazeUtil(maze, x, y + 1, sol)) return true;

      /* If moving in y direction doesn't give
          solution then Move backwards in x direction */
      if (solveMazeUtil(maze, x - 1, y, sol)) return true;

      /* If moving backwards in x direction doesn't give
          solution then Move upwards in y direction */
      if (solveMazeUtil(maze, x, y - 1, sol)) return true;

      /* If none of the above movements works then
          BACKTRACK: unmark x, y as part of solution
          path */
      sol[x][y] = 0;
      return false;
    }

    return false;
  }
  solveMaze(maze);
  setCreatedSolution(solution);
};
