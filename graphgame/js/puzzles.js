var Puzzles = new Array();

Puzzles[0] = new Array();
Puzzles[0]["type"] = "Displacement";
Puzzles[0][0] = {function: "0", lowerbound: 0, upperbound: 14};

Puzzles[1] = new Array();
Puzzles[1]["type"] = "Displacement";
Puzzles[1][0] = {function: "6/14*x", lowerbound: 0, upperbound: 14};

Puzzles[2] = new Array();
Puzzles[2]["type"] = "Displacement";
Puzzles[2][0] = {function: "1*x", lowerbound: 0, upperbound: 4};
Puzzles[2][1] = {function: "4", lowerbound: 4, upperbound: 14};

Puzzles[3] = new Array();
Puzzles[3]["type"] = "Displacement";
Puzzles[3][0] = {function: "2*x", lowerbound: 0, upperbound: 3};
Puzzles[3][1] = {function: "6", lowerbound: 3, upperbound: 14};

Puzzles[4] = new Array();
Puzzles[4]["type"] = "Displacement";
Puzzles[4][0] = {function: "0", lowerbound: 0, upperbound: 3};
Puzzles[4][1] = {function: "1*x - 3", lowerbound: 3, upperbound: 6};
Puzzles[4][2] = {function: "3", lowerbound: 6, upperbound: 14};

Puzzles[5] = new Array();
Puzzles[5]["type"] = "Displacement";
Puzzles[5][0] = {function: "x", lowerbound: 0, upperbound: 2};
Puzzles[5][1] = {function: "2*x - 2", lowerbound: 2, upperbound: 4};
Puzzles[5][2] = {function: "-3/5*x + 8.4", lowerbound: 4, upperbound: 14};

Puzzles[6] = new Array();
Puzzles[6]["type"] = "Displacement";
Puzzles[6][0] = {function: "1*x", lowerbound: 0, upperbound: 6};
Puzzles[6][1] = {function: "6", lowerbound: 6, upperbound: 8};
Puzzles[6][2] = {function: "14 - 1*x", lowerbound: 8, upperbound: 14};

Puzzles[7] = new Array();
Puzzles[7]["type"] = "Displacement";
Puzzles[7][0] = {function: "1*x", lowerbound: 0, upperbound: 1};
Puzzles[7][1] = {function: "1", lowerbound: 1, upperbound: 4};
Puzzles[7][2] = {function: "1*x - 3", lowerbound: 4, upperbound: 8};
Puzzles[7][3] = {function: "5", lowerbound: 8, upperbound: 10};
Puzzles[7][4] = {function: "15 - 1*x", lowerbound: 10, upperbound: 14};

Puzzles[8] = new Array();
Puzzles[8]["type"] = "Displacement";
Puzzles[8][0] = {function: "4/7*x", lowerbound: 0, upperbound: 7};
Puzzles[8][1] = {function: "8 - 4/7*x", lowerbound: 7, upperbound: 14};

Puzzles[9] = new Array();
Puzzles[9]["type"] = "Displacement";
Puzzles[9][0] = {function: "2*x", lowerbound: 0, upperbound: 3};
Puzzles[9][1] = {function: "7 - (1/3)*x", lowerbound: 3, upperbound: 9};
Puzzles[9][2] = {function: "4", lowerbound: 9, upperbound: 14};

Puzzles[10] = new Array();
Puzzles[10]["type"] = "Displacement";
Puzzles[10][0] = {function: "Math.pow(2, -1*x+1)", lowerbound: 0, upperbound: 14};

Puzzles[11] = new Array();
Puzzles[11]["type"] = "Displacement";
Puzzles[11][0] = {function: "4", lowerbound: 0, upperbound: 1};
Puzzles[11][1] = {function: "1/x + 3", lowerbound: 1, upperbound: 14};

Puzzles[12] = new Array();
Puzzles[12]["type"] = "Velocity";
Puzzles[12][0] = {function: "6/14*x", lowerbound: 0, upperbound: 14};

Puzzles[13] = new Array();
Puzzles[13]["type"] = "Velocity";
Puzzles[13][0] = {function: "6 - 6/14*x", lowerbound: 0, upperbound: 14};

Puzzles[14] = new Array();
Puzzles[14]["type"] = "Velocity";
Puzzles[14][0] = {function: "1*x", lowerbound: 0, upperbound: 4};
Puzzles[14][1] = {function: "4", lowerbound: 4, upperbound: 14};

Puzzles[15] = new Array();
Puzzles[15]["type"] = "Velocity";
Puzzles[15][0] = {function: "2*x", lowerbound: 0, upperbound: 3};
Puzzles[15][1] = {function: "6", lowerbound: 3, upperbound: 14};

Puzzles[16] = new Array();
Puzzles[16]["type"] = "Velocity";
Puzzles[16][0] = {function: "0", lowerbound: 0, upperbound: 3};
Puzzles[16][1] = {function: "1*x - 3", lowerbound: 3, upperbound: 6};
Puzzles[16][2] = {function: "3", lowerbound: 6, upperbound: 14};

Puzzles[17] = new Array();
Puzzles[17]["type"] = "Velocity";
Puzzles[17][0] = {function: "x", lowerbound: 0, upperbound: 2};
Puzzles[17][1] = {function: "2*x - 2", lowerbound: 2, upperbound: 4};
Puzzles[17][2] = {function: "-3/5*x + 8.4", lowerbound: 4, upperbound: 14};