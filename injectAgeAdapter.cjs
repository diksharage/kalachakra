const fs = require('fs');
let code = fs.readFileSync('src/components/gameplay/LevelEngine.jsx', 'utf8');

// 1. Add import
if (!code.includes("import { adaptTextForAge, adaptQuestionForAge }")) {
    code = code.replace("import BackButton from '../common/BackButton';", "import BackButton from '../common/BackButton';\nimport { adaptTextForAge, adaptQuestionForAge } from '../../utils/ageAdapter';");
}

// 2. Intercept strings in InteractiveLearnNode
// Find: const fullText = data.discoverMessage || data.description || "Historical context missing.";
code = code.replace(
    'const fullText = data.discoverMessage || data.description || "Historical context missing.";',
    'const rawText = data.discoverMessage || data.description || "Historical context missing.";\n  const fullText = adaptTextForAge(rawText, ageGroup);'
);

// 3. Intercept strings in Stage 1/2/3 Modals
// Find: {data.getDiscoverMessage ? data.getDiscoverMessage(ageGroup) : (data.discoverMessage || "You uncovered something significant here!")}
code = code.replace(
    '{data.getDiscoverMessage ? data.getDiscoverMessage(ageGroup) : (data.discoverMessage || "You uncovered something significant here!")}',
    '{data.getDiscoverMessage ? data.getDiscoverMessage(ageGroup) : adaptTextForAge(data.discoverMessage || "You uncovered something significant here!", ageGroup)}'
);

// Find: {data.description}
code = code.replace(
    '{data.description}',
    '{adaptTextForAge(data.description, ageGroup)}'
);

// 4. Intercept Challenge Question
// Find: <p className="text-lg text-content mb-6">{data.getQuestion ? data.getQuestion(ageGroup) : data.question}</p>
code = code.replace(
    '<p className="text-lg text-content mb-6">{data.getQuestion ? data.getQuestion(ageGroup) : data.question}</p>',
    '<p className="text-lg text-content mb-6">{data.getQuestion ? data.getQuestion(ageGroup) : adaptQuestionForAge(data.question, ageGroup)}</p>'
);

// 5. Intercept Challenge Explanation (retry)
// Find: {retry.data.getExplanation ? retry.data.getExplanation(ageGroup) : retry.data.explanation}
code = code.replace(
    '{retry.data.getExplanation ? retry.data.getExplanation(ageGroup) : retry.data.explanation}',
    '{retry.data.getExplanation ? retry.data.getExplanation(ageGroup) : adaptTextForAge(retry.data.explanation, ageGroup)}'
);

// 6. Intercept Success Modal (Success Overlay for Challenges)
// Wait, is there a success explanation in LevelEngine?
// Let's check.

fs.writeFileSync('src/components/gameplay/LevelEngine.jsx', code);
console.log("Injected ageAdapter into LevelEngine!");
