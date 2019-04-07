import Axios from 'axios';

const base = 'http://127.0.0.1:8000/api/';
const mockData = () => ({
  data: {
    smile: Math.random() > 0.5,
    slouch: Math.random() > 0.5,
    emotion: Math.random() > 0.5,
    focus: Math.random() > 0.5,
  },
});

export async function sendSnapshot(snapshot) {
  // const { data } = await Axios.post(`${base}snapshot`, { data: snapshot });
  // return data;
  return new Promise(resolve => setTimeout(() => resolve(mockData()), 3000));
}

export async function sendCorrectSnapshot(snapshot) {
  // const { data } = await Axios.post(`${base}initialSnapshot`, {
  //   data: snapshot,
  // });
  // return data;
  return new Promise(resolve => setTimeout(() => resolve(mockData()), 1500));
}
