import os
import sys
import torch
from datetime import datetime
from diffusers import DiffusionPipeline, DPMSolverMultistepScheduler
from diffusers.utils import export_to_video

t = datetime.now()
dateId = t.strftime("%Y_%m_%d_%H_%M_%S")

f_prompt = " ".join(sys.argv[3:])
f_prompt_fname = "_".join(sys.argv[3:])
f_prompt_fname_short = ((f_prompt_fname[:10]) if len(f_prompt_fname) > 10 else f_prompt_fname)
video_name = dateId + "_" + f_prompt_fname_short
video_name_format_original = ".mp4"
video_path_without_extension = os.path.join(os.path.expanduser("~"), "Videos", video_name)

# load pipeline
pipe = DiffusionPipeline.from_pretrained("cerspense/zeroscope_v2_576w", torch_dtype=torch.float16)
pipe.scheduler = DPMSolverMultistepScheduler.from_config(pipe.scheduler.config)
# pipe.enable_model_cpu_offload()
# optimize for GPU memory
pipe.enable_vae_slicing()

# generate
video_frames = pipe(f_prompt, num_inference_steps=int(sys.argv[1]), num_frames=int(sys.argv[2])).frames
# convent to video

video_path = video_path_without_extension + video_name_format_original
print(video_path)
export_to_video(video_frames, video_path)
print("+#&#+")
print(f"{video_path_without_extension}")
