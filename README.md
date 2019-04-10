# CopenHack2019

## Interview Prep

Help people prepare for interviews or public speeches which feedback in real time on their body movements, face emotions and feedback analysis of their answers in terms of speech patterns and breaks in speaking flow.

### Face analysis part: 
We used the cognitive services Face detect api to extract emotion, smile, and posture data and feed it back to the frontend for notification feedback for the user.

### Speech analysis part:
The speech analysis  script will record the voice input and compute how much time the person was quiet and the speed of speech (words per minute). It uses azure services to get transcription of what the person answered so they can re-read it later.

### Pose analysis part:
We used a Deep Neural Net model for performing Human Pose Estimation in OpenCV. The model predicts the posture of a single person in the frame and then checks if the person has a proper posture or not
