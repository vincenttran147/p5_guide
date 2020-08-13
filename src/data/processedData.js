import rawData from './p5-negotiation.json';

function getConvertedData() {
  const data = [];

  for (let i = 0; i < rawData.length - 5; i += 5) {
    let row = rawData[i];
    const question = row[0];
    const answers = [];

    for (let j = 0; j < 3; ++j) {
      row = rawData[i + 2 + j];
      answers.push({
        answer: row[0],
        status: {
          gloomy: row[1],
          irritable: row[2],
          timid: row[3],
          upbeat: row[4],
        }
      });
    }
    data.push({ question, answers });
  }
  return data;
}

export default getConvertedData();
