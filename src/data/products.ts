export const allProducts = [
  {
    id: 1,
    name: "AeroX Portable Scanner",
    category: "X-Ray Imaging",
    price: "$45,000",
    rating: 4.9,
    image: "/portable_xray_1777573877811.png",
    description: "Next-gen portable x-ray with AI-assisted diagnosis and real-time cloud sync.",
    longDescription: "The AeroX Portable Scanner represents a breakthrough in mobile diagnostics. Designed for emergency rooms and field hospitals, it delivers high-resolution X-ray imaging in a compact, battery-operated form factor. Integrated AI algorithms assist in rapid fracture and pathology detection.",
    specs: {
      "Sensor Type": "High-Efficiency CMOS",
      "Battery Life": "8 Hours (Continuous Use)",
      "Wireless Connectivity": "5G, Wi-Fi 6E",
      "Weight": "12.5 kg"
    }
  },
  {
    id: 2,
    name: "Quantum MRI 7T",
    category: "Magnetic Resonance",
    price: "$1.2M",
    rating: 5.0,
    image: "/mri_scanner_1777574926132.png",
    description: "Ultra-high-field MRI scanner for advanced clinical research and neurology.",
    longDescription: "The Quantum MRI 7T is the pinnacle of magnetic resonance technology. With a 7-Tesla superconducting magnet, it provides unprecedented anatomical detail, allowing clinicians to visualize microstructures of the brain and other organs with extreme clarity.",
    specs: {
      "Field Strength": "7 Tesla",
      "Bore Size": "60 cm",
      "Gradient Strength": "80 mT/m",
      "Software": "NeuroViz AI 4.0"
    }
  },
  {
    id: 3,
    name: "SonoVista Pro",
    category: "Ultrasound",
    price: "$85,000",
    rating: 4.8,
    image: "/ultrasound_machine_1777574731441.png",
    description: "Premium wheeled ultrasound with real-time 4D imaging and enhanced depth.",
    longDescription: "SonoVista Pro offers professional-grade ultrasound imaging with a focus on ease of use and diagnostic confidence. Featuring advanced Doppler flow and real-time 4D rendering, it is the ideal choice for cardiology and obstetrics.",
    specs: {
      "Display": "24-inch OLED Touchscreen",
      "Modes": "B, M, Doppler, 4D",
      "Transducers": "Matrix Array Support",
      "Cooling": "Silent Active Cooling"
    }
  },
  {
    id: 4,
    name: "VitalSync ICU Monitor",
    category: "Patient Monitors",
    price: "$15,000",
    rating: 4.7,
    image: "/portable_xray_1777573877811.png", 
    description: "Continuous vitals monitoring system with predictive alerting algorithms.",
    longDescription: "VitalSync ICU Monitor provides comprehensive real-time tracking of patient vitals. Its predictive engine analyzes trends to alert medical staff before critical events occur, improving patient outcomes and streamlining ICU workflows.",
    specs: {
      "Parameters": "ECG, SpO2, NIBP, TEMP",
      "Connectivity": "HL7, DICOM",
      "Alert System": "SmartSense Predictive",
      "Screen": "15-inch Anti-glare"
    }
  },
  {
    id: 5,
    name: "SurgiBot Robotic Arm",
    category: "Surgical Robotics",
    price: "$2.5M",
    rating: 5.0,
    image: "/mri_scanner_1777574926132.png", 
    description: "Next-generation surgical robotics for minimally invasive precision procedures.",
    longDescription: "The SurgiBot Robotic Arm extends the surgeon's capabilities with sub-millimeter precision. Featuring haptic feedback and 3D immersive visualization, it enables complex surgeries to be performed with smaller incisions and faster recovery times.",
    specs: {
      "Degrees of Freedom": "7-axis Movement",
      "Latency": "< 2ms",
      "Vision": "4K 3D Stereoscopic",
      "Feedback": "Real-feel Haptics"
    }
  },
  {
    id: 6,
    name: "EchoCardio Elite",
    category: "Ultrasound",
    price: "$115,000",
    rating: 4.8,
    image: "/ultrasound_machine_1777574731441.png", 
    description: "Specialized cardiovascular ultrasound machine with advanced doppler.",
    longDescription: "Engineered specifically for the heart, the EchoCardio Elite provides lightning-fast image acquisition and automated quantification of cardiac function. It simplifies complex echo exams and provides accurate results in record time.",
    specs: {
      "Specialty": "Advanced Cardiology",
      "Automation": "AI Valve Quantification",
      "Frame Rate": "Up to 500 fps",
      "Portability": "Standard Cart Base"
    }
  },
  {
    id: 7,
    name: "Lumina CT Scanner",
    category: "Computed Tomography",
    price: "$950,000",
    rating: 4.9,
    image: "/mri_scanner_1777574926132.png", 
    description: "Low-dose radiation CT scanner providing exceptional image clarity.",
    longDescription: "Lumina CT Scanner sets a new standard for low-dose imaging. Its innovative iterative reconstruction algorithms provide high-quality scans at a fraction of the radiation dose used in traditional CT systems.",
    specs: {
      "Slices": "256 Slice",
      "Rotation Speed": "0.25 seconds",
      "Tube": "Long-life Ceramic",
      "Dose Reduction": "Up to 80% lower"
    }
  },
  {
    id: 8,
    name: "NanoRay Handheld",
    category: "X-Ray Imaging",
    price: "$22,000",
    rating: 4.6,
    image: "/portable_xray_1777573877811.png", 
    description: "The world's smallest handheld X-ray device for emergency triage.",
    longDescription: "NanoRay is a game-changer for point-of-care diagnostics. Small enough to fit in a coat pocket, it allows for instant bone and foreign body checks in sports medicine, disaster relief, and emergency transport.",
    specs: {
      "Weight": "800g",
      "Display": "Integrated 5-inch OLED",
      "Storage": "Encrypted Internal SSD",
      "Case": "Impact Resistant"
    }
  },
  {
    id: 9,
    name: "FlowControl Ventilator",
    category: "Life Support",
    price: "$65,000",
    rating: 4.9,
    image: "/ultrasound_machine_1777574731441.png", 
    description: "Smart ventilator with automated lung-protective ventilation modes.",
    longDescription: "FlowControl is designed for the most critical patients. Its adaptive support ventilation automatically adjusts to the patient's breathing patterns, reducing the work of breathing and facilitating faster weaning.",
    specs: {
      "Oxygen Control": "High-Precision Blender",
      "Interface": "Invasive & Non-Invasive",
      "Monitoring": "Real-time Capnography",
      "Backup": "Dual Turbine System"
    }
  }
];

export const categories = ["All", "X-Ray Imaging", "Magnetic Resonance", "Ultrasound", "Patient Monitors", "Computed Tomography", "Surgical Robotics", "Life Support"];
