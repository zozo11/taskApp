require('../src/db/mongoos');
const Task = require('../src/model/task');

// Task.findByIdAndDelete('5d3d201ed886ea0c38db5075', {completed: true}).then((task) => {
//     console.log(task);
//     return Task.countDocuments({completed:false});
// }).then((result)=>{
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });

const deleteTaskAndCount = async (id, completed)=> {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments(completed);
    return count;
}

deleteTaskAndCount('5d3d5b5aadee3e35bf838ce5', false).then((count) => {
    console.log(count);
}).catch((err)=>{
    console.log(e);
})