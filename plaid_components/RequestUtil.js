import AsyncStorage from '@react-native-async-storage/async-storage';

// Utility class for requesting data from Plaid


// Gets the current date in YYYY-MM-DD format
function getFormattedDate(date) {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return [year, month, day].join('-');
  }


// Takes javascript date objects and returns transaction data within that date range
// Requires access token
// If a valid date range is specified, then it will use it, else it will return the data from the last month of transactions
export async function getTransactionData(start = null, end = null) {

    if (start === null || end === null) {
        var startDate = new Date();
        
        startDate.setMonth(startDate.getMonth() - 1);

        var endDate = new Date();

        return await getTransactionDataRange(startDate, endDate);
    } else {
        return await getTransactionDataRange(start, end);
    }
    
}


 async function getTransactionDataRange(start, end) {
     //console.log(start, end)
    // Get access_token from local storage
    try {

        // If the access token exists, then process it
        const token = await AsyncStorage.getItem('@access_token')

        if(token !== null) {

            var formattedStart = getFormattedDate(start);
            var formattedEnd = getFormattedDate(end);
        

            const response = await fetch("https://birdboombox.com/api/getTransactions", {
                method: "POST",
                body: JSON.stringify({ 
                    access_token: token, 
                    start_date: formattedStart,
                    end_date: formattedEnd
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();

            // Pick only the transaction data that is being used
            var formatted = data.map(
                transaction => ({ acct_id: transaction.account_id, vendor_name: transaction.name, category: transaction.category, amount: transaction.amount,date: transaction.date})
            );
            return formatted;

        }

    } catch(e) {
        console.log("error", e);
    }
}