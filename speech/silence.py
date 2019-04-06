from pydub import AudioSegment
from pydub.silence import split_on_silence
from pydub.utils import db_to_float, ratio_to_db
import azure.cognitiveservices.speech as speechsdk
import os
import time


audio_file = "example1.mp3"
dir_path = os.path.dirname(os.path.realpath(__file__))
try:
    os.mkdir(dir_path+"/data")
except OSError:
    print ("Creation of the directory 'data' failed")

sound = AudioSegment.from_mp3(dir_path+"/"+audio_file)
original_len = len(sound)


def silence_time(sound):
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

    return len(sound_reduced)


def speech_to_text(file):
    # Creates an instance of a speech config with specified subscription key and service region.
    # Replace with your own subscription key and service region (e.g., "westus").
    speech_key, service_region = 
    speech_config = speechsdk.SpeechConfig(subscription=speech_key, region=service_region)

    sound.export("transcript.wav", format="wav")
    audio_config = speechsdk.audio.AudioConfig(filename="transcript.wav")
    # Creates a speech recognizer using a file as audio input.
    # The default language is "en-us".
    speech_recognizer = speechsdk.SpeechRecognizer(speech_config=speech_config, audio_config=audio_config)

    done = False

    def stop_cb(evt):
        """callback that stops continuous recognition upon receiving an event `evt`"""
        print('CLOSING on {}'.format(evt))
        speech_recognizer.stop_continuous_recognition()
        nonlocal done
        done = True


    result = ""

    def add_result(evt):
        nonlocal result
        print("evt {} {}, result {}".format(type(evt.result.text), evt.result.text, result))
        result += evt.result.text

    # Connect callbacks to the events fired by the speech recognizer
    speech_recognizer.recognizing.connect(lambda evt: print('RECOGNIZING: {}'.format(evt)))
    speech_recognizer.recognized.connect(lambda evt: add_result(evt))
    speech_recognizer.session_started.connect(lambda evt: print('SESSION STARTED: {}'.format(evt)))
    speech_recognizer.session_stopped.connect(lambda evt: print('SESSION STOPPED {}'.format(evt)))
    speech_recognizer.canceled.connect(lambda evt: print('CANCELED {}'.format(evt)))
    # stop continuous recognition on either session stopped or canceled events
    speech_recognizer.session_stopped.connect(stop_cb)
    speech_recognizer.canceled.connect(stop_cb)

    # Start continuous speech recognition
    speech_recognizer.start_continuous_recognition()
    while not done:
        time.sleep(.5)

    return result


text = speech_to_text(sound)
word_count = len(text.split())
print("This speech has {} words: {}".format(word_count, text))




