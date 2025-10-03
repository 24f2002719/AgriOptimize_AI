// A central dictionary for all UI text in English and Hindi.
// Note: Hindi translations are provided as a starting point and should be reviewed by a native speaker for accuracy.
const translations = {
    // --- Navbar ---
    navHome: { en: "Home", hi: "होम" },
    navCrop: { en: "Crop Recommendation", hi: "फ़सल सुझाव" },
    navFertilizer: { en: "Fertilizer Recommendation", hi: "उर्वरक सुझाव" },
    navAbout: { en: "About", hi: "हमारे बारे में" },
    navFAQ: { en: "FAQ", hi: "अक्सर पूछे जाने वाले प्रश्न" },

    // --- Home Page ---
    heroTitle: { en: "Smarter Farming, Better Yields", hi: "स्मार्ट खेती, बेहतर पैदावार" },
    heroSubtitle: { en: "Leverage Artificial Intelligence to make data-driven decisions for your farm. Get instant recommendations and chat with our AI assistant, Agro.", hi: "अपने खेत के लिए डेटा-आधारित निर्णय लेने के लिए आर्टिफिशियल इंटेलिजेंस का लाभ उठाएँ। तुरंत सुझाव प्राप्त करें और हमारे AI सहायक, एग्रो के साथ चैट करें।" },
    heroBtnCrop: { en: "Get Crop Recommendation", hi: "फ़सल सुझाव प्राप्त करें" },
    heroBtnFertilizer: { en: "Find Best Fertilizer", hi: "सर्वोत्तम उर्वरक खोजें" },
    howItWorksTitle: { en: "A Simple 3-Step Process", hi: "एक सरल 3-चरणीय प्रक्रिया" },
    howItWorksSubtitle: { en: "Get from data to decision in minutes.", hi: "मिनटों में डेटा से निर्णय तक पहुँचें।" },
    step1Title: { en: "1. Input Your Data", hi: "1. अपना डेटा दर्ज करें" },
    step1Desc: { en: "Provide your field's data such as soil nutrients, temperature, and humidity on our dedicated forms.", hi: "हमारे समर्पित फ़ॉर्म पर अपने खेत का डेटा जैसे मिट्टी के पोषक तत्व, तापमान और नमी प्रदान करें।" },
    step2Title: { en: "2. AI Analysis", hi: "2. AI विश्लेषण" },
    step2Desc: { en: "Our powerful machine learning models analyze your data against thousands of data points in real-time.", hi: "हमारे शक्तिशाली मशीन लर्निंग मॉडल वास्तविक समय में हजारों डेटा बिंदुओं के मुकाबले आपके डेटा का विश्लेषण करते हैं।" },
    step3Title: { en: "3. Get Recommendation", hi: "3. सुझाव प्राप्त करें" },
    step3Desc: { en: "Receive a clear, actionable recommendation for the best crop or fertilizer, helping you maximize yield.", hi: "सर्वोत्तम फसल या उर्वरक के लिए एक स्पष्ट, कार्रवाई योग्य सुझाव प्राप्त करें, जो आपको उपज को अधिकतम करने में मदद करेगा।" },
    faqTitle: { en: "Frequently Asked Questions", hi: "अक्सर पूछे जाने वाले प्रश्न" },
    faq1Q: { en: "What data do I need for a recommendation?", hi: "सुझाव के लिए मुझे कौन सा डेटा चाहिए?" },
    faq1A: { en: "For crop recommendation, you need N, P, K values, temperature, humidity, soil pH, and rainfall. For fertilizer, you need soil type, crop type, and nutrient values. The more accurate the data, the better the recommendation.", hi: "फ़सल सुझाव के लिए, आपको N, P, K मान, तापमान, आर्द्रता, मिट्टी का pH और वर्षा की आवश्यकता है। उर्वरक के लिए, आपको मिट्टी का प्रकार, फसल का प्रकार और पोषक तत्वों के मान चाहिए। डेटा जितना सटीक होगा, सिफारिश उतनी ही बेहतर होगी।" },
    faq2Q: { en: "Is this service free to use?", hi: "क्या यह सेवा उपयोग करने के लिए मुफ़्त है?" },
    faq2A: { en: "Yes, AgriOptimize AI is currently completely free for all users. Our goal is to make modern agricultural technology accessible to everyone.", hi: "हाँ, एग्रीऑप्टिमाइज़ एआई वर्तमान में सभी उपयोगकर्ताओं के लिए पूरी तरह से मुफ़्त है। हमारा लक्ष्य आधुनिक कृषि प्रौद्योगिकी को सभी के लिए सुलभ बनाना है।" },

    // --- Crop Page ---
    cropPageTitle: { en: "AI Crop Recommendation", hi: "AI फ़सल सुझाव" },
    cropPageSubtitle: { en: "Enter your field's data to get an instant, AI-powered crop recommendation.", hi: "तुरंत AI-संचालित फसल सुझाव प्राप्त करने के लिए अपने खेत का डेटा दर्ज करें।" },
    labelN: { en: "Nitrogen (N)", hi: "नाइट्रोजन (N)" },
    labelP: { en: "Phosphorus (P)", hi: "फॉस्फोरस (P)" },
    labelK: { en: "Potassium (K)", hi: "पोटेशियम (K)" },
    labelTemp: { en: "Temperature (°C)", hi: "तापमान (°C)" },
    labelHumidity: { en: "Humidity (%)", hi: "नमी (%)" },
    labelPH: { en: "Soil pH", hi: "मिट्टी का pH" },
    labelRainfall: { en: "Rainfall (mm)", hi: "वर्षा (mm)" },
    btnRecommendCrop: { en: "Recommend Crop", hi: "फ़सल का सुझाव दें" },
    
    // --- Fertilizer Page ---
    fertPageTitle: { en: "AI Fertilizer Recommendation", hi: "AI उर्वरक सुझाव" },
    fertPageSubtitle: { en: "Provide your field conditions to receive a precise fertilizer prediction.", hi: "एक सटीक उर्वरक भविष्यवाणी प्राप्त करने के लिए अपने खेत की स्थिति प्रदान करें।" },
    labelMoisture: { en: "Moisture", hi: "नमी" },
    labelSoilType: { en: "Soil Type", hi: "मिट्टी का प्रकार" },
    labelCropType: { en: "Crop Type", hi: "फ़सल का प्रकार" },
    labelPhosphorous: { en: "Phosphorous (P)", hi: "फॉस्फोरस (P)" },
    btnRecommendFertilizer: { en: "Recommend Fertilizer", hi: "उर्वरक का सुझाव दें" },
    
    // --- Shared ---
    resultSuccessCrop: { en: "Recommended Crop", hi: "सुझाई गई फ़सल" },
    resultSuccessFertilizer: { en: "Recommended Fertilizer", hi: "सुझाया गया उर्वरक" },
    resultErrorTitle: { en: "An Error Occurred", hi: "एक त्रुटि हुई" },
    btnAnalyzing: { en: "Analyzing...", hi: "विश्लेषण हो रहा है..." },
    btnPredicting: { en: "Predicting...", hi: "भविष्यवाणी हो रही है..." },
    
    // --- Chatbot ---
    chatWelcome: { en: "Hello! I'm <strong>Agro</strong>. How can I help you today?", hi: "नमस्ते! मैं <strong>एग्रो</strong> हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?" },
    chatToggle: { en: "Chat with Agro", hi: "एग्रो के साथ चैट करें" },
    chatPlaceholder: { en: "Type your question...", hi: "अपना प्रश्न लिखें..." },
    chatThinking: { en: "Agro is thinking...", hi: "एग्रो सोच रहा है..." },
};