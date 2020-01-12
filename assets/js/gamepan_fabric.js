var curProblemIdx;
var timeCount;
var totalProblem;
var loseFlag;
var tryaginFlag;
var startSelection = 0;
$(function() {
	scoreStorage = window.localStorage;
	scoreStorage.setItem('grammer', 0);

	window._canvas = canvas = new fabric.Canvas('c');
	canvas.hoverCursor = 'pointer';
	canvas.selection = false
	// Do some initializing stuff
	fabric.Object.prototype.set({
	    transparentCorners: false,
	    selectable: false,
	});
	window.addEventListener('resize', resizeCanvas, true);
	
	loseFlag = 0;
	tryaginFlag = 0;

	function resizeCanvas() {
		canvas.setHeight($(".background").height());
		canvas.setWidth($(".background").width());
		canvas.renderAll();
	}
	// resize on init
	resizeCanvas();

	var scoreStorage = window.localStorage;

	fabric.Image.fromURL("./assets/imgs/background.jpg", function(oImg) {
		canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / oImg.width,
            scaleY: canvas.height / oImg.height
         });
	});
	addHomeObjects();
//	addGamepanObjects();
//	addTryagainObjects();
});

function addTryagainObjects() {
	var canvas = window._canvas;

	var w = canvas.width;
	var h = canvas.height;
	var scoreStorage = window.localStorage;
	var grammer = scoreStorage.getItem('grammer');

	fabric.Image.fromURL("./assets/imgs/background.jpg", function(oImg) {
		canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / oImg.width,
            scaleY: canvas.height / oImg.height
         });
	});

	var categoryRect = new fabric.Rect({
		width: 160,
		top: 30,
		rx: 15,
		height: 30,
		left: (w - 160) / 2,
		fill: 'white',
		shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
	});
	var categoryText = new fabric.Text('GRAMMER', {
		top: 34,
		fill: '#4169e1',
  		fontSize: 20,
  		fontWeight: 'bold',
  		fontFamily: 'Varela Round',
	});
	categoryText.set({ left: (w - categoryText.width) / 2 })

	var category = new fabric.Group([ categoryRect, categoryText ]);
	canvas.add(category);

	var text;
	if(grammer < 10)
		text = 'You should practise very hard';
	else if(grammer >= 10 && grammer <= 30)
		text = 'You should practise a little more';
	else
		text = 'You are a very talent guy';


	var judementText = new fabric.Textbox(text, {
		top: 90,
		fill: '#000080',
  		fontSize: 40,
  		fontWeight: 'bold',
  		fontFamily: 'Varela Round',
  		textAlign: 'center',
  		width: w - 30,
  		editable: false
	});
	judementText.set({ left: (w - judementText.width) / 2 })

	canvas.add(judementText);

	var scoreText = new fabric.Text('YOUR SCORE:', {
		top: 265,
		fill: 'red',
  		fontSize: 20,
  		fontFamily: 'Varela Round',
  		textAlign: 'center',
  		width: 500
	});
	scoreText.set({ left: (w - scoreText.width) / 2 })

	canvas.add(scoreText);

	var infoBoard = new fabric.Rect({
		width: 250,
		top: 300,
		rx: 15,
		height: 130,
		left: (w - 250) / 2,
		fill: 'white',
		shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
	});
	
	var starOn = document.getElementById('starOn');
	var starOnInstance = new fabric.Image(starOn, {
	  scaleX: 85 / starOn.width,
      scaleY: 85 / starOn.height,
      left: 95,
      top: 320
	});

	var starOff = document.getElementById('starOff');
	var starOffInstance = new fabric.Image(starOff, {
	  scaleX: 95 / starOff.width,
      scaleY: 95 / starOff.height,
      left: 95,
      top: 317
	});

	var scoreNum = new fabric.Text(grammer, {
		top: 328,
		fill: 'Green',
  		fontSize: 70,
  		fontFamily: 'Varela Round',
  		textAlign: 'center',
  		width: 500
	})
	scoreNum.set({ left: (w - scoreNum.width) / 2 + 60 })

	if(grammer == 0)
		var scoreInfoBoard = new fabric.Group([ infoBoard, starOffInstance, scoreNum ]);
	else
		var scoreInfoBoard = new fabric.Group([ infoBoard, starOnInstance, scoreNum ]);

	var homeButton = document.getElementById('homeI');
	var homeButtonInstanceTryagin = new fabric.Image(homeButton, {
	  scaleX: 85 / homeButton.width,
      scaleY: 85 / homeButton.height,
      left: 90,
      top: 480
	});

	var tryButton = document.getElementById('tryagain');
	var tryButtonInstance = new fabric.Image(tryButton, {
	  scaleX: 85 / tryButton.width,
      scaleY: 85 / tryButton.height,
      left: 215,
      top: 480
	});

	canvas.add(homeButtonInstanceTryagin);
	canvas.add(tryButtonInstance);
	canvas.add(scoreInfoBoard);

	canvas.on('mouse:down', function(option) {	
		if(option.target === homeButtonInstanceTryagin
		|| option.target === tryButtonInstance)
		{
			tryaginFlag =  1;
		}
	});

	canvas.on('mouse:up', function(option) {	
		var objects = canvas.getObjects();
		if(option.target === homeButtonInstanceTryagin && tryaginFlag == 1)
		{
			for(i = 0; i < objects.length; i ++)
				canvas.remove(objects[i]);
			addHomeObjects();
			tryaginFlag = 0;
		}
		if(option.target === tryButtonInstance && tryaginFlag == 1)
		{
			for(i = 0; i < objects.length; i ++)
				canvas.remove(objects[i]);
			addGamepanObjects();
			tryaginFlag = 0;
		}
	});

	window._canvas = canvas;
}

function addHomeObjects() {
	var canvas = window._canvas

	var w = canvas.width;
	var h = canvas.height;
	var padding = 20
	var sectionHeight = 50;

	var textStyle = {
		left: padding + 15,
		fontFamily: 'Varela Round',
	  	fontSize: 25,
	  	fill: '#4169e1',
	  	stroke: '#4169e1',
  		strokeWidth: 1
	}

	var rectStyle = {
		left: padding,
		width: w - 40,
		height: sectionHeight,
		shadow: 'rgba(0,0,0,0.3) 5px 5px 5px'
	}
	var gradientStyle = {
		type: 'linear',
	    x1: -(w - 40) / 2,
	    y1: 0,
	    x2: (w - 40) / 2,
	    y2: 0,
	    colorStops: {
	        0: '#ffffff',
	        1: '#8ff9f2'
	    }
	}

	fabric.Image.fromURL("./assets/imgs/background.jpg", function(oImg) {
		canvas.setBackgroundImage(oImg, canvas.renderAll.bind(canvas), {
            scaleX: canvas.width / oImg.width,
            scaleY: canvas.height / oImg.height
         });
	});

	/*---------------    Rects       ----------------------*/
	var grammerRect = new fabric.Rect({
		rx: 10,
		top: h / 2 - 30,
	});
	grammerRect.set(rectStyle);
	grammerRect.setGradient('fill', gradientStyle);

	var phrasalRect = new fabric.Rect({
		rx: 10,
		top: h / 2 + (sectionHeight + padding) - 30,
	});
	phrasalRect.set(rectStyle);
	phrasalRect.setGradient('fill', gradientStyle);

	var prepositionRect = new fabric.Rect({
		rx: 10,
		top: h / 2 + (sectionHeight + padding) * 2 - 30,
	});
	prepositionRect.set(rectStyle);
	prepositionRect.setGradient('fill', gradientStyle);

	var definitionRect = new fabric.Rect({
		rx: 10,
		top: h / 2 + (sectionHeight + padding) * 3 - 30,
	});
	definitionRect.set(rectStyle);
	definitionRect.setGradient('fill', gradientStyle);


	/*---------------    Texts       ----------------------*/
	var grammerText = new fabric.Textbox('Grammer', {
	  	top: h / 2 - 18,
	  	editable: false,
	  	width: 250

	});
	grammerText.set(textStyle);

	var phrasalText = new fabric.Textbox('Phrasal Verbs', {
	  	top: h / 2 - 18 + (sectionHeight + padding),
	  	editable: false,
	  	width: 250
	});
	phrasalText.set(textStyle);

	var prepositionText = new fabric.Textbox('Prepositions', {
	  	top: h / 2 - 18 + (sectionHeight + padding) * 2,
	  	editable: false,
	  	width: 250
	});
	prepositionText.set(textStyle);

	var definitionText = new fabric.Textbox('Definitions', {
	  	top: h / 2 - 18 + (sectionHeight + padding) * 3,
	  	editable: false,
	  	width: 250
	});
	definitionText.set(textStyle);

	/*---------------    Star       ----------------------*/
	var starOn = document.getElementById('starOn');
	var starOnInstance = new fabric.Image(starOn, {
	  scaleX: 42 / starOn.width,
      scaleY: 42 / starOn.height
	});

	var starOff = document.getElementById('starOff');
	var starOffInstance = new fabric.Image(starOff, {
	  scaleX: 42 / starOff.width,
      scaleY: 42 / starOff.height
	});

	var grammerStarOn = fabric.util.object.clone(starOnInstance);
	var phrasalStarOn = fabric.util.object.clone(starOnInstance);
	var prepositionStarOn = fabric.util.object.clone(starOnInstance);
	var definitionStarOn = fabric.util.object.clone(starOnInstance);

	var grammerStarOff = fabric.util.object.clone(starOffInstance);
	var phrasalStarOff = fabric.util.object.clone(starOffInstance);
	var prepositionStarOff = fabric.util.object.clone(starOffInstance);
	var definitionStarOff = fabric.util.object.clone(starOffInstance);

	grammerStarOn.set({left: 230, top: h / 2 - 26});
	phrasalStarOn.set({left: 230, top: h / 2 - 26 + (sectionHeight + padding)});
	prepositionStarOn.set({left: 230, top: h / 2 - 26 + (sectionHeight + padding) * 2});
	definitionStarOn.set({left: 230, top: h / 2 - 26 + (sectionHeight + padding) * 3});

	grammerStarOff.set({left: 230, top: h / 2 - 26});
	phrasalStarOff.set({left: 230, top: h / 2 - 26 + (sectionHeight + padding)});
	prepositionStarOff.set({left: 230, top: h / 2 - 26 + (sectionHeight + padding) * 2});
	definitionStarOff.set({left: 230, top: h / 2 - 26 + (sectionHeight + padding) * 3});

	/*---------------    Number       ----------------------*/
	scoreStorage = window.localStorage;

	var scoreStyle = {
		fontSize: 24,
	  	fill: 'Green',
	  	stroke: 'Green',
  		strokeWidth: 1,
  		fontFamily: 'Varela Round'
	}
	var grammer_score;
	if(scoreStorage.getItem('grammer'))
		grammer_score = scoreStorage.getItem('grammer');
	else
		grammer_score = 0;

	var grammerNum = new fabric.Text(grammer_score, {
	  	top: h / 2 - 18,
	  	left: 300,
	});
	grammerNum.set(scoreStyle);

	var phrasalNum = new fabric.Text('1', {
	  	top: h / 2 - 18 + (sectionHeight + padding),
	  	left: 300,
	});
	phrasalNum.set(scoreStyle);

	var prepositionNum = new fabric.Text('0', {
	  	top: h / 2 - 18 + (sectionHeight + padding) * 2,
	  	left: 300,
	});
	prepositionNum.set(scoreStyle);

	var definitionNum = new fabric.Text('1', {
	  	top: h / 2 - 18 + (sectionHeight + padding) * 3,
	  	left: 300,
	});
	definitionNum.set(scoreStyle);

	/*---------------    Group       ----------------------*/
	if(scoreStorage.getItem('grammer') == 0)
		var grammer = new fabric.Group([ grammerRect, grammerText, grammerStarOff, grammerNum ]);
	else
		var grammer = new fabric.Group([ grammerRect, grammerText, grammerStarOn, grammerNum ]);
	
	if(scoreStorage.getItem('phrasal') == 0)
		var phrasal = new fabric.Group([ phrasalRect, phrasalText, phrasalStarOff, phrasalNum ]);
	else
		var phrasal = new fabric.Group([ phrasalRect, phrasalText, phrasalStarOn, phrasalNum ]);
	
	if(scoreStorage.getItem('preposition') == 0)
		var preposition = new fabric.Group([ prepositionRect, prepositionText, prepositionStarOff, prepositionNum ]);
	else
		var preposition = new fabric.Group([ prepositionRect, prepositionText, prepositionStarOn, prepositionNum ]);
	
	if(scoreStorage.getItem('definition') == 0)	
		var definition = new fabric.Group([ definitionRect, definitionText, definitionStarOff, definitionNum ]);
	else
		var definition = new fabric.Group([ definitionRect, definitionText, definitionStarOn, definitionNum ]);
	canvas.add(grammer, phrasal, preposition, definition);

	canvas.on('mouse:up', function(option) {
		if(option.target === grammer)
		{
			var objects = canvas.getObjects();
			for(i = 0; i < objects.length; i ++)
				canvas.remove(objects[i]);
			addGamepanObjects();
		}
	});

	window._canvas = canvas;
}

function addGamepanObjects() {
	var canvas = window._canvas;

	var w = canvas.width;
	var h = canvas.height;
	var homeButton = document.getElementById('homeI');
	var homeButtonInstanceGamepan = new fabric.Image(homeButton, {
	  scaleX: 58 / homeButton.width,
      scaleY: 58 / homeButton.height,
      left: 20,
      top: 20
	});

	var textStyle = {
		fontSize: 40,
		originX: 'center',
		originY: 'center',
		fill: '#4169e1',
		fontWeight: 'bold'
	}

	canvas.add(homeButtonInstanceGamepan);

	var text = "The children are swimming _____ the river but it's getting cold.";
	var problemText = new fabric.Textbox(text, {
		top: 240,
  		opacity: 0.2,
		fill: '#000080',
  		fontSize: 27,
  		fontWeight: 'bold',
  		fontFamily: 'Varela Round',
  		textAlign: 'center',
  		width: w - 40,
  		left: 20,
  		editable: false
	});
	canvas.add(problemText);

	var bg = new fabric.Rect({
	  fill: 'white',
	  originX: 'center',
	  originY: 'center',
	  rx: 10, 
	  ry: 10,
	  width: (w - 70)/2,
	  height:90,
	  shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
	});
	var word1 = new fabric.Text('');
	word1.set(textStyle);
	canvas.add(bg);
	canvas.add(word1);

	var bg2 = new fabric.Rect({
	  fill: 'white',
	  originX: 'center',
	  originY: 'center',
	  rx: 10, 
	  ry: 10,
	  width: (w - 70)/2,
	  height:90,
	  shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
	});
	var word2 = new fabric.Text('');
	word2.set(textStyle);
	canvas.add(bg2);
	canvas.add(word2);

	var bg3 = new fabric.Rect({
	  fill: 'white',
	  originX: 'center',
	  originY: 'center',
	  rx: 10, 
	  ry: 10,
	  width: (w - 70)/2,
	  height:90,
	  shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
	});
	var word3 = new fabric.Text('');
	word3.set(textStyle);
	canvas.add(bg3);
	canvas.add(word3);

	var bg4 = new fabric.Rect({
	  fill: 'white',
	  originX: 'center',
	  originY: 'center',
	  rx: 10, 
	  ry: 10,
	  width: (w - 70)/2,
	  height:90,
	  shadow: 'rgba(0,0,0,0.3) 5px 5px 5px',
	});
	var word4 = new fabric.Text('');
	word4.set(textStyle);
	canvas.add(bg4);
	canvas.add(word4);

	totalProblem = quizes.length;
	shuffleArray(quizes);

	curProblemIdx = 0;
	setProblem(quizes[curProblemIdx]);
	
	var first = new fabric.Group([ bg, word1 ]);
	var second = new fabric.Group([ bg2, word2 ]);
	var fourth = new fabric.Group([ bg4, word4 ]);
	var third = new fabric.Group([ bg3, word3 ]);

	first.set({ left: 25, top: 330 });
	second.set({ left: 35 + (w - 60)/2, top: 330 });
	third.set({ left: 25, top: 440 });
	fourth.set({ left: 35 + (w - 60)/2, top: 440 });
	canvas.add(first, second, third, fourth);

	var gradientStyle = {
		type: 'linear',
	    x1: 0,
	    y1: 0,
	    x2: w - 40,
	    y2: 0,
	    colorStops: {
	        0: 'rgba(43,194,83, 0.9)',
	        1: 'rgba(84,240,84, 0.8)'
	    }
	}

	canvas.add(new fabric.Rect({
		fill: '#ff69b4',
		opacity: 0.85,
		shadow: 'rgba(0,0,255,0.4) 5px 5px 5px',
		rx: 15,
		ry: 15,
		left: 16,
		top: 100,
		width: w - 30,
		height: 70
	}));

	canvas.add(new fabric.Rect({
        left: 20,
        top: 130,
        rx: 12,
        ry: 12,
        width: w - 40,
        height: 26,
        fill: '#555',
        opacity: 0.75
    }));

    progress = new fabric.Rect({
        left: 25,
        top: 135,
        rx: 7,
        ry: 7,
        width: w - 50,
        height: 15,
    });

    progress.setGradient('fill', gradientStyle);
    canvas.add(progress);

    countDown();

    canvas.on('mouse:move', function(option) {
		target = option.target;
		if((target == first 
		|| target == second 
		|| target == third 
		|| target == fourth) && startSelection == 1)
		{
			first._objects[0].set('fill', 'white');
			second._objects[0].set('fill', 'white');
			third._objects[0].set('fill', 'white');
			fourth._objects[0].set('fill', 'white');
			target._objects[0].set('fill', '#fdc2f0');
		}
		else if(startSelection == 1)
		{
			first._objects[0].set('fill', 'white');
			second._objects[0].set('fill', 'white');
			third._objects[0].set('fill', 'white');
			fourth._objects[0].set('fill', 'white');
		}
	});

    canvas.on('mouse:down', function(option) {
		target = option.target;
		if((target == first 
		|| target == second 
		|| target == third 
		|| target == fourth) && startSelection == 1)
		{
			bg = target._objects[0];
			bg.set('shadow', 'rgba(10,100,150,0.5) 5px 7px 5px');
		}
	});

	canvas.on('mouse:up', function(option) {
		target = option.target;
		if(target == homeButtonInstanceGamepan)
		{
			var objects = canvas.getObjects();
			for(i = 0; i < objects.length; i ++)
				canvas.remove(objects[i]);
			
			addHomeObjects();
			canvas.renderAll();
		}
		if((target == first 
		|| target == second 
		|| target == third 
		|| target == fourth) && startSelection == 1)
		{
			bg = target._objects[0];
			bg.set('shadow', 'rgba(0,0,0,0.3) 5px 5px 5px');

			word = target._objects[1].text;
			curProblem = quizes[curProblemIdx];

			
			if(word == curProblem.data.sel.txt) {
				curProblemIdx ++;
				if(curProblemIdx == totalProblem) {
					scoreStorage.setItem('grammer', totalProblem);
					var objects = canvas.getObjects();
					for(i = 0; i < objects.length; i ++)
						canvas.remove(objects[i]);
					
					addTryagainObjects();
					canvas.renderAll();
				}
				else
				{
					startSelection = 0;
					setProblem(quizes[curProblemIdx]);
				}
			}
			else {
				target._objects[0].set('fill', 'red');
				target._objects[1].set('fill', 'white');
				setCorrectWord();
				loseFlag = 1;
				loseGame();
			}
		}
		else if(startSelection == 1)
		{
			first._objects[0].set('shadow', 'rgba(0,0,0,0.3) 5px 5px 5px');
			second._objects[0].set('shadow', 'rgba(0,0,0,0.3) 5px 5px 5px');
			third._objects[0].set('shadow', 'rgba(0,0,0,0.3) 5px 5px 5px');
			fourth._objects[0].set('shadow', 'rgba(0,0,0,0.3) 5px 5px 5px');
		}
	});

	window._canvas = canvas;
}

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

function setProblem(problem) {
	var canvas = window._canvas;
	var problemTextInstance = canvas.item(1);
	
	problemTextInstance.text = problem.title;
	problemTextInstance.set({top: 280, opacity: 0,})
	problemTextInstance.animate('top', 200, {
		onChange: canvas.renderAll.bind(canvas),
		duration: 400,
  		easing: fabric.util.ease.easeOutBounce
	})
	problemTextInstance.animate('opacity', 1, {
		onChange: canvas.renderAll.bind(canvas),
		duration: 400,
  		easing: fabric.util.ease.easeOutBounce
	})
	setTimeout(function(){ 
		startSelection = 1; 
	}, 700);
	var objects = canvas.getObjects();
	canvas.item(3).text = problem.data.options[0];
	canvas.item(5).text = problem.data.options[1];
	canvas.item(7).text = problem.data.options[2];
	canvas.item(9).text = problem.data.options[3];
	timeCount = 6000;
}
function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
function setCorrectWord() {
	matchIndex = 0;
	curProblem = quizes[curProblemIdx];
	var canvas = window._canvas;

	$.each(curProblem.data.options, function(index, value) {
		if(value == curProblem.data.sel.txt)
			matchIndex = index;
	});
	
	switch(matchIndex){
		case 0:
			canvas.item(2).set('fill', 'Green');
			canvas.item(3).set('fill', 'White');
			break;
		case 1:
			canvas.item(4).set('fill', 'Green');
			canvas.item(5).set('fill', 'White');
			break;
		case 2:
			canvas.item(6).set('fill', 'Green');
			canvas.item(7).set('fill', 'White');
			break;
		case 3:
			canvas.item(8).set('fill', 'Green');
			canvas.item(9).set('fill', 'White');
			break;
	}
}

function loseGame() {
	var scoreStorage = window.localStorage;
	var canvas = window._canvas; 
	scoreStorage.setItem('grammer', curProblemIdx);

	canvas.on('mouse:down', function(option) {
		if(loseFlag == 1)
		{
			var objects = canvas.getObjects();
			for(i = 0; i < objects.length; i ++)
				canvas.remove(objects[i]);
			addTryagainObjects();
			canvas.renderAll()
			loseFlag = 0;
		}
	});

	timeCount = 0;
}

function countDown() {
	var timeoutId;
	var canvas = window._canvas;
	var w = canvas.width;

	if(canvas.item(16))
		canvas.item(16).set('width', timeCount/6000 * (w - 50));
	timeCount--;
	canvas.renderAll();
	if (timeCount <= 0) {
		setCorrectWord();
		loseGame();	
		loseFlag = 1;
		canvas.renderAll();
		clearTimeout(timeoutId);
	}
	else {
    	timeoutId = setTimeout(countDown, 10);
	}
}


/*
When can you available with your computer during a hour continously? I am passionate to fix this issue with you but you are offline so often.
*/