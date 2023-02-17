function colour(){
    let v= document.getElementById( 'v1' );
    c= localStorage["color"];
    console.log(c);
    v.style.borderLeft = "8px solid " + c;

}
function original(){
    document.getElementById("v1").style.borderLeft = "8px solid black";
}
window.onload = function(){
    let btext = [ 'DEFUSE' , 'STOP', 'ABORT'];
    let colour = [ '#FF0000' , '#00FF00', '#0000FF'];
    let b = document.getElementById( 'clickme' );
    
    if(localStorage["text"] =="DEFUSE" || localStorage["text"] =="STOP" || localStorage["text"] =="ABORT") {
        /** Your code here... **/
        b.innerText = localStorage["text"];        
    }
    else{
        a= btext[ Math.floor(  Math.random() * btext.length ) ];
        c= colour[ Math.floor(  Math.random() * colour.length ) ];
        localStorage["color"]=c;
        
        b.innerText = a;
        localStorage["text"]= a;


    }
    
}