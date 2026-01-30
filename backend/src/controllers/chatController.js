export const sendMessage = (req ,res) => {
    const {message} = req.body;

    console.log(`Received message: ${message}`);

    res.status(200).json({success : true, reply : 'message received'});
};