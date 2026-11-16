// Gemini AI wrapper & Intelligent Technical Evaluation Engine
// Supports dynamic topic selection, difficulty tiers, voice prompts, and rich fallback data

export const TOPIC_BANK = {
  dsa: {
    name: 'Data Structures & Algorithms',
    icon: '⚡',
    questions: {
      Easy: [
        'Array aur Linked List me memory allocation aur time complexity ka kya antar hai? Kab kaunsa use karna chahiye?',
        'Stack aur Queue me fundamental difference kya hai? Real-world applications ke saath LIFO aur FIFO samjhao.',
        'Binary Search kaise kaam karta hai? Iski time complexity O(log N) kyu hoti hai aur array sorted kyu hona chahiye?',
        'String reverse karne ke different approaches kya hain (Two Pointer vs Extra Space)? Time aur space complexity compare karo.',
        'Hash Map / Hash Table me collision kya hota hai? Chaining aur Open Addressing kaise solve karte hain?'
      ],
      Medium: [
        'Binary Search Tree (BST) me insertion aur searching ki average vs worst-case time complexity kya hoti hai? BST unbalance kab hota hai?',
        'Detect loop in a Linked List: Floyd\'s Cycle-Finding Algorithm (slow & fast pointer) ka logic step-by-step samjhao.',
        'Merge Sort aur Quick Sort me kya antar hai? Quick Sort in-practice fast kyu hota hai aur worst case O(N²) kab hota hai?',
        'Breadth First Search (BFS) aur Depth First Search (DFS) me graph traversal ke time kab kaunsa algorithm prefer karoge?',
        'Dynamic Programming vs Divide & Conquer: Overlapping subproblems aur Optimal substructure ka concept Fibonacci ya Knapsack se samjhao.'
      ],
      Hard: [
        'LRU (Least Recently Used) Cache ko O(1) time me get aur put karne ke liye kaunse data structures use hote hain aur kaise?',
        'Trie (Prefix Tree) data structure ka architecture samjhao. Auto-complete aur spell-checker me ye Hash Map se better kyu hai?',
        'Dijkstra\'s Shortest Path Algorithm me Priority Queue / Min-Heap ka role kya hai? Negative weights ke liye ye fail kyu hota hai?',
        'Sliding Window Maximum problem (size K) ko O(N) time complexity me Deque (Double Ended Queue) se kaise solve karenge?',
        'Topological Sort kya hota hai? Directed Acyclic Graph (DAG) me Course Schedule dependency resolve karne ke liye Kahn\'s Algorithm samjhao.'
      ]
    }
  },
  javascript: {
    name: 'JavaScript & React',
    icon: '⚛️',
    questions: {
      Easy: [
        'JavaScript me `var`, `let`, aur `const` me scoping aur hoisting ke hisaab se kya difference hai?',
        'React me `useState` aur `useEffect` hooks ka basic purpose kya hai? Ek simple counter example ke saath samjhao.',
        'JavaScript me `==` (loose equality) aur `===` (strict equality) me type coercion kaise work karta hai?',
        'Synchronous aur Asynchronous JavaScript me kya difference hai? Callbacks kyu introduce huye the?',
        'React component lifecycle me mounting, updating aur unmounting kya hote hain?'
      ],
      Medium: [
        'JavaScript Event Loop samjhao: Call Stack, Web APIs, Microtask Queue (Promises), aur Macrotask Queue (setTimeout) ka execution order kya hota hai?',
        'JavaScript Closures kya hain? Data privacy / encapsulation ke liye closures ka real-world use case samjhao.',
        'React Virtual DOM kaise kaam karta hai? Reconciliation algorithm aur diffing logic real DOM direct update karne se better kyu hai?',
        'Promises aur `async/await` me kya antar hai? `Promise.all` vs `Promise.allSettled` me error handling kaise differ karti hai?',
        'React me `useMemo` aur `useCallback` me kya antar hai? Unnecessary re-renders prevent karne ke liye dono kab use karne chahiye?'
      ],
      Hard: [
        'React Fiber architecture kya hai? Ye React 16+ me synchronous stack reconciliation ko time-slicing aur interruptible rendering se kaise replace karta hai?',
        'JavaScript me Prototypal Inheritance aur Prototype Chain internally kaise execute hoti hai? `__proto__` vs `prototype` property samjhao.',
        'Next.js App Router me Server Components (RSC) aur Client Components me hydration boundary kaise kaam karti hai? Bundle size par kya effect padta hai?',
        'Custom debounce aur throttle functions JavaScript me scratch se kaise implement karoge? Window resize aur search input me difference samjhao.',
        'React me state management: Redux Toolkit vs Context API vs Zustand me performance bottlenecks (unnecessary re-renders) ko kaise optimize karoge?'
      ]
    }
  },
  java: {
    name: 'Java & Spring Boot',
    icon: '☕',
    questions: {
      Easy: [
        'Java ke Object Oriented Programming (OOP) ke chaar main pillars (Encapsulation, Inheritance, Polymorphism, Abstraction) samjhao.',
        'Java me `String` immutable kyu hai? String, StringBuilder, aur StringBuffer me performance difference kya hai?',
        'Java me Interface aur Abstract Class me difference kya hai? Java 8 default methods ke baad kya change aaya?',
        'Exception handling me `try-catch-finally` block kaise execute hota hai? Checked vs Unchecked exceptions kya hote hain?',
        'Java Collection framework me `List`, `Set`, aur `Map` me elements storage aur uniqueness ka difference samjhao.'
      ],
      Medium: [
        'Java Virtual Machine (JVM) architecture samjhao: ClassLoader, Memory Areas (Heap, Stack, Metaspace), aur Execution Engine ka role.',
        'Spring Boot me Inversion of Control (IoC) aur Dependency Injection (DI) kya hai? `@Component`, `@Service`, aur `@Autowired` kaise kaam karte hain?',
        'Java 8 Streams API: `map()`, `filter()`, aur `reduce()` methods ka difference example ke saath samjhao. Lazy evaluation kya hoti hai?',
        'Java Multi-threading me `Thread` class vs `Runnable` interface me kya antar hai? `synchronized` keyword thread safety kaise guarantee karta hai?',
        'Spring Boot REST API me exception handling globally manage karne ke liye `@ControllerAdvice` aur `@ExceptionHandler` kaise use karte hain?'
      ],
      Hard: [
        'Java Garbage Collection (GC) me generational hypothesis (Young Gen, Eden, Survivor, Old Gen) aur G1 Garbage Collector ka working principle samjhao.',
        'Spring Boot me transactional consistency manage karne ke liye `@Transactional` propagation levels (REQUIRED, REQUIRES_NEW) aur isolation levels kaise kaam karte hain?',
        'Java Concurrency: `volatile` keyword, Atomic variables (`AtomicInteger`), aur `ReentrantLock` vs intrinsic locking me race conditions kaise avoid hoti hain?',
        'Spring Boot microservices architecture me Circuit Breaker pattern (Resilience4j) cascade failure kaise rokta hai?',
        'Hibernate / JPA me N+1 select problem kya hoti hai? Lazy vs Eager loading me isko `JOIN FETCH` ya EntityGraph se kaise optimize karte hain?'
      ]
    }
  },
  python: {
    name: 'Python & Backend',
    icon: '🐍',
    questions: {
      Easy: [
        'Python me List aur Tuple me kya difference hai? Mutability aur memory efficiency ke hisaab se samjhao.',
        'Python me Dictionary aur Set internally kaise kaam karte hain? Lookup time complexity O(1) kyu hoti hai?',
        'Python functions me `*args` aur `**kwargs` ka use syntax aur practical scenario ke saath samjhao.',
        'Python me shallow copy aur deep copy (`copy.copy` vs `copy.deepcopy`) me kya difference hota hai?',
        'Python me `break`, `continue`, aur `pass` statements me difference kya hai?'
      ],
      Medium: [
        'Python Generators aur `yield` keyword kaise kaam karte hain? Normal function return se memory efficiency me ye superior kyu hain?',
        'Python Decorators kya hote hain? Ek execution time logger decorator ka code structure step-by-step samjhao.',
        'Python me Global Interpreter Lock (GIL) kya hai? Ye multi-threaded CPU-bound programs ki performance ko kaise limit karta hai?',
        'FastAPI vs Flask/Django: FastAPI me asynchronous endpoints (`async def`) aur Pydantic data validation ka advantage kya hai?',
        'Python me List Comprehension vs `map()`/`filter()`: Readability aur execution speed me kya difference hai?'
      ],
      Hard: [
        'Python memory management: Reference counting aur cyclic garbage collector (gc module) circular references ko kaise handle karte hain?',
        'Python `asyncio` event loop architecture: Coroutines, Tasks, aur Futures internally non-blocking I/O kaise achieve karte hain?',
        'Python Metaclasses kya hain? Class creation process ko customize karne ke liye `__new__` vs `__init__` kaise execute hota hai?',
        'High-scale Python backend me memory leak detect aur debug karne ke liye `tracemalloc`, `objgraph`, ya memory profiling kaise ki jaati hai?',
        'Python me Context Managers (`with` statement) internally `__enter__` aur `__exit__` dunder methods ke saath custom database transaction me kaise implement karte hain?'
      ]
    }
  },
  mern: {
    name: 'Full Stack MERN',
    icon: '🌐',
    questions: {
      Easy: [
        'MERN stack ke components (MongoDB, Express, React, Node.js) ka flow samjhao — client request se database query tak.',
        'Node.js me `npm` vs `npx` kya hota hai? `package.json` me `dependencies` aur `devDependencies` ka difference samjhao.',
        'Express.js me routing kaise define karte hain? GET, POST, PUT, DELETE HTTP methods ka basic use case.',
        'MongoDB me Database, Collection, aur Document relational database (Tables/Rows) se kaise map hote hain?',
        'CORS (Cross-Origin Resource Sharing) error kyu aata hai aur Express me `cors` middleware se isko kaise solve karte hain?'
      ],
      Medium: [
        'JWT (JSON Web Token) authentication architecture: Access Token vs Refresh Token ka flow samjhao. Client side par token securely kahan store karna chahiye?',
        'Express.js me middleware chain (`req`, `res`, `next`) kaise execute hoti hai? Custom error-handling middleware kaise likhte hain?',
        'MongoDB Aggregation Pipeline: `$match`, `$group`, `$project`, aur `$lookup` stages ka use case real-world analytics me samjhao.',
        'Node.js architecture: Single-threaded event-driven model me CPU-intensive tasks event loop ko block kyu kar dete hain aur iska solution kya hai?',
        'React state management: Redux / Zustand me unidirectional data flow (Action -> Dispatch -> Reducer -> Store) ka fayda samjhao.'
      ],
      Hard: [
        'Node.js Event Loop phases (Timers, Pending Callbacks, Poll, Check/setImmediate, Close) aur `process.nextTick()` ka microtask priority order detail me samjhao.',
        'MERN stack application ko horizontal scale karte waqt stateful WebSocket connections (Socket.io) ko Redis Pub/Sub aur sticky sessions se kaise handle karoge?',
        'MongoDB indexing strategies: Compound indexes, ESR (Equality, Sort, Range) rule, aur write performance par excess indexes ka trade-off.',
        'Server-Side Rendering (SSR) vs Static Site Generation (SSG) vs Incremental Static Regeneration (ISR) me SEO aur TTFB (Time to First Byte) ka trade-off.',
        'Full-stack security best practices: XSS, CSRF, NoSQL injection, aur Rate Limiting (express-rate-limit) ko production MERN app me kaise implement karoge?'
      ]
    }
  },
  system_design: {
    name: 'System Design & Cloud',
    icon: '🏗️',
    questions: {
      Easy: [
        'Vertical Scaling (Scaling Up) aur Horizontal Scaling (Scaling Out) me core difference kya hai? Real-world cost aur limits samjhao.',
        'Load Balancer kya hota hai? Round Robin aur Least Connections algorithms me kya antar hai?',
        'SQL (Relational) vs NoSQL (Non-Relational) databases: Kab PostgreSQL use karoge aur kab MongoDB/Cassandra?',
        'Caching kya hai? Application server aur Database ke beech Redis / Memcached lagane ka primary benefit kya hai?',
        'Microservices Architecture aur Monolithic Architecture me fundamental pros and cons kya hain?'
      ],
      Medium: [
        'CAP Theorem samjhao: Consistency, Availability, aur Partition Tolerance me se distributed system sirf 2 kyu guarantee kar sakta hai?',
        'Database Sharding aur Replication (Master-Slave): Read heavy vs Write heavy systems ko scale karne ke liye dono kaise use hote hain?',
        'Content Delivery Network (CDN) kaise kaam karta hai? Edge servers static assets ki latency global users ke liye kaise kam karte hain?',
        'Message Queues (Kafka / RabbitMQ) asynchronous processing aur decoupled microservices me backpressure aur spikes kaise handle karte hain?',
        'Consistent Hashing algorithm kya hai? Distributed caching nodes add ya remove karte waqt cache misses kaise minimize hote hain?'
      ],
      Hard: [
        'Design a Scalable URL Shortener service (like Bitly / TinyURL) handling 100 Million daily active requests: URL encoding, collision resolution, database schema, caching strategy, and analytics.',
        'Design a Distributed Rate Limiter: Token Bucket vs Leaky Bucket vs Sliding Window Log algorithms me se multi-datacenter environment me Redis ke saath kaunsa best hai?',
        'Event-Driven Microservices me Distributed Transactions handle karne ke liye 2-Phase Commit (2PC) vs Saga Pattern (Choreography / Orchestration) ka trade-off samjhao.',
        'Design a real-time Notification System (WhatsApp/Slack notification engine) supporting billions of push, SMS, and email alerts with guaranteed deduplication and priority queues.',
        'Distributed systems me Data Consistency: Strong Consistency vs Eventual Consistency me conflict resolution strategies (Vector Clocks, Last-Write-Wins) kaise work karti hain?'
      ]
    }
  },
  dbms: {
    name: 'DBMS & SQL',
    icon: '🗄️',
    questions: {
      Easy: [
        'DBMS me Primary Key, Foreign Key, aur Unique Key me kya antar hai?',
        'SQL JOINs: INNER JOIN, LEFT OUTER JOIN, RIGHT OUTER JOIN, aur FULL JOIN me difference query output ke saath samjhao.',
        'SQL me `WHERE` clause aur `HAVING` clause me execution order aur filtering ka difference kya hai?',
        'DBMS me Normalization kyu ki jaati hai? Redundancy aur update anomalies kya hoti hain?',
        'DDL (Data Definition Language) aur DML (Data Manipulation Language) commands me difference with examples.'
      ],
      Medium: [
        'ACID Properties (Atomicity, Consistency, Isolation, Durability) samjhao. Bank transfer example se transaction failure explain karo.',
        'Database Indexing internally kaise kaam karti hai? B-Tree aur B+ Tree index binary search tree se disk storage me efficient kyu hain?',
        '1NF, 2NF, aur 3NF (Third Normal Form) me table decompose karne ke rules aur transitive dependencies ka removal samjhao.',
        'SQL query optimization: Slow running `SELECT` query ko `EXPLAIN ANALYZE` dekh kar index, query rewriting, aur subquery elimination se kaise optimize karoge?',
        'Clustered Index vs Non-Clustered Index: Physical data ordering aur leaf node contents me core difference kya hota hai?'
      ],
      Hard: [
        'Transaction Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable) aur concurrency anomalies (Dirty Read, Non-Repeatable Read, Phantom Read) detail me samjhao.',
        'Multi-Version Concurrency Control (MVCC) modern relational engines (PostgreSQL/MySQL InnoDB) me read-write lock contention kaise eliminate karta hai?',
        'Distributed Database me Two-Phase Locking (2PL) vs Optimistic Concurrency Control (OCC) high-contention e-commerce flash sale me kaise behave karta hai?',
        'Write-Ahead Logging (WAL) and Checkpointing: Database crash hone par recovery manager Redo aur Undo logs se consistency kaise restore karta hai?',
        'SQL Window Functions: `ROW_NUMBER()`, `RANK()`, `DENSE_RANK()`, aur `NTILE()` me difference real-world department-wise highest salary query se samjhao.'
      ]
    }
  },
  os_cn: {
    name: 'OS & Computer Networks',
    icon: '💻',
    questions: {
      Easy: [
        'Process aur Thread me kya antar hai? Multithreading se CPU utilization kaise improve hota hai?',
        'TCP aur UDP protocols me core difference kya hai? Kab TCP use karte hain aur kab UDP?',
        'OSI Model ke 7 layers ke naam aur har layer ka main responsibility simple terms me batao.',
        'Operating System me Virtual Memory aur Paging ka kya concept hai?',
        'IP Address (IPv4 vs IPv6) aur MAC Address me difference kya hota hai?'
      ],
      Medium: [
        'Deadlock kya hota hai? Coffman ke 4 conditions (Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait) aur Deadlock Prevention techniques samjhao.',
        'CPU Scheduling Algorithms: FCFS, SJF, Round Robin, aur Priority Scheduling me average waiting time aur starvation problem ka comparison.',
        'TCP 3-Way Handshake connection establishment aur 4-Way Handshake connection termination process step-by-step samjhao.',
        'DNS (Domain Name System) lookup resolution flow: Browser cache se Root DNS, TLD, aur Authoritative DNS servers tak request kaise travel karti hai?',
        'Process Synchronization: Race Condition kya hoti hai? Critical Section Problem ko solve karne ke liye Mutex vs Counting Semaphore ka difference.'
      ],
      Hard: [
        'Memory Management: Page Fault handling sequence step-by-step samjhao. Belady\'s Anomaly FIFO page replacement me kyu hoti hai aur LRU me kyu nahi?',
        'HTTPS / TLS 1.3 Handshake: Symmetric vs Asymmetric encryption, Digital Certificates (CA), Diffie-Hellman Key Exchange, aur Forward Secrecy ka architecture.',
        'TCP Congestion Control Algorithms (Slow Start, Congestion Avoidance, Fast Retransmit, Fast Recovery) network packet loss par throughput kaise adapt karte hain?',
        'Inter-Process Communication (IPC): Shared Memory, Message Queues, Pipes, aur Unix Sockets me throughput vs synchronization overhead ka trade-off.',
        'CDN aur reverse proxy me HTTP/2 Multiplexing vs HTTP/3 (QUIC over UDP) head-of-line blocking issue ko transport layer par kaise resolve karta hai?'
      ]
    }
  },
  hr_behavioral: {
    name: 'HR & Behavioral',
    icon: '🤝',
    questions: {
      Easy: [
        'Tell me about yourself — Apne education, technical strengths, aur college projects ka 60-second impactful pitch do.',
        'Aapki sabse badi strength aur sabse badi technical weakness kya hai? Weakness improve karne ke liye aap kya kar rahe ho?',
        'Aap hamari company me kyu join karna chahte ho? Aapne hamare products/services ke baare me kya research kiya?',
        '5 saal baad aap khud ko tech career me kis role ya capability me dekhte ho?',
        'Invertis University me aapka sabse favorite project ya academic achievement kya raha hai?'
      ],
      Medium: [
        'STAR Method (Situation, Task, Action, Result) use karke ek incident bataiye jab aapke team project me deadline tight thi aur code me critical bug aa gaya tha.',
        'Ek situation share kijiye jab aapka kisi teammate ya lead ke saath technical approach par disagreement hua tha. Aapne use professionally kaise resolve kiya?',
        'Agar production me aapke deploy kiye huye feature me bug aa jaye aur customers affect ho rahe hon, to aapka immediate action plan aur communication kya hoga?',
        'Tech industry me new frameworks aur tools roz aate hain. Aap khud ko continuously upskill aur industry trends ke sath aligned kaise rakhte ho?',
        'Tell me about a time when you had to learn a completely new programming language or framework within a very short timeframe.'
      ],
      Hard: [
        'Imagine a scenario where the product manager wants to cut corners on security and testing to meet an urgent marketing launch date. As an engineer, how do you handle this pushback?',
        'Tell me about a major failure or mistake you made in a technical project. What was the exact root cause, how did you take accountability, and what guardrails did you institute afterwards?',
        'How do you manage toxic communication or a low-performing teammate in a high-stakes group project without damaging morale or missing deliverables?',
        'What would you do if you were assigned a legacy codebase with zero documentation, obsolete libraries, and immediate feature requests?',
        'If you receive two lucrative campus placement job offers simultaneously, what structured framework will you use to make your final decision?'
      ]
    }
  }
};

let geminiFailed = false;

// Safe Gemini Chat with timeout & instant fallback
export async function geminiChat(prompt) {
  const key = process.env.GEMINI_API_KEY;
  // A valid Google Gemini API key is 39 characters starting with AIzaSy
  if (!key || key.length < 35 || geminiFailed) return null;

  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(key);

    const callWithTimeout = (modelName) => {
      return new Promise(async (resolve, reject) => {
        const timer = setTimeout(() => resolve(null), 3500); // 3.5s strict timeout
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const r = await model.generateContent(prompt);
          clearTimeout(timer);
          resolve(r?.response?.text() || null);
        } catch (e) {
          clearTimeout(timer);
          if (e.message && (e.message.includes('API_KEY_INVALID') || e.message.includes('API key not valid'))) {
            geminiFailed = true; // Don't retry invalid keys
          }
          resolve(null);
        }
      });
    };

    const res = await callWithTimeout('gemini-1.5-flash');
    return res;
  } catch (e) {
    return null;
  }
}

// Generate Fallback Question when Gemini is offline or for instant response
export function getFallbackQuestion(topicKey = 'dsa', difficulty = 'Medium', asked = [], customTopic = '') {
  let category = TOPIC_BANK[topicKey];

  if (!category) {
    const foundKey = Object.keys(TOPIC_BANK).find(k => 
      TOPIC_BANK[k].name.toLowerCase().includes(topicKey.toLowerCase()) ||
      k.toLowerCase() === topicKey.toLowerCase()
    );
    category = foundKey ? TOPIC_BANK[foundKey] : TOPIC_BANK.dsa;
  }

  const pool = category.questions[difficulty] || category.questions.Medium || category.questions.Easy;
  const unasked = pool.filter(q => !asked.includes(q));
  const list = unasked.length > 0 ? unasked : pool;
  let picked = list[Math.floor(Math.random() * list.length)];

  if (customTopic && customTopic.trim()) {
    const prefix = `[Topic: ${customTopic.trim()}] `;
    if (!picked.startsWith('[Topic:')) {
      picked = `${prefix}${picked}`;
    }
  }

  return picked;
}

// Fallback Hint Generator
export function getFallbackHint(question = '', topic = '') {
  const q = question.toLowerCase();
  if (q.includes('array') || q.includes('linked list')) {
    return 'Socho: Contiguous memory allocation vs node pointers. Index access O(1) kab hota hai aur dynamic resizing me kya overhead hai?';
  }
  if (q.includes('event loop') || q.includes('asynchronous')) {
    return 'Call Stack me sync code execute hota hai. Promises Microtask queue me jate hain, aur setTimeout Macrotask queue me. Microtasks always execute pehle!';
  }
  if (q.includes('deadlock')) {
    return 'Coffman ke 4 conditions recall karo: Mutual Exclusion, Hold and Wait, No Preemption, aur Circular Wait. Inme se kisi 1 ko break karne se deadlock rukta hai.';
  }
  if (q.includes('normaliz') || q.includes('dbms') || q.includes('sql')) {
    return '1NF: Atomic values; 2NF: No partial dependency (composite key par dependent na ho); 3NF: No transitive dependency (non-prime to non-prime).';
  }
  if (q.includes('cache') || q.includes('lru')) {
    return 'O(1) search ke liye Hash Map lagao, aur O(1) insertion/deletion aur order maintain karne ke liye Doubly Linked List use karo.';
  }
  return `Concept ko 3 parts me divide karo: 1. Core Definition, 2. Ek clear working example ya syntax, 3. Real-world engineering trade-off.`;
}

// Intelligent Rule-Based Evaluation Engine
export function ruleScore(answer = '', question = '', topic = '', difficulty = 'Medium') {
  const text = (answer || '').trim();
  const words = text ? text.split(/\s+/).length : 0;

  if (words < 5) {
    return {
      score: 25,
      technical: 25,
      communication: 30,
      depth: 15,
      feedback: 'Jawab thoda chhota hai. Technical interview me kam se kam concept ki definition, working aur ek real-world example dena chahiye.',
      strengths: ['Question ko attempt kiya.'],
      improvements: [
        'Technical definition thoda detail me samjhao.',
        'Ek practical example ya syntax mention karo.',
        'Performance / Time complexity aspect touch karo.'
      ],
      ideal: 'Concept ko pehle define karein, phir internally kaise kaam karta hai batayein, aur last me ek practical example ya trade-off explain karein.'
    };
  }

  const hasExample = /(example|for instance|jaise|e\.g\.|maan lo|suppose|case)/i.test(text);
  const hasCodeOrSyntax = /(const |let |function |class |public |void |def |import |select |from |return |->|\{|\}|;|\(\))/i.test(text);
  const hasComplexityOrPerf = /(o\(|time complexity|space complexity|latency|memory|performance|efficient|scale|overhead)/i.test(text);
  const hasStructure = text.length > 80 && /[.,:\n]/.test(text);

  let technical = 55;
  let communication = 60;
  let depth = 50;

  if (words >= 15) technical += 8;
  if (words >= 35) technical += 12;
  if (words >= 60) technical += 8;

  if (hasExample) {
    technical += 8;
    communication += 8;
    depth += 12;
  }
  if (hasCodeOrSyntax) {
    technical += 8;
    depth += 12;
  }
  if (hasComplexityOrPerf) {
    technical += 8;
    depth += 10;
  }
  if (hasStructure) {
    communication += 10;
  }

  if (difficulty === 'Hard') {
    technical = Math.round(technical * 0.9);
  } else if (difficulty === 'Easy') {
    technical = Math.min(95, Math.round(technical * 1.05));
  }

  technical = Math.min(94, Math.max(30, Math.round(technical)));
  communication = Math.min(95, Math.max(40, Math.round(communication)));
  depth = Math.min(92, Math.max(25, Math.round(depth)));

  const overall = Math.round((technical * 0.45) + (communication * 0.35) + (depth * 0.20));

  const strengths = [];
  if (words >= 25) strengths.push('Clear aur structured answer explain kiya.');
  if (hasExample) strengths.push('Example jodne se baat achhe se samajh aayi.');
  if (hasCodeOrSyntax) strengths.push('Code ya syntax construct mention kiya.');
  if (strengths.length === 0) strengths.push('Core question ka point touch kiya.');

  const improvements = [];
  if (!hasExample) improvements.push('Ek concrete example ya use-case add karein.');
  if (!hasComplexityOrPerf) improvements.push('Time & space complexity discuss karein.');
  if (words < 30) improvements.push('Answer ko Definition -> Mechanism -> Trade-off flow me dein.');

  const feedback = overall >= 75
    ? 'Shandar jawab! Technical clarity achhi hai aur explanation interviewer ko impress karegi.'
    : overall >= 55
    ? 'Achhi shuruaat! Core point sahi hai, thoda aur detail aur practical example add karne se score aur badhega.'
    : 'Concept thoda basic lag raha hai. Definition ke sath ek real-world example zaroor explain karein.';

  return {
    score: overall,
    technical,
    communication,
    depth,
    feedback,
    strengths,
    improvements: improvements.slice(0, 2),
    ideal: `1. Definition: Sawaal ke concept ko 1 line me clear define karein.\n2. Working: Kaam kaise karta hai step-by-step batayein.\n3. Trade-offs: Kab use karna hai aur kab avoid karna hai.`
  };
}
