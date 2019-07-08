var canvas
var ctx

var strokes = []
var currentStroke = null;

var draw = true;

var brush = {
    x: 0,
    y: 0,
    color: '#000000',
    size: 4,
    down: false
}

canvas = $('#draw');
canvas.attr({
    width: window.innerWidth,
    height: window.innerHeight,
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

        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (var j = 0; j < s.points.length; j++) {
            var p = s.points[j];
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
    }

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

    $('#rect-btn').click( function(){
        draw = false
        console.log(draw)
    }

        
    )



} //init closing tag

$(init);