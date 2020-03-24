let canvas, context;
window.onload = function () {
    canvas = document.getElementById('myCanvas');
    if (canvas.getContext) {
        context = canvas.getContext("2d");
    }
}

let points = [];



// need 
points = [{
    x: 10,
    y: 100
}, {
    x: 10,
    y: 200
}, {
    x: 100,
    y: 200
}, {
    x: 100,
    y: 100
}]





// for (const p of points) {
//     context.fillStyle = "blue";
//     context.beginPath();
//     context.arc(p.x, p.y, 3, 0, 2 * Math.PI);
//     context.fill();
// }

function insere() {
    let p = {
        x: parseFloat(document.getElementById('px').value),
        y: parseFloat(document.getElementById('py').value)
    };
    points.push(p);
    if (canvas) {
        context.fillStyle = "blue";
        context.beginPath();
        context.arc(p.x, p.y, 3, 0, 2 * Math.PI);
        context.fill();
    }
}

// Converte ângulo de graus para radianos
function deg2rad(ang) {
    return (Math.PI * ang / 180);
}

// Converte ângulo de radianos para graus
function rad2deg(ang) {
    return (180 * ang / Math.PI);
}



function desenha() {

    //TODO: desenhar polígono definido por todos os pontos inseridos (nº de pontos tem de ser >= 3)
    if (canvas && points.length > 2) {



        for (let i = 0; i < points.length; i++) {
            if (i == 0) {
                context.beginPath();
                context.moveTo(points[i].x, points[i].y);
            } else {
                context.lineTo(points[i].x, points[i].y);
            }

        }
        context.closePath();
        context.stroke();
        //...
    }
}

function desloca() {
    let d = {
        x: parseFloat(document.getElementById('dx').value),
        y: parseFloat(document.getElementById('dy').value)
    };
    desenha();
    if (canvas && points.length > 2) {
        for (const p of points) {
            context.fillStyle = "blue";
            context.beginPath();
            context.arc(p.x + d.x, p.y + d.y, 3, Math.PI / 180 * 0, Math.PI / 180 * 360);
            context.fill();
        }

        let newPoints = points

        for (const point of newPoints) {
            point.x += d.x
            point.y += d.y
        }
        let color = "red"
        creatSon(newPoints, color)

    }

}

function escala() {
    let s = {
        x: parseFloat(document.getElementById('sx').value),
        y: parseFloat(document.getElementById('sy').value)
    };
    desenha();
    if (canvas && points.length > 2) {

        for (const p of points) {
            context.fillStyle = "blue";
            context.beginPath();
            context.arc(p.x * s.x, p.y * s.y, 3, Math.PI / 180 * 0, Math.PI / 180 * 360);
            context.fill();
        }

        let newPoints = []
        for (const p of points) {
            newPoints.push(p)
        }



        // newPoints = points



        for (const point of newPoints) {
            point.x *= s.x
            point.y *= s.y


        }
        let color = "#5CA4A9"

        // console.log(newPoints);

        creatSon(newPoints, color)

    }
}

function roda() {
    let theta = parseFloat(document.getElementById('theta').value);
    //converte para radianos
    theta = Math.PI * theta / 180;
    desenha();
    if (canvas && points.length > 2) {


        for (const point of points) {
            context.fillStyle = "blue";
            context.beginPath();
            context.arc(point.x*Math.cos(theta) - point.y*Math.sin(theta), point.x*Math.sin(theta) + point.y*Math.cos(theta), 3, Math.PI / 180 * 0, Math.PI / 180 * 360);
            context.fill();
        }

        let newPoints = []
        for (const p of points) {
            newPoints.push(p)
        }

        for (const point of newPoints) {
            point.x =point.x*Math.cos(theta) - point.y*Math.sin(theta) 
            point.y = point.x*Math.sin(theta) + point.y*Math.cos(theta)
        }
        let color = "#8EA604"


        creatSon(newPoints, color)


    }
}




function creatSon(newPointsDraw, color) {
    let first = true
    context.strokeStyle = color

    for (const point of newPointsDraw) {
        if (first == true) {
            context.beginPath();
            context.moveTo(point.x, point.y);
        } else {
            context.lineTo(point.x, point.y);
        }
        first = false
    }

    context.closePath();
    context.stroke();

}