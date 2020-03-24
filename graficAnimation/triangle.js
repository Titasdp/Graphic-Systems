let gl;

window.onload = function init() {

	// Gets 3D Canvas context
	let canvas = document.querySelector('#gl-canvas');
	gl = WebGLUtils.setupWebGL(canvas);

	if (!gl) { alert("WebGL is not available"); }

	// sets WebGL viewport and background color
	gl.viewport(0, 0, canvas.width, canvas.height);
	gl.clearColor(0.8, 0.8, 0.8, 1.0);

	// compiles both vertex and fragment shaders in GPU
	let program = initShaders(gl, "vertex-shader", "fragment-shader");
	gl.useProgram(program);

	//triangle data: vertices and colors
	const vertices = new Float32Array([-1, -1,
		0, 1,
		1, -1]);
	const colors = new Float32Array([1, 0, 0, 1,
		0, 1, 0, 1,
		0, 0, 1, 1]);

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
	gl.clear(gl.COLOR_BUFFER_BIT);
	// draws a filled triangle with interpolated colors
	gl.drawArrays(gl.TRIANGLES, 0, 3);
}