let canvas, context;
window.onload = function () {
	canvas = document.getElementById('myCanvas');
	if (canvas.getContext) {
		context = canvas.getContext("2d");
	}
}

// Limpa UI
function clean() {
	//dados de entrada
	document.getElementById("p1x").value = "";
	document.getElementById("p1y").value = "";
	document.getElementById("p2x").value = "";
	document.getElementById("p2y").value = "";
	document.getElementById("n").value = "";
	//dados de saída (resultados)
	document.getElementById("res").innerHTML = "<tr><th colspan='2'>RESULTADOS</th></tr><tr><td>Ponto médio</td><td id='pontomedio'></td></tr><tr><td>Distância</td><td id='dist'></td></tr>";
	if (canvas)
		context.clearRect(0, 0, canvas.width, canvas.height);
}

// Arredonda valores em vírgula flutuante
function _round(value, precision) {
	let mult = Math.pow(10, precision);
	return (Math.floor(value * mult) / mult);
}

// Converte ângulo de graus para radianos
function deg2rad(ang) {
	return (Math.PI * ang / 180);
}

// Converte ângulo de radianos para graus
function rad2deg(ang) {
	return (180 * ang / Math.PI);
}

function calcula() {
	let p1 = {
		x: parseFloat(document.getElementById('p1x').value),
		y: parseFloat(document.getElementById('p1y').value)
	};
	let p2 = {
		x: parseFloat(document.getElementById('p2x').value),
		y: parseFloat(document.getElementById('p2y').value)
	};
	let n = parseFloat(document.getElementById('n').value);

	//alínea a)
	let res = document.getElementById("pontomedio");


	let cX = (p1.x + p2.x) / 2
	let cY = (p1.y + p2.y) / 2
	res.innerHTML += `x = ${cX} y = ${cY}`; //TODO: colocar aqui a resposta à alinea a) 







	//alínea b)
	res = document.getElementById("dist");

	let distance = Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2))


	distance = _round(distance, 3)
	let radius = distance / 2



	res.innerHTML += `${distance}`; //TODO: colocar aqui a resposta à alinea b)

	if (canvas) {
		//TODO: desenhar o segmento de reta definido pelos dois pontos 
		//e a circunferência definida pelo centro (ponto médio)

		// !circle draw 

		context.strokeStyle = 'red';

		context.beginPath();
		context.arc(cX, cY, radius, Math.PI / 180 * 0, Math.PI / 180 * 360);
		context.stroke();
		context.closePath();

		context.strokeStyle = 'black';

		// !rect segment draw
		context.beginPath();
		context.moveTo(p1.x, p1.y);
		context.lineTo(p2.x, p2.y);
		context.stroke();
		context.closePath();

		//e a distância entre os dois pontos
	}

	//alínea c)
	res = document.getElementById("res");
	res.innerHTML += "<tr><th colspan='2'>Alínea c)</th></tr>";

	let N = document.getElementById("n").value
	let ang = 0
	let myX = 0
	let myY = 0



	for (i = 0; i < N; i++) {

		myX = cX + radius * Math.cos(ang)
		myY = cY + radius * Math.sin(ang)



		ang += 2 * (Math.PI / N)
		//*draw Points
		context.fillStyle = 'green';
		context.beginPath();
		context.arc(myX, myY, 5, Math.PI / 180 * 0, Math.PI / 180 * 360);
		context.stroke();
		context.fill();
		context.closePath();

		res.innerHTML += `<tr><td colspan='2'> point :${i +1}</td>
		<td colspan='2'> ${ _round(myX,3)} , ${ _round(myY,3)}</td>
		</tr>`;
	}

	//alínea d)
	res.innerHTML += "<tr><th colspan='2'>Alínea d)</th></tr>";


	// *calculate initial angle
	ang = Math.atan2(p2.y - p1.y, p2.x - p1.x)


	for (i = 0; i < N; i++) {
		//*calculate Points
		myX = cX + radius * Math.cos(ang)
		myY = cY + radius * Math.sin(ang)

		ang += 2 * (Math.PI / N)
		//*draw Points
		context.fillStyle = 'blue';
		context.beginPath();
		context.arc(myX, myY, 5, Math.PI / 180 * 0, Math.PI / 180 * 360);
		context.stroke();
		context.fill();
		context.closePath();

		res.innerHTML += `<tr><td colspan='2'> point :${i +1}</td>
		<td colspan='2'> ${ _round(myX,3)} , ${ _round(myY,3)}</td>
		</tr>`;
	}
}