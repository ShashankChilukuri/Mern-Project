import Message from "./Message.js"; 
import User from "./User.js";

export const sendmessage=async (req, res) => {
    try {
      const { senderId, receiverId, content } = req.body;
      const sender = await User.findById(senderId);
      const receiver = await User.findById(receiverId);
  
      if (!sender || !receiver) {
        return res.status(404).json({ message: 'Sender or receiver not found' });
      }
      const message = new Message({
        senderId,
        receiverId,
        content
      });
  
      await message.save();
  
      return res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error sending message:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  

  export const getmessage= async (req, res) => {
    try {
      const userId = req.params.userId;
      const messages = await Message.find({
        $or: [
          { senderId: userId },
          { receiverId: userId }
        ]
      }).populate('senderId receiverId', 'username');
  
      return res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };
  