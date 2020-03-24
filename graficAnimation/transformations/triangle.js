let gl;
let program
let angle = 0
let transformation = "rotation"
let scaleV = 0
let scaleChange = +0.01
let walking = 0.01
let pos = 0


// ! <Key 1 and 2 touch
let angle1 = 0
let walking1 = 0.5
let pos1 = 0
let change = 1
// !Key 1 and 2 press>


// // ! <Key one touch
// let angle1 = 0
// let walking1 = 0.01
// let pos2 = 0
// let change = 1
// // !Key one touch>












window.onload = function init() {
	// Gets 3D Canvas context
	let canvas = document.querySelector('#gl-canvas');
	gl = WebGLUtils.setupWebGL(canvas);
	if (!gl) {
		alert("WebGL is not available");
	}
	// sets WebGL viewport and background color
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.8, 0.8, 0.8, 1.0);
	// compiles both vertex and fragment shaders in GPU
	program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);
	//triangle data: vertices and colors
	const vertices = new Float32Array([0.5 * this.Math.cos(0), 0.5 * this.Math.sin(0),
		0.5 * this.Math.cos(2 * this.Math.PI / 3), 0.5 * this.Math.sin(this.Math.PI / 3),
		0.5 * this.Math.cos(-2 * this.Math.PI / 3), 0.5 * this.Math.sin(-2 * this.Math.PI / 3)
	]);
	const colors = new Float32Array([1, 0, 0, 1,
		0, 1, 0, 1,
		0, 0, 1, 1
	]);
	// Creates buffer for geometric data
	let vertexBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
	// Links shader variable to geometric data buffer
	let vPosition = gl.getAttribLocation(program, "vPosition");
	gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vPosition);
	// Creates buffer for color data
	let colorBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);
	// Links shader variable to color data buffer
	let vColor = gl.getAttribLocation(program, "vColor");
	gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
	gl.enableVertexAttribArray(vColor);
	render();
};

function render() {
	updateModelView()
	gl.clear(gl.COLOR_BUFFER_BIT);
	// draws a filled triangle with interpolated colors
	gl.drawArrays(gl.TRIANGLES, 0, 3);
	window.requestAnimationFrame(render)
}

function updateModelView() {
	let M = mat4()
	let V = mat4()
	let modelView = gl.getUniformLocation(program, "ModelView");
	if (transformation === "rotation") {
		M = rotate(angle, 0, 0, 1)
		angle += 1
		gl.uniformMatrix4fv(modelView, false, flatten(M));
	} else if (transformation === "scale") {
		M = scalem([scaleV, scaleV, scaleV])
		scaleV += scaleChange

		if (scaleV >= 2 || scaleV < -1) {
			scaleChange = -scaleChange
		}

		gl.uniformMatrix4fv(modelView, false, flatten(M));
	} else if (transformation === "translate") {

		M = translate([pos, 0, 0])

		pos += walking
		if (pos >= 0.5 || pos <= -0.5) {

			walking = walking * -1
		}
		gl.uniformMatrix4fv(modelView, false, flatten(M));

	} else if (transformation === 2) {

		M = translate([0.01, 0, 0])
		V = mult(M, rotate(angle1, [0, 0, 1]))

		angle1++;

		gl.uniformMatrix4fv(modelView, false, flatten(V));


	} else if (transformation === 1) {

		M =  rotate(angle1, [0, 0, 1])
		V = mult(M, translate([0.5, 0, 0]))
		angle1++;

		gl.uniformMatrix4fv(modelView, false, flatten(V));


	}
}
window.addEventListener("keydown", event => {

	restoreVariables()


	switch (event.key) {
		case "r":
			transformation = "rotation"
			console.log("r");
			break;
		case "t":
			transformation = 'translate'
			break;
		case "s":
			transformation = "scale"
			break;
		case "1":
			transformation = 1
			break;
		case "2":
			transformation = 2
			break;
		default:
			break;
	}
})



function restoreVariables() {

	angle = 0
	transformation = "rotation"
	scaleV = 0
	scaleChange = +0.01
	walking = 0.01
	pos = 0
	angle1 = 0
	walking1 = 0.01
	pos1 = 0
	change = 1
}