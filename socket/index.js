import { Server } from "socket.io";

const io = new Server({ 
    cors:{
        origin:"http://localhost:3000"
    }
});

let onlineUsers = []
const addNewUser =(userId ,userName,socketId) => {
  !onlineUsers.some((user)=> user.userId === userId)
  && onlineUsers.push({userId,userName,socketId})
}
const removeUser = (socketId) =>{
  onlineUsers = onlineUsers.filter((user)=> user.socketId !== socketId)
}
const getUser =(reciverId) =>{

  for(let u of onlineUsers){
    if (u.userId ==  reciverId){
      return u
    }
  } 
}
io.on("connection", (socket) => {
  io.emit("welcomeMessage","hello from server")

  socket.on("newUser" , (user) =>{
    addNewUser(user.id,user.username,socket.id)
  })
  
  socket.on("sendNotification",({senderName,reciverId,type}) =>{
    const recieverobject = getUser(reciverId)
    io.to(recieverobject.socketId).emit("getNotification",{
      senderName,
      reciverId,
      type,
    })
  })

  socket.on("disconnect" ,() =>{
    removeUser(socket.id)
   
  })
})

io.listen(5000)

