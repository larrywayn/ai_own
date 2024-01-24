from scipy.io.wavfile import write as write_wav
from transformers import VitsModel, AutoTokenizer
import torch
import numpy as np
import wavio
import soundfile as sf
import nemo.collections.asr as nemo_asr

asr_model = nemo_asr.models.EncDecHybridRNNTCTCBPEModel.from_pretrained(model_name="nvidia/stt_de_fastconformer_hybrid_large_pc")

model = VitsModel.from_pretrained("sjdata/speecht5_finetuned_common_voice_11_de")
#tokenizer = AutoTokenizer.from_pretrained("sjdata/speecht5_finetuned_common_voice_11_de")

text = "3000 Jahre spääter in einer kalten Nachmittagssommernacht, begab es sich, dass die Geister aus ihren Gräbern stiegen"
#inputs = tokenizer(text, return_tensors="pt")

with torch.no_grad():
    output = #(model(**inputs).waveform).cpu().numpy()
    #output_np = np.interp(output, (output.min(), output.max()), (-1, 1))
    #write_wav("C:\\Users\\larry\\Desktop\\test_2.wav", rate=model.config.sampling_rate, data=output_np.astype(np.int8))
    #breakpoint()
    sf.write("C:\\Users\\larry\\Desktop\\test_2.wav", output[0,:], model.config.sampling_rate, 'PCM_24')
#wavio.write("C:\\Users\\larry\\Desktop\\test_2.wav", data=output, rate=22050 ,sampwidth=2)