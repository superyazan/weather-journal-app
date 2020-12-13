/* Global Variables */
const apiKey = '&APPID=***&units=imperial'; // added the unit imperial
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// get data function
const getData = async (base, zipcode, api) => {
  const response = await fetch(base + zipcode + api);
  try {
    const weather = await response.json();
    // console.log(weather);
    return weather;
  } catch (error) {
    console.log('we found an error .. ', error);
  }
};

// post data function
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    // console.log(newData);
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// Create a new date instance dynamically with JS
const d = new Date();
const newDate = `${d.getMonth()}.${d.getDate()}.${d.getFullYear()}`;

// update the ui
const updateUI = async () => {
  const request = await fetch('/newdata');
  try {
    const finalData = await request.json();

    // this commented part will get the last set of data in the array that store all the submitted data
    
    /*    document.getElementById('date').innerHTML = `Today is : ${finalData[finalData.length - 1].Date}`;
    document.getElementById('temp').innerHTML = `The temprature is ${finalData[finalData.length - 1].Temp} Kelvin`;
    document.getElementById('name').innerHTML = `The city is ${finalData[finalData.length - 1].Name}`;
    document.getElementById('content').innerHTML = `You feel ${finalData[finalData.length - 1].Feeling}`; */

    // this will get the data from the end object.
    document.getElementById('date').innerHTML = `Today is : ${finalData.Date}`;
    document.getElementById('temp').innerHTML = `The temprature is ${finalData.Temp} F`;
    document.getElementById('content').innerHTML = `You feel ${finalData.Feeling}`;
  } catch (error) {
    console.log(' this is error..', error);
  }
};

function funPost() {
  const zip = document.getElementById('zip');
  const feel = document.getElementById('feelings').value;
  getData(baseURL, zip.value, apiKey)
    .then((result) => {
      // eslint-disable-next-line no-use-before-define
      postData('/', {
        Date: newDate, Temp: result.main.temp, Feeling: feel,
      });
      updateUI(); // changed the relation
    });
}

document.getElementById('generate').addEventListener('click', funPost);
