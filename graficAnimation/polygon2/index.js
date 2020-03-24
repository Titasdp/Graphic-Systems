let gl;
let vertices = []
let N = 0
let xCenter, yCenter
let withButton = true
let program

let keys = []

window.onload = function init() {


    document.getElementById("create").addEventListener("click", createButtonPress)
    window.addEventListener('keydown', wPressPressed);
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



    // !color changer parte 
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);
    // !color changer parte>



    // Uploads data into GPU
    let bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
    // gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);



};

// Draw the scene
function render() {
    program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program)


    // !<defines the color that each pixel will be draw 
    // Links shader variables to data buffers
    let vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    // !defines the color that each pixel will be draw> 



    gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw data as triangle primitives
    gl.drawArrays(gl.TRIANGLE_FAN, 0, N);
    gl.useProgram(program);
}


renderWhitW = () => {
    //! color change
    program = initShaders(gl, "vertex-shader", "fragment-shader-red");
    gl.useProgram(program)



    // !<defines the color that each pixel will be draw 
    // Links shader variables to data buffers
    let vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    // !defines the color that each pixel will be draw> 



    gl.clear(gl.COLOR_BUFFER_BIT);
    // Draw data as triangle primitives
    gl.drawArrays(gl.LINE_LOOP, 0, N);
    gl.useProgram(program);
}



function createPolygon() {
    let R = parseFloat(document.getElementById("radius").value)
    N = parseInt(document.getElementById("numOfVer").value)
    let cX = parseFloat(document.getElementById("centerX").value)
    let cY = parseFloat(document.getElementById("centerY").value)





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



    if (withButton == false) {
        renderWhitW()
    } else {
        render()
    }


}



function createButtonPress() {
    withButton = true
    createPolygon()
}

function wPressPressed(e) {
    keys[e.keyCode] = true;

    if (keys[87] == true) {
        withButton = false
        createPolygon()
    }
}