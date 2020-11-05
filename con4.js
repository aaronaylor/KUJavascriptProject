let canvas = document.querySelector("#gameBoard");
let context = canvas.getContext('2d');

context.font = "40pt Calibri";
context.fillStyle = "black";

const model = 
{
	playBoard : [['  ','  ','  ','  ','  ','  ','  '],
			['  ','  ','  ','  ','  ','  ','  '],
			['  ','  ','  ','  ','  ','  ','  '],
			['  ','  ','  ','  ','  ','  ','  '],
			['  ','  ','  ','  ','  ','  ','  '],
			['  ','  ','  ','  ','  ','  ','  '],],
	current: 'Player 1',
	win: false
}

function otherPlayer(player) 
{
  switch (player) {
  case 'Player 1':
    return 'Player 2';
  case 'Player 2':
    return 'Player 1';
  default:
    console.log("Not valid player");
  }
}

function findLowest(col) 
{
	for(let j = 5; j>=0; j--)
	{
		if(model.playBoard[j][col] == '  ')
			return j;
	}
	console.log("col " + col + " is full");
	return 6;
}

function checkWinHelper(row,col,player,look,count)
{
	//console.log('checkWin '+ look +' count = ' + count);
	if(count == 4)
	{
		return true;
	}
	else
	{
		if(look == 0 && row > 0 && col > 0)
		{
			if(model.playBoard[row-1][col-1] == player)
				return checkWinHelper(row-1,col-1,player,look,count+1);
		}
		else if(look == 1 && row > 0)
		{
			if(model.playBoard[row-1][col] == player)
				return checkWinHelper(row-1,col,player,look,count+1);
		}
		else if(look == 2 && row > 0 && col < 6)
		{
			if(model.playBoard[row-1][col+1] == player)
				return checkWinHelper(row-1,col+1,player,look,count+1);
		}
		else if(look == 3 && col > 0)
		{
			if(model.playBoard[row][col-1] == player)
				return checkWinHelper(row,col-1,player,look,count+1);
		}
		else if(look == 4 && col < 6)
		{
			if(model.playBoard[row][col+1] == player)
				return checkWinHelper(row,col+1,player,look,count+1);
		}
		else if(look == 5 && row < 5 && col > 0)
		{
			if(model.playBoard[row+1][col-1] == player)
				return checkWinHelper(row+1,col-1,player,look,count+1);
		}
		else if(look == 6 && row < 5)
		{
			if(model.playBoard[row+1][col] == player)
				return checkWinHelper(row+1,col,player,look,count+1);
		}
		else if(look == 7 && row < 5 && col < 6)
		{
			if(model.playBoard[row+1][col+1] == player)
				return checkWinHelper(row+1,col+1,player,look,count+1);
		}
		return false;
	}
	
}

function checkWin(row,col)
{
	for(let i = 0; i<8;i++)
	{
		if(model.current == 'Player 1')
			if (checkWinHelper(row,col,'X',i,1))
				return true;
		if(model.current == 'Player 2')
			if (checkWinHelper(row,col,'O',i,1))
				return true;
	}
	return false;
}

function btnHandle(col)
{
	console.log("col " + col + " clicked");
	let i = findLowest(col);
	if(i < 6)
	{
		if(model.current == 'Player 1')
		{
			model.playBoard[i][col] = 'X';
		}
		else if (model.current == 'Player 2')
		{
			model.playBoard[i][col] = 'O';
		}
		else
		{
			console.log("not valid player in button call.");
		}
		model.win = checkWin(i,col);
		console.log('win = ' + model.win);
		if(model.win)
		{
			document.querySelector('#col1').style.visibility = 'hidden';
			document.querySelector('#col2').style.visibility = 'hidden';
			document.querySelector('#col3').style.visibility = 'hidden';
			document.querySelector('#col4').style.visibility = 'hidden';
			document.querySelector('#col5').style.visibility = 'hidden';
			document.querySelector('#col6').style.visibility = 'hidden';
			document.querySelector('#col7').style.visibility = 'hidden';
			document.querySelector('#replay').style.visibility = 'visible';
		}
		else
		{
			model.current = otherPlayer(model.current);
		}
	}
}

function render()
{
	if(model.win == true)
	{
		context.fillStyle = "black";
		context.font = "40pt Calibri";
		context.fillText('Congrats ' + model.current + ' Won!', 50,50);
	}
	else
	{
		context.fillStyle = "black";
		context.font = "40pt Calibri";
		context.fillText('2 Player Connect 4', 100,50);
	}
	context.fillStyle = "yellow";
	context.fillRect(50,110,460,340);
	for(let i = 0; i<6; i++)
	{
		for(let j = 0; j<7; j++)
		{
			//context.fillText(model.playBoard[i][j],90+j*60,150+i*40);
			if(model.playBoard[i][j] == 'W')
			{
				context.beginPath();
				context.arc(100+j*60,150+i*50,20,0,2*Math.PI);
				context.fillStyle = "green";
				context.fill();
			}
			else if(model.playBoard[i][j] == 'X')
			{
				context.beginPath();
				context.arc(100+j*60,150+i*50,20,0,2*Math.PI);
				context.fillStyle = "red";
				context.fill();
			}
			else if(model.playBoard[i][j] == 'O')
			{
				context.beginPath();
				context.arc(100+j*60,150+i*50,20,0,2*Math.PI);
				context.fillStyle = "blue";
				context.fill();
			}
			else
			{
				context.beginPath();
				context.arc(100+j*60,150+i*50,20,0,2*Math.PI);
				context.fillStyle = "white";
				context.fill();
			}
		}
	}
	context.font = "20pt Calibri";
	if(model.current == 'Player 1')
	{
		context.fillStyle = 'red';
	}	
	else if(model.current == 'Player 2')
	{
		context.fillStyle = 'blue';
	}
	context.fillText('Current Player is ' + model.current, 90,480);
}

document.querySelector("#col1").addEventListener(
	"click",
	e => {
		btnHandle(0);
	}
)

document.querySelector("#col2").addEventListener(
	"click",
	e => {
		btnHandle(1);
	}
)

document.querySelector("#col3").addEventListener(
	"click",
	e => {
		btnHandle(2);
	}
)

document.querySelector("#col4").addEventListener(
	"click",
	e => {
		btnHandle(3);
	}
)

document.querySelector("#col5").addEventListener(
	"click",
	e => {
		btnHandle(4);
	}
)

document.querySelector("#col6").addEventListener(
	"click",
	e => {
		btnHandle(5);
	}
)

document.querySelector("#col7").addEventListener(
	"click",
	e => {
		btnHandle(6);
	}
)

document.querySelector("#replay").addEventListener(
	"click",
	e => {
		document.querySelector('#col1').style.visibility = 'visible';
		document.querySelector('#col2').style.visibility = 'visible';
		document.querySelector('#col3').style.visibility = 'visible';
		document.querySelector('#col4').style.visibility = 'visible';
		document.querySelector('#col5').style.visibility = 'visible';
		document.querySelector('#col6').style.visibility = 'visible';
		document.querySelector('#col7').style.visibility = 'visible';
		document.querySelector('#replay').style.visibility = 'hidden';
		model.playBoard = [['  ','  ','  ','  ','  ','  ','  '],
			['  ','  ','  ','  ','  ','  ','  '],
			['  ','  ','  ','  ','  ','  ','  '],
			['  ','  ','  ','  ','  ','  ','  '],
			['  ','  ','  ','  ','  ','  ','  '],
			['  ','  ','  ','  ','  ','  ','  ']];
		model.current = 'Player 1';
		model.win = false;
	}
)

function splat(t) {
	context.clearRect(0,0,canvas.width,canvas.height);
	render();
	window.requestAnimationFrame(splat);
}

window.requestAnimationFrame(splat);