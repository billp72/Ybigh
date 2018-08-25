
var c2dp = CanvasRenderingContext2D.prototype;

//  special isPointInPath method to workaround Mozilla bug 405300
//  [https://bugzilla.mozilla.org/show_bug.cgi?id=405300]
function isPointInPath_scalling( x, y )
{
    this.save();
    this.setTransform( 1, 0, 0, 1, 0, 0 );
    var ret = this.isPointInPath_old( x, y );
    this.restore();
    return ret;
};

//  test for the presence of the bug, and set the workaround function only if needed
var ctx = document.createElement( "canvas" ).getContext( "2d" );
ctx.translate( 50, 0 );
ctx.moveTo( 125, 50 );
ctx.arc( 100, 50, 25, 0, 360, false );
if( !ctx.isPointInPath( 150, 50 ) )
{
    c2dp.isPointInPath_old = c2dp.isPointInPath;
    c2dp.isPointInPath = isPointInPath_scalling;
}