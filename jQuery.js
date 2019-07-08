var canvas;
var ctx;
var checkReck = true;
// var points;
var brush = {
    x: 0,
    y: 0,
    color: '#000000',
    size: 4,
    down: false
};

var strokes = []; // for storing prev strokes
var currentStroke = null // current stroke


var rectStrokes = [];


    function redraw() {

        ctx.clearRect(0,0,canvas.width(),canvas.height());
        ctx.lineCap = 'round';
    
        for(var i=0;i<strokes.length;i++){
            console.log(strokes[i],"Coming strokes!!");
            
            var s = strokes[i];
            ctx.strokeStyle = s.color;
            ctx.lineWidth = s.size;
            ctx.beginPath();
    
            ctx.moveTo(s.points[0].x,s.points[0].y);
            for(var j = 0; j< s.points.length; j++){
                var p = s.points[j];
                ctx.lineTo(p.x,p.y);
            }
            ctx.stroke();
        }
    
    }
function rectangle() {
    console.log(checkReck);
       
    checkReck = false;
    console.log(checkReck);

    var y1,y2;
    var x1,x2;
    var y1,y2;
 canvas.mousedown(function(e) {
    console.log(e.pageX);
    
    x1 = e.pageX;
    console.log(x1,"x1 vale")
    y1 = e.pageY;

 }).mouseup(function(e) {
    x2 = e.pageX;
    y2 = e.pageY;

    ctx.beginPath();
    ctx.lineWidth = brush.size;
    ctx.strokeStyle = brush.color;
    ctx.rect(x1, y1, x2, y2); 
    ctx.stroke();
    
 })
}

function init() {
    canvas  = $('#draw');
    canvas.attr({
        width: window.innerWidth,
        height: window.innerHeight,
        })
    ctx =canvas[0].getContext('2d');
    // console.log(ctx,"this is ctx");
   

    // function mouseEvent(e) {
    //     console.log(e.pageX,"Xval");
    //     console.log(e.pageY,"Yval");
    //     brush.x = e.pageX;
    //     brush.y = e.pageY;
        
    //     currentStroke.points.push({
    //         x: brush.x,
    //         y: brush.y
    //     });

    //     redraw();

    // }
    
    // adding mouseEvent listerners,
    canvas.mousedown(function(e) {

        brush.down = true;

        brush.x = e.pageX;
        brush.y = e.pageY;


        currentStroke = {
            color : brush.color,
            size : brush.size,
            points : []
        };

        currentStroke.points.push({
            x: brush.x,
            y: brush.y
        })

        redraw();
        // mouseEvent(e);
        //now we have to push this to strokes which keeps track of preveous data
        
        strokes.push(currentStroke);
        
 


    }).mouseup(function (e){
        brush.down = false;

        brush.x = e.pageX;
        brush.y = e.pageY;

        currentStroke.points.push({
            x: brush.x,
            y:brush.y
        })

        currentStroke = null;
        redraw();


    }).mousemove(function (e) {

        if(brush.down){
                brush.x = e.pageX;
                brush.y = e.pageY;
        
                currentStroke.points.push({
                     x: brush.x,
                     y: brush.y
                });

                redraw();

        }
    })

    $('#save-btn').click(function() {
        window.open(canvas[0].toDataURL());
    });

    $('#undo-btn').click(function() {
        strokes.pop();
        redraw();
    });
    $('#clear-btn').click(function() {
        strokes=[];
        redraw();
    });
    $('#rect-btn').click(
        rectangle()
    )

    $('#color-picker').on('input', function() {
        brush.color = this.value;
    });
    $('#brush-size').on('input', function() {
        brush.size = this.value;
    })


}










$(init); //... (when document is ready)(calling the function)
