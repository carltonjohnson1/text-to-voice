let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector("select");

// Add error handling for speech synthesis
window.speechSynthesis.onerror = (event) => {
    console.error('Speech synthesis error:', event);
};

// Make sure voices are loaded
function loadVoices() {
    voices = window.speechSynthesis.getVoices();
    console.log('Available voices:', voices.length);
    
    if (voices.length > 0) {
        speech.voice = voices[0];
        voiceSelect.innerHTML = ''; // Clear existing options
        voices.forEach((voice, i) => {
            voiceSelect.options[i] = new Option(voice.name, i);
        });
    } else {
        console.warn('No voices available');
    }
}

// Handle voices changed event
window.speechSynthesis.onvoiceschanged = loadVoices;

// Initial load of voices
loadVoices();

voiceSelect.addEventListener("change", () => {
    if (voices.length > 0) {
        speech.voice = voices[voiceSelect.value];
        console.log('Selected voice:', speech.voice.name);
    }
});

document.querySelector("button").addEventListener("click", () => {
    const text = document.querySelector("textarea").value;
    if (!text) {
        console.warn('No text to speak');
        return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    speech.text = text;
    console.log('Speaking text:', text);
    window.speechSynthesis.speak(speech);
});