let boxes=document.querySelectorAll(".box");
let reset=document.querySelector("#reset");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".message");
let  msg=document.querySelector("#msg");

let turnO=true;//playerX ,playerO
let count =0;

const winPatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame=()=>{
    count=0;
    turnO=true;
    enableBoxes();
   msgContainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
       if(turnO){
        box.innerText="O";
        box.classList.add("playerO");
        turnO=false;
       }        
       else{
        box.innerText="X";
        box.classList.add("playerX");
         turnO=true;
       }
       box.disabled=true;
       count++;

       let isWinner=checkWinner();
       if(count===9 && !isWinner){
        showDraw();
       }

       checkWinner();

    })
})

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(Winner)=>{
    msg.innerText=`Congratulations! Winner is ${Winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
 }

 const showDraw=()=>{
    msg.innerText="Game Draw!";
    msgContainer.classList.remove("hide");
 }

const checkWinner=()=>{
    for(let pattern of winPatterns){
    
            let pos1Val=boxes[pattern[0]].innerText;
            let pos2Val=boxes[pattern[1]].innerText;
            let pos3Val=boxes[pattern[2]].innerText;

            if(pos1Val!="" && pos2Val!="" && pos3Val!=""){
                  if(pos1Val===pos2Val  && pos1Val===pos3Val){
                    showWinner(pos1Val);
                  }
            }
    }
}

newGameBtn.addEventListener("click",resetGame); 
reset.addEventListener("click",resetGame);
