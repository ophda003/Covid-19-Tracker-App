import axios from 'axios';
import _ from 'lodash';

const url = 'https://api.covid19api.com';

export const fetchData = async (country) => {
    let changableUrl = `${url}/world/total`;

    if (country) {
        changableUrl = `${url}/total/country/${country}`;

        try {
            const { data } = await axios.get(changableUrl);
            if (!data.length) {
                return { TotalConfirmed: 0, TotalRecovered: 0, TotalDeaths: 0 };
            }
            const lastestData = data[data.length -1];
            const { Confirmed, Deaths, Recovered } = lastestData;
            return { TotalConfirmed: Confirmed, TotalRecovered: Recovered, TotalDeaths: Deaths, countryData: data };
    
        } catch (err) {
            console.log(err);
        }

    } else {
        try {
            const { data: { TotalConfirmed, TotalDeaths, TotalRecovered } } = await axios.get(changableUrl);
    
            return { TotalConfirmed, TotalRecovered, TotalDeaths }
    
        } catch (err) {
            console.log(err);
        }
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${url}/daily`);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate,
        }));

        return modifiedData
    } catch (err) {
        console.log(err);
    }
}

export const fetchCountries = async () => {
    try {
        const { data } = await axios.get(`${url}/countries`);
        const sortedData = _.sortBy(data, ['Country']);
        return sortedData.map((country) => country.Country);
    } catch(err) {
        console.log(err);
    }
}
