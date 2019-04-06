from pydub import AudioSegment
from pydub.silence import split_on_silence
from pydub.utils import db_to_float, ratio_to_db
import os


dir_path = os.path.dirname(os.path.realpath(__file__))
try:
    os.mkdir(dir_path+"/data")
except OSError:
    print ("Creation of the directory 'data' failed")

sound = AudioSegment.from_mp3(dir_path+"/example1.mp3")
original_len = len(sound)

# Let's consider anything that is 30 decibels quieter than
# the average volume of the podcast to be silence
average_loudness = sound.rms
silence_threshold = ratio_to_db(average_loudness*db_to_float(-30))
print("Average loundness {} > silence {}".format(silence_threshold, -16))


chunks = split_on_silence(sound,
    # must be silent for at least half a second
    min_silence_len=100,

    # consider it silent if quieter than -16 dBFS
    silence_thresh=-silence_threshold
)

print(chunks)
# combine all the chunks back together
sound_reduced = AudioSegment.empty()
for chunk in chunks:
    sound_reduced += chunk
reduced_length = len(sound_reduced)
words = len(chunks)

# save the result
print("original length {}, reduced length {}, number of words {}".format(original_len, reduced_length, words))
for i, chunk in enumerate(chunks):
    chunk.export(dir_path+"/data/chunk{0}.mp3".format(i), format="mp3")
sound_reduced.export(dir_path+"/data/final.mp3", format="mp3")