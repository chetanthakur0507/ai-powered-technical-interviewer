import { NextResponse } from 'next/server';
import { geminiChat, getFallbackQuestion, getFallbackHint, ruleScore, TOPIC_BANK } from '../../../lib/ai';

export async function POST(req) {
  const body = await req.json().catch(() => ({}));
  const { action } = body;
  const live = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 20);

  // 1. QUESTION GENERATION
  if (action === 'question') {
    const topic = body.topic || 'dsa';
    const customTopic = (body.customTopic || '').trim();
    const difficulty = body.difficulty || 'Medium';
    const customQuestion = (body.customQuestion || '').trim();
    const jd = (body.jd || '').trim();
    const asked = body.asked || [];

    // If candidate specifically provided their own question to be interviewed on
    if (customQuestion && asked.length === 0) {
      return NextResponse.json({
        question: customQuestion,
        mode: 'custom',
        topic,
        difficulty
      });
    }

    // Try Gemini if live key is available
    if (live) {
      let prompt = '';
      if (jd) {
        prompt = `You are a strict, top-tier technical interviewer conducting a mock interview for Invertis University campus placements.
Based on this Job Description / syllabus: "${jd.slice(0, 1500)}"
Topic: ${customTopic || topic}
Difficulty Level: ${difficulty}
Generate exactly ONE concise, rigorous technical interview question suitable for this level.
Previously asked questions to avoid: ${JSON.stringify(asked.slice(-5))}
Output ONLY the question text without any markdown bolding or prefixes.`;
      } else {
        prompt = `You are a senior technical interviewer conducting an interview on "${customTopic || topic}".
Difficulty: ${difficulty}.
Target: College campus placement for technical roles (SDE, Full Stack, Data Engineer).
Previously asked questions to avoid: ${JSON.stringify(asked.slice(-5))}
Generate exactly ONE clear, practical, thought-provoking technical interview question.
Do NOT repeat previously asked questions.
Return ONLY the question string, nothing else.`;
      }

      try {
        const text = await geminiChat(prompt);
        if (text && text.trim().length > 15) {
          return NextResponse.json({
            question: text.trim().replace(/^["']|["']$/g, ''),
            mode: 'live',
            topic,
            difficulty
          });
        }
      } catch (err) {
        console.log('[API question error]', err);
      }
    }

    // High quality curated fallback
    const question = getFallbackQuestion(topic, difficulty, asked, customTopic);
    return NextResponse.json({
      question,
      mode: live ? 'live' : 'demo',
      topic,
      difficulty
    });
  }

  // 2. PEDAGOGICAL HINT
  if (action === 'hint') {
    const { question, topic } = body;
    if (live) {
      try {
        const hintText = await geminiChat(`The candidate is stuck on this technical interview question: "${question}".
Provide a subtle, 1-2 sentence guiding hint to help them think in the right direction without directly giving away the whole answer. Output only the hint.`);
        if (hintText && hintText.trim()) {
          return NextResponse.json({ hint: hintText.trim() });
        }
      } catch (e) {}
    }
    const hint = getFallbackHint(question, topic);
    return NextResponse.json({ hint });
  }

  // 3. EVALUATION & SCORING
  if (action === 'evaluate') {
    const { answer, question, topic = 'dsa', difficulty = 'Medium', customTopic = '' } = body;

    if (live && answer && answer.trim().length > 10) {
      const prompt = `You are an expert technical interviewer evaluating an engineering candidate's answer for campus placements.
Question: "${question}"
Topic: "${customTopic || topic}"
Difficulty: "${difficulty}"
Candidate's Answer: "${answer.slice(0, 3000)}"

Evaluate strictly yet constructively.
Return ONLY a valid JSON object matching this exact schema:
{
  "score": <number between 15 and 98>,
  "technical": <number between 15 and 98>,
  "communication": <number between 20 and 98>,
  "depth": <number between 15 and 98>,
  "feedback": "<2-3 sentence honest, helpful evaluation>",
  "strengths": ["<strength point 1>", "<strength point 2>"],
  "improvements": ["<improvement point 1>", "<improvement point 2>"],
  "ideal": "<concise 3-4 bullet ideal answer demonstrating high technical competence>",
  "followUp": "<one thoughtful follow-up question to test their deeper understanding>"
}`;

      try {
        const res = await geminiChat(prompt);
        if (res) {
          const cleaned = res.replace(/```json/gi, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleaned);
          return NextResponse.json({
            score: parsed.score || 70,
            technical: parsed.technical || 70,
            communication: parsed.communication || 70,
            depth: parsed.depth || 65,
            feedback: parsed.feedback || 'Good attempt.',
            strengths: Array.isArray(parsed.strengths) ? parsed.strengths : ['Answered the core point.'],
            improvements: Array.isArray(parsed.improvements) ? parsed.improvements : ['Add more technical trade-offs.'],
            ideal: parsed.ideal || 'Explain definition, practical code example, and trade-offs.',
            followUp: parsed.followUp || 'Can you explain the trade-offs of this approach?',
            mode: 'live'
          });
        }
      } catch (err) {
        console.log('[API evaluate error]', err);
      }
    }

    // Local Rule-Based Engine
    const result = ruleScore(answer, question, topic, difficulty);
    return NextResponse.json({
      ...result,
      mode: live ? 'live' : 'demo'
    });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}

export async function GET() {
  const live = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.length > 20);
  return NextResponse.json({
    live,
    mode: live ? 'live' : 'demo',
    topics: Object.entries(TOPIC_BANK).map(([key, val]) => ({
      key,
      name: val.name,
      icon: val.icon
    }))
  });
}
