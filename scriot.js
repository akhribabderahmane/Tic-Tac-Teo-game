
document.addEventListener('DOMContentLoaded', () => {


    // Your code here
    const boardElement = document.getElementById('board');
    const cellElements = boardElement.querySelectorAll('.cell');
    const arraySquares= document.querySelectorAll('[data-cell]');
    const winningPage = document.querySelector('.winning-page');

    function changeTextinsideSqr(square) {
        if (square.innerText === "o") {
          square.innerText = "x";
        } else {
          square.innerText = "o";
        }
      }
    function selectsquare(square){
        square.addEventListener("click",()=>{
            square.style.color='black';
            square.style.cursor='not-allowed'
        })
    }
   

    function restartX() {
      // Reset the selected state and characters of all squares
      for (let i = 0; i < tictacgame.squares.length; i++) {
        const square = tictacgame.squares[i];
        square.selected = false;
        square.character = "x";
      }
    
      // Reset the text and color of all square elements
      for (let i = 0; i < arraySquares.length; i++) {
        const squareElement = arraySquares[i];
        squareElement.innerText = "x";
        squareElement.style.color = "";
        squareElement.style.cursor = "pointer";
      }
    
      // Hide the winning page
     // hideWinningPage();
    }
    
    
// Function to show the winning page
function showWinningPage() {
   winningPage.classList.remove('hidden');
}

// Function to hide the winning page
function hideWinningPage() {
   winningPage.classList.add('hidden');
}
//-----------------------------------------------------
  class TicTac {
    constructor() {
      this.squares = [];
      // Create 9 Square objects and add them to the squares array
      for (let i = 0; i < 9; i++) {
        const element =arraySquares[i];
        const square = new Square(element, i);
        this.squares.push(square);
      }
      this.winPositions=[
        [0,1,2],[0,3,6],[0,4,8],[1,4,7],[2,4,6],[2,5,8],[3,4.5],[6,7,8],
        [2,1,0],[5,4,3],[8,7,6]
      ];
    }
    selectSquares(){
        for (let i = 0; i < 9; i++) {
            this.squares[i].selectSquare();
           }     
    }
    updatehtmltextsqrs(){
        for (let i = 0; i < 9; i++) {
            if(this.squares[i].selected == false){
               this.squares[i].changeChar();
            }
           }   
    }
    checkXWin(){
        const xPositions=[];
        for (let i = 0; i < 9; i++) {
            if(this.squares[i].selected == true){
               if(this.squares[i].character=="x"){
                 xPositions.push(this.squares[i].getNumber())
               }
            }
           } 
        // const xWins=this.winPositions.some(winposition => winposition.every(function(oneXPosition){
        //     return winposition.includes(oneXPosition);
        // }))  
        const xWins=this.winPositions.some(function(winposition){
            return winposition.every(function(oneXPosition){
                return xPositions.includes(oneXPosition);
            })
        })
        return xWins; 
    }
    checkOWin(){
        const opostions=[];
        for (let i = 0; i < 9; i++) {
            if(this.squares[i].selected == true){
               if(this.squares[i].character=="o"){
                 opostions.push(this.squares[i].getNumber())
               }
            }
           } 
        // const xWins=this.winPositions.some(winposition => winposition.every(function(oneXPosition){
        //     return winposition.includes(oneXPosition);
        // }))  
        const oWins=this.winPositions.some(function(winposition){
            return winposition.every(function(oneOposition){
                return opostions.includes(oneOposition);
            })
        })
        return oWins; 
    }
    checkDraw(){
      const AllSqrsSelected=this.squares.every(function(oneSquare){
          return oneSquare.selected;
      })
      const xWins=this.checkXWin();
      const Owins=this.checkOWin();
      if(AllSqrsSelected && (!(xWins)) && (!(Owins))){
        return true;
      }else{
        return false;
      }
    }
    GameisOver(){
        const xwins=this.checkXWin();
        const owins=this.checkOWin();
        const draw =this.checkDraw();
        if(xwins){
           document.getElementById("who-wins").innerHTML="X's Wins"
           showWinningPage();
        }else if(owins){
            document.getElementById("who-wins").innerHTML="O's Wins"
            showWinningPage();
        }else if(draw) {
            document.getElementById("who-wins").innerHTML="Draw !"
            showWinningPage(); 
        }else{
            return 
        }

    }  
  }
//---------------------------------------------------
class Square{
    constructor(element,number){
        this.character="x";
        this.number=number;
        this.selected=false;
        this.element=element;
    }
    changeChar() {
      if (!this.selected) {
        if (this.character === "o") {
          this.character = "x";
        } else {
          this.character = "o";
        }
        this.updatehtmltext();
      }
    }    
    selectSquare(){
        this.element.addEventListener("click",()=>{
        this.element.style.color='black';
        this.element.style.cursor='not-allowed'
        this.selected=true;
        tictacgame.updatehtmltextsqrs();
        tictacgame.GameisOver();
        })
    }
    getNumber(){
     return this.number;
    }
    updatehtmltext(){
        this.element.innerText=this.character;
    }
}
document.getElementById("restart-btn").addEventListener("click",function(){
  hideWinningPage();
  restartX();
})
  let tictacgame=new TicTac(); 
  tictacgame.selectSquares();
  
})

