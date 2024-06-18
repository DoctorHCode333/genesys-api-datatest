import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const PlatformUsageChart = ({ token }) => {
  const [topOAuthClients, setTopOAuthClients] = useState([]);
  const [topRequestedUrls, setTopRequestedUrls] = useState([]);

  useEffect(() => {
    const fetchPlatformUsage = async () => {
      try {
        const response = await axios.get('https://api.mypurecloud.com/api/v2/admin/platformusage/clients', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Process response to extract top 5 OAuth clients and URLs
        const topOAuthClients = response.data.slice(0, 5).map(item => ({
          name: item.clientName,
          requestCount: item.requestCount,
        }));

        const topRequestedUrls = response.data.slice(0, 5).map(item => ({
          url: item.url,
          requestCount: item.requestCount,
        }));

        setTopOAuthClients(topOAuthClients);
        setTopRequestedUrls(topRequestedUrls);
      } catch (error) {
        console.error('Error fetching platform usage data:', error);
      }
    };

    fetchPlatformUsage();
  }, [token]);

  const oauthClientsData = {
    labels: topOAuthClients.map(client => client.name),
    datasets: [
      {
        label: 'Top OAuth Clients by Request Count',
        data: topOAuthClients.map(client => client.requestCount),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const requestedUrlsData = {
    labels: topRequestedUrls.map(url => url.url),
    datasets: [
      {
        label: 'Top Requested URLs by Request Count',
        data: topRequestedUrls.map(url => url.requestCount),
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales:{
      y:{
        beginAtZero: true,
        type: 'linear',
      },
    },
  };

  return (
    <div>
      <h2>Platform Usage Metrics</h2>
      <div>
        <h3>Top OAuth Clients</h3>
        <Bar
          key = "oauthClientChart"
          data={oauthClientsData}
          options={options}
        />
      </div>
      <div>
        <h3>Top Requested URLs</h3>
        <Bar
         key = "requestedUrlsChart"
          data={requestedUrlsData}
          options={options}
        />
      </div>
    </div>
  );
};

export default PlatformUsageChart;