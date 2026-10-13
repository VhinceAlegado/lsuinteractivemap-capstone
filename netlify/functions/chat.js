// netlify/functions/chat.js
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const { message } = JSON.parse(event.body);
    
    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' })
      };
    }

    // Improved FAQ database with keyword mapping
    const faqData = {
      "admission": [
        {
          keywords: ["apply", "application", "how to apply", "admission process", "enroll", "enrollment"],
          answer: "You can apply online through our official admissions portal at admissions.lasalle.edu or visit the Admissions Office in the SJ Building."
        },
        {
          keywords: ["requirements", "documents", "what do i need", "prerequisites", "required documents"],
          answer: "You'll need: 1) Completed application form, 2) High school transcript, 3) Two recommendation letters, 4) Personal essay, 5) Valid ID"
        },
        {
          keywords: ["deadline", "when to apply", "application period", "last date", "due date"],
          answer: "The application deadline for the First semester is August Xth and for the Second semester is January Xth."
        },
        {
          keywords: ["fee", "cost", "price", "application fee", "how much to apply"],
          answer: "The application fee is ranging from Php 1000 to 3000."
        },
        {
          keywords: ["transfer", "transfer student", "transfer credit", "from another school", "previous college"],
          answer: "Yes, we accept transfer students. You'll need to provide transcripts from all previously attended institutions."
        }
      ],
      "tuition": [
        {
          keywords: ["tuition", "cost", "fee", "how much", "price", "tuition fee", "cost of attendance"],
          answer: "Undergraduate tuition is approximately xxx per semester. Graduate programs vary from xxx-xxx per semester."
        },
        {
          keywords: ["scholarship", "financial aid", "grant", "bursary", "financial help", "aid", "funding"],
          answer: "We offer academic scholarships, athletic scholarships, and need-based financial aid."
        },
        {
          keywords: ["payment", "pay", "methods", "how to pay", "payment options", "credit card", "bank transfer"],
          answer: "We accept Cash, bank transfers, credit cards (Visa/MasterCard)."
        },
        {
          keywords: ["payment plan", "installment", "monthly payment", "pay in parts", "installment plan"],
          answer: "I cant answer that one yet."
        }
      ],
      "campus": [
        {
          keywords: ["dorm", "dormitory", "housing", "accommodation", "residence", "where to live", "hostel"],
          answer: "I cant answer that one yet."
        },
        {
          keywords: ["club", "organization", "extracurricular", "activity", "student life", "society", "groups"],
          answer: "I cant answer that one yet."
        },
        {
          keywords: ["library", "hours", "opening hours", "when is library open", "study space"],
          answer: "Main Library hours: Mon-Thu: 7AM-10PM, Fri: 7AM-8PM, Sat: 9AM-6PM, Sun: 12PM-8PM"
        },
        {
          keywords: ["wifi", "internet", "wireless", "connection", "network", "online"],
          answer: "Yes, free WiFi is available across campus. Connect to 'LaSalle-Student' network with your student credentials."
        },
        {
          keywords: ["cafeteria", "food", "dining", "restaurant", "eat", "meal", "canteen"],
          answer: "We have cafeterias outside the campus serving breakfast, lunch, and dinner. Meal plans are available for students."
        },
        {
          keywords: ["parking", "car", "vehicle", "where to park", "parking lot"],
          answer: "Student parking is available. You'll need a permit to enter from the Security Office."
        }
      ],
      "general": [
        {
          keywords: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening","sup"],
          answer: "Hello! 👋 I'm here to help with information about La Salle University. You can ask me about admissions, tuition, scholarship, buildings or anything else!"
        },
        {
          keywords: ["thank", "thanks", "appreciate", "grateful","salamat","lamat","ty"],
          answer: "You're welcome! 😊 Let me know if you need any other information about La Salle University."
        },
        {
          keywords: ["help", "what can you do", "capabilities", "assist"],
          answer: "I can help you with: Gving Informations about Admissions, Tuition & Scholarships, Campus Facilities, Application Requirements, and more!"
        },
         {
          keywords: ["where is admission", "location of admission", "find admission office", "admissions", "enroll", "application"],
          answer: "The Admissions Office is located in the SJ Building. It handles the entire student enrollment process."
        },
        {
          keywords: ["where is registrar", "location of registrar", "find registrar office", "registrar", "my records", "grades", "certificate"],
          answer: "The Registrar's Office is located in the Behind the Accounting. It handles student academic records, course registration, and transcripts."
        },
        {
          keywords: ["where is accounting", "location of accounting", "find accounting office", "accounting", "pay fees", "payment", "school fees"],
          answer: "The Accounting Office is located in the SC Building. This is where you pay your school fees and manage your financial account."
        },
        {
          keywords: ["where is csit faculty office", "csit faculty office", "find csit office", "csit"],
          answer: "The CCIT Building houses the College of Computer Studies, Engineering, and Architecture. It is the hub for IT, engineering, and architecture programs."
        },
        {
          keywords: ["where is cba", "location of cba", "find cba office", "cba", "business", "accountancy"],
          answer: "The CBA Building houses the College of Business and Accountancy. It is the academic home for business and accountancy students."
        },
        {
          keywords: ["where is clinic", "location of clinic", "find clinic", "university clinic", "nurse", "first aid", "sick"],
          answer: "The University Clinic is located in a dedicated building on campus. It provides healthcare services and first aid for students and staff.",
          image: "Buildings/University Clinic/20251106_155012.jpg"
        },
        {
          keywords: ["where is library", "location of library", "find library", "study", "books", "research"],
          answer: "The main library is located in the LM Building. It offers a wide range of books, digital resources, and quiet study spaces.",
        },
        {
          keywords: ["where is gym", "location of gym", "find gym", "sports complex", "basketball", "swimming", "workout"],
          answer: "The fitness room or gym is located behind SC Building"
        },
        {
          keywords: ["where is cthe", "location of cthe", "find cthe office", "cthe", "tourism", "hospitality"],
          answer: "The CTHM Building houses the College of Tourism and Hospitality Management. It is where tourism and hospitality programs are based."
        },
        {
          keywords: ["where is student government", "location of usg", "find usg office", "usg", "student council", "student leaders"],
          answer: "The University Student Government (USG) Office is located in the Campus 2 and It is near Starchapel. It serves as the headquarters for student leaders."
        },
        {
          keywords: ["where is chapel", "location of chapel", "find chapel", "star chapel", "pray", "mass", "church"],
          answer: "The Star Chapel is a dedicated building for spiritual activities."
        },
        {
          keywords: ["where is high school", "location of shs", "find senior high", "sj building", "high school office"],
          answer: "The Senior High School administrative and academic offices are located in the SJ Building."
        },
        {
          keywords: ["department", "how many department", "list of department", "available department", "courses offered"],
          answer: "Currently there are 7 departments: 1) CCSEA 2) CTHM 3) CON 4) CAS 5) CBA 6) CTE 7) CCJE"
        },
        {
          keywords: ["contact", "email", "phone", "address", "how to contact", "get in touch"],
          answer: "You can contact us at: 📞 Phone: (0953) 964 3792 📧 Email: admissions@lsu.edu.ph 🏢 Address: La Salle St. Barangay Aguada, Ozamiz City, Misamis Occidental, Philippines"
        }
      ]
    };

    // Improved function to find the best answer
    function findAnswer(question) {
      const lowerQuestion = question.toLowerCase().trim();
      
      // Remove common filler words for better matching
      const cleanedQuestion = lowerQuestion.replace(/\b(what|where|when|how|why|can|do|does|is|are|the|a|an)\b/g, '').trim();
      
      let bestMatch = null;
      let highestScore = 0;

      // Search through all categories and questions
      for (const [category, questions] of Object.entries(faqData)) {
        for (const qa of questions) {
          let score = 0;
          
          // Check each keyword for matches
          for (const keyword of qa.keywords) {
            if (lowerQuestion.includes(keyword)) {
              score += 3; // Base score for keyword match
              
              // Bonus points for exact matches or longer keywords
              if (lowerQuestion === keyword) score += 5;
              if (keyword.length > 8) score += 2;
            }
            
            // Check for similar words (plural forms, etc.)
            if (keyword.endsWith('s') && lowerQuestion.includes(keyword.slice(0, -1))) {
              score += 2;
            }
          }
          
          // If this is a better match, update bestMatch
          if (score > highestScore) {
            highestScore = score;
            bestMatch = qa.answer;
          }
        }
      }

      // Return best match if score is good enough
      if (bestMatch && highestScore >= 3) {
        return bestMatch;
      }

      // Special cases for common questions
      if (lowerQuestion.includes("hours") && lowerQuestion.includes("open")) {
        return "Main Library hours: Mon-Thu: 7AM-10PM, Fri: 7AM-8PM, Sat: 9AM-6PM, Sun: 12PM-8PM. Administrative offices are open Mon-Fri 8AM-5PM.";
      }
      
      if (lowerQuestion.includes("scholarship") || lowerQuestion.includes("financial aid")) {
        return "Yes! We offer academic scholarships, athletic scholarships, and need-based financial aid. Visit the Financial Aid Office in BVM Building for more details.";
      }
      
      if (lowerQuestion.includes("tuition") || lowerQuestion.includes("how much") || lowerQuestion.includes("cost")) {
        return "Undergraduate tuition is approximately $15,000 per semester. Graduate programs vary from $18,000-$22,000 per semester. We offer various scholarships and financial aid options!";
      }

      // Default response if no good match found
      return `I can't understand what you're asking about "${question}". But I can help you with information about:\n\n• Admissions and Applications\n• Tuition Fees & Scholarships\n• Campus Facilities & Housing\n• Student Help\n• Academic Programs\n\nCould you be more specific or try rephrasing your question?`;
    }

    const answer = findAnswer(message);

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        response: answer,
        timestamp: new Date().toLocaleTimeString()
      })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};