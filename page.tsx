import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Download, 
  FileText, 
  Code, 
  Sparkles, 
  Brain, 
  Award, 
  GraduationCap, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight, 
  ExternalLink, 
  RefreshCw, 
  Terminal, 
  CheckCircle, 
  BookOpenCheck, 
  HelpCircle, 
  Search, 
  Eye,
  Layers,
  Cpu,
  Globe,
  Database,
  ShieldAlert,
  Binary,
  GitBranch,
  Key,
  Flame,
  ArrowLeft,
  Mail,
  User,
  MessageSquare,
  Send,
  Info,
  ChevronDown,
  ChevronUp,
  Play,
  Square,
  StepForward,
  Trash2,
  Loader2,
  RotateCcw,
  ListOrdered,
  Settings,
  ArrowRightLeft,
  FileCode2,
  ArrowUp
} from 'lucide-react';

// Embedded fallback data mimicking past-papers2.json to ensure the preview works
const PAST_PAPERS_DATA = {
  syllabi: [
    {
      syllabusCode: "0478",
      title: "0478 CAIE CS IGCSE Past Papers",
      sessions: [
        {
          sessionName: "March 2017",
          papers: [
            { name: "0478_m17_er.pdf", url: "https://docs.google.com/viewer?url=https://raw.githubusercontent.com/JoseEsteveDev/past_papers/main/0478%20CAIE%20CS%20IGCSE%20Past%20Papers/0478/March%202017/0478_m17_er.pdf&embedded=true" },
            { name: "0478_m17_gt.pdf", url: "https://docs.google.com/viewer?url=https://raw.githubusercontent.com/JoseEsteveDev/past_papers/main/0478%20CAIE%20CS%20IGCSE%20Past%20Papers/0478/March%202017/0478_m17_gt.pdf&embedded=true" },
            { name: "0478_m17_ms_12.pdf", url: "https://docs.google.com/viewer?url=https://raw.githubusercontent.com/JoseEsteveDev/past_papers/main/0478%20CAIE%20CS%20IGCSE%20Past%20Papers/0478/March%202017/0478_m17_ms_12.pdf&embedded=true" },
            { name: "0478_m17_qp_12.pdf", url: "https://docs.google.com/viewer?url=https://raw.githubusercontent.com/JoseEsteveDev/past_papers/main/0478%20CAIE%20CS%20IGCSE%20Past%20Papers/0478/March%202017/0478_m17_qp_12.pdf&embedded=true" }
          ]
        },
        {
          sessionName: "June 2017",
          papers: [
            { name: "0478_s17_er.pdf", url: "#" },
            { name: "0478_s17_ms_11.pdf", url: "#" },
            { name: "0478_s17_qp_11.pdf", url: "#" }
          ]
        }
      ]
    },
    {
      syllabusCode: "9618",
      title: "9618 CAIE CS A Level Past Papers",
      sessions: [
        {
          sessionName: "June 2021",
          papers: [
            { name: "9618_s21_ms_11.pdf", url: "#" },
            { name: "9618_s21_qp_11.pdf", url: "#" },
            { name: "9618_s21_ms_21.pdf", url: "#" },
            { name: "9618_s21_qp_21.pdf", url: "#" }
          ]
        }
      ]
    },
    {
      syllabusCode: "A2 OCR",
      title: "Past Papers A2 OCR",
      sessions: [
        {
          sessionName: "OCR 2018",
          papers: [
            { name: "2018P1MS.pdf", url: "https://docs.google.com/viewer?url=https://raw.githubusercontent.com/JoseEsteveDev/past_papers/main/Others/Past%20Papers%20A2%20OCR/OCR/2018P1MS.pdf&embedded=true" },
            { name: "2018P2.pdf", url: "https://docs.google.com/viewer?url=https://raw.githubusercontent.com/JoseEsteveDev/past_papers/main/Others/Past%20Papers%20A2%20OCR/OCR/2018P2.pdf&embedded=true" },
            { name: "P1Sample.pdf", url: "https://docs.google.com/viewer?url=https://raw.githubusercontent.com/JoseEsteveDev/past_papers/main/Others/Past%20Papers%20A2%20OCR/OCR/P1Sample.pdf&embedded=true" }
          ]
        }
      ]
    }
  ]
};

const SANDBOX_DEFAULTS = {
  'Python': 'print("Hello, Computer Science!")\n\n# Demonstrate loops and proper output formatting\nfor i in range(3):\n    print("Iteration counter:", i)\n',
  'Cambridge Pseudocode': 'OUTPUT "Hello, Computer Science!"\n\n// Standard Cambridge loop construct\nFOR i <- 0 TO 2\n    OUTPUT "Iteration counter: ", i\nNEXT i\n',
  'Java': 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Computer Science!");\n    \n    // Demonstrate loop constructs\n    for(int i=0; i<3; i++) {\n      System.out.println("Iteration counter: " + i);\n    }\n  }\n}',
  'VB.NET': 'Module Module1\n  Sub Main()\n    Console.WriteLine("Hello, Computer Science!")\n    \n    \' Demonstrate For loops\n    For i As Integer = 0 To 2\n      Console.WriteLine("Iteration counter: " & i)\n    Next\n  End Sub\nEnd Module'
};

const TOPICS = [
  { name: 'Data Representation', emoji: '💾', desc: 'Binary systems, hexadecimals, sound, images, and compression algorithms.' },
  { name: 'Problem Solving', emoji: '🧩', desc: 'Decomposition, abstraction, and systematic problem resolution frameworks.' },
  { name: 'Algorithm Design', emoji: '🧠', desc: 'Flowcharts, structured English, sorting algorithms, and searching techniques.' },
  { name: 'Pseudocode', emoji: '📝', desc: 'Syllabus-standard pseudocode constructs, trace tables, and dry runs.' },
  { name: 'Python Programming', emoji: '🐍', desc: 'Core programming concepts, sequence, selection, iteration, and file handling.' },
  { name: 'Computer Systems', emoji: '🖥️', desc: 'Von Neumann architecture, CPU fetch-decode-execute cycle, and storage systems.' },
  { name: 'Networking', emoji: '🌐', desc: 'Topologies, protocols, IP & MAC addressing, packets, and client-server setups.' },
  { name: 'Databases', emoji: '🗄️', desc: 'Relational database systems, normalization, primary & foreign keys, and SQL.' },
  { name: 'Cybersecurity', emoji: '🔐', desc: 'Malware vectors, prevention strategies, firewalls, and modern encryption methods.' },
  { name: 'Data Science', emoji: '📊', desc: 'Data gathering, preprocessing, visual analysis, and structural representation.' },
  { name: 'Artificial Intelligence', emoji: '🤖', desc: 'Expert systems, deep learning networks, heuristic pathways, and ethical impacts.' },
  { name: 'Machine Learning', emoji: '⚙️', desc: 'Supervised vs unsupervised learning models, regression, and decision trees.' },
  { name: 'Functional Programming', emoji: 'λ', desc: 'Pure functions, first-class entities, mapping, filtering, and lazy evaluation.' },
  { name: 'Object-Oriented Programming', emoji: '🧱', desc: 'Classes, inheritance, polymorphism, encapsulation, and class diagrams.' }
];

const BLOG_POSTS = [
  {
    id: 1,
    title: "Demystifying Big O Notation: A Student's Guide",
    excerpt: "Struggling to evaluate how your algorithms scale? Let's break down O(1), O(log n), O(n), and O(n²) with practical python visual guides.",
    date: "May 28, 2026",
    category: "Algorithms",
    readTime: "6 min read",
    author: "Dr. Elena Vance",
    content: "Big O notation is simply a tool used by computer scientists to describe how an algorithm behaves as the input size grows. In your exams, you will primarily need to identify the time complexity of searching and sorting algorithms. Linear search scales linearly ($O(n)$), while binary search divides the search space in half each step, giving it an incredibly efficient logarithmic time complexity ($O(\\log n)$). When designing nested loops, remember that running an inner loop $n$ times inside an outer loop that also runs $n$ times results in quadratic complexity ($O(n^2)$), which should be avoided for large datasets."
  },
  {
    id: 2,
    title: "Mastering Recursion in Python and pseudocode",
    excerpt: "Understand the stack mechanics behind recursive calls, define precise base cases, and avoid stack overflow errors in Paper 4.",
    date: "April 15, 2026",
    category: "Programming",
    readTime: "8 min read",
    author: "Prof. Alan Turing Jr.",
    content: "Recursion occurs when a function calls itself to solve a smaller instance of the same problem. To master recursion for your A-Level examinations, always start by defining the 'Base Case'—the condition under which the function stops calling itself. Without this, your program will enter infinite recursion and crash with a stack overflow error. The state of each call is pushed onto the system's Call Stack. Consider the classic factorial algorithm: $fact(n) = n \\times flex(n-1)$ with base case $fact(1) = 1$. Trace this step-by-step to visualize how values are returned back up the call stack."
  },
  {
    id: 3,
    title: "Relational Databases & SQL JOINs Explained Visually",
    excerpt: "Inner, Left, and Right joins can be tricky. This visual walkthrough guarantees you'll get maximum points in your database questions.",
    date: "March 11, 2026",
    category: "Databases",
    readTime: "5 min read",
    author: "Sarah Codewell",
    content: "In relational databases, information is split across multiple tables to avoid data redundancy, a process known as Normalization. To query related data, we use SQL JOIN statements. An INNER JOIN returns records that have matching values in both tables. A LEFT JOIN returns all records from the left table, and the matched records from the right table. If no match is found, NULL values are returned for the right table's columns. Practice writing query commands like `SELECT Student.Name, Class.ClassName FROM Student INNER JOIN Class ON Student.ClassID = Class.ID` to master database relationships."
  }
];

const SYLLABUS_DATA = {
  cie: {
    title: "Cambridge Assessment International Education (CIE)",
    igcse: {
      code: "Cambridge IGCSE Computer Science (0478)",
      desc: "An exceptional foundation in computational thinking, practical programming, and theory of computer systems.",
      features: [
        { title: "Dual-Paper Assessment Model", details: "Split evenly between Paper 1 (Computer Systems theory) and Paper 2 (Algorithms, Programming and Logic). Both papers are written examinations, testing deep analytical skills." },
        { title: "Practical Problem Solving", details: "Students learn to design algorithms using flowcharts, structured English, and high-level pseudocode. Emphasizes dry-running algorithms using trace tables." },
        { title: "Standard Programming Paradigms", details: "Focused on core programming concepts using Python, VB.NET, or Java. Prepares students for writing syntax-correct algorithms during written examinations." },
        { title: "Comprehensive Systems Theory", details: "In-depth understanding of hardware, memory models, communication technologies, and cybersecurity threats such as phishing, pharming, and spyware." }
      ]
    },
    ial: {
      code: "Cambridge International AS & A Level (9618)",
      desc: "An advanced curriculum bridging secondary education with higher university-level computer science principles.",
      features: [
        { title: "Rigorous Theoretical Core", details: "Covers complex topics like system software, compilers and interpreters, network protocols, assembly code, and relational database design including SQL queries." },
        { title: "Practical On-Screen Coding Exam", details: "Paper 4 is a practical programming examination taken on a computer. Candidates write, debug, and test code live using Python, Java, or VB.NET." },
        { title: "Advanced Data Structures & Algorithms", details: "Theoretical and practical application of Abstract Data Types (ADTs) including Linked Lists, Stacks, Queues, Binary Trees, and Graphs, alongside Sorting & Searching algorithms." },
        { title: "Software Development Paradigms", details: "Covers Object-Oriented Programming (OOP) with inheritance and polymorphism, Declarative Programming, and Software Development Life Cycles (SDLC)." }
      ]
    }
  },
  edexcel: {
    title: "Pearson Edexcel International",
    igcse: {
      code: "Pearson Edexcel IGCSE Computer Science (4CP2)",
      desc: "An modern, highly practical qualification emphasizing hands-on programming and practical digital literacy.",
      features: [
        { title: "Live Practical Python Coding Exam", details: "Unlike other boards, Paper 2 is an application-focused live coding exam on a computer. Students write and run Python scripts to solve real-world problems in real time." },
        { title: "Modern Hardware & Networks focus", details: "Focuses heavily on internet protocols, digital communication topologies, storage mechanisms, and the impact of computer systems on society and the environment." },
        { title: "Core Cybersecurity Knowledge", details: "Focuses on defending computer networks from cyberattacks, writing secure code, understanding cryptography, and formulating sound data protection strategies." }
      ]
    },
    ial: {
      code: "Pearson Edexcel International AS & A Level (YCP01)",
      desc: "A modular, highly structured specification that develops advanced logical and computational capabilities.",
      features: [
        { title: "Modular Examination Structure", details: "Consists of discrete units allowing students to take examinations progressively, easing revision loads and offering clear milestone feedback." },
        { title: "Algorithmic Complexity & Big O", details: "Equips students with mathematical models to compute runtime complexities, analyze resource utilization, and design optimized database pathways." },
        { title: "Advanced Relational Algebra", details: "Introduces advanced relational calculus, multi-table joining, Normalisation algorithms up to Third Normal Form (3NF), and transaction safety." }
      ]
    }
  }
};

const COURSE_UNITS = {
  'IGCSE': {
    'CAIE': [
      { num: 'Topic 1', title: 'Number Systems', desc: ['How data is stored in binary', 'Hexadecimal', "Two's complement", 'Binary arithmetic', 'Binary shifts', 'Data storage measurement'] },
      { num: 'Topic 2', title: 'Data Representation', desc: ['Character sets (ASCII, Unicode)', 'Bitmap images', 'Sound', 'Lossless and Lossy Compression'] },
      { num: 'Topic 3', title: 'Databases', desc: ['Data types', 'Database fundamentals (fields, records, primary key, validation)', 'SQL queries'] },
      { num: 'Topic 4', title: 'Logic Circuits', desc: ['Logic gates', 'Logic circuits', 'Trace tables', 'Problem statements'] },
      { num: 'Topic 5', title: 'Computer Architecture', desc: ['Von Neumann Architecture', 'Components of the computer', 'Components of the CPU', 'Fetch-Decode-Execute Cycle', 'Factors that affect the performance of a CPU (core, cache size, clock speed)', 'Instruction set', 'Embedded Systems'] },
      { num: 'Topic 6', title: 'Software and Operating Systems', desc: ['Types of software (Application and System software)', 'Functions of the OS', 'Firmware & BIOS', 'Interrupt Handling'] },
      { num: 'Topic 7', title: 'Programming Languages & Translators', desc: ['High-level, low level and assembly languages', 'Translators (Compilers, Interpreters)', 'Role of the IDE in writing programs'] },
      { num: 'Topic 8', title: 'Algorithm Design', desc: ['Program Development Life Cycle', 'Subsystems', 'Structured Diagrams', 'Flowcharts', 'Trace tables'] },
      { num: 'Topic 9', title: 'Programming with Pseudocode', desc: ['Variables, Constants, Operators', 'Programming Constructs (Sequence, Selection, Iteration)', 'Standard Methods of Solution', 'String Handling', 'Built-in Functions', 'Variable scope', '1D and 2D arrays'] },
      { num: 'Topic 10', title: 'Hardware: Memory & Storage', desc: ['Input and Output Devices', 'Memory (RAM, ROM)', 'Storage (Magnetic, Optical, Solid-state, Virtual memory)'] },
      { num: 'Topic 11', title: 'Automated and Emerging Technologies', desc: ['Automated Systems', 'Robotics', 'Artificial Intelligence'] },
      { num: 'Topic 12', title: 'Further Programming', desc: ['Searching and Sorting Algorithms', 'Validation checks', 'Test data', 'Subprograms (Functions and Procedures)', 'Variable scope', 'File Handling'] },
      { num: 'Topic 13', title: 'Data Transmission', desc: ['Methods: Serial, Parallel, Simplex, Half-duplex, Full duplex', 'Methods of error detection: Parity Bit, Parity Block Check, Checksum, Echo Check, Check Digit, Automatic Repeat Query (ARQ)', 'Encryption'] },
      { num: 'Topic 14', title: 'Networks & The Internet', desc: ['Network Hardware (NIC, MAC, IP, router)', 'The Internet', 'URL, HTTP, web browser, HTML', 'DNS', 'Cookies', 'Digital Currency (Blockchain)'] },
      { num: 'Topic 15', title: 'Cybersecurity', desc: ['Cybersecurity threats', 'Solutions to these security threats'] }
    ],
    'Edexcel': [
      { num: 'Topic 1', title: 'Data Representation I. Number Systems', desc: ['Use of Binary', 'Binary and Hexadecimal Number Systems', 'Conversions between systems', 'Binary Arithmetic'] },
      { num: 'Topic 2', title: 'Data Representation II. Text and Multimedia', desc: ['Text Representation', 'Bitmap Images', 'Sound Representation', 'Limitations on Binary Representation'] },
      { num: 'Topic 3', title: 'Data Representation III. Storage, Compression & Encryption', desc: ['Data Storage', 'File Size Expressions', 'Data Compression: Lossless and Lossy', 'Data Encryption'] },
      { num: 'Topic 4', title: 'Hardware I. Structure of Machines', desc: ['Machines and Computational Modelling', 'Logic: the Foundation of Hardware', 'Hardware Components of a Computer System', 'Memory', 'Von Neumann Model', 'Factors that affect the performance of the CPU'] },
      { num: 'Topic 5', title: 'Hardware II. Secondary Storage on Devices', desc: ['Storing Data on Physical Devices', 'Embedded Systems'] },
      { num: 'Topic 6', title: 'Software I. Operating Systems', desc: ['Types of Software', 'Simulating and Modeling Real World', 'Functions of an OS', 'Utility Software'] },
      { num: 'Topic 7', title: 'Software II. Languages and Translators', desc: ['Languages: LL and HL', 'Translators: Interpreters and Compilers'] },
      { num: 'Topic 8', title: 'Computational Thinking', desc: ['Decomposition and Abstraction', 'Algorithms', 'Searching and Sorting Algorithms'] },
      { num: 'Topic 9', title: 'Programming I', desc: ['Data Types', 'Variables and Constants', 'Input and Output', 'Operators', 'Programming Constructs', 'Data Structures'] },
      { num: 'Topic 10', title: 'Programming II', desc: ['Validation of Data Input', 'Subprograms', 'File Handling'] },
      { num: 'Topic 11', title: 'Networks', desc: ['Network Design & Protocols', 'The Internet & The World Wide Web'] },
      { num: 'Topic 12', title: 'Network Security', desc: ['Security Fundamentals', 'Cyber threats and Attacks', 'Vulnerability Assessment', 'Protection of Mitigation Strategies'] },
      { num: 'Topic 13', title: 'The Bigger Picture', desc: ['Environmental Impact', 'Ethical Impact', 'Legal Impact', 'Emerging Technologies'] }
    ]
  },
  'AS Level': {
    'CAIE': [
      { num: 'AS Topic 1', title: 'Algorithm Design and Problem Solving', desc: ['Computational Thinking Skills', 'Algorithms', 'Flowchart', 'Structured English', 'Stepwise Refinement', 'Basic Programming with Pseudocode'] },
      { num: 'AS Topic 2', title: 'Structured Programming and Data Structures', desc: ['Subprograms (Procedures and Functions)', 'Data Types and Data Structures, including Arrays and ADTs'] },
      { num: 'AS Topic 3', title: 'Software Development', desc: ['Program Development Life Cycle', 'Program Testing', 'Program Maintenance'] },
      { num: 'AS Topic 4', title: 'Information Representation', desc: ['Number systems (Binary, Hexadecimal)', 'Binary Arithmetic', 'Binary Coded Decimal (BCD)', "Two's Complement", 'Text Representation', 'Bitmap and Vector Images', 'Sound Representation', 'Lossy and Lossless Compression'] },
      { num: 'AS Topic 5', title: 'Logic Circuits', desc: ['Logic gates', 'Logic Circuits', 'Truth tables', 'Problem-solving applied to Logic Circuits'] },
      { num: 'AS Topic 6', title: 'Hardware', desc: ['Computers and their Components (Embedded Systems, Memory, Storage)', 'Hardware Devices (Laser Printer, 3D Printer, Microphone, Speakers, Screens, Touchscreens, Virtual Headset)'] },
      { num: 'AS Topic 7', title: 'Processor Fundamentals', desc: ['Von Neumann Architecture', 'Purpose of Registers, ALU, CU, System Clock, and IAS', 'Factors that affect the performance of the CPU', 'Ports (USB, VGA, HDMI)', 'FDE Cycle', 'Interrupts'] },
      { num: 'AS Topic 8', title: 'Assembly Language & Bit Manipulation', desc: ['Instruction Set Groups', 'Trace Tables', 'Two-step Assembler Stages', 'Addressing Modes', 'Bit Manipulation in Monitoring/Controlling Processes'] },
      { num: 'AS Topic 9', title: 'Operating Systems and Language Translators', desc: ['Functions of the OS', 'Utility Software', 'Program Libraries', 'Language Translators (Assembler, Interpreter, Compiler)', 'Features of IDEs'] },
      { num: 'AS Topic 10', title: 'Communication and Networking Technologies', desc: ['Networking Models', 'Network Toplogies', 'Cloud Computing', 'Network Hardware', 'Bit Streaming', 'The Internet Infrastructure', 'IP Addressing and Subnetting', 'DNS System'] },
      { num: 'AS Topic 11', title: 'Data Security, Privacy and Integrity', desc: ['Security Measures', 'Threats', 'Security Methods', 'Data Validation Checks', 'Data Verification'] },
      { num: 'AS Topic 12', title: 'Ethics and Ownership', desc: ['Professional Ethical Bodies (BCS, IEEE)', 'Professional Ethics', 'Copyright Legislation', 'Software Licensing', 'Artificial Intelligence'] },
      { num: 'AS Topic 13', title: 'Databases', desc: ['Relational Databases', 'Entity-Relationship Model', 'Database Normalisation', 'Database Management Systems (DBMS)', 'Structured Query Language (SQL)'] }
    ],
    'Edexcel (IAL)': [
      { num: 'AS Topic 1', title: 'Data Representation', desc: ['Number Systems', 'Units of Measurement', 'Binary Arithmetic', 'Text Representation'] },
      { num: 'AS Topic 2', title: 'Computer Systems', desc: ['Computer Architecture', 'Boolean Logic', 'Data Transmission'] },
      { num: 'AS Topic 3', title: 'Operating Systems', desc: ['Role of the OS', 'Multitasking', 'Process Management', 'Memory Management'] },
      { num: 'AS Topic 4', title: 'Algorithms', desc: ['Computational Thinking', 'Algorithm Design', 'Algorithm Implementation', 'Foundations of Searching and Sorting Algorithms', 'Handling Searching and Sorting Algorithms'] },
      { num: 'AS Topic 5', title: 'Programming Foundations: Best Practice & Clean Code', desc: ['Python Programming Basics', 'Clean Code I', 'Program Design I', 'Data Handling Methods', 'Subprograms', 'Program Design II', 'Clean Code II', 'Functionality'] },
      { num: 'AS Topic 6', title: 'Handling Data, Data Structures and ADTs', desc: ['Data Structures Fundamentals', 'Handling Methods for Data Structures', 'Abstract Data Types (ADTs)', 'Handling Abstract Data Types (ADTs)'] },
      { num: 'AS Topic 7', title: 'Networks and Encryption', desc: ['Network Fundamentals', 'Encryption'] },
      { num: 'AS Topic 8', title: 'Further Programming', desc: ['Programming Paradigms', 'Recursion Fundamentals', 'Handling Recursive Programs'] },
      { num: 'AS Topic 9', title: 'Databases', desc: ['Relational Databases', 'Relational Databases Programming'] },
      { num: 'AS Topic 10', title: 'Enabling Technologies', desc: ['Data Science', 'Artificial Intelligence', 'Programming Tools'] }
    ]
  },
  'A2 Level': {
    'CAIE': [
      { num: 'A2 Topic 1', title: 'Data Representation', desc: ['Floating-point Binary Representation', 'User-defined Data Types', 'File Organisation and Access'] },
      { num: 'A2 Topic 2', title: 'Algorithms I. Searching and Sorting Algorithms', desc: ['Searching Algorithms (Linear, Binary)', 'Sorting Algorithms (Bubble, Insertion)', 'Space and Time Complexity (Big O Notation)'] },
      { num: 'A2 Topic 3', title: 'Recursion', desc: ['Recursion Features', 'Trace Tables', 'Call Stacks and Unwinding'] },
      { num: 'A2 Topic 4', title: 'Programming Paradigms I. Low-level Programming', desc: ['Programming Paradigms', 'Addressing Modes', 'Low-level Programming'] },
      { num: 'A2 Topic 5', title: 'Programming Paradigms II. Declarative Programming', desc: ['Facts and Rules', 'Prolog Programming'] },
      { num: 'A2 Topic 6', title: 'Programming Paradigms III. Object-oriented Programming', desc: ['OOP Features', 'Solve Problems using OOP', 'Inheritance', 'Polymorphism', 'Aggregation', 'Composition'] },
      { num: 'A2 Topic 7', title: 'Boolean Algebra', desc: ['Boolean Algebra', 'Karnaugh Maps', 'Half- and Full-adder Circuits', 'SR and JK Flip-flops'] },
      { num: 'A2 Topic 8', title: 'Processors and Computer Architecture', desc: ['RISC and CISC processors', 'Parallel Processing', 'Virtual Machines'] },
      { num: 'A2 Topic 9', title: 'System Software I. Translators', desc: ['Stages on the Compilation Process', 'Grammar of a Language (Syntax Diagrams, Backus-Naur Form (BNF) notation, Reverse Polish Notation (RPN))'] },
      { num: 'A2 Topic 10', title: 'System Software II. Operating Systems', desc: ['Process Management (Scheduling Algorithms)', 'Memory Management'] },
      { num: 'A2 Topic 11', title: 'Communication and Internet Technologies', desc: ['Circuit Switching and Packet Switching', 'TCP/IP Protocol Stack', 'Network Protocols (HTTP, POP3, IMAP, SMTP, Ethernet, Bittorrent)'] },
      { num: 'A2 Topic 12', title: 'Security', desc: ['Encryption', 'Digital Signatures', 'Digital Certificates', 'Encryption Protocols (SSL/TLS)'] },
      { num: 'A2 Topic 13', title: 'Algorithms II. Abstract Data Types (ADTs)', desc: ['Stack', 'Queue', 'Hash tables', 'Dictionaries', 'Linked Lists', 'Tree', 'Binary Search Tree'] },
      { num: 'A2 Topic 14', title: 'Artificial Intelligence', desc: ['Graphs', 'Shortest Path Algorithms (A*, Dijkstra)', 'Machine Learning', 'Reinforcement Learning', 'Back Propagation and Regression'] },
      { num: 'A2 Topic 15', title: 'Further Programming', desc: ['Exception Handling', 'File Processing Programming'] }
    ],
    'Edexcel (IAL)': [
      { num: 'A2 Topic 1', title: 'Algorithms & Programming', desc: ['Algorithm Design', 'Programming'] },
      { num: 'A2 Topic 2', title: 'Representing & Handling Data', desc: ['Data Representation', 'Handling Data'] },
      { num: 'A2 Topic 3', title: 'Computer Systems', desc: ['Boolean Logic', 'Computer Architecture', 'Operating Systems'] },
      { num: 'A2 Topic 4', title: 'Programming Paradigms I: Assembly Language', desc: ['Assembly Language', 'Addressing Modes'] },
      { num: 'A2 Topic 5', title: 'Programming Paradigms II: Object-oriented Programming (OOP)', desc: ['Object-oriented Paradigm', 'OOP Methods'] },
      { num: 'A2 Topic 6', title: 'Sorting, Pathfinding, and Compression Algorithms', desc: ['Sorting Algorithms Foundation', 'Sorting Algorithms Implementation', 'Pathfinding Algorithms', 'Shortest Path and Compression Algorithms Implementation', 'Algorithmic Efficiency (Big O Notation)'] },
      { num: 'A2 Topic 7', title: 'Programming Paradigms III. Functional Programming', desc: ['Functional Programming Paradigm', 'Functional Programming Methods'] },
      { num: 'A2 Topic 8', title: 'Networks, Computing Paradigms, and Cybersecurity', desc: ['Networking', 'The Internet of Things (IoT)', 'Computing Paradigms', 'Cybersecurity'] },
      { num: 'A2 Topic 9', title: 'Structuring and Handling Data [Abstract Data Types (ADTs)]', desc: ['Structure and Operations of ADTs', 'Methods to represent ADTs in Programming'] },
      { num: 'A2 Topic 10', title: 'Emerging Technologies and Professional Practice', desc: ['Emerging Technologies (Encryption, Blockchain, Quantum Computing, Deep Learning)', 'Professional Practice'] }
    ]
  }
};

// --- GLOBAL PYODIDE LOADER ---
const loadPyodideRuntime = async () => {
  if (!window.pyodideInstance) {
    for (let i = 0; i < 50; i++) {
      if (typeof window.loadPyodide === "function") break;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    if (typeof window.loadPyodide !== "function") {
      throw new Error("Pyodide library script not loaded. Please wait a moment or check your connection.");
    }
    window.pyodideInstance = await window.loadPyodide();
  }
  return window.pyodideInstance;
};

// --- ROBUST MONACO EDITOR INTEGRATION COMPONENT ---
function MonacoEditor({ value, language, onChange, height = "400px", readOnly = false }) {
  const containerRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    let isCancelled = false;

    const initMonaco = () => {
      if (isCancelled || !containerRef.current || !window.monaco) return;

      const monaco = window.monaco;
      
      if (!monaco.languages.getLanguages().some(l => l.id === 'pseudocode')) {
        monaco.languages.register({ id: 'pseudocode' });
        monaco.languages.setMonarchTokensProvider('pseudocode', {
          tokenizer: {
            root: [
              [/^\s*\/\/.*/, 'comment'],
              [/\b(DECLARE|CONSTANT|INPUT|OUTPUT|PRINT|FOR|TO|NEXT|STEP|WHILE|ENDWHILE|REPEAT|UNTIL|IF|THEN|ELSE|ENDIF|PROCEDURE|ENDPROCEDURE|FUNCTION|ENDFUNCTION|RETURN|CALL|AND|OR|NOT|MOD|DIV|TRUE|FALSE|ARRAY|OF|INTEGER|REAL|CHAR|STRING|BOOLEAN)\b/, 'keyword'],
              [/".*?"/, 'string'],
              [/\d+/, 'number'],
              [/<-|=|\+|-|\*|\/|>|<|>=|<=|<>/, 'operator'],
            ]
          }
        });
        monaco.editor.defineTheme('studycs-theme', {
          base: 'vs-dark',
          inherit: true,
          rules: [
            { token: 'keyword', foreground: 'c586c0', fontStyle: 'bold' },
            { token: 'comment', foreground: '6a9955', fontStyle: 'italic' },
            { token: 'string', foreground: 'ce9178' },
            { token: 'number', foreground: 'b5cea8' },
            { token: 'operator', foreground: 'd4d4d4' },
          ],
          colors: {
            'editor.background': '#030213',
            'editor.lineHighlightBackground': '#ffffff10'
          }
        });
      }

      if (!editorRef.current) {
        editorRef.current = monaco.editor.create(containerRef.current, {
          value: value,
          language: language === 'Cambridge Pseudocode' || language === 'Pseudocode' ? 'pseudocode' : (language === 'VB.NET' ? 'vb' : language.toLowerCase()),
          theme: 'studycs-theme',
          minimap: { enabled: false },
          automaticLayout: true,
          fontSize: 14,
          padding: { top: 16, bottom: 16 },
          readOnly: readOnly,
          scrollBeyondLastLine: false,
          renderLineHighlight: "all"
        });

        editorRef.current.onDidChangeModelContent(() => {
          onChange(editorRef.current.getValue());
        });
      }
    };

    if (window.monaco) {
      initMonaco();
    } else {
      const scriptId = 'monaco-loader-script';
      let script = document.getElementById(scriptId);
      if (!script) {
        script = document.createElement('script');
        script.id = scriptId;
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs/loader.min.js';
        document.body.appendChild(script);
        
        script.onload = () => {
          window.require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.33.0/min/vs' } });
          window.require(['vs/editor/editor.main'], () => {
            initMonaco();
          });
        };
      } else {
        script.addEventListener('load', () => {
          window.require(['vs/editor/editor.main'], () => {
            initMonaco();
          });
        });
      }
    }

    return () => {
      isCancelled = true;
      if (editorRef.current) {
        editorRef.current.dispose();
        editorRef.current = null;
      }
    };
  }, []); 

  useEffect(() => {
     if (editorRef.current && value !== editorRef.current.getValue()) {
        editorRef.current.setValue(value);
     }
  }, [value]);

  useEffect(() => {
     if (editorRef.current && window.monaco) {
        const model = editorRef.current.getModel();
        if (model) {
           window.monaco.editor.setModelLanguage(model, language === 'Cambridge Pseudocode' || language === 'Pseudocode' ? 'pseudocode' : (language === 'VB.NET' ? 'vb' : language.toLowerCase()));
        }
     }
  }, [language]);

  return <div ref={containerRef} style={{ width: '100%', height: height }} className="rounded-xl overflow-hidden focus:outline-none" />;
}


// --- PAST PAPERS COMPONENTS ---
const PastPapersTable = () => {
  const [openSyllabi, setOpenSyllabi] = useState({});
  const [openSessions, setOpenSessions] = useState({});

  const toggleSyllabus = (idx) => {
    setOpenSyllabi(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleSession = (sIdx, sessIdx) => {
    setOpenSessions(prev => ({ ...prev, [`${sIdx}-${sessIdx}`]: !prev[`${sIdx}-${sessIdx}`] }));
  };

  return (
    <div id="past-papers-table" className="space-y-4 max-w-4xl mx-auto">
      {PAST_PAPERS_DATA.syllabi.map((syllabus, sIdx) => {
        const isSyllabusOpen = !!openSyllabi[sIdx];
        
        return (
          <div key={sIdx} className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm">
            <button 
              onClick={() => toggleSyllabus(sIdx)}
              className="w-full flex items-center justify-between p-5 bg-[#f3f3f5] dark:bg-[#030213]/50 hover:bg-[#e9ebef] dark:hover:bg-white/10 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-indigo-500" />
                <h3 className="font-bold text-lg text-[#030213] dark:text-white">{syllabus.title}</h3>
              </div>
              <div className="p-1 bg-white dark:bg-white/10 rounded-full">
                <ChevronDown className={`h-5 w-5 text-[#717182] transition-transform duration-300 ${isSyllabusOpen ? 'rotate-180' : ''}`} />
              </div>
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isSyllabusOpen ? 'max-h-[3000px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-4 space-y-3 bg-white dark:bg-transparent">
                {syllabus.sessions.map((session, sessIdx) => {
                  const isSessionOpen = !!openSessions[`${sIdx}-${sessIdx}`];
                  
                  return (
                    <div key={sessIdx} className="border border-black/5 dark:border-white/5 rounded-xl overflow-hidden">
                      <button 
                        onClick={() => toggleSession(sIdx, sessIdx)}
                        className="w-full flex items-center justify-between p-4 bg-white dark:bg-white/5 hover:bg-[#f3f3f5] dark:hover:bg-white/10 transition-colors text-left"
                      >
                        <span className="font-semibold text-sm text-[#030213] dark:text-[#ececf0]">{session.sessionName}</span>
                        <ChevronDown className={`h-4 w-4 text-[#717182] transition-transform duration-300 ${isSessionOpen ? 'rotate-180' : ''}`} />
                      </button>
                      
                      <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isSessionOpen ? 'max-h-[1000px] opacity-100 border-t border-black/5 dark:border-white/5' : 'max-h-0 opacity-0'}`}>
                        <div className="p-3 bg-[#f3f3f5]/50 dark:bg-black/20 grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {session.papers.map((paper, pIdx) => (
                            <a 
                              key={pIdx}
                              href={paper.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 bg-white dark:bg-white/5 hover:border-indigo-500/50 dark:hover:border-indigo-400 border border-black/5 dark:border-white/5 rounded-lg transition-all group"
                            >
                              <span className="text-xs font-medium text-[#717182] group-hover:text-[#030213] dark:group-hover:text-white truncate pr-2">
                                {paper.name}
                              </span>
                              <Download className="h-4 w-4 text-indigo-500 shrink-0 opacity-70 group-hover:opacity-100 transition-opacity" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const FAQAccordion = () => {
  const faqs = [
    { q: "Do the past papers include the solutions?", a: "Yes, each paper is provided alongside its mark scheme so you can check your answers." },
    { q: "Are all papers from the start of the syllabus available?", a: "We’re gradually adding every available session. If you need a specific series we haven’t uploaded yet, let us know and we’ll prioritise it." },
    { q: "Can I use these papers even if I don’t follow the Cambridge curriculum?", a: "The papers are designed for the Cambridge syllabus, but Computer Science topics are universal. Still, we recommend checking your own exam specification." },
    { q: "Is there any cost to download the past papers?", a: "No, all resources on this page are completely free." }
  ];

  const [openIdx, setOpenIdx] = useState(null);

  return (
    <div className="space-y-3 max-w-3xl mx-auto">
      {faqs.map((faq, idx) => {
        const isOpen = openIdx === idx;
        return (
          <div key={idx} className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden bg-white dark:bg-white/5">
            <button 
              onClick={() => setOpenIdx(isOpen ? null : idx)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-[#f3f3f5] dark:hover:bg-white/10 transition-colors"
            >
              <span className="font-bold text-sm sm:text-base text-[#030213] dark:text-white">{faq.q}</span>
              <ChevronDown className={`h-5 w-5 text-[#717182] transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden bg-[#f3f3f5]/50 dark:bg-black/20 ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
              <p className="p-5 text-sm text-[#717182] leading-relaxed border-t border-black/5 dark:border-white/5">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};


export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Specific states for the structured Units Page
  const [unitLevel, setUnitLevel] = useState(null); 
  const [unitBoard, setUnitBoard] = useState(null); 
  const [activeResource, setActiveResource] = useState(null); 
  const [activeFeatureId, setActiveFeatureId] = useState(null);

  // Interactive Simulator States
  const [activeBlogArticle, setActiveBlogArticle] = useState(null);
  const [aiAssistantInput, setAiAssistantInput] = useState('');
  const [aiAssistantChat, setAiAssistantChat] = useState([
    { role: 'assistant', text: 'Hello! I am your AI Computer Science Assistant. Click a prompt below or ask me any question about your curriculum!' }
  ]);
  const [aiLoading, setAiLoading] = useState(false);
  
  // Form states
  const [homeContactName, setHomeContactName] = useState('');
  const [homeContactEmail, setHomeContactEmail] = useState('');
  const [homeContactMessage, setHomeContactMessage] = useState('');
  const [homeContactSubmitted, setHomeContactSubmitted] = useState(false);

  const [pageContactName, setPageContactName] = useState('');
  const [pageContactEmail, setPageContactEmail] = useState('');
  const [pageContactCategory, setPageContactCategory] = useState('Syllabus inquiry');
  const [pageContactMessage, setPageContactMessage] = useState('');
  const [pageContactSubmitted, setPageContactSubmitted] = useState(false);

  // SANDBOX STATES 
  const [sandboxLang, setSandboxLang] = useState('Python');
  const [sandboxCodeText, setSandboxCodeText] = useState(SANDBOX_DEFAULTS['Python']);
  const [sandboxOutput, setSandboxOutput] = useState('');
  const [sandboxError, setSandboxError] = useState('');
  const [sandboxErrorLine, setSandboxErrorLine] = useState(null);
  const [sandboxErrorMsg, setSandboxErrorMsg] = useState('');
  const [isSandboxExecuting, setIsSandboxExecuting] = useState(false);
  const [isPyodideLoading, setIsPyodideLoading] = useState(false);
  const [isStepModeActive, setIsStepModeActive] = useState(false);

  // ALGORITHM VISUALIZER STATES
  const [visAlgo, setVisAlgo] = useState('linear'); 
  const [visArrayInput, setVisArrayInput] = useState('5, 2, 9, 1, 7');
  const [visArray, setVisArray] = useState([5, 2, 9, 1, 7]);
  const [visSearchVal, setVisSearchVal] = useState('9');
  const [visSortOrder, setVisSortOrder] = useState('asc'); 
  const [visIsBinarySorted, setVisIsBinarySorted] = useState(false);
  const [visError, setVisError] = useState('');
  const [visFrames, setVisFrames] = useState([]);
  const [visCurrentFrame, setVisCurrentFrame] = useState(0);
  const [visIsPlaying, setVisIsPlaying] = useState(false);

  // PSEUDOCODE TRANSLATOR STATES
  const [transPseudo, setTransPseudo] = useState('// Standard Cambridge 9618 Pseudocode\nOUTPUT "Welcome to the translator!"\n\nFOR i <- 1 TO 5\n    OUTPUT i\nNEXT i\n');
  const [transPython, setTransPython] = useState('');
  const [isPseudoDirty, setIsPseudoDirty] = useState(true);
  const [isPythonDirty, setIsPythonDirty] = useState(false);
  const [transSteps, setTransSteps] = useState([]);
  const [transError, setTransError] = useState('');

  // Scroll to top on navigation change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setMobileMenuOpen(false); 
    setActiveFeatureId(null); 
  }, [currentTab]);

  useEffect(() => {
    const loadScript = () => {
      if (!document.getElementById('pyodide-script')) {
        const script = document.createElement('script');
        script.id = 'pyodide-script';
        script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.1/full/pyodide.js';
        document.head.appendChild(script);
      }
    };
    loadScript();
  }, []);

  const handleHomeContactSubmit = (e) => {
    e.preventDefault();
    if (!homeContactName || !homeContactEmail || !homeContactMessage) return;
    setHomeContactSubmitted(true);
    setTimeout(() => {
      setHomeContactSubmitted(false);
      setHomeContactName('');
      setHomeContactEmail('');
      setHomeContactMessage('');
    }, 4000);
  };

  const handlePageContactSubmit = (e) => {
    e.preventDefault();
    if (!pageContactName || !pageContactEmail || !pageContactMessage) return;
    setPageContactSubmitted(true);
    setTimeout(() => {
      setPageContactSubmitted(false);
      setPageContactName('');
      setPageContactEmail('');
      setPageContactMessage('');
    }, 4500);
  };

  const handleAiPromptClick = (promptText) => {
    setAiAssistantInput(promptText);
    triggerAiResponse(promptText);
  };

  const handleAiSubmit = (e) => {
    e.preventDefault();
    if (!aiAssistantInput.trim()) return;
    triggerAiResponse(aiAssistantInput);
  };

  const triggerAiResponse = (userInput) => {
    const newChat = [...aiAssistantChat, { role: 'user', text: userInput }];
    setAiAssistantChat(newChat);
    setAiAssistantInput('');
    setAiLoading(true);

    setTimeout(() => {
      let response = "That's an excellent syllabus question! Let's analyze it from an examiner's perspective:\n\n";
      // Simulated response logic
      response += `Computer Science is all about logical structuring! To prepare effectively for this topic, ensure you can:\n1. Draw clear schematic diagrams or flowcharts to map your logic.\n2. Implement your algorithms cleanly in standard high-level programming code (e.g. Python).\n3. Run trace tables to systematically verify state variables.\n\nFeel free to ask specifically about: 'Two's Complement Representation', 'Big O Notation', 'SQL Joins' or 'Recursion Stack'!`;

      setAiAssistantChat(prev => [...prev, { role: 'assistant', text: response }]);
      setAiLoading(false);
    }, 1200);
  };

  const handleSandboxLangChange = (lang) => {
    setSandboxLang(lang);
    const newCode = SANDBOX_DEFAULTS[lang];
    setSandboxCodeText(newCode);
    setSandboxOutput('');
    setSandboxError('');
    setSandboxErrorLine(null);
    setSandboxErrorMsg('');
    setIsSandboxExecuting(false);
    setIsStepModeActive(false);
  };

  const clearSandboxOutput = () => {
    setSandboxOutput('');
    setSandboxError('');
    setSandboxErrorLine(null);
    setSandboxErrorMsg('');
  };

  // Natively transpile Cambridge Pseudocode syntax into executable Python syntax
  const translatePseudocodeToPython = (code) => {
    const lines = code.split('\n');
    let pyLines = [];
    let indentLevel = 0;
    const getIndent = () => '    '.repeat(indentLevel);

    for (let i = 0; i < lines.length; i++) {
        let t = lines[i].trim();
        if (!t) { pyLines.push(''); continue; }
        
        if (t.startsWith('//')) { pyLines.push(getIndent() + '#' + t.substring(2)); continue; }

        let outputMatch = t.match(/^OUTPUT\s+(.+)/i);
        if (outputMatch) {
            let outVal = outputMatch[1];
            pyLines.push(getIndent() + `print(${outVal})`);
            continue;
        }

        let inputMatch = t.match(/^INPUT\s+(.+)/i);
        if (inputMatch) {
            pyLines.push(getIndent() + `${inputMatch[1]} = input()`);
            continue;
        }

        let forMatch = t.match(/^FOR\s+([a-zA-Z0-9_]+)\s*(?:<-|=)\s*(.+?)\s+TO\s+(.+)/i);
        if (forMatch) {
            pyLines.push(getIndent() + `for ${forMatch[1]} in range(int(${forMatch[2]}), int(${forMatch[3]}) + 1):`);
            indentLevel++;
            continue;
        }

        if (/^NEXT/i.test(t)) {
            indentLevel = Math.max(0, indentLevel - 1);
            continue;
        }

        let whileMatch = t.match(/^WHILE\s+(.+)/i);
        if (whileMatch) {
            let cond = whileMatch[1].replace(/\bAND\b/gi, 'and').replace(/\bOR\b/gi, 'or').replace(/\bNOT\b/gi, 'not').replace(/([^<>!=])=([^=])/g, '$1==$2');
            pyLines.push(getIndent() + `while ${cond}:`);
            indentLevel++;
            continue;
        }

        if (/^ENDWHILE/i.test(t)) {
            indentLevel = Math.max(0, indentLevel - 1);
            continue;
        }

        let ifMatch = t.match(/^IF\s+(.+?)\s+THEN/i);
        if (ifMatch) {
            let cond = ifMatch[1].replace(/\bAND\b/gi, 'and').replace(/\bOR\b/gi, 'or').replace(/\bNOT\b/gi, 'not').replace(/([^<>!=])=([^=])/g, '$1==$2');
            pyLines.push(getIndent() + `if ${cond}:`);
            indentLevel++;
            continue;
        }

        if (/^ELSE/i.test(t)) {
            indentLevel = Math.max(0, indentLevel - 1);
            pyLines.push(getIndent() + `else:`);
            indentLevel++;
            continue;
        }

        if (/^ENDIF/i.test(t)) {
            indentLevel = Math.max(0, indentLevel - 1);
            continue;
        }

        if (/^DECLARE/i.test(t)) {
            pyLines.push(getIndent() + `# ${t}`);
            continue;
        }

        let assignmentMatch = t.match(/^([a-zA-Z0-9_]+(\[[^\]]+\])?)\s*(?:<-|=)\s*(.+)/);
        if (assignmentMatch && !/^FOR|^IF|^WHILE/i.test(t)) {
            let right = assignmentMatch[2].replace(/\bMOD\b/gi, '%').replace(/\bDIV\b/gi, '//');
            pyLines.push(getIndent() + `${assignmentMatch[1]} = ${right}`);
            continue;
        }

        pyLines.push(getIndent() + t);
    }
    return pyLines.join('\n');
  };

  // Custom execution wrapper handling student-friendly error translation
  const executeCode = async (codeToExecute, language) => {
    setIsSandboxExecuting(true);
    setSandboxOutput('');
    setSandboxError('');
    setSandboxErrorLine(null);
    setSandboxErrorMsg('');
    setIsStepModeActive(false);

    if (language === 'Java' || language === 'VB.NET') {
        setSandboxOutput(`${language} execution simulation in progress. Full compiler coming soon.\n\nSample Output:\nHello, Computer Science!\nIteration counter: 0\nIteration counter: 1\nIteration counter: 2`);
        setIsSandboxExecuting(false);
        return;
    }

    try {
        setIsPyodideLoading(true);
        let pyodideInstance = window.pyodideInstance;
        if (!pyodideInstance) {
          for (let i = 0; i < 50; i++) {
            if (typeof window.loadPyodide === "function") break;
            await new Promise(resolve => setTimeout(resolve, 100));
          }
          if (typeof window.loadPyodide !== "function") {
            throw new Error("Pyodide library script not loaded. Please wait a moment or check your connection.");
          }
          window.pyodideInstance = await window.loadPyodide();
          pyodideInstance = window.pyodideInstance;
        }
        setIsPyodideLoading(false);

        let finalCode = codeToExecute;
        if (language === 'Cambridge Pseudocode' || language === 'Pseudocode') {
            finalCode = translatePseudocodeToPython(codeToExecute);
        }

        const executionSetup = `
import sys
import time
from io import StringIO
import builtins
import js

sys.settrace(None)
sys.stdout = StringIO()
sys.stderr = StringIO()

def custom_input(prompt_text=""):
    res = js.prompt(prompt_text)
    if res is None:
        raise Exception("Input cancelled by user.")
    return res
builtins.input = custom_input

class TimeoutException(Exception):
    pass

global _exec_start_time
_exec_start_time = time.time()

def _trace_calls(frame, event, arg):
    if time.time() - _exec_start_time > 5:
        sys.settrace(None)
        raise TimeoutException("ExecutionTimeoutError: Code execution exceeded 5 seconds. Infinite loop detected.")
    return _trace_calls

sys.settrace(_trace_calls)
`;

        await pyodideInstance.runPythonAsync(executionSetup);
        await pyodideInstance.runPythonAsync(finalCode);
        
        let out = pyodideInstance.runPython("sys.stdout.getvalue()");
        let err = pyodideInstance.runPython("sys.stderr.getvalue()");

        if (out) setSandboxOutput(out);
        if (err) setSandboxError(err);
        
    } catch(err) {
        try {
            if(window.pyodideInstance) {
                let out = window.pyodideInstance.runPython("sys.stdout.getvalue()");
                if (out) setSandboxOutput(out);
            }
        } catch(e) {}
        
        // Custom Syntax & Error Handling parsing
        let errStr = err.toString();
        let extractedLine = null;
        
        const execMatches = [...errStr.matchAll(/File "<exec>", line (\d+)/g)];
        if (execMatches.length > 0) {
            extractedLine = parseInt(execMatches[execMatches.length - 1][1], 10);
        } else {
            const lineMatches = [...errStr.matchAll(/line (\d+)/g)];
            if (lineMatches.length > 0) {
                extractedLine = parseInt(lineMatches[lineMatches.length - 1][1], 10);
            }
        }

        const errLines = errStr.trim().split('\n');
        const extractedMsg = errLines[errLines.length - 1];

        setSandboxErrorLine(extractedLine);
        
        let friendlyMessage = "";
        if (language === 'Cambridge Pseudocode' || language === 'Pseudocode') {
            if (errStr.includes('SyntaxError')) {
                friendlyMessage = "💡 Examiner Tip: Syntax Error detected. Did you forget to close an IF/FOR/WHILE block with ENDIF/NEXT/ENDWHILE? Or check if you used '<-' for assignment.";
            } else if (errStr.includes('NameError')) {
                friendlyMessage = "💡 Examiner Tip: Variable missing. Did you initialize your variable before using it?";
            } else if (errStr.includes('IndentationError')) {
                friendlyMessage = "💡 Examiner Tip: Python-transpiled logic requires clean alignment. Ensure your loop and IF bodies are consistently indented.";
            } else {
                friendlyMessage = "💡 Examiner Tip: Check your logic against CAIE 9618 Pseudocode syntax rules.";
            }
        } else {
            if (errStr.includes('SyntaxError')) friendlyMessage = "💡 Tip: Check for missing colons, quotes, or parenthesis.";
            else if (errStr.includes('NameError')) friendlyMessage = "💡 Tip: You used a variable or function that hasn't been defined yet.";
        }
        
        setSandboxErrorMsg(`${extractedMsg}\n\n${friendlyMessage}`);
        
        let cleanErr = errStr.replace(/File "<exec>".*\n/g, '');
        setSandboxError(cleanErr);

    } finally {
        try {
            if (window.pyodideInstance) {
                window.pyodideInstance.runPython("import sys\nsys.settrace(None)");
            }
        } catch(e) {}
        setIsSandboxExecuting(false);
        setIsPyodideLoading(false);
    }
  };

  const handleSandboxStep = () => {
    setIsStepModeActive(true);
    executeCode(sandboxCodeText, sandboxLang);
  };

  const handleSandboxStop = () => {
    setIsSandboxExecuting(false);
    setIsStepModeActive(false);
    setSandboxErrorLine(null);
    setSandboxError("Execution forcefully halted by user.");
    try {
        if (window.pyodideInstance) {
            window.pyodideInstance.runPython(`
import sys
def _kill_trace(frame, event, arg):
    raise Exception("Halted by User")
sys.settrace(_kill_trace)
`);
        }
    } catch(e) {}
  };


  // --- TRANSLATOR LOGIC ---
  const translatePseudoToPythonLog = (code) => {
    let pythonLines = [];
    let steps = new Set();
    let indent = 0;
    const getInd = () => '    '.repeat(indent);

    code.split('\n').forEach(line => {
        let t = line.trim();
        if (!t) { pythonLines.push(''); return; }

        if (t.startsWith('//')) {
            pythonLines.push(getInd() + '#' + t.substring(2));
            steps.add("Converted '//' comments to '#' Python comments.");
            return;
        }

        if (/^OUTPUT\s+(.+)/i.test(t)) {
            let match = t.match(/^OUTPUT\s+(.+)/i)[1];
            pythonLines.push(getInd() + `print(${match})`);
            steps.add("Converted 'OUTPUT' statements to Python 'print()' functions.");
            return;
        }

        if (/^INPUT\s+(.+)/i.test(t)) {
            let match = t.match(/^INPUT\s+(.+)/i)[1];
            pythonLines.push(getInd() + `${match} = input()`);
            steps.add("Converted 'INPUT' statements to Python 'input()' assignments.");
            return;
        }

        let forMatch = t.match(/^FOR\s+([a-zA-Z0-9_]+)\s*(?:<-|=)\s*(.+?)\s+TO\s+(.+)/i);
        if (forMatch) {
            pythonLines.push(getInd() + `for ${forMatch[1]} in range(int(${forMatch[2]}), int(${forMatch[3]}) + 1):`);
            indent++;
            steps.add("Converted 'FOR ... TO' loop into Python 'for ... in range()' loop.");
            return;
        }

        if (/^NEXT/i.test(t) || /^ENDFOR/i.test(t)) {
            indent = Math.max(0, indent - 1);
            steps.add("Replaced block closing keywords (NEXT, ENDIF, etc.) with Python dedentation.");
            return;
        }

        let whileMatch = t.match(/^WHILE\s+(.+)/i);
        if (whileMatch) {
            let cond = whileMatch[1].replace(/\bAND\b/gi, 'and').replace(/\bOR\b/gi, 'or').replace(/\bNOT\b/gi, 'not').replace(/([^<>!=])=([^=])/g, '$1==$2');
            pythonLines.push(getInd() + `while ${cond}:`);
            indent++;
            steps.add("Converted 'WHILE' loops and translated boolean logic (AND/OR/NOT).");
            return;
        }
        if (/^ENDWHILE/i.test(t)) { indent = Math.max(0, indent - 1); return; }

        let ifMatch = t.match(/^IF\s+(.+?)\s+THEN/i);
        if (ifMatch) {
            let cond = ifMatch[1].replace(/\bAND\b/gi, 'and').replace(/\bOR\b/gi, 'or').replace(/\bNOT\b/gi, 'not').replace(/([^<>!=])=([^=])/g, '$1==$2');
            pythonLines.push(getInd() + `if ${cond}:`);
            indent++;
            steps.add("Converted 'IF ... THEN' into Python 'if:' conditions.");
            return;
        }
        if (/^ELSE/i.test(t)) {
            indent = Math.max(0, indent - 1);
            pythonLines.push(getInd() + `else:`);
            indent++;
            return;
        }
        if (/^ENDIF/i.test(t)) { indent = Math.max(0, indent - 1); return; }

        let assignMatch = t.match(/^([a-zA-Z0-9_]+(\[[^\]]+\])?)\s*(?:<-)\s*(.+)/);
        if (assignMatch) {
            let expr = assignMatch[3].replace(/\bMOD\b/gi, '%').replace(/\bDIV\b/gi, '//');
            pythonLines.push(getInd() + `${assignMatch[1]} = ${expr}`);
            steps.add("Converted pseudocode assignment '<-' to Python '='.");
            return;
        }

        pythonLines.push(getInd() + t);
    });

    return { code: pythonLines.join('\n'), steps: Array.from(steps) };
  };

  const translatePythonToPseudoLog = (code) => {
    let pseudoLines = [];
    let steps = new Set();
    let blockStack = [];

    let lines = code.split('\n');
    lines.forEach((line) => {
        let t = line.trim();
        let currentIndentMatch = line.match(/^(\s*)/);
        let currentIndent = currentIndentMatch ? currentIndentMatch[1].length : 0;

        while (blockStack.length > 0 && blockStack[blockStack.length - 1].indent >= currentIndent && t !== 'else:' && t !== 'elif') {
            let block = blockStack.pop();
            let getInd = () => ' '.repeat(block.indent);
            if (block.type === 'IF') pseudoLines.push(getInd() + 'ENDIF');
            else if (block.type === 'FOR') pseudoLines.push(getInd() + 'NEXT');
            else if (block.type === 'WHILE') pseudoLines.push(getInd() + 'ENDWHILE');
            else if (block.type === 'DEF') pseudoLines.push(getInd() + 'ENDPROCEDURE');
            steps.add("Detected Python dedentation and mapped to pseudocode block closers (ENDIF, NEXT).");
        }

        if (!t) { pseudoLines.push(''); return; }

        if (t.startsWith('#')) {
            pseudoLines.push(' '.repeat(currentIndent) + '//' + t.substring(1));
            return;
        }

        let printMatch = t.match(/^print\s*\(\s*(.*)\s*\)/);
        if (printMatch) {
            pseudoLines.push(' '.repeat(currentIndent) + `OUTPUT ${printMatch[1]}`);
            return;
        }

        let inputAssignMatch = t.match(/^([a-zA-Z0-9_]+)\s*=\s*input\s*\(\s*\)/);
        if (inputAssignMatch) {
            pseudoLines.push(' '.repeat(currentIndent) + `INPUT ${inputAssignMatch[1]}`);
            return;
        }

        let forMatch = t.match(/^for\s+([a-zA-Z0-9_]+)\s+in\s+range\s*\(\s*(.*?)\s*,\s*(.*?)\s*\)\s*:/);
        if (forMatch) {
            let endVal = forMatch[3];
            pseudoLines.push(' '.repeat(currentIndent) + `FOR ${forMatch[1]} <- ${forMatch[2]} TO ${endVal} - 1`);
            blockStack.push({ indent: currentIndent, type: 'FOR' });
            return;
        }

        let whileMatch = t.match(/^while\s+(.+)\s*:/);
        if (whileMatch) {
            let cond = whileMatch[1].replace(/\band\b/g, ' AND ').replace(/\bor\b/g, ' OR ').replace(/\bnot\b/g, 'NOT ').replace(/==/g, '=');
            pseudoLines.push(' '.repeat(currentIndent) + `WHILE ${cond}`);
            blockStack.push({ indent: currentIndent, type: 'WHILE' });
            return;
        }

        let ifMatch = t.match(/^if\s+(.+)\s*:/);
        if (ifMatch) {
            let cond = ifMatch[1].replace(/\band\b/g, ' AND ').replace(/\bor\b/g, ' OR ').replace(/\bnot\b/g, 'NOT ').replace(/==/g, '=');
            pseudoLines.push(' '.repeat(currentIndent) + `IF ${cond} THEN`);
            blockStack.push({ indent: currentIndent, type: 'IF' });
            return;
        }

        let assignMatch = t.match(/^([a-zA-Z0-9_]+(\[[^\]]+\])?)\s*=\s*(.+)/);
        if (assignMatch && !/^if|^while|^for/i.test(t)) {
            let expr = assignMatch[3].replace(/%/g, ' MOD ').replace(/\/\//g, ' DIV ');
            pseudoLines.push(' '.repeat(currentIndent) + `${assignMatch[1]} <- ${expr}`);
            return;
        }

        pseudoLines.push(' '.repeat(currentIndent) + t);
    });

    while (blockStack.length > 0) {
        let block = blockStack.pop();
        let getInd = () => ' '.repeat(block.indent);
        if (block.type === 'IF') pseudoLines.push(getInd() + 'ENDIF');
        else if (block.type === 'FOR') pseudoLines.push(getInd() + 'NEXT');
        else if (block.type === 'WHILE') pseudoLines.push(getInd() + 'ENDWHILE');
    }

    return { code: pseudoLines.join('\n'), steps: Array.from(steps) };
  };

  const handleTranslateCode = () => {
    setTransError('');
    
    if (isPseudoDirty && isPythonDirty) {
        setTransError("Please clear one of the windows before translating. Click the 'Clear' button on the side you want to overwrite.");
        return;
    }

    if (isPseudoDirty || (!isPseudoDirty && !isPythonDirty && transPseudo.trim() !== '')) {
        const result = translatePseudoToPythonLog(transPseudo);
        setTransPython(result.code);
        setTransSteps(result.steps);
        setIsPythonDirty(false); 
        if(result.steps.length === 0) setTransSteps(["Code copied. No specific syntax mappings were detected."]);
    } else if (isPythonDirty) {
        const result = translatePythonToPseudoLog(transPython);
        setTransPseudo(result.code);
        setTransSteps(result.steps);
        setIsPseudoDirty(false); 
        if(result.steps.length === 0) setTransSteps(["Code copied. No specific syntax mappings were detected."]);
    } else {
        setTransError("Both windows are empty. Please enter code to translate.");
    }
  };

  const handleClearPseudo = () => {
      setTransPseudo('');
      setIsPseudoDirty(false);
      setTransError('');
  };

  const handleClearPython = () => {
      setTransPython('');
      setIsPythonDirty(false);
      setTransError('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#ffffff] dark:bg-[#030213] text-[#030213] dark:text-[#ececf0] transition-colors duration-200">
      
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#030213]/80 border-b border-black/10 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentTab('home')}>
            <GraduationCap className="h-8 w-8 text-[#030213] dark:text-white" />
            <div>
              <span className="font-bold text-lg tracking-tight text-[#030213] dark:text-white">studyCS.online</span>
              <span className="ml-1 sm:ml-2 px-2 py-0.5 text-[10px] font-semibold bg-[#e9ebef] dark:bg-[#ececf0]/10 text-[#030213] dark:text-white rounded-full">IGCSE & A Level</span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => setCurrentTab('home')} 
              className={`text-sm font-medium transition-colors ${currentTab === 'home' ? 'text-[#030213] dark:text-white font-semibold' : 'text-[#717182] hover:text-[#030213] dark:hover:text-white'}`}
            >
              Home
            </button>
            <button 
              onClick={() => setCurrentTab('units')} 
              className={`text-sm font-medium transition-colors ${currentTab === 'units' ? 'text-[#030213] dark:text-white font-semibold' : 'text-[#717182] hover:text-[#030213] dark:hover:text-white'}`}
            >
              Units
            </button>
            <button 
              onClick={() => setCurrentTab('past-papers')} 
              className={`text-sm font-medium transition-colors ${currentTab === 'past-papers' ? 'text-[#030213] dark:text-white font-semibold' : 'text-[#717182] hover:text-[#030213] dark:hover:text-white'}`}
            >
              Past Papers
            </button>
            <button 
              onClick={() => setCurrentTab('blog')} 
              className={`text-sm font-medium transition-colors ${currentTab === 'blog' ? 'text-[#030213] dark:text-white font-semibold' : 'text-[#717182] hover:text-[#030213] dark:hover:text-white'}`}
            >
              Blog
            </button>
            <button 
              onClick={() => setCurrentTab('contact')} 
              className={`text-sm font-medium transition-colors ${currentTab === 'contact' ? 'text-[#030213] dark:text-white font-semibold' : 'text-[#717182] hover:text-[#030213] dark:hover:text-white'}`}
            >
              Contact
            </button>
          </nav>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentTab('units')}
              className="hidden sm:inline-block bg-[#030213] dark:bg-white text-white dark:text-[#030213] px-4 py-2 rounded-lg text-xs font-semibold hover:opacity-90 transition-all shadow-sm"
            >
              Explore Units
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#030213] dark:text-white hover:bg-black/5 dark:hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-b border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#030213]/95 backdrop-blur-md animate-fade-in z-50 absolute w-full">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <button 
                onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${currentTab === 'home' ? 'bg-black/5 dark:bg-white/5 text-[#030213] dark:text-white' : 'text-[#717182] hover:text-[#030213] dark:hover:text-white'}`}
              >
                Home
              </button>
              <button 
                onClick={() => { setCurrentTab('units'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${currentTab === 'units' ? 'bg-black/5 dark:bg-white/5 text-[#030213] dark:text-white' : 'text-[#717182] hover:text-[#030213] dark:hover:text-white'}`}
              >
                Units
              </button>
              <button 
                onClick={() => { setCurrentTab('past-papers'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${currentTab === 'past-papers' ? 'bg-black/5 dark:bg-white/5 text-[#030213] dark:text-white' : 'text-[#717182] hover:text-[#030213] dark:hover:text-white'}`}
              >
                Past Papers
              </button>
              <button 
                onClick={() => { setCurrentTab('blog'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${currentTab === 'blog' ? 'bg-black/5 dark:bg-white/5 text-[#030213] dark:text-white' : 'text-[#717182] hover:text-[#030213] dark:hover:text-white'}`}
              >
                Blog
              </button>
              <button 
                onClick={() => { setCurrentTab('contact'); setMobileMenuOpen(false); }}
                className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold transition-colors ${currentTab === 'contact' ? 'bg-black/5 dark:bg-white/5 text-[#030213] dark:text-white' : 'text-[#717182] hover:text-[#030213] dark:hover:text-white'}`}
              >
                Contact
              </button>
              <div className="pt-3 border-t border-black/10 dark:border-white/10">
                <button 
                  onClick={() => { setCurrentTab('units'); setMobileMenuOpen(false); }}
                  className="w-full bg-[#030213] dark:bg-white text-white dark:text-[#030213] py-2.5 rounded-lg text-xs font-semibold text-center hover:opacity-95 shadow-sm"
                >
                  Explore All Units
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full relative z-10 pt-24">
        
        {/* ==================== HOME PAGE ==================== */}
        {currentTab === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <div className="text-center space-y-6 py-8">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e9ebef] dark:bg-[#ececf0]/10 text-[#030213] dark:text-white">
                <Sparkles className="h-3 w-3 text-amber-500" /> Complete Exam preparation platform
              </span>
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none bg-gradient-to-r from-[#030213] via-[#4d4a75] to-[#030213] dark:from-white dark:via-[#9ba4b5] dark:to-white bg-clip-text text-transparent">
                Master Computer Science <br />IGCSE & A Level
              </h1>
              <p className="text-[#717182] dark:text-[#717182] text-lg sm:text-xl max-w-2xl mx-auto">
                Comprehensive study notes, interactive simulators, live code environments, and AI-powered tutor queries optimized for top grades.
              </p>
              <div className="flex flex-wrap justify-center gap-4 pt-4">
                <button 
                  onClick={() => setCurrentTab('units')}
                  className="bg-[#030213] dark:bg-white text-white dark:text-[#030213] px-6 py-3 rounded-xl font-semibold text-sm hover:opacity-95 transition-all flex items-center gap-2 shadow-md"
                >
                  Start Studying <ArrowRight className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => setCurrentTab('units')}
                  className="bg-[#e9ebef] dark:bg-white/5 border border-black/10 dark:border-white/10 text-[#030213] dark:text-white px-6 py-3 rounded-xl font-semibold text-sm hover:bg-[#e1e3e8] dark:hover:bg-white/10 transition-all"
                >
                  View Specifications
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
              <div className="p-4 bg-white dark:bg-[#030213]/40 border border-black/5 dark:border-white/5 rounded-xl text-center">
                <div className="text-2xl font-black text-[#030213] dark:text-white">100%</div>
                <div className="text-xs text-[#717182]">Syllabus Matching</div>
              </div>
              <div className="p-4 bg-white dark:bg-[#030213]/40 border border-black/5 dark:border-white/5 rounded-xl text-center">
                <div className="text-2xl font-black text-[#030213] dark:text-white">28+</div>
                <div className="text-xs text-[#717182]">Structured Units</div>
              </div>
              <div className="p-4 bg-white dark:bg-[#030213]/40 border border-black/5 dark:border-white/5 rounded-xl text-center">
                <div className="text-2xl font-black text-[#030213] dark:text-white">500+</div>
                <div className="text-xs text-[#717182]">Practice Questions</div>
              </div>
              <div className="p-4 bg-white dark:bg-[#030213]/40 border border-black/5 dark:border-white/5 rounded-xl text-center">
                <div className="text-2xl font-black text-[#030213] dark:text-white">Interactive</div>
                <div className="text-xs text-[#717182]">IDE & AI Assistant</div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black tracking-tight text-[#030213] dark:text-white">Everything You Need to Succeed</h2>
                <p className="text-[#717182] text-sm">Professional prep assets tailored for Cambridge & Edexcel specifications.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#030213] dark:hover:border-white/30 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="p-3 bg-[#e9ebef] dark:bg-white/5 rounded-xl w-fit text-[#030213] dark:text-white group-hover:scale-110 transition-transform">
                      <BookOpen className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg text-[#030213] dark:text-white">Study Notes</h3>
                    <p className="text-[#717182] text-sm leading-relaxed">
                      Every topic broken down into bite-sized, syllabus matching study notes.
                    </p>
                  </div>
                  <button onClick={() => setCurrentTab('units')} className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#030213] dark:text-white hover:underline pt-2">
                    Open notes <ChevronRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#030213] dark:hover:border-white/30 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="p-3 bg-[#e9ebef] dark:bg-white/5 rounded-xl w-fit text-[#030213] dark:text-white group-hover:scale-110 transition-transform">
                      <CheckCircle className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg text-[#030213] dark:text-white">Exercises & Answers</h3>
                    <p className="text-[#717182] text-sm leading-relaxed">
                      Downloadable practice questions to test your understanding.
                    </p>
                  </div>
                  <button onClick={() => setCurrentTab('units')} className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#030213] dark:text-white hover:underline pt-2">
                    Get exercises <ChevronRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#030213] dark:hover:border-white/30 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="p-3 bg-[#e9ebef] dark:bg-white/5 rounded-xl w-fit text-[#030213] dark:text-white group-hover:scale-110 transition-transform">
                      <FileText className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg text-[#030213] dark:text-white">Past Papers</h3>
                    <p className="text-[#717182] text-sm leading-relaxed">
                      All the past papers sorted chronologically with their corresponding mark schemes.
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-xs text-[#717182] pt-2">
                    Available in units section
                  </span>
                </div>

                <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#030213] dark:hover:border-white/30 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="p-3 bg-[#e9ebef] dark:bg-white/5 rounded-xl w-fit text-[#030213] dark:text-white group-hover:scale-110 transition-transform">
                      <Award className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg text-[#030213] dark:text-white">Model Exams with Solutions</h3>
                    <p className="text-[#717182] text-sm leading-relaxed">
                      Realistic exam-style questions with worked solutions.
                    </p>
                  </div>
                  <span className="mt-6 inline-flex items-center gap-1 text-xs text-[#717182] pt-2">
                    Solutions included
                  </span>
                </div>

                <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#030213] dark:hover:border-white/30 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="p-3 bg-[#e9ebef] dark:bg-white/5 rounded-xl w-fit text-[#030213] dark:text-white group-hover:scale-110 transition-transform">
                      <Layers className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg text-[#030213] dark:text-white">Further Materials</h3>
                    <p className="text-[#717182] text-sm leading-relaxed">
                      Quick quizzes, flashcards, and revision checklists.
                    </p>
                  </div>
                  <button onClick={() => setCurrentTab('units')} className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#030213] dark:text-white hover:underline pt-2">
                    Review flashcards <ChevronRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="p-6 bg-white dark:bg-white/5 rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#030213] dark:hover:border-white/30 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="p-3 bg-[#e9ebef] dark:bg-white/5 rounded-xl w-fit text-[#030213] dark:text-white group-hover:scale-110 transition-transform">
                      <Brain className="h-6 w-6" />
                    </div>
                    <h3 className="font-bold text-lg text-[#030213] dark:text-white">Exam Strategies</h3>
                    <p className="text-[#717182] text-sm leading-relaxed">
                      Learn exactly what examiners look for and how to avoid common mistakes.
                    </p>
                  </div>
                  <button onClick={() => setCurrentTab('units')} className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#030213] dark:text-white hover:underline pt-2">
                    Check strategies <ChevronRight className="h-3 w-3" />
                  </button>
                </div>

                <div className="p-6 bg-gradient-to-br from-white to-[#f3f3f5] dark:from-white/5 dark:to-[#030213] rounded-2xl border-2 border-[#030213]/20 dark:border-white/20 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-[#030213] text-white dark:bg-white dark:text-[#030213] rounded-xl w-fit">
                        <Terminal className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-bold bg-[#030213] text-white px-2 py-0.5 rounded-full">INTERACTIVE</span>
                    </div>
                    <h3 className="font-bold text-lg text-[#030213] dark:text-white">Online IDE</h3>
                    <p className="text-[#717182] text-sm leading-relaxed">
                      Practice Python, Pseudocode and SQL with our online code editors.
                    </p>
                  </div>
                  <span className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#717182] pt-2">
                    SOON
                  </span>
                </div>

                <div className="p-6 bg-gradient-to-br from-white to-[#f3f3f5] dark:from-white/5 dark:to-[#030213] rounded-2xl border-2 border-[#030213]/20 dark:border-white/20 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-indigo-600 text-white rounded-xl w-fit">
                        <Sparkles className="h-6 w-6" />
                      </div>
                      <span className="text-[10px] font-bold bg-[#030213] text-white px-2 py-0.5 rounded-full">INTERACTIVE</span>
                    </div>
                    <h3 className="font-bold text-lg text-[#030213] dark:text-white">AI Study Assistant</h3>
                    <p className="text-[#717182] text-sm leading-relaxed">
                      Ask questions about any syllabus topic and get clear, exam-focused explanations instantly.
                    </p>
                  </div>
                  <span className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-[#717182] pt-2">
                    SOON
                  </span>
                </div>

              </div>
            </div>

            <div className="p-6 sm:p-8 bg-[#e9ebef] dark:bg-[#ececf0]/5 rounded-3xl border border-black/5 dark:border-white/5 space-y-8">
              <div className="max-w-3xl space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#030213] dark:text-white">
                  Computer Science IGCSE & A Level – All topics covered
                </h2>
                <p className="text-[#717182] text-sm leading-relaxed">
                  Every concept specified by major examination boards is thoroughly indexed, simplified, and mapped inside our revision pathways. Select a topic inside our units list to get targeted past paper booklets.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {TOPICS.map((topic, idx) => (
                  <div 
                    key={idx}
                    className="p-4 bg-white dark:bg-[#030213] border border-black/10 dark:border-white/10 rounded-2xl hover:shadow-sm transition-all"
                  >
                    <div className="text-xl mb-1">{topic.emoji}</div>
                    <h4 className="font-bold text-sm text-[#030213] dark:text-white">{topic.name}</h4>
                    <p className="text-[11px] text-[#717182] mt-1 line-clamp-2">{topic.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex justify-start">
                <button 
                  onClick={() => setCurrentTab('units')}
                  className="bg-[#030213] dark:bg-white text-white dark:text-[#030213] px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 flex items-center gap-2 group transition-all"
                >
                  Explore Resources 
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="space-y-6 pt-6 border-t border-black/10 dark:border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[#717182] uppercase tracking-widest block">From our publication</span>
                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#030213] dark:text-white font-sans">Expert Computer Science Blog</h2>
                </div>
                <button 
                  onClick={() => setCurrentTab('blog')}
                  className="inline-flex items-center gap-2 font-bold text-sm text-[#030213] dark:text-white hover:underline"
                >
                  Visit our full Blog <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {BLOG_POSTS.map((post) => (
                  <div 
                    key={post.id} 
                    className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 rounded-2xl flex flex-col justify-between hover:border-[#030213] dark:hover:border-white/30 transition-all cursor-pointer"
                    onClick={() => {
                      setActiveBlogArticle(post);
                      setCurrentTab('blog');
                    }}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-[#717182]">
                        <span className="font-semibold px-2 py-0.5 bg-[#ececf0] dark:bg-white/10 text-[#030213] dark:text-white rounded-md">{post.category}</span>
                        <span>{post.date}</span>
                      </div>
                      <h3 className="font-bold text-base text-[#030213] dark:text-white group-hover:underline line-clamp-2">{post.title}</h3>
                      <p className="text-[#717182] text-xs leading-relaxed line-clamp-3">{post.excerpt}</p>
                    </div>
                    <div className="pt-4 flex items-center gap-1 text-xs font-bold text-[#030213] dark:text-white">
                      Read analysis <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 sm:p-12 bg-gradient-to-br from-[#f3f3f5] to-white dark:from-[#ececf0]/5 dark:to-[#030213] rounded-3xl border border-black/10 dark:border-white/10 space-y-8">
              <div className="max-w-3xl space-y-2">
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest block">Got Questions?</span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#030213] dark:text-white font-sans">Get in Touch with studyCS.online</h2>
                <p className="text-[#717182] text-xs sm:text-sm">
                  Whether you are seeking advice on curriculum matching, looking for resources, or reporting a bug, fill out our quick contact form and our educators will reach out.
                </p>
              </div>

              {homeContactSubmitted ? (
                <div className="p-6 bg-green-500/10 border border-green-500/20 text-green-600 rounded-2xl text-center space-y-3">
                  <CheckCircle className="h-10 w-10 mx-auto text-green-500 animate-bounce" />
                  <h3 className="font-bold text-lg">Thank you, {homeContactName}!</h3>
                  <p className="text-xs max-w-md mx-auto">Your inquiry has been successfully transmitted. Our academic moderators will reply to <strong>{homeContactEmail}</strong> within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleHomeContactSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#717182] uppercase tracking-wider block">Full Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#717182]" />
                        <input 
                          type="text" 
                          required
                          value={homeContactName}
                          onChange={(e) => setHomeContactName(e.target.value)}
                          placeholder="Alan Turing"
                          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#030213] text-xs text-[#030213] dark:text-white border border-black/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#030213] dark:focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#717182] uppercase tracking-wider block">Email Address</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#717182]" />
                        <input 
                          type="email" 
                          required
                          value={homeContactEmail}
                          onChange={(e) => setHomeContactEmail(e.target.value)}
                          placeholder="alan@turing-institute.org"
                          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#030213] text-xs text-[#030213] dark:text-white border border-black/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#030213] dark:focus:border-white transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 flex flex-col justify-between">
                    <div className="space-y-1.5 flex-grow">
                      <label className="text-[11px] font-bold text-[#717182] uppercase tracking-wider block">Your Message</label>
                      <div className="relative h-full">
                        <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-[#717182]" />
                        <textarea 
                          required
                          value={homeContactMessage}
                          onChange={(e) => setHomeContactMessage(e.target.value)}
                          placeholder="Write your syllabus question, suggestions, or comments here..."
                          className="w-full pl-10 pr-4 py-3 h-28 md:h-32 bg-white dark:bg-[#030213] text-xs text-[#030213] dark:text-white border border-black/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#030213] dark:focus:border-white transition-colors"
                          style={{ resize: 'none' }}
                        />
                      </div>
                    </div>

                    <button 
                      type="submit"
                      className="w-full bg-[#030213] dark:bg-white text-white dark:text-[#030213] py-3 rounded-xl text-xs font-bold hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-sm"
                    >
                      <Send className="h-3.5 w-3.5" /> Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="bg-[#030213] text-white p-8 sm:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-[#030213] pointer-events-none"></div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight relative z-10 font-sans">Ready to start scoring top grades?</h2>
              <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base relative z-10">
                Join thousands of Computer Science IAL and IGCSE students preparing for their examinations with our interactive toolkits.
              </p>
              <div className="flex justify-center gap-4 relative z-10">
                <button 
                  onClick={() => setCurrentTab('units')}
                  className="bg-white text-[#030213] px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all"
                >
                  Explore Resources
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ==================== PAST PAPERS PAGE ==================== */}
        {currentTab === 'past-papers' && (
          <div className="space-y-16 animate-fade-in max-w-5xl mx-auto py-8 md:py-16">
            
            <div className="text-center space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e9ebef] dark:bg-[#ececf0]/10 text-[#030213] dark:text-white">
                <FileText className="h-3.5 w-3.5" /> Exam Preparation
              </span>
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#030213] dark:text-white font-sans">
                Past Papers – Computer Science IGCSE & A Level
              </h1>
              <p className="text-[#717182] text-lg max-w-2xl mx-auto">
                Practise with real Cambridge exams, organised by session, paper and variant.
              </p>
              <p className="text-[#717182] text-base max-w-3xl mx-auto leading-relaxed">
                Here you’ll find a complete collection of Computer Science past papers, ready to download. Use them to get familiar with the question formats, track your progress and walk into your exam without surprises.
              </p>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl sm:text-3xl font-black text-center text-[#030213] dark:text-white font-sans">Why past papers are your best study tool</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-6 shadow-sm text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-indigo-50 dark:bg-indigo-500/10 rounded-full flex items-center justify-center">
                    <BookOpen className="h-6 w-6 text-indigo-500" />
                  </div>
                  <h3 className="font-bold text-lg text-[#030213] dark:text-white">Familiarity with the format</h3>
                  <p className="text-sm text-[#717182]">Get used to the structure, phrasing and timing of the real exams.</p>
                </div>
                <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-6 shadow-sm text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-amber-50 dark:bg-amber-500/10 rounded-full flex items-center justify-center">
                    <Search className="h-6 w-6 text-amber-500" />
                  </div>
                  <h3 className="font-bold text-lg text-[#030213] dark:text-white">Identify knowledge gaps</h3>
                  <p className="text-sm text-[#717182]">Discover which topics need more revision before the actual test.</p>
                </div>
                <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-6 shadow-sm text-center space-y-4">
                  <div className="mx-auto w-12 h-12 bg-emerald-50 dark:bg-emerald-500/10 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-emerald-500" />
                  </div>
                  <h3 className="font-bold text-lg text-[#030213] dark:text-white">Learn the mark scheme</h3>
                  <p className="text-sm text-[#717182]">Understand exactly what examiners are looking for to award full marks.</p>
                </div>
              </div>
            </div>

            <div className="pt-8">
               <h2 className="text-2xl sm:text-3xl font-black text-center text-[#030213] dark:text-white font-sans mb-8">Repository</h2>
               <PastPapersTable />
            </div>

            <div className="bg-gradient-to-br from-[#f3f3f5] to-white dark:from-white/5 dark:to-[#030213] border border-black/10 dark:border-white/10 p-8 sm:p-12 rounded-3xl text-center space-y-6">
              <h2 className="text-2xl sm:text-3xl font-black text-[#030213] dark:text-white font-sans">Start practising now</h2>
              <p className="text-[#717182] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
                Don’t wait until the exam date is just around the corner. Choose a session, download your first past paper and see for yourself how your performance improves. Practice makes progress, and each paper you complete brings you one step closer to the grade you want.
              </p>
              <button 
                onClick={() => {
                  document.getElementById('past-papers-table')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 bg-[#030213] dark:bg-white text-white dark:text-[#030213] px-8 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-sm"
              >
                Explore Past Papers <ArrowUp className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-8 pt-8">
              <h2 className="text-2xl sm:text-3xl font-black text-center text-[#030213] dark:text-white font-sans">Common questions</h2>
              <FAQAccordion />
            </div>

            <div className="bg-[#030213] text-white p-8 sm:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden mt-16">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Mail className="h-32 w-32" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight relative z-10 font-sans">Don't miss new past papers</h2>
              <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base relative z-10">
                Leave your email and we will notify you as soon as a new exam session is added or when we publish a new downloadable resource. Plus, we’ll send you weekly exam tips.
              </p>
              <form 
                onSubmit={(e) => { e.preventDefault(); alert("Thanks for subscribing!"); }} 
                className="flex flex-col sm:flex-row justify-center gap-3 relative z-10 max-w-md mx-auto pt-4"
              >
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  required
                  className="flex-grow px-4 py-3 rounded-xl text-[#030213] text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold text-sm transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </form>
            </div>

          </div>
        )}

        {/* ==================== BLOG PAGE ==================== */}
        {currentTab === 'blog' && (
          <div className="space-y-8 animate-fade-in">
            {activeBlogArticle ? (
              <div className="space-y-6 max-w-3xl mx-auto">
                <button 
                  onClick={() => setActiveBlogArticle(null)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#030213] dark:text-white hover:underline"
                >
                  <ArrowLeft className="h-3 w-3" /> Back to blog list
                </button>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs text-[#717182]">
                    <span className="font-semibold px-2 py-0.5 bg-[#ececf0] dark:bg-white/10 text-[#030213] dark:text-white rounded-md">{activeBlogArticle.category}</span>
                    <span>{activeBlogArticle.date}</span>
                    <span>•</span>
                    <span>{activeBlogArticle.readTime}</span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-[#030213] dark:text-white leading-tight font-sans">
                    {activeBlogArticle.title}
                  </h1>
                  <span className="text-xs text-[#717182] block">Written by {activeBlogArticle.author}</span>
                </div>

                <div className="prose prose-slate dark:prose-invert text-xs sm:text-sm text-[#717182] dark:text-slate-300 leading-relaxed space-y-4 pt-4 border-t border-black/10 dark:border-white/10">
                  <p className="font-semibold text-slate-800 dark:text-white text-sm sm:text-base">{activeBlogArticle.excerpt}</p>
                  <p>{activeBlogArticle.content}</p>
                  <p>In upcoming examinations, always keep reference equations and definitions handy. Review our downloadable syllabus checklists to match articles to specific assessment codes.</p>
                </div>

                <div className="bg-[#f3f3f5] dark:bg-white/5 p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-4 mt-12">
                  <h3 className="font-bold text-sm text-[#030213] dark:text-white">Ask a question about this topic</h3>
                  <textarea 
                    placeholder="Ask a question or share thoughts with other students..."
                    className="w-full text-xs p-3 border border-black/10 dark:border-white/10 rounded-xl bg-white dark:bg-[#030213] text-[#030213] dark:text-white h-20 focus:outline-none"
                  />
                  <button 
                    onClick={() => handleAiPromptClick(`Explain topic of: ${activeBlogArticle.title}`)}
                    className="bg-[#030213] dark:bg-white text-white dark:text-[#030213] text-xs font-bold px-4 py-2 rounded-lg"
                  >
                    Post Question to AI Tutor
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-12">
                <div className="space-y-4 max-w-3xl">
                  <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#030213] dark:text-white font-sans">Computer Science Publication</h1>
                  <p className="text-[#717182] text-sm sm:text-base leading-relaxed">
                    Read analysis, coding tutorials, hardware deep-dives, and examination methodologies composed by experienced CS examiners and academics.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {BLOG_POSTS.map((post) => (
                    <article 
                      key={post.id}
                      onClick={() => setActiveBlogArticle(post)}
                      className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden p-6 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
                    >
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-xs text-[#717182]">
                          <span className="font-semibold px-2.5 py-0.5 bg-[#ececf0] dark:bg-white/10 text-[#030213] dark:text-white rounded-md">{post.category}</span>
                          <span>{post.date}</span>
                        </div>
                        <h3 className="font-extrabold text-lg text-[#030213] dark:text-white hover:underline leading-snug">
                          {post.title}
                        </h3>
                        <p className="text-xs text-[#717182] leading-relaxed line-clamp-4">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-black/5 dark:border-white/5 mt-6 flex items-center justify-between text-xs text-[#717182]">
                        <span>Written by {post.author}</span>
                        <span className="font-bold text-[#030213] dark:text-white hover:underline flex items-center gap-1">Read article <ChevronRight className="h-3 w-3" /></span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ==================== CONTACT PAGE ==================== */}
        {currentTab === 'contact' && (
          <div className="space-y-12 animate-fade-in max-w-4xl mx-auto">
            <div className="space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#e9ebef] dark:bg-[#ececf0]/10 text-[#030213] dark:text-white">
                <Info className="h-3.5 w-3.5" /> Support Center
              </span>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-[#030213] dark:text-white font-sans">
                Contact & About studyCS.online
              </h1>
              <p className="text-[#717182] text-sm sm:text-base leading-relaxed">
                Learn more about our educational mission and get in touch with our team of computer science educators, developers, and syllabus experts.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch font-sans">
              <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 p-6 sm:p-8 rounded-3xl space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="font-black text-xl text-[#030213] dark:text-white flex items-center gap-2 font-sans">
                    <GraduationCap className="h-6 w-6 text-[#030213] dark:text-white" /> Our Mission
                  </h3>
                  <p className="text-[#717182] text-xs sm:text-sm leading-relaxed">
                    studyCS.online was built by a collective of educators, researchers, and professional developers to bridge the gap between abstract textbook theories and practical examination targets. 
                  </p>
                  <p className="text-[#717182] text-xs sm:text-sm leading-relaxed">
                    By combining syllabus-matched study guides with live runtime compilers and interactive logic analyzers, we empower students sitting Cambridge (CIE) and Pearson Edexcel examinations to achieve grade-A results globally.
                  </p>
                </div>

                <div className="p-4 bg-[#f3f3f5] dark:bg-white/5 rounded-2xl text-xs space-y-1">
                  <span className="font-bold text-[#030213] dark:text-white">Target Specifications Covered:</span>
                  <ul className="text-[#717182] list-disc list-inside space-y-1 mt-1">
                    <li>Cambridge IGCSE Computer Science (0478)</li>
                    <li>Cambridge International AS & A Level (9618)</li>
                    <li>Edexcel International GCSE Computer Science (4CP2)</li>
                    <li>Edexcel International AS & A Level (YCP01)</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4 flex flex-col justify-between">
                <div className="p-6 bg-[#030213] text-white rounded-3xl space-y-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Brain className="h-32 w-32" />
                  </div>
                  <h3 className="font-bold text-lg">💡 Frequently Asked Questions</h3>
                  <div className="space-y-3 text-xs text-slate-300 font-sans">
                    <div>
                      <span className="font-bold text-white block">Are solutions standard?</span>
                      <p>Yes, all study booklet and practice answers conform strictly to standard high-level pseudocode and Python paradigms.</p>
                    </div>
                    <div>
                      <span className="font-bold text-white block">Do you plan to release full SQL compilers?</span>
                      <p>Absolutely. Relational algebra visualizers and interactive mock SQL environments are entering active beta testing soon!</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl space-y-3">
                  <h4 className="font-bold text-sm text-[#030213] dark:text-white">📧 Direct Academic Inquiries</h4>
                  <p className="text-[#717182] text-xs leading-relaxed">
                    If you are an educator or school looking for bulk resource printing, premium school licenses, or physical syllabi checkbooks, contact us directly at:
                  </p>
                  <span className="font-mono text-xs font-bold text-indigo-500 block break-all">syllabus-team@studycs.online</span>
                </div>
              </div>
            </div>

            <div className="bg-[#f3f3f5] dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-6 sm:p-10 space-y-8">
              <div className="space-y-2">
                <h3 className="font-black text-xl text-[#030213] dark:text-white font-sans">Submit a Detailed Inquiry</h3>
                <p className="text-[#717182] text-xs sm:text-sm">
                  Complete the secure form below to categorize your inquiry. Your message is dispatched instantly to the appropriate curriculum lead.
                </p>
              </div>

              {pageContactSubmitted ? (
                <div className="p-8 bg-green-500/10 border border-green-500/20 text-green-600 rounded-2xl text-center space-y-4 animate-fade-in">
                  <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
                  <h3 className="font-black text-xl">Message Securely Transmitted!</h3>
                  <p className="text-xs max-w-lg mx-auto">
                    Hi <strong>{pageContactName}</strong>, your query regarding <strong>"{pageContactCategory}"</strong> has been logged. Our development and support desk has been flagged. A comprehensive review response will be sent to <strong>{pageContactEmail}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePageContactSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#717182] uppercase tracking-wider block">Your Name</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#717182]" />
                        <input 
                          type="text" 
                          required
                          value={pageContactName}
                          onChange={(e) => setPageContactName(e.target.value)}
                          placeholder="Grace Hopper"
                          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#030213] text-xs text-[#030213] dark:text-white border border-black/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#030213] dark:focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#717182] uppercase tracking-wider block">Your Email</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#717182]" />
                        <input 
                          type="email" 
                          required
                          value={pageContactEmail}
                          onChange={(e) => setPageContactEmail(e.target.value)}
                          placeholder="grace@hopper.org"
                          className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-[#030213] text-xs text-[#030213] dark:text-white border border-black/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#030213] dark:focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-[#717182] uppercase tracking-wider block">Category</label>
                      <select 
                        value={pageContactCategory}
                        onChange={(e) => setPageContactCategory(e.target.value)}
                        className="w-full px-3 py-2.5 bg-white dark:bg-[#030213] text-xs text-[#030213] dark:text-white border border-black/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#030213] dark:focus:border-white transition-colors"
                      >
                        <option value="Syllabus inquiry">Syllabus inquiry</option>
                        <option value="Resource download issue">Resource download issue</option>
                        <option value="Bug / Compiler error report">Bug / Compiler error report</option>
                        <option value="Educator partnerships">Educator partnerships</option>
                        <option value="General question">General question</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-[#717182] uppercase tracking-wider block">Detailed Message</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-[#717182]" />
                      <textarea 
                        required
                        value={pageContactMessage}
                        onChange={(e) => setPageContactMessage(e.target.value)}
                        placeholder="Please describe your message with clear context, mentioning syllabus codes (0478, 9618, etc) if relevant..."
                        className="w-full pl-10 pr-4 py-3 h-32 bg-white dark:bg-[#030213] text-xs text-[#030213] dark:text-white border border-black/10 dark:border-white/10 rounded-xl focus:outline-none focus:border-[#030213] dark:focus:border-white transition-colors"
                        style={{ resize: 'none' }}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="bg-[#030213] dark:bg-white text-white dark:text-[#030213] py-3 px-8 rounded-xl text-xs font-bold hover:opacity-90 transition-all flex items-center gap-2 shadow-sm ml-auto"
                  >
                    <Send className="h-3.5 w-3.5" /> Submit Secure Ticket
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </main>

      <footer className="bg-white dark:bg-[#030213] border-t border-black/10 dark:border-white/10 py-12 mt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-[#030213] dark:text-white" />
            <span className="font-bold text-sm text-[#030213] dark:text-white">studyCS.online © 2026</span>
          </div>

          <div className="flex flex-wrap gap-4 sm:gap-6 text-xs text-[#717182] justify-center">
            <button onClick={() => setCurrentTab('home')} className="hover:text-[#030213] dark:hover:text-white">Home</button>
            <button onClick={() => setCurrentTab('units')} className="hover:text-[#030213] dark:hover:text-white">Units</button>
            <button onClick={() => setCurrentTab('past-papers')} className="hover:text-[#030213] dark:hover:text-white">Past Papers</button>
            <button onClick={() => setCurrentTab('blog')} className="hover:text-[#030213] dark:hover:text-white">Blog</button>
            <button onClick={() => setCurrentTab('contact')} className="hover:text-[#030213] dark:hover:text-white">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
