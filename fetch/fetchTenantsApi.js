import fetch from 'node-fetch';


// get data from API
export async function fetchData(apiUrl, token) {

    const currentDate = new Date();
    const baseDate = currentDate.toISOString(); 

    let comparisonDate = new Date(currentDate);
    comparisonDate.setFullYear(comparisonDate.getFullYear() - 1);

    const dayOffset = currentDate.getDay() - comparisonDate.getDay();
    comparisonDate.setDate(comparisonDate.getDate() + dayOffset);
    const comparisonDateISO = comparisonDate.toISOString(); // Date de comparaison au for

    // request elems
    const data = {
    BaseDate: baseDate,
    ComparisonDate: comparisonDateISO,
    PeriodType: "D",
    };

    const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Authorization: token,
    },
    body: JSON.stringify(data),
    };

    // fetch data
    try {
        const response = await fetch(apiUrl, options);
        if (!response.ok) {
          throw new Error(`Erreur HTTP : ${response.status}`);
        }
        const jsonData = await response.json();
        //console.log("Données récupérées :", jsonData);
        return jsonData; // Return data for post-process
      } catch (error) {
        console.error("Error while fetching data ! :", error.message);
        throw error;
      }

}