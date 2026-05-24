const TOPICS = [
  {
    id: 'intro',
    label: 'Introduction to Artificial Intelligence',
    icon: '🤖',
    children: [
      { id: 'what-is-ai',     label: 'What is Artificial Intelligence?',                   file: 'topics/what-is-ai.html'      },
      { id: 'history-of-ai',  label: 'History of Artificial Intelligence',                 file: 'topics/history-of-ai.html'   },
      { id: 'types-of-ai',    label: 'Types of Artificial Intelligence',                   file: 'topics/types-of-ai.html'     },
      { id: 'ai-vs-ml',       label: 'AI vs ML vs Deep Learning vs Generative AI',         file: 'topics/ai-vs-ml.html'        },
      { id: 'applications',   label: 'Real-World Applications of Artificial Intelligence', file: 'topics/applications-ai.html' },
      { id: 'how-ai-works',   label: 'How AI Actually Works',                              file: 'topics/how-ai-works.html'    },
      { id: 'branches-ai',    label: 'Branches of Artificial Intelligence',                file: 'topics/branches-of-ai.html'  },
    ],
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    icon: '📊',
    children: [
      { id: 'supervised',    label: 'Supervised Learning',    file: 'topics/supervised-learning.html'    },
      { id: 'unsupervised',  label: 'Unsupervised Learning',  file: 'topics/unsupervised-learning.html'  },
      { id: 'reinforcement', label: 'Reinforcement Learning', file: 'topics/reinforcement-learning.html' },
    ],
  },
  {
    id: 'dl',
    label: 'Deep Learning',
    icon: '🧠',
    children: [
      { id: 'neural-networks', label: 'Neural Networks', file: 'topics/neural-networks.html' },
      { id: 'cnn',             label: 'CNN Basics',       file: 'topics/cnn-basics.html'      },
      { id: 'rnn-lstm',        label: 'RNN & LSTM',       file: 'topics/rnn-lstm.html'        },
    ],
  },
  {
    id: 'nlp',
    label: 'NLP & Transformers',
    icon: '💬',
    children: [
      { id: 'nlp-intro',    label: 'NLP Introduction',         file: 'topics/nlp-intro.html'    },
      { id: 'transformers', label: 'Transformers & Attention',  file: 'topics/transformers.html' },
      { id: 'llms',         label: 'LLMs & ChatGPT',           file: 'topics/llms-chatgpt.html' },
    ],
  },
  {
    id: 'practice',
    label: 'Practice & Resources',
    icon: '🏆',
    children: [
      { id: 'interview', label: 'Interview Questions', file: 'topics/interview-questions.html' },
      { id: 'mcq-bank',  label: 'MCQ Bank',            file: 'topics/mcq-bank.html'           },
      { id: 'quiz',      label: 'Quiz Challenge',       file: 'topics/quiz-challenge.html'     },
    ],
  },
];

const TOPICS_FLAT = TOPICS.reduce((acc, group) => {
  group.children.forEach(leaf => acc.push(leaf));
  return acc;
}, []);

function getTopicById(id) {
  return TOPICS_FLAT.find(t => t.id === id);
}

function getAdjacentTopics(id) {
  const idx = TOPICS_FLAT.findIndex(t => t.id === id);
  return {
    prev: idx > 0 ? TOPICS_FLAT[idx - 1] : null,
    next: idx < TOPICS_FLAT.length - 1 ? TOPICS_FLAT[idx + 1] : null,
  };
}
