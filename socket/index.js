import { Server } from "socket.io";

const io = new Server({ 
    cors:{
        origin:"http://localhost:3000"  //(client side on port 3000)
    }
});

let onlineUsers = []
const addNewUser =(userId ,userName,socketId) => {
  //lw l user mesh mawgod abl keda yzawedo f onlineUsers list
  !onlineUsers.some((user)=> user.userId === userId)
  && onlineUsers.push({userId,userName,socketId})
 console.log("inside  addNewUser function in socket id= ",socketId)
 console.log('onlineUsers ,',onlineUsers)
}
const removeUser = (socketId) =>{
  onlineUsers = onlineUsers.filter((user)=> user.socketId !== socketId)
}
const getUser =(reciverId) =>{
  console.log("reciverId: inside get user ",reciverId)
  
  console.log( onlineUsers)
  for(let u of onlineUsers){
    console.log("online user id ",typeof u.userId)
    console.log(" user id ",typeof reciverId)
    if (u.userId ==  reciverId){
      console.log("la2eto:",u)
      return u
    }
  } 

  //  return onlineUsers.find((user)=> user.userId == userId)
}
io.on("connection", (socket) => {
  //on connection
  console.log("some one connected")
  io.emit("welcomeMessage","hello from server")

  socket.on("newUser" , (user) =>{   //event from client use socket.on
    addNewUser(user.id,user.username,socket.id)
  })
  
  socket.on("sendNotification",({senderName,reciverId,type}) =>{
    console.log("reciverId" ,reciverId)
    const recieverobject = getUser(reciverId)
    console.log("recieverobject",recieverobject)
    console.log("recieverobject id",recieverobject.socketId)
    io.to(recieverobject.socketId).emit("getNotification",{
      senderName,
      reciverId,
      type,
    })
  })
  //on disconnection 
  socket.on("disconnect" ,() =>{
    console.log(" someone disconnected")

    removeUser(socket.id)
   
  })
})

io.listen(5000);  //port for socket (server side)

