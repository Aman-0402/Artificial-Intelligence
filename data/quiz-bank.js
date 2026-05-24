const QUIZ_BANK = [
  {
    "q": "Which algorithm minimises a loss function using gradient descent?",
    "options": ["K-Means", "Apriori", "Neural Network backprop", "DBSCAN"],
    "answer": 2,
    "topic": "Deep Learning"
  },
  {
    "q": "What does the 'attention' mechanism in Transformers compute?",
    "options": [
      "Euclidean distance between tokens",
      "Weighted sum of values based on query-key similarity",
      "Convolutional feature maps",
      "Gradient of the loss w.r.t. embeddings"
    ],
    "answer": 1,
    "topic": "Transformers"
  },
  {
    "q": "In reinforcement learning, which quantity estimates long-term reward from state s taking action a?",
    "options": ["V(s)", "Q(s,a)", "π(a)", "R(t)"],
    "answer": 1,
    "topic": "Reinforcement Learning"
  },
  {
    "q": "PCA reduces dimensionality by projecting onto directions of maximum…",
    "options": ["Correlation", "Bias", "Variance", "Entropy"],
    "answer": 2,
    "topic": "Unsupervised Learning"
  },
  {
    "q": "Which activation function is preferred in hidden layers of deep networks to avoid vanishing gradients?",
    "options": ["Sigmoid", "Tanh", "ReLU", "Softmax"],
    "answer": 2,
    "topic": "Neural Networks"
  },
  {
    "q": "BERT is trained using which self-supervised objective?",
    "options": ["Next sentence prediction only", "Masked Language Modelling + NSP", "Causal language modelling", "Contrastive learning"],
    "answer": 1,
    "topic": "Transformers"
  },
  {
    "q": "A CNN's convolutional layer preserves which property that a fully-connected layer loses?",
    "options": ["Spatial locality", "Batch size", "Label distribution", "Learning rate"],
    "answer": 0,
    "topic": "CNN"
  },
  {
    "q": "Which technique makes LLMs follow instructions and avoid harmful outputs?",
    "options": ["Data augmentation", "Dropout regularisation", "RLHF (Reinforcement Learning from Human Feedback)", "L2 weight decay"],
    "answer": 2,
    "topic": "LLMs"
  },
  {
    "q": "In supervised learning, what is 'overfitting'?",
    "options": [
      "Model trains too slowly",
      "Model performs well on training data but poorly on unseen data",
      "Model ignores all features",
      "Model has too few parameters"
    ],
    "answer": 1,
    "topic": "Supervised Learning"
  },
  {
    "q": "Which NLP technique converts words to dense vectors capturing semantic similarity?",
    "options": ["TF-IDF", "Bag of Words", "Word2Vec / word embeddings", "Stemming"],
    "answer": 2,
    "topic": "NLP"
  },
  {
    "q": "The vanishing gradient problem in RNNs is primarily solved by:",
    "options": ["Increasing learning rate", "LSTM gates (forget/input/output)", "Adding more layers", "Using softmax output"],
    "answer": 1,
    "topic": "RNN / LSTM"
  },
  {
    "q": "In the Transformer architecture, positional encoding is added to:",
    "options": ["Attention weights", "Output logits", "Token embeddings before attention", "The loss function"],
    "answer": 2,
    "topic": "Transformers"
  },
  {
    "q": "Which metric is most appropriate for imbalanced classification datasets?",
    "options": ["Accuracy", "F1 Score", "Mean Squared Error", "R²"],
    "answer": 1,
    "topic": "Supervised Learning"
  },
  {
    "q": "RAG (Retrieval-Augmented Generation) helps LLMs by:",
    "options": [
      "Fine-tuning on new data",
      "Fetching relevant documents at inference time to ground responses",
      "Increasing model parameters",
      "Applying RLHF post-training"
    ],
    "answer": 1,
    "topic": "LLMs"
  },
  {
    "q": "Which of the following is an example of unsupervised learning?",
    "options": ["Email spam classification", "House price prediction", "Customer segmentation with K-Means", "Image recognition with labels"],
    "answer": 2,
    "topic": "Unsupervised Learning"
  }
];
