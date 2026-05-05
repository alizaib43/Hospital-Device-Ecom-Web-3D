"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useUI } from "@/context/UIContext";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

export default function Chatbot() {
  const { isChatOpen: isOpen, setIsChatOpen: setIsOpen } = useUI();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm the MediTech Assistant. I can help you with product details or answer general health questions. How can I assist you today?",
      sender: "bot",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: input,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    // Simulate bot thinking
    setTimeout(() => {
      const botResponse = generateBotResponse(userMsg.text.toLowerCase());
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          sender: "bot",
        },
      ]);
    }, 600);
  };

  const generateBotResponse = (query: string): string => {
    const q = query.toLowerCase();

    // --- GREETINGS ---
    if (/(^|\s)(hi|hello|hey|howdy|hola|greetings|good morning|good evening|good afternoon|sup|what's up)(\s|$)/.test(q)) {
      return "Hello! 👋 I'm your MediTech AI Health Assistant. I can help you with:\n\n• Medical questions & symptoms\n• Hospital information & services\n• Our medical equipment catalog\n• First aid & emergency guidance\n• Nutrition & wellness tips\n\nWhat can I help you with today?";
    }

    // --- FAREWELL ---
    if (/(bye|goodbye|see you|take care|farewell)/.test(q)) {
      return "Take care and stay healthy! 💙 Feel free to come back anytime you have questions. Wishing you good health!";
    }

    // --- THANKS ---
    if (/(thank|thanks|thank you|appreciate|helpful)/.test(q)) {
      return "You're welcome! 😊 Your health matters to us. Is there anything else I can help you with?";
    }

    // =====================
    // HOSPITAL & SERVICES
    // =====================
    if (/(hospital|clinic|ward|icu|emergency|er|a&e|inpatient|outpatient|admission|discharge)/.test(q)) {
      return "🏥 Our partner hospitals offer comprehensive services including:\n\n• **Emergency Care (24/7)** – ICU and trauma units\n• **Outpatient Clinics** – cardiology, neurology, oncology\n• **Surgical Suites** – robotic and laparoscopic options\n• **Maternity & Pediatrics** – neonatal ICU included\n• **Diagnostic Centers** – full imaging suites\n\nWould you like information on a specific department?";
    }

    if (/(appointment|book|schedule|visit|consult|consultation)/.test(q)) {
      return "📅 To book an appointment:\n\n1. Call our helpline: +1 (888) 555-0123\n2. Email: hq@meditechpro.systems\n3. Walk-in clinics are available Mon–Sat, 8 AM – 6 PM\n\nFor urgent care, head directly to the Emergency Room. Do you need the address of a specific facility?";
    }

    if (/(visiting hours|visiting|visitor|family visit)/.test(q)) {
      return "🕐 General visiting hours:\n\n• Standard Wards: 10 AM – 12 PM & 4 PM – 7 PM\n• ICU/Critical Care: 2 specific slots per day (30 mins)\n• Maternity: Partners allowed 24/7\n• Children's Ward: Parents can stay overnight\n\nSome restrictions may apply. Please confirm with the specific ward.";
    }

    // =====================
    // COMMON SYMPTOMS
    // =====================
    if (/(fever|high temperature|chills|38|39|40 degree)/.test(q)) {
      return "🌡️ **Fever guidance:**\n\n• Under 38°C (100.4°F): Rest and fluids\n• 38–39°C: Paracetamol or ibuprofen, monitor closely\n• Above 39°C: Seek medical attention, especially in children\n• Above 40°C: **Emergency — go to ER immediately**\n\n⚠️ Fever with stiff neck, rash, or confusion needs emergency care right away.";
    }

    if (/(headache|migraine|head pain|head ache)/.test(q)) {
      return "🤕 **Headache types & guidance:**\n\n• **Tension headache**: Rest, hydration, OTC painkillers\n• **Migraine**: Dark/quiet room, triptans (prescribed)\n• **Cluster headache**: Requires specialist management\n\n⚠️ **See a doctor immediately if** headache is sudden/severe ('thunderclap'), with vision loss, confusion, or neck stiffness — could be a sign of meningitis or stroke.";
    }

    if (/(chest pain|chest tightness|heart attack|cardiac arrest|angina|palpitation)/.test(q)) {
      return "🚨 **CHEST PAIN — URGENT:**\n\nIf you have chest pain, call 911 / your local emergency number NOW.\n\n**Signs of heart attack:**\n• Crushing chest pressure, pain spreading to arm/jaw\n• Shortness of breath, sweating, nausea\n• Sudden dizziness or loss of consciousness\n\n**Do NOT wait.** Chew an aspirin (325mg) if not allergic, while waiting for emergency services.";
    }

    if (/(stroke|face drooping|arm weakness|speech difficulty|brain attack)/.test(q)) {
      return "🚨 **STROKE — ACT FAST:**\n\nUse the **FAST** test:\n• **F**ace drooping on one side?\n• **A**rm weak or numb?\n• **S**peech slurred or strange?\n• **T**ime to call 911 immediately!\n\nEvery minute counts in a stroke. Do not drive — call emergency services.";
    }

    if (/(cough|cold|flu|influenza|sore throat|runny nose|congestion|sneezing)/.test(q)) {
      return "🤧 **Cold & Flu guidance:**\n\n• Rest and drink plenty of fluids\n• Honey & lemon tea can soothe sore throat\n• OTC medicines: decongestants, antihistamines, cough suppressants\n• **Flu vaccine** recommended annually\n\n⚠️ See a doctor if: fever exceeds 39°C, symptoms worsen after 7 days, difficulty breathing, or chest pain.";
    }

    if (/(diabetes|blood sugar|insulin|glucose|type 1|type 2|hyperglycemia|hypoglycemia)/.test(q)) {
      return "💉 **Diabetes overview:**\n\n• **Type 1**: Autoimmune — requires daily insulin\n• **Type 2**: Lifestyle-related — managed with diet, exercise, medication\n• **Symptoms**: Excessive thirst, frequent urination, fatigue, blurred vision\n\n**Management**: Monitor blood glucose regularly, balanced diet, regular exercise.\n\n⚠️ Low blood sugar (hypoglycemia): Eat fast sugar (glucose tablet, juice) immediately.";
    }

    if (/(blood pressure|hypertension|bp|systolic|diastolic|high bp|low bp|hypotension)/.test(q)) {
      return "❤️ **Blood Pressure guide:**\n\n• Normal: Less than 120/80 mmHg\n• Elevated: 120–129/less than 80\n• High (Stage 1): 130–139/80–89\n• High (Stage 2): 140+/90+ → Needs treatment\n• Crisis: 180+/120+ → **Emergency care now**\n\n**Tips**: Reduce salt, exercise regularly, limit alcohol, manage stress, take prescribed medications.";
    }

    if (/(asthma|inhaler|wheeze|wheezing|bronchial|breathing difficulty|shortness of breath|dyspnea)/.test(q)) {
      return "💨 **Asthma & Breathing:**\n\n• Always carry your **rescue inhaler** (usually salbutamol/albuterol)\n• Avoid triggers: dust, pollen, smoke, cold air\n• Use spacers for better inhaler delivery\n• Take **controller inhalers** daily as prescribed\n\n⚠️ **Emergency signs**: Can't speak full sentences, lips turning blue, reliever inhaler not working → Call 911 immediately.";
    }

    if (/(allergy|allergic|anaphylaxis|epipen|rash|hives|swelling|itch)/.test(q)) {
      return "⚠️ **Allergy guidance:**\n\n• **Mild**: Antihistamines (cetirizine, loratadine)\n• **Moderate**: Topical steroids for rash\n• **Anaphylaxis** (severe): Use EpiPen immediately & call 911\n\n**Signs of anaphylaxis**: Throat swelling, difficulty breathing, sudden drop in BP, loss of consciousness. This is life-threatening — act immediately!";
    }

    if (/(pregnancy|pregnant|prenatal|antenatal|trimester|baby|newborn|labor|labour|delivery|maternity)/.test(q)) {
      return "🤰 **Pregnancy support:**\n\n• **1st Trimester**: Book your first antenatal appointment, start folic acid (400mcg/day)\n• **2nd Trimester**: Anatomy scan at 18–22 weeks, feel baby move\n• **3rd Trimester**: Birth plan, hospital bag, monitor fetal movement\n\n**When to call your midwife/OB**: Heavy bleeding, severe abdominal pain, no fetal movement, waters breaking.\n\nOur maternity ward offers 24/7 support with specialist neonatal care.";
    }

    if (/(mental health|depression|anxiety|stress|panic attack|ptsd|bipolar|schizophrenia|therapy|counseling|psychiatry|psychologist)/.test(q)) {
      return "🧠 **Mental Health matters:**\n\n• **Depression**: Persistent sadness, loss of interest, fatigue → See a GP or psychiatrist\n• **Anxiety**: Excessive worry, physical symptoms → CBT therapy and/or medication\n• **Panic attacks**: Heart racing, breathlessness, fear → Breathing exercises, grounding techniques\n\n**Resources**:\n• Crisis line: 988 (US) / 116 123 (UK Samaritans)\n• Talk to your GP for a mental health referral\n\nYou are not alone — help is available. 💙";
    }

    if (/(sleep|insomnia|can't sleep|sleepless|fatigue|tired|rest)/.test(q)) {
      return "😴 **Sleep health tips:**\n\n• Maintain a consistent sleep schedule (7–9 hours)\n• Avoid screens 1 hour before bed\n• Limit caffeine after 2 PM\n• Keep bedroom cool, dark, and quiet\n• Avoid large meals before bed\n\n**When to see a doctor**: Chronic insomnia (3+ weeks), sleep apnea symptoms (loud snoring, gasping), or daytime fatigue affecting your life.";
    }

    // =====================
    // FIRST AID
    // =====================
    if (/(first aid|bleeding|wound|cut|bandage|burn|choking|cpr|heimlich|fracture|broken bone|sprain)/.test(q)) {
      if (/(choking)/.test(q)) {
        return "🚨 **Choking — Act NOW:**\n\n1. Ask: 'Are you choking?'\n2. Give 5 firm back blows between shoulder blades\n3. Give 5 abdominal thrusts (Heimlich maneuver)\n4. Alternate until object is dislodged or person goes unconscious\n5. If unconscious: Call 911 and start CPR";
      }
      if (/(cpr|cardiac|not breathing|unconscious)/.test(q)) {
        return "🚨 **CPR Steps (Adult):**\n\n1. Check for responsiveness, call 911\n2. Tilt head, lift chin — check breathing\n3. **30 chest compressions**: Hard & fast (100–120/min)\n4. **2 rescue breaths** (if trained)\n5. Repeat until help arrives or AED available\n\nPush hard — at least 5cm deep on the center of the chest.";
      }
      return "🩹 **Basic First Aid:**\n\n• **Cuts/Bleeding**: Apply firm pressure, clean wound, use sterile bandage\n• **Burns**: Cool under running water 10–20 mins, do NOT use ice\n• **Fractures**: Immobilize, do not move, call emergency services\n• **Sprains**: RICE — Rest, Ice, Compression, Elevation\n\n⚠️ For serious injuries, always call emergency services first.";
    }

    // =====================
    // NUTRITION & WELLNESS
    // =====================
    if (/(nutrition|diet|food|eat|healthy eating|calories|vitamin|supplement|weight loss|obesity)/.test(q)) {
      return "🥗 **Nutrition & Wellness tips:**\n\n• Eat a rainbow — variety of fruits & vegetables\n• Whole grains over refined (brown rice, oats, quinoa)\n• Lean protein: chicken, fish, legumes, tofu\n• Healthy fats: avocado, nuts, olive oil\n• Limit: processed foods, added sugars, excess salt\n• **Hydration**: 8 glasses of water daily\n\n**Key vitamins**: Vitamin D (sunlight + dairy), B12 (meat/eggs or supplement), Iron (leafy greens, red meat).";
    }

    if (/(exercise|workout|fitness|physical activity|gym|run|walk|cardio|strength)/.test(q)) {
      return "🏃 **Exercise recommendations:**\n\n• **Adults**: 150 mins moderate aerobic activity/week (brisk walking, cycling)\n• **Strength training**: 2+ days/week\n• **Children**: 60 mins of activity daily\n• **Elderly**: Focus on balance, flexibility, and strength\n\n**Benefits**: Reduces heart disease risk by 35%, improves mental health, helps manage diabetes and blood pressure.\n\nStart slowly and build up gradually — consistency beats intensity!";
    }

    // =====================
    // MEDICATIONS
    // =====================
    if (/(paracetamol|acetaminophen|tylenol|panadol|ibuprofen|aspirin|antibiotic|medication|medicine|tablet|pill|dosage|overdose)/.test(q)) {
      return "💊 **Medication guidance:**\n\n• **Paracetamol**: 500mg–1g every 4–6 hours, max 4g/day. Safe for most adults\n• **Ibuprofen**: Take with food, avoid if kidney/stomach issues\n• **Aspirin**: Not for under-16s (Reye's syndrome risk)\n• **Antibiotics**: Complete the full course — never share or self-prescribe\n\n⚠️ **Overdose concern?** Call Poison Control: 1-800-222-1222 (US) or your local emergency number immediately.";
    }

    // =====================
    // MEDICAL TESTS
    // =====================
    if (/(blood test|blood count|cbc|cholesterol|thyroid|tsh|hemoglobin|biopsy|ecg|ekg|echocardiogram|ct scan|pet scan|endoscopy)/.test(q)) {
      return "🔬 **Common medical tests:**\n\n• **CBC (Blood Count)**: Checks red/white cells, platelets — detects anemia, infection\n• **Cholesterol panel**: LDL, HDL, triglycerides — cardiovascular risk\n• **Thyroid (TSH)**: Checks thyroid function — fatigue, weight changes\n• **ECG**: Records heart electrical activity — detects arrhythmia\n• **CT Scan**: Detailed cross-section images — injury, cancer, bleeding\n\nNeed to schedule a diagnostic test? We can arrange it through our partner hospitals.";
    }

    // =====================
    // OUR PRODUCTS (Medical Equipment)
    // =====================
    if (/(x.?ray|radiography|aerox|portable scanner|x ray machine)/.test(q)) {
      return "📷 **X-Ray Technology:**\n\nAn X-ray uses ionizing radiation to produce images of bone and dense tissue. Uses include:\n• Detecting fractures & dislocations\n• Chest X-ray for pneumonia, TB, lung cancer\n• Dental imaging\n\n**Our Product**: AeroX Portable Scanner — AI-assisted, instant diagnosis, digital output. Starting at **$45,000**.\n\nWould you like a quote or demo?";
    }

    if (/(mri|magnetic resonance|quantum mri|brain scan|neuro imaging|spine scan)/.test(q)) {
      return "🧲 **MRI (Magnetic Resonance Imaging):**\n\nUses powerful magnets and radio waves to create detailed soft tissue images:\n• Brain tumors, multiple sclerosis, stroke\n• Spinal disc issues\n• Joint and ligament damage\n• Abdominal organs\n\n**Our Product**: Quantum MRI 7T — research-grade precision for neurology & oncology. Starting at **$1.2M**.\n\nContact us for institutional pricing.";
    }

    if (/(ultrasound|sonovista|echocardiogram|echo|sonogram|cardiac ultrasound|fetal|abdominal scan)/.test(q)) {
      return "🔊 **Ultrasound Imaging:**\n\nUses sound waves (no radiation) to visualize soft tissues in real-time:\n• Fetal monitoring during pregnancy\n• Abdominal organs (liver, kidneys, gallbladder)\n• Cardiac function (echocardiogram)\n• Guided biopsies\n\n**Our Products**:\n• SonoVista Pro — **$85,000** (general diagnostics)\n• EchoCardio Elite — **$115,000** (cardiac specialists)";
    }

    if (/(patient monitor|vital signs|icu monitor|heart rate monitor|spo2|oximeter)/.test(q)) {
      return "📊 **Patient Monitoring Systems:**\n\nOur NeuroSync Monitoring Suite provides continuous tracking of:\n• Heart rate & ECG\n• Blood pressure\n• SpO2 (oxygen saturation)\n• Temperature & respiratory rate\n\n**Starting from $12,000** — scalable for ICU, surgical, and general ward use.\n\nWould you like a product demonstration?";
    }

    if (/(robot|surgical robot|laparoscopic|minimally invasive|da vinci|robomedix)/.test(q)) {
      return "🤖 **Surgical Robotics:**\n\nRobotic surgery enables precise, minimally invasive procedures:\n• Smaller incisions → faster recovery\n• Less blood loss and scarring\n• Higher precision in tight anatomical areas\n\n**Our Product**: RoboMedix Surgical Platform — FDA-approved, AI-assisted, real-time haptic feedback. Starting at **$2.5M**.\n\nContact our sales team for a clinical demo.";
    }

    if (/(price|cost|how much|quote|budget|afford|purchase|buy|procurement)/.test(q)) {
      return "💰 **MediTech Equipment Pricing:**\n\n• Patient Monitor: from **$12,000**\n• AeroX Portable X-Ray: **$45,000**\n• SonoVista Ultrasound: **$85,000**\n• EchoCardio Elite: **$115,000**\n• Quantum MRI 7T: **$1.2M**\n• RoboMedix Surgical Robot: **$2.5M**\n\nInstitutional and bulk pricing available. Contact us at hq@meditechpro.systems for a custom quote.";
    }

    if (/(warranty|guarantee|support|maintenance|service|repair|technician)/.test(q)) {
      return "🔧 **Support & Warranty:**\n\n• **Standard Warranty**: 3 years (parts, labor, software)\n• **Extended Plans**: Up to 7 years available\n• **24/7 Technical Support**: Global response team\n• **Critical Parts**: 24-hour guaranteed dispatch\n• **On-site Training**: Included with every installation\n\n📧 hq@meditechpro.systems | 📞 +1 (888) 555-0123";
    }

    // =====================
    // ABOUT MEDITECH
    // =====================
    if (/(about|who are you|what do you do|company|meditec|meditech|your products)/.test(q)) {
      return "🏢 **About MediTech Pro:**\n\nWe are a global leader in clinical-grade medical technology, trusted by 142+ hospitals worldwide.\n\n**What we do:**\n• Advanced diagnostic imaging (MRI, X-Ray, Ultrasound)\n• AI-powered patient monitoring systems\n• Surgical robotics & precision instruments\n• Global clinical support & training\n\n**Mission**: Engineering the next generation of clinical ecosystems through neural-link diagnostics.\n\nHow can I help you today?";
    }

    // =====================
    // EMERGENCY FALLBACK
    // =====================
    if (/(emergency|911|urgent|critical|dying|help me|save|sos)/.test(q)) {
      return "🚨 **EMERGENCY — Please call 911 (or your local emergency number) immediately!**\n\nIf this is a medical emergency:\n• Stay calm and call emergency services\n• Do not move an injured person unless in danger\n• Stay on the line with the dispatcher\n• Send someone to meet the ambulance\n\nYour safety is the absolute priority. 🙏";
    }

    // --- DEFAULT ---
    return "I'm here to help with a wide range of health and hospital questions. You can ask me about:\n\n• 🏥 Hospital services & appointments\n• 🩺 Symptoms & medical conditions\n• 💊 Medications & treatments\n• 🔬 Medical tests & imaging\n• 🥗 Nutrition & wellness\n• 🚑 First aid & emergencies\n• 🔧 Our medical equipment catalog\n\nWhat would you like to know?";
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-28 right-6 md:bottom-8 md:right-8 z-50 p-4 bg-blue-600 text-white rounded-full shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center hover:bg-blue-500 transition-colors"
            aria-label="Open chat"
          >
            <MessageCircle className="w-7 h-7" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 md:inset-auto md:bottom-24 md:right-8 z-50 md:w-96 md:h-[600px] flex flex-col glass-card border border-white/10 md:rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-4 bg-blue-600/90 backdrop-blur-md text-white flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-full">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">MediTech Assistant</h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Online
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/80 md:bg-transparent">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === "user" ? "bg-blue-500/20 text-blue-500" : "bg-muted text-muted-foreground"}`}>
                      {msg.sender === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                    </div>
                    <div 
                      className={`p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === "user" 
                          ? "bg-blue-600 text-white rounded-tr-sm" 
                          : "bg-muted text-foreground rounded-tl-sm border border-white/5"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-background/90 backdrop-blur-md border-t border-white/10">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about products or health..."
                  className="flex-1 bg-muted/50 border border-white/10 rounded-full px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-muted-foreground transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  className="p-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:hover:bg-blue-600 text-white rounded-full transition-colors flex items-center justify-center shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
