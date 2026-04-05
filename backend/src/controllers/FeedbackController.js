import Feedback from "../models/FeedbackModel.js";

export const addFeedback = async (req, res) => {
     try {

        const {stars , reaction , text} = req.body;

        if(!stars || !reaction ) {
            return res.status(400).json ({
                success: false,
                message: "Star rating and reaction are required"
            });
        }

        const feedback = await Feedback ({
            stars,
            reaction,
            text
         });

        await feedback.save();

        res.status(201).json({
            success: true,
            message: "Feedback submitted successfully"
        });
     }catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Server Error"
        });
     }
};

export const getFeedback = async (req, res) => {

  try {

    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(feedbacks);

  } catch (error) {

    res.status(500).json({
      message: "Error fetching feedback"
    });

  }

};