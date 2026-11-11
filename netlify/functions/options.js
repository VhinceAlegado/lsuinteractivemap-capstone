// netlify/functions/options.js
exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      categories: [
        {
          name: "Admission Information",
          questions: [
            "How do I apply?",
            "What are the requirements?",
            "When is the application deadline?",
            "What is the application fee?",
            "Do you accept transfer students?"
          ]
        },
        {
          name: "Tuition Fees", 
          questions: [
            "How much is tuition?",
            "Do you offer scholarships?",
            "What payment methods are accepted?",
            "Are there payment plans available?"
          ]
        },
        {
          name: "Campus Life",
          questions: [
            "Are there dormitories?",
            "How many department are there?",
            "What are the library hours?",
            "Is there campus WiFi?"
          ]
        }
      ]
    })
  };
};