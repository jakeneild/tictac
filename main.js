var turn = 1;
var win = false;
var tie = false;

function reset(){
    let boxes = [11, 12, 13, 21, 22, 23, 31, 32, 33]
    function clearBoxes(ids){
        for(let i=0; i < ids.length; i++){
            let target = document.getElementById(ids[i]);
            target.setAttribute("value", "0");
            target.innerHTML = " ";
        }
    }
    clearBoxes(boxes);
    turn = 1;
    win = false;
    tie = false;
    document.getElementById("empty").innerHTML = " ";
}


function checkWin(winArray){
    if(winArray[0] == "1" && winArray[1] == "1" && winArray[2] == "1" || winArray[0] == "2" && winArray[1] == "2" && winArray[2] == "2"){
        win = true;
        //prints message to user  
        if(winArray[0] =="1"){
            var text = document.createTextNode("Red Wins!")
        } else {
            var text = document.createTextNode("Blue Wins!")
        }
        
        document.getElementById("empty").appendChild(text);
        //displays play again button
        var playAgain = document.createElement("button");
        var playAgainText = document.createTextNode("Play again");
        playAgain.appendChild(playAgainText);

        playAgain.addEventListener("click", reset);

        document.getElementById("empty").appendChild(playAgain);
        
    }
}

function check(){
    //check to see if anyone has won
    //console.log(document.getElementById("31").getAttribute("value"));
    for(let i = 0; i < 8; i++){
            if(win !== true){
                let winArray = [0, 0, 0];
                             
                if(i < 3){            
                    let row = document.getElementsByClassName(`row${i+1}`);
                    winArray[0] = row.item(0).getAttribute("value");
                    winArray[1] = row.item(1).getAttribute("value");
                    winArray[2] = row.item(2).getAttribute("value");
                } else if (i < 6) {
                    let col = document.getElementsByClassName(`col${i-2}`);
                    winArray[0] = col.item(0).getAttribute("value");
                    winArray[1] = col.item(1).getAttribute("value");
                    winArray[2] = col.item(2).getAttribute("value");
                } else if (i == 6) {
                    winArray[0] = document.getElementById("11").getAttribute("value");
                    winArray[1] = document.getElementById("22").getAttribute("value");
                    winArray[2] = document.getElementById("33").getAttribute("value");
                } else if (i == 7) {
                    winArray[0] = document.getElementById("31").getAttribute("value");
                    winArray[1] = document.getElementById("22").getAttribute("value");
                    winArray[2] = document.getElementById("13").getAttribute("value");
                }                
                checkWin(winArray);
            }              
    }
    if(win != true){
    //check for a tie
        let counter = 0;
        //console.log("value of 31 = " + document.getElementById("31").getAttribute("value"));
        for(let i = 0; i < 9; i++){
            if(i < 3 ){
                if(document.getElementById(`1${i+1}`).getAttribute("value") != 0){
                    counter++;
                }            
            }else if (i > 2 && i < 6){
                if(document.getElementById(`2${i-2}`).getAttribute("value")  != 0){
                    counter++;
                }
            }else if (i > 5){
                if(document.getElementById(`3${i-5}`).getAttribute("value")  != 0){  //something is wrong with box 31
                    counter++;
                }
            }
            
            if(counter===9){
                //console.log("tie");
                tie = true;
                //display tie message
                let empty = document.getElementById("empty");
                let tieText = document.createTextNode("There is a tie.");
                empty.appendChild(tieText);

                //display play again button
                var playAgain = document.createElement("button");
                var playAgainText = document.createTextNode("Play again");
                playAgain.appendChild(playAgainText);

                playAgain.addEventListener("click", reset);

                document.getElementById("empty").appendChild(playAgain);

                }
            
                      
        }
        //console.log(counter);
    }
}

function clickButton(e){
    if(win == false){
        let value = e.target.getAttribute("value");
        if(value == 0){ 
            if(turn === 1){
                let x = document.createTextNode("X");
                e.target.appendChild(x);
                e.target.style.color = "red";
                e.target.style.fontSize = "5em";
                turn = 2;
                e.target.setAttribute("value", 1);
                console.log(e.target);
                check();
            } else if (turn === 2){
                let o = document.createTextNode("O");
                e.target.appendChild(o);
                e.target.style.color = "blue";
                e.target.style.fontSize = "5em";
                turn = 1;
                e.target.setAttribute("value", 2);
                console.log(e.target);
                check();
            }
        }
    }
}

//add event listeners
document.getElementById("11").addEventListener("click", clickButton);
document.getElementById("12").addEventListener("click", clickButton);
document.getElementById("13").addEventListener("click", clickButton);
document.getElementById("21").addEventListener("click", clickButton);
document.getElementById("22").addEventListener("click", clickButton);
document.getElementById("23").addEventListener("click", clickButton);
document.getElementById("31").addEventListener("click", clickButton);
document.getElementById("32").addEventListener("click", clickButton);
document.getElementById("33").addEventListener("click", clickButton);