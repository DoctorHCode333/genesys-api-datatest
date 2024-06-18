import React, { useEffect } from 'react';
import platformClient from 'purecloud-platform-client-v2';

const PerformanceData = ({ token }) => {
  

  useEffect(() => {
    try{
      const client = new platformClient();
      console.log(client);
      // client.setEnvironment(platformClient.PureCloudRegionHosts.us_east_1); 
      // client.setAccessToken(token);
    }catch(error){
      console.log("Module Error",error);
    }    
    // Set the access token for the platformClient
    // client.setAccessToken(token);

    // Example function to use the API
    // const fetchPerformanceData = async () => {
    //   try {
    //     const usersApi = new platformClient.UsersApi();
    //     const userMe = await usersApi.getUsersMe();
    //     console.log('User Me:', userMe);
    //   } catch (error) {
    //     console.error('Error fetching performance data:', error);
    //   }
    // };

    // fetchPerformanceData();
  }, [token]); // Run the effect whenever the token changes

  return (
    <div>
      <h1>Performance Data</h1>
      <p>Fetching performance data...</p>
    </div>
  );
};

export default PerformanceData;


// import React, { useEffect, useState } from 'react';
// //import axios from 'axios';
// import { Bar } from 'react-chartjs-2';
// import platformClient from 'purecloud-platform-client-v2';
// const client = platformClient.ApiClient.instance;
// client.setEnvironment(platformClient.PureCloudRegionHosts.us_east_1);

// const PerformanceData = ({ token }) => {
//   const [chartData, setChartData] = useState(null);
//   const [responseData, setResponseData] = useState([]);
//   console.log(platformClient);
  
 
//   client.setAccessToken(token);
//   useEffect(() => {
//     const fetchAgentMetrics = async () => {
//       try {
//         let apiInstance = new platformClient.ConversationsApi();

//         let body = {
//             "interval": "2024-06-01T13:00:00.000Z/2024-06-07T13:00:00.000Z",
//             "granularity": "PT12H",
//             "groupBy": [
//                 "queueId",
//                 "userId"
//             ],
//             "metrics": [
//                 "nOutboundConnected",
//                 "tAnswered",
//                 "tAbandon",
//                 "tHandle"
//             ],
//             "filter": {
//             "type": "and",
//             "predicates": [
//                 {
//                 "dimension": "mediaType",
//                 "value": "voice"
//                 },
//                 {
//                 "dimension": "direction",
//                 "value": "outbound"
//                 }
//             ]
//             }
//         }; // String | conversationId

//         // Get a conversation by id
//         apiInstance.postAnalyticsConversationsAggregatesQuery(body)
//         .then((data) => {
//             setResponseData(JSON.stringify(data, null, 2));
//             console.log(`postAnalyticsConversationsAggregatesQuery success! data: ${JSON.stringify(data, null, 2)}`);
//         })
//         .catch((err) => {
//             console.log("There was a failure calling postAnalyticsConversationsAggregatesQuery");
//             console.error(err);
//         });
//         console.log(responseData);
//         const data = responseData.map(result => ({
//           label: result.group.voice,
//           value: result.data.metrics.stats.max,
//         }));

//         // Example data format for Chart.js
//         setChartData({
//           labels: data.map(item => item.label),
//           datasets: [
//             {
//               label: 'Average Handling Time (seconds)',
//               data: data.map(item => item.value),
//               backgroundColor: 'rgba(75,192,192,0.2)',
//               borderColor: 'rgba(75,192,192,1)',
//               borderWidth: 1,
//             },
//           ],
//         });

//       } catch (error) {
//         console.error('Error fetching performance data:', error);
//       }
//     };

//     fetchAgentMetrics();
//   }, [token]);

//   return (
//     <div>
//       <h2>Agent Performance</h2>
//       {chartData && (
//         <Bar
//           data={chartData}
//           options={{
//             scales: {
//               y: {
//                 beginAtZero: true,
//               },
//             },
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default PerformanceData;