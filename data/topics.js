const TOPICS = [
  {
    id: 'intro',
    label: 'Introduction to Artificial Intelligence',
    icon: '🤖',
    children: [
      { id: 'what-is-ai',     label: 'What is Artificial Intelligence?',                   file: 'topics/intro/what-is-ai.html'      },
      { id: 'history-of-ai',  label: 'History of Artificial Intelligence',                 file: 'topics/intro/history-of-ai.html'   },
      { id: 'types-of-ai',    label: 'Types of Artificial Intelligence',                   file: 'topics/intro/types-of-ai.html'     },
      { id: 'ai-vs-ml',       label: 'AI vs ML vs Deep Learning vs Generative AI',         file: 'topics/intro/ai-vs-ml.html'        },
      { id: 'applications',   label: 'Real-World Applications of Artificial Intelligence', file: 'topics/intro/applications-ai.html' },
      { id: 'how-ai-works',   label: 'How AI Actually Works',                              file: 'topics/intro/how-ai-works.html'    },
      { id: 'branches-ai',    label: 'Branches of Artificial Intelligence',                file: 'topics/intro/branches-of-ai.html'         },
      { id: 'adv-limit-ai',  label: 'Advantages and Limitations of AI',                  file: 'topics/intro/advantages-limitations-ai.html'    },
      { id: 'ai-lifecycle',  label: 'AI Development Lifecycle',                          file: 'topics/intro/ai-development-lifecycle.html'     },
      { id: 'ai-humans',     label: 'AI, Humans, and Intelligence',                      file: 'topics/intro/ai-humans-intelligence.html'        },
      { id: 'ai-terms',      label: 'Important AI Terminologies & Keywords',              file: 'topics/intro/ai-terminologies.html'              },
      { id: 'learning-types', label: 'Types of Learning in AI',                          file: 'topics/intro/types-of-learning.html'             },
      { id: 'data-in-ai',    label: 'Data in Artificial Intelligence',                   file: 'topics/intro/data-in-ai.html'                    },
    ],
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    icon: '📊',
    children: [
      { id: 'supervised',    label: 'Supervised Learning',    file: 'topics/ml/supervised-learning.html'    },
      { id: 'unsupervised',  label: 'Unsupervised Learning',  file: 'topics/ml/unsupervised-learning.html'  },
      { id: 'reinforcement', label: 'Reinforcement Learning', file: 'topics/ml/reinforcement-learning.html' },
    ],
  },
  {
    id: 'dl',
    label: 'Deep Learning',
    icon: '🧠',
    children: [
      { id: 'neural-networks', label: 'Neural Networks', file: 'topics/dl/neural-networks.html' },
      { id: 'cnn',             label: 'CNN Basics',       file: 'topics/dl/cnn-basics.html'      },
      { id: 'rnn-lstm',        label: 'RNN & LSTM',       file: 'topics/dl/rnn-lstm.html'        },
    ],
  },
  {
    id: 'nlp',
    label: 'NLP & Transformers',
    icon: '💬',
    children: [
      { id: 'nlp-intro',    label: 'NLP Introduction',         file: 'topics/nlp/nlp-intro.html'    },
      { id: 'transformers', label: 'Transformers & Attention',  file: 'topics/nlp/transformers.html' },
      { id: 'llms',         label: 'LLMs & ChatGPT',           file: 'topics/nlp/llms-chatgpt.html' },
    ],
  },
  {
    id: 'practice',
    label: 'Practice & Resources',
    icon: '🏆',
    children: [
      { id: 'interview', label: 'Interview Questions', file: 'topics/practice/interview-questions.html' },
      { id: 'mcq-bank',  label: 'MCQ Bank',            file: 'topics/practice/mcq-bank.html'           },
      { id: 'quiz',      label: 'Quiz Challenge',       file: 'topics/practice/quiz-challenge.html'     },
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
