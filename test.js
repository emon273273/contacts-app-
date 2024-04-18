//How to search anything from array

let arr = [1, 2, 3, 4, 67, 3, 23, "bangcoder", 34, 3, null];

// I have to find "bangcoder string index no "
// so i am using arr.find() method

arr.find((element,index)=>{

    if(element==="bangcoder") console.log("found at"+index);
})
//now run code