import torchaudio
from speechbrain.pretrained import Tacotron2
from speechbrain.pretrained import HIFIGAN


# Intialize TTS (tacotron2) and Vocoder (HiFIGAN)
tacotron2 = Tacotron2.from_hparams(
    source="C:/Users/larry/Documents/Projekte/2024/speechbrain/recipes/LJSpeech/TTS/tacotron2/results/tacotron2/1234",
    savedir="tmpdir_tts",
)
hifi_gan = HIFIGAN.from_hparams(
    source="C:/Users/larry/Documents/Projekte/2024/speechbrain/recipes/LJSpeech/TTS/tacotron2/results/tacotron2/1234",
    savedir="tmpdir_vocoder",
)

# Running the TTS
mel_output, mel_length, alignment = tacotron2.encode_text(
    "Hallo ich bin Larrywayn. Ich bin Streamer und bin schon echt müde, weil das mit dem Model und allem doch schon kompliziert war. Deshalb gehe ich nun gleich schlafen."
)

# Running Vocoder (spectrogram-to-waveform)
waveforms = hifi_gan.decode_batch(mel_output)

print("+#&#+")
# Save the waverform
torchaudio.save("C:\\Users\\larry\\Desktop\\test_2.wav", waveforms.squeeze(1), 22050)
