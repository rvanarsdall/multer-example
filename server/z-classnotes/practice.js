// let req = {
//   body: {
//     user: {
//       username: "username@email.com",
//       password: "MyNewPassword"
//     }
//   }
// };

// console.log(req.body.user.password);

let myExample = 4;
myExample = undefined;
// myExample = null;
// let myExample

if (myExample) {
  console.log("It exists and is true");
} else {
  console.log("It doesn't exisit and it is false");
}



router.post("/", function(req,res){

    Log.create(
        {description: req.body.data.description,
            definition: req.body.data.definition,
            result: req.body.data.result,
            userid: req.user.id
        }
    ).then(data => res.send(data))
})











// let myAge = 26

// if (myAge > 30){
//     console.log("You're Old")
// }else{
//     console.log("You're Young")
// }
// myAge>30 ? console.log("You're old") : console.log("You're young")
// //Condition  ?  [WHAT TO DO IF TRUE] : [WHAT TO DO IF FALSE]
// VJJDKFJD ? kljsdflkjsdklfjsdlfjdslk :  KDJFLKDJFLKDJFLKDFJLK