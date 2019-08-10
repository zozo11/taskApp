//import { promises } from "dns";

const test = new Promise((resolve, rejects) => {
    setTimeout(() => {
        //rejects('wrrong')
        resolve([1,4,7])
    }, 2000)
})
test.then((resolve) => {
    console.log('success', resolve)
}).catch((error) => {
    console.log('Errpr', error)
})