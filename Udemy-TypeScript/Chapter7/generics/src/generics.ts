const names:Array<string>=['Max','Manuel']
const names_1:any[]=['Max',1,{'sex':'male','age':12}]

const promise:Promise<string>=new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve('This is a test')
    },2000)
});

promise.then(data=>{
    data.split(' ')
})

