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
  
export async function getTransactionData() {
    // Get access_token from local storage
    try {

        console.log("ST")

        // If the access token exists, then process it
        const token = await AsyncStorage.getItem('@access_token')

        if(token !== null) {
            
            var startDate = new Date();
            //endDate.setDate(endDate.getDate() - 10);
            startDate.setMonth(startDate.getMonth() - 1);

            var formattedStart = getFormattedDate(startDate);
            var formattedEnd = getFormattedDate(new Date())
        

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
                transaction => ({acct_id: transaction.account_id, vendor_name: transaction.name, category: transaction.category, amount: transaction.amount, date: transaction.date})
            );

            return formatted;

        }

    } catch(e) {
        console.log(e);
    }
}