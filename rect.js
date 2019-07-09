var canvas
var ctx
var c,d;
var strokes = []
var currentStroke = null;

var draw = true;

var brush = {
    x: 0,
    y: 0,
    color: '#000000',
    size: 10,
    down: false
}

var initialx;
var initialy;
var finalx;
var finaly;


var temp = window.innerHeight;

canvas = $('#draw');
canvas.attr({

    width: window.innerWidth,
    height: temp,
})
ctx = canvas[0].getContext('2d');
console.log(canvas);


function redraw() {

    ctx.clearRect(0, 0, canvas.width(), canvas.height());
    ctx.lineCap = 'round';

    for (var i = 0; i < strokes.length; i++) {
        console.log(strokes[i], "Coming strokes!!");

        var s = strokes[i];
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        // data.line.startX;

        ctx.moveTo(s.points[0].x, s.points[0].y);
        // for (var j = 0; j < s.points.length; j++) {
        //     var p = s.points[j];
        //     ctx.lineTo(p.x, p.y);
        //     // ctx.quadraticCurveTo(0,0,p.x, p.y)
        
        // }
        // ctx.stroke();
        for(var j=1; j<s.points.length-2;j++){
            c = (s.points[j].x + s.points[j + 1].x) / 2
            d = (s.points[j].y + s.points[j + 1].y) / 2;
            ctx.quadraticCurveTo(s.points[j].x, s.points[j].y, c, d)
            
        }
        // ctx.quadraticCurveTo(s.points[i].x, s.points[i].y, s.points[i + 1].x, s.points[i + 1].y)
        ctx.stroke();



    }

}

function redraw_rect(){

}



function init() {
    if (draw) {
        canvas.mousedown(function (e) {

            brush.down = true;
            brush.x = e.pageX;
            brush.y = e.pageY;
            //    console.log(brush.x,brush.y);
            currentStroke = {
                x: brush.x,
                y: brush.y,
                color: brush.color,
                size: brush.size,
                points: []
            }
            currentStroke.points.push({
                x: brush.x,
                y: brush.y
            });
            strokes.push(currentStroke);
            //    console.log(currentStroke.points,"Mouse dowmn valla!!!");
            redraw();

        });

        canvas.mousemove(function (e) {
            if (brush.down) {
                brush.x = e.pageX;
                brush.y = e.pageY;
                currentStroke.points.push({
                    x: brush.x,
                    y: brush.y
                });
                redraw();
                // console.log(currentStroke.points,"Mouse move valla!!!");     
            }




        })

        canvas.mouseup(function (e) {
            brush.down = false;
            brush.x = e.pageX;
            brush.y = e.pageY;

            currentStroke.points.push({
                x: brush.x,
                y: brush.y
            });


            //    console.log(currentStroke.points,"Mouse up valla!!!");
            // currentStroke = null;

            redraw();

        })








    } //if draw tag

    $('#save-btn').click(function () {
        window.open(canvas[0].toDataURL());
    });

    $('#undo-btn').click(function () {
        strokes.pop();
        redraw();
    });
    $('#clear-btn').click(function () {
        strokes = [];
        redraw();
      
    });
    $('#color-picker').on('input', function() {
        brush.color = this.value;
    });
    $('#brush-size').on('input', function() {
        brush.size = this.value;
        
    })

    $('#newdown-btn').click(function () {
        temp = temp + 500;
        canvas.attr({
            height : temp,
        })
    });


    $('#rect-btn').click( function(){
        draw = false

        canvas.mousedown(function(e) {
            
            brush.x = e.pageX;
            brush.y = e.pageY;
            currentStroke.points.push({
                x: brush.x,
                y:brush.y
            })
            initialx = brush.x;
            initialy = brush.y;
            
            ctx.beginPath();
            ctx.lineWidth = "6";
            ctx.strokeStyle = "red";
            ctx.rect(initialx, initialy, finalx-initialx, finaly-initialy);  
            ctx.stroke();
        })

        canvas.mousemove(function(e) {
            brush.x = e.pageX;
            brush.y = e.pageY;
            
            finalx = brush.x;
            finaly = brush.y;

            ctx.beginPath();
            ctx.lineWidth = "6";
            ctx.strokeStyle = "red";
            ctx.rect(initialx, initialy, finalx-initialx, finaly-initialy);  
            ctx.stroke();

        })
        canvas.mouseup(function(e) {
            brush.x = e.pageX;
            brush.y = e.pageY;
            currentStroke.points.push({
                x: brush.x,
                y:brush.y
            })
            finalx = brush.x;
            finaly = brush.y;

            ctx.beginPath();
            ctx.lineWidth = "6";
            ctx.strokeStyle = "red";
            ctx.rect(initialx, initialy, finalx-initialx, finaly-initialy);  
            ctx.stroke();
        })
        
    }  
    )



} //init closing tag



$(init);