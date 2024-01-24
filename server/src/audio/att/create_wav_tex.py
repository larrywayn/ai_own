import sys
from huggingsound import SpeechRecognitionModel

model = SpeechRecognitionModel("jonatasgrosman/wav2vec2-large-xlsr-53-german")
audio_paths = [sys.argv[1]]
transcriptions = model.transcribe(audio_paths)
print("+#&#+")
print(transcriptions[0]["transcription"])