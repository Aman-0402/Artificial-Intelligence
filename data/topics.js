/**
 * TOPICS NAV TREE
 * Consumed by sidebar.js to render accordion navigation.
 *
 * Structure:
 *   - id:       unique string identifier
 *   - label:    display name
 *   - icon:     emoji icon for parent group
 *   - file:     relative path to topic HTML (leaf nodes only)
 *   - children: array of leaf nodes (parent groups only)
 */

const TOPICS = [
  {
    id: 'intro',
    label: 'Introduction to AI',
    icon: '🤖',
    children: [
      { id: 'welcome',         label: 'Welcome',           file: 'topics/welcome.html'          },
      { id: 'what-is-ai',     label: 'What is AI?',       file: 'topics/what-is-ai.html'       },
      { id: 'history-of-ai',  label: 'History of AI',     file: 'topics/history-of-ai.html'    },
      { id: 'applications',   label: 'Applications of AI',file: 'topics/applications-ai.html'  },
    ],
  },
  {
    id: 'ml',
    label: 'Machine Learning',
    icon: '📊',
    children: [
      { id: 'supervised',     label: 'Supervised Learning',     file: 'topics/supervised-learning.html'   },
      { id: 'unsupervised',   label: 'Unsupervised Learning',   file: 'topics/unsupervised-learning.html' },
      { id: 'reinforcement',  label: 'Reinforcement Learning',  file: 'topics/reinforcement-learning.html'},
    ],
  },
  {
    id: 'dl',
    label: 'Deep Learning',
    icon: '🧠',
    children: [
      { id: 'neural-networks',label: 'Neural Networks',   file: 'topics/neural-networks.html'      },
      { id: 'cnn',            label: 'CNN Basics',        file: 'topics/cnn-basics.html'           },
      { id: 'rnn-lstm',       label: 'RNN & LSTM',        file: 'topics/rnn-lstm.html'             },
    ],
  },
  {
    id: 'nlp',
    label: 'NLP & Transformers',
    icon: '💬',
    children: [
      { id: 'nlp-intro',      label: 'NLP Introduction',        file: 'topics/nlp-intro.html'     },
      { id: 'transformers',   label: 'Transformers & Attention', file: 'topics/transformers.html'  },
      { id: 'llms',           label: 'LLMs & ChatGPT',          file: 'topics/llms-chatgpt.html'  },
    ],
  },
  {
    id: 'practice',
    label: 'Practice & Resources',
    icon: '🏆',
    children: [
      { id: 'interview',      label: 'Interview Questions', file: 'topics/interview-questions.html'},
      { id: 'mcq-bank',       label: 'MCQ Bank',            file: 'topics/mcq-bank.html'          },
      { id: 'quiz',           label: 'Quiz Challenge',       file: 'topics/quiz-challenge.html'    },
    ],
  },
];

/**
 * Flat map of all leaf topics for prev/next navigation.
 * Order matches sidebar display order.
 */
const TOPICS_FLAT = TOPICS.reduce((acc, group) => {
  group.children.forEach(leaf => acc.push(leaf));
  return acc;
}, []);

/**
 * Look up a topic leaf by id.
 * @param {string} id
 * @returns {object|undefined}
 */
function getTopicById(id) {
  return TOPICS_FLAT.find(t => t.id === id);
}

/**
 * Get prev/next topics relative to a given id.
 * @param {string} id
 * @returns {{ prev: object|null, next: object|null }}
 */
function getAdjacentTopics(id) {
  const idx = TOPICS_FLAT.findIndex(t => t.id === id);
  return {
    prev: idx > 0 ? TOPICS_FLAT[idx - 1] : null,
    next: idx < TOPICS_FLAT.length - 1 ? TOPICS_FLAT[idx + 1] : null,
  };
}
