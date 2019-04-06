import Axios from 'axios';

const base = 'https://demo-interviewapi.herokuapp.com/api/';

export async function sendSnapshot(snapshot) {
  const { data } = await Axios.post(`${base}snapshot`, { snapshot });
  return data;
}

export async function sendCorrectSnapshot(snapshot) {
  const { data } = await Axios.post(`${base}initialSnapshot`, { snapshot });
  return data;
}
