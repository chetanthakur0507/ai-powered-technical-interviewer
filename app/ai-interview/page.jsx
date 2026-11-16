'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function AIInterviewPage() {
  // Setup state
  const [selectedTopic, setSelectedTopic] = useState('dsa');
  const [customTopic, setCustomTopic] = useState('');
  const [difficulty, setDifficulty] = useState('Medium');
  const [questionCount, setQuestionCount] = useState(5);
  const [autoVoiceMode, setAutoVoiceMode] = useState(true);

  // Interview session state
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState('');
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [answer, setAnswer] = useState('');
  const [busy, setBusy] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evalResult, setEvalResult] = useState(null);
  const [allResults, setAllResults] = useState([]);
  const [report, setReport] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Voice & Speech state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(150);
  const [micNotice, setMicNotice] = useState('');

  const recRef = useRef(null);
  const timerRef = useRef(null);

  // Timer per question
  useEffect(() => {
    if (started && !evalResult && !report) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [started, evalResult, report, currentQ]);

  // Clean Voice TTS: AI speaks question
  function speakQuestion(text) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setMicNotice('Aapke browser me speech voice supported nahi hai.');
      return;
    }

    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text || currentQ);
      utterance.lang = 'en-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        // Auto-start mic if in auto voice mode
        if (autoVoiceMode && !isListening) {
          startListening();
        }
      };
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch {
      setIsSpeaking(false);
    }
  }

  function stopSpeaking() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }

  // Voice STT: Candidate speaks answer
  function startListening() {
    setMicNotice('');
    if (typeof window === 'undefined') return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setMicNotice('Browser me voice recognition support nahi mila. Kripya Google Chrome use karein ya neeche box me text type karein.');
      return;
    }

    try {
      if (recRef.current) {
        recRef.current.abort();
      }

      const rec = new SpeechRecognition();
      rec.lang = 'en-IN';
      rec.continuous = true;
      rec.interimResults = true;

      rec.onstart = () => {
        setIsListening(true);
        setMicNotice('🎙️ Mic chalu hai — boliye, answer type ho raha hai...');
      };

      rec.onresult = (e) => {
        let transcript = '';
        for (let i = e.resultIndex; i < e.results.length; ++i) {
          transcript += e.results[i][0].transcript + ' ';
        }
        if (transcript) {
          setAnswer((prev) => {
            const trimmed = prev.trim();
            return trimmed ? `${trimmed} ${transcript.trim()}` : transcript.trim();
          });
        }
      };

      rec.onerror = (e) => {
        setIsListening(false);
        if (e.error === 'not-allowed') {
          setMicNotice('⚠️ Mic permission allow nahi hai. Browser settings me mic on karein ya direct type karein.');
        } else {
          setMicNotice('Mic band ho gaya. Dobara click karke bol sakte hain ya type karein.');
        }
      };

      rec.onend = () => {
        setIsListening(false);
      };

      recRef.current = rec;
      rec.start();
    } catch {
      setIsListening(false);
      setMicNotice('Mic start karne me dikkat aayi. Kripya type karke answer dein.');
    }
  }

  function stopListening() {
    if (recRef.current) {
      recRef.current.stop();
    }
    setIsListening(false);
    setMicNotice('Mic stop ho gaya. Agar jawab poora hai to Submit karein.');
  }

  // Fetch Next Question
  async function fetchQuestion(askedList = askedQuestions) {
    setBusy(true);
    stopSpeaking();
    stopListening();
    setErrorMsg('');
    setTimerSeconds(150);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'question',
          topic: selectedTopic,
          customTopic,
          difficulty,
          asked: askedList
        })
      });
      const data = await res.json();
      const qText = data.question || 'Explain how you design a scalable system or data structure.';
      setCurrentQ(qText);

      if (autoVoiceMode) {
        setTimeout(() => speakQuestion(qText), 300);
      }
    } catch {
      const fallback = 'OOP me Abstraction aur Encapsulation me fundamental difference kya hai? Example ke saath samjhao.';
      setCurrentQ(fallback);
      if (autoVoiceMode) setTimeout(() => speakQuestion(fallback), 300);
    } finally {
      setBusy(false);
    }
  }

  // Start interview
  async function handleStart() {
    setStarted(true);
    setAllResults([]);
    setReport(null);
    setEvalResult(null);
    setAnswer('');
    setErrorMsg('');
    setAskedQuestions([]);
    await fetchQuestion([]);
  }

  // Submit Answer
  async function handleSubmitAnswer() {
    setErrorMsg('');
    if (!answer.trim()) {
      setErrorMsg('Pehle apna jawab mic se bolein ya box me likhein.');
      return;
    }

    stopSpeaking();
    stopListening();
    setEvaluating(true);

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'evaluate',
          answer,
          question: currentQ,
          topic: selectedTopic,
          customTopic,
          difficulty
        })
      });
      const data = await res.json();

      const evaluationItem = {
        question: currentQ,
        answer,
        score: data.score || 72,
        technical: data.technical || 70,
        communication: data.communication || 75,
        depth: data.depth || 65,
        feedback: data.feedback || 'Good structured response.',
        strengths: data.strengths || ['Good concept structure'],
        improvements: data.improvements || ['Add real-world trade-offs'],
        ideal: data.ideal || ''
      };

      setEvalResult(evaluationItem);
      setAllResults((prev) => [...prev, evaluationItem]);
    } catch {
      setErrorMsg('Evaluation error. Kripya dobara submit karein.');
    } finally {
      setEvaluating(false);
    }
  }

  // Next question
  async function handleNextQuestion() {
    setEvalResult(null);
    setAnswer('');
    setErrorMsg('');
    setMicNotice('');

    if (allResults.length >= questionCount) {
      const avg = Math.round(allResults.reduce((s, x) => s + x.score, 0) / allResults.length);
      const rep = {
        avg,
        topic: customTopic || selectedTopic,
        difficulty,
        results: allResults,
        date: new Date().toLocaleDateString('en-IN')
      };
      setReport(rep);
      try {
        localStorage.setItem('lastInterview', JSON.stringify({ avg, date: rep.date, role: rep.topic }));
      } catch {}
    } else {
      const newAsked = [...askedQuestions, currentQ];
      setAskedQuestions(newAsked);
      await fetchQuestion(newAsked);
    }
  }

  // End Interview Now
  function handleEndNow() {
    stopSpeaking();
    stopListening();
    if (allResults.length === 0) {
      setStarted(false);
      return;
    }
    const avg = Math.round(allResults.reduce((s, x) => s + x.score, 0) / allResults.length);
    setReport({
      avg,
      topic: customTopic || selectedTopic,
      difficulty,
      results: allResults,
      date: new Date().toLocaleDateString('en-IN')
    });
  }

  // -------------------------------------------------------------------------
  // VIEW 1: SCORECARD REPORT
  // -------------------------------------------------------------------------
  if (report) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="card text-center p-6 sm:p-8">
          <span className="badge bg-orange-100 text-[#EE6200] font-bold text-xs uppercase mb-2">
            Assessment Completed
          </span>
          <p className="text-4xl sm:text-5xl font-black text-slate-900 mt-1">{report.avg} / 100</p>
          <p className="font-bold text-slate-700 text-sm mt-1">
            Overall Score • {report.topic} • {report.difficulty}
          </p>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Total {report.results.length} questions answered
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                setReport(null);
                setStarted(false);
                setAllResults([]);
              }}
              className="btn-gold"
            >
              Naya Interview Shuru Karo
            </button>
            <Link href="/prep" className="btn-outline">
              Prep Hub me Revise Karo
            </Link>
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="mt-6 space-y-4">
          <h3 className="font-bold text-base text-slate-900">Questions & Feedback ({report.results.length}):</h3>
          {report.results.map((r, i) => (
            <div key={i} className="card p-5">
              <div className="flex justify-between items-start gap-3">
                <p className="font-bold text-sm text-slate-900">
                  Q{i + 1}. {r.question}
                </p>
                <span className="badge bg-orange-50 text-[#EE6200] border border-orange-200 shrink-0">
                  {r.score}/100
                </span>
              </div>

              <div className="bg-slate-50 p-3 rounded-lg mt-3 text-xs text-slate-700">
                <b>Aapka Jawab:</b> {r.answer}
              </div>

              <div className="mt-3 text-xs text-slate-600 space-y-1">
                <p><b>Feedback:</b> {r.feedback}</p>
                {r.ideal && (
                  <p className="mt-2 text-slate-800 bg-orange-50/60 p-2.5 rounded border border-orange-100">
                    <b>Ideal Model Answer:</b> {r.ideal}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // VIEW 2: ACTIVE VOICE & TEXT INTERVIEW
  // -------------------------------------------------------------------------
  if (started) {
    const min = Math.floor(timerSeconds / 60);
    const sec = String(timerSeconds % 60).padStart(2, '0');

    return (
      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Top Session Status Bar */}
        <div className="card p-4 mb-4 flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs font-bold text-[#EE6200] block uppercase">
              {customTopic || selectedTopic} • {difficulty}
            </span>
            <p className="font-bold text-sm text-slate-800">
              Question {allResults.length + 1} of {questionCount}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-100 px-2.5 py-1 rounded font-mono font-bold text-slate-700">
              ⏱ {min}:{sec}
            </span>
            <button
              type="button"
              onClick={handleEndNow}
              className="text-xs text-slate-500 hover:text-red-600 font-medium ml-2 cursor-pointer"
            >
              End Interview
            </button>
          </div>
        </div>

        {/* AI Question Box */}
        <div className="card p-5 border-l-4 border-l-[#EE6200]">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-bold text-slate-500">AI INTERVIEWER QUESTION:</span>
            
            {/* Audio Speech Controls */}
            <div className="flex items-center gap-1.5">
              {isSpeaking ? (
                <button
                  type="button"
                  onClick={stopSpeaking}
                  className="text-xs bg-red-100 text-red-700 hover:bg-red-200 px-2.5 py-1 rounded font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>⏹ Aawaz Roko</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => speakQuestion(currentQ)}
                  disabled={busy}
                  className="text-xs bg-orange-100 text-[#EE6200] hover:bg-orange-200 px-2.5 py-1 rounded font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>🔊 Sawaal Suno</span>
                </button>
              )}
            </div>
          </div>

          <p className="font-semibold text-base sm:text-lg text-slate-900 leading-snug">
            {busy ? 'Agla question load ho raha hai...' : currentQ}
          </p>

          {isSpeaking && (
            <p className="text-xs text-[#EE6200] font-medium mt-2 flex items-center gap-1">
              <span>🔊 AI sawaal bol raha hai, suniye...</span>
            </p>
          )}
        </div>

        {/* Evaluation Result for this question */}
        {evalResult ? (
          <div className="card p-5 mt-4 border-orange-200 bg-orange-50/40">
            <div className="flex justify-between items-center pb-2 border-b border-orange-200">
              <span className="font-bold text-sm text-[#EE6200]">Evaluation Feedback</span>
              <span className="font-black text-lg text-slate-900">{evalResult.score}/100</span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 mt-3 leading-relaxed">
              <b>Feedback:</b> {evalResult.feedback}
            </p>

            {evalResult.ideal && (
              <div className="mt-3 bg-white p-3 rounded border border-orange-200 text-xs text-slate-700">
                <b className="text-slate-900 block mb-1">Ideal Model Answer:</b>
                {evalResult.ideal}
              </div>
            )}

            <div className="mt-4">
              <button
                type="button"
                onClick={handleNextQuestion}
                className="btn-gold w-full sm:w-auto cursor-pointer"
              >
                <span>{allResults.length >= questionCount ? 'Complete Interview & View Scorecard' : 'Next Question →'}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Answer Section: Speak or Type */
          <div className="card p-5 mt-4">
            <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
              <label className="label !mb-0">
                Aapka Answer (Bol kar ya likh kar):
              </label>

              {/* Mic Listen Toggle Button */}
              {isListening ? (
                <button
                  type="button"
                  onClick={stopListening}
                  className="text-xs bg-red-600 text-white hover:bg-red-700 px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span>🔴 Recording Chal Rahi Hai (Stop)</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={startListening}
                  className="text-xs bg-[#EE6200] text-white hover:bg-[#D45600] px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <span>🎙️ Mic Se Bol Kar Answer Dein</span>
                </button>
              )}
            </div>

            {micNotice && (
              <div className="p-2.5 rounded bg-orange-50 border border-orange-200 text-xs text-[#EE6200] mb-2 font-medium flex items-center justify-between">
                <span>{micNotice}</span>
                <button type="button" onClick={() => setMicNotice('')} className="text-xs font-bold ml-2">✕</button>
              </div>
            )}

            <textarea
              className="input text-sm"
              rows={5}
              placeholder="Aap mic se bol kar bol sakte hain, ya yahan text me answer likh sakte hain..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />

            {errorMsg && (
              <div className="p-2 rounded bg-red-50 text-red-600 text-xs font-semibold mt-2">
                ⚠️ {errorMsg}
              </div>
            )}

            <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={evaluating || busy}
                className="btn-gold flex-1 sm:flex-initial cursor-pointer"
              >
                {evaluating ? 'AI Evaluate kar raha hai...' : 'Submit Answer & Evaluate →'}
              </button>

              <div className="flex items-center gap-2">
                {answer && (
                  <button
                    type="button"
                    onClick={() => setAnswer('')}
                    className="text-xs text-slate-400 hover:text-slate-600 font-medium cursor-pointer"
                  >
                    Clear Text
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleNextQuestion}
                  disabled={evaluating || busy}
                  className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                >
                  Skip Question
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------------------
  // VIEW 3: SETUP SCREEN (Clean & Simple)
  // -------------------------------------------------------------------------
  const topics = [
    { id: 'dsa', name: 'Data Structures & Algorithms', icon: '⚡' },
    { id: 'javascript', name: 'JavaScript & React', icon: '⚛️' },
    { id: 'java', name: 'Java & Spring Boot', icon: '☕' },
    { id: 'python', name: 'Python & Backend', icon: '🐍' },
    { id: 'mern', name: 'Full Stack MERN', icon: '🌐' },
    { id: 'system_design', name: 'System Design & Cloud', icon: '🏗️' },
    { id: 'dbms', name: 'DBMS & SQL', icon: '🗄️' },
    { id: 'os_cn', name: 'OS & Computer Networks', icon: '💻' },
    { id: 'hr_behavioral', name: 'HR & Behavioral Viva', icon: '🤝' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          AI Voice Technical Interview
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          AI bol kar sawaal puchega aur aap mic se bol kar jawab de sakte hain. Topic aur difficulty chunein aur start karein.
        </p>
      </div>

      {/* Main Setup Card */}
      <div className="card mt-6 p-5 sm:p-6 space-y-6">
        {/* Step 1: Topic */}
        <div>
          <label className="label">1. Sawaal Ka Topic Chunein:</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mt-2">
            {topics.map((t) => {
              const active = selectedTopic === t.id && !customTopic;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setSelectedTopic(t.id);
                    setCustomTopic('');
                  }}
                  className={`text-left p-3 rounded-lg border text-xs sm:text-sm font-semibold flex items-center gap-2 transition-colors cursor-pointer ${
                    active
                      ? 'bg-orange-50 border-[#EE6200] text-[#EE6200] font-bold'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="text-base">{t.icon}</span>
                  <span className="truncate">{t.name}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-2.5">
            <input
              type="text"
              className="input text-xs sm:text-sm"
              placeholder="Ya custom topic likhein (e.g. Docker, C++ Pointers, Golang, Next.js)..."
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
            />
          </div>
        </div>

        {/* Step 2: Difficulty */}
        <div className="pt-4 border-t border-slate-200">
          <label className="label">2. Difficulty Level:</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {['Easy', 'Medium', 'Hard'].map((d) => {
              const active = difficulty === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`py-2 px-3 rounded-lg border text-xs sm:text-sm font-semibold text-center transition-colors cursor-pointer ${
                    active
                      ? 'bg-orange-50 border-[#EE6200] text-[#EE6200] font-bold'
                      : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Question Count & Voice Toggle */}
        <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">3. Kitne Questions Honge:</label>
            <div className="flex gap-2 mt-2">
              {[3, 5, 10].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setQuestionCount(n)}
                  className={`flex-1 py-1.5 px-3 rounded-lg border text-xs font-semibold cursor-pointer ${
                    questionCount === n
                      ? 'bg-[#EE6200] text-white border-[#EE6200]'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {n} Sawaal
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="label">Voice Mode Settings:</label>
            <div className="mt-2 flex items-center gap-2">
              <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoVoiceMode}
                  onChange={(e) => setAutoVoiceMode(e.target.checked)}
                  className="rounded text-[#EE6200] focus:ring-[#EE6200] w-4 h-4 cursor-pointer"
                />
                <span><b>AI Question Bolega</b> (Audio Voice Mode)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Start Button */}
        <div className="pt-4 border-t border-slate-200">
          <button
            type="button"
            onClick={handleStart}
            disabled={busy}
            className="btn-gold w-full py-2.5 text-sm sm:text-base font-bold cursor-pointer"
          >
            {busy ? 'Loading questions...' : '🎙️ Start Voice Interview Now →'}
          </button>
          <p className="text-center text-xs text-slate-500 mt-2">
            AI sawaal bolega • Aap mic se answer de sakte hain • Instant evaluation report
          </p>
        </div>
      </div>
    </div>
  );
}
