let gl;
let vertices = []
let N = 0
let xCenter, yCenter

window.onload = function init() {

    document.getElementById("create").addEventListener("click", createPolygon)

    // Gets 3D Canvas context
    let canvas = document.getElementById('gl-canvas');

    // JavaScript utilities for common WebGL tasks (checks for success or failure)
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL not available");
    }

    // Sets WebGL viewport (same size as Canvas element)
    gl.viewport(0, 0, canvas.width, canvas.height);
    // Sets background color
    gl.clearColor(0.9, 0.9, 0.8, 1.0);

    // Compiles both vertex and fragment shaders in GPU 
    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);



    // Uploads data into GPU
    let bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    // gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Links shader variables to data buffers
    let vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

};

// Draw the scene
function render() {
    gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw data as triangle primitives
    gl.drawArrays(gl.TRIANGLE_FAN, 0, N);
}



function createPolygon() {
    let R = parseFloat(document.getElementById("radius").value)
    N = parseInt(document.getElementById("numOfVer").value)
    let cX = parseFloat(document.getElementById("centerX").value)
    let cY = parseFloat(document.getElementById("centerY").value)



    alert(N)



    const alpha = 2 * Math.PI / N;
    vertices = [];
    for (i = 0; i < N; i++) {
        // alert(i)
        let x = cX + R * Math.cos(i * alpha);
        let y = cY + R * Math.sin(i * alpha);
        vertices.push(x);
        vertices.push(y);
    }



    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);
    render()






}