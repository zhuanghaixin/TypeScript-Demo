console.log('Sending ...')

// "noImplicitAny": false,
// function sendAnalytics(data){
//     console.log(data)
// }
// sendAnalytics('The data');

let logged;
function sendAnalytics(data:string){
    console.log(data)
    logged=true;
    console.log(logged)
}

sendAnalytics('The data')
