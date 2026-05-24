/**
 * TEXT-TO-SPEECH MANAGER
 * Uses Web Speech API. Chrome on file:// only.
 * Topic pages call TTSManager.read(text) or use the TTS button.
 * Shell header TTS button toggles speaking state.
 */

const TTSManager = (() => {
  let utterance = null;
  let isSpeaking = false;
  const synth = window.speechSynthesis;

  function speak(text) {
    if (!synth) return;
    stop();

    utterance = new SpeechSynthesisUtterance(text);
    utterance.rate  = 0.95;
    utterance.pitch = 1;
    utterance.lang  = 'en-US';

    utterance.onstart = () => {
      isSpeaking = true;
      updateUI(true);
    };

    utterance.onend = utterance.onerror = () => {
      isSpeaking = false;
      updateUI(false);
    };

    synth.speak(utterance);
  }

  function stop() {
    if (synth) synth.cancel();
    isSpeaking = false;
    updateUI(false);
  }

  function toggle() {
    if (isSpeaking) {
      stop();
    } else {
      // Read from current iframe content
      try {
        const iframe = document.getElementById('content-frame');
        const body = iframe?.contentDocument?.body;
        const text = body
          ? body.innerText.replace(/\n{3,}/g, '\n\n')
          : 'No content to read.';
        speak(text);
      } catch (_) {
        speak('Unable to read content. Please use Chrome for text-to-speech on file protocol.');
      }
    }
  }

  function updateUI(speaking) {
    const btn = document.getElementById('tts-toggle');
    btn?.classList.toggle('is-speaking', speaking);
    btn?.setAttribute('aria-label', speaking ? 'Stop reading' : 'Read aloud');
  }

  function init() {
    document.getElementById('tts-toggle')?.addEventListener('click', toggle);
  }

  return { init, speak, stop, toggle };
})();
