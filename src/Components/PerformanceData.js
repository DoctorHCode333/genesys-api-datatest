import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const PerformanceData = ({ token }) => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchPerformanceData = async () => {
            try {
                const response = await axios.post(
                    'https://api.mypurecloud.com/api/v2/analytics/conversations/details/query',
                    {
                        interval: '2024-06-05T00:00:00.000Z/2024-06-10T23:59:59.999Z',
                        metrics: ['nOffered', 'nAnswered', 'tTalk'],
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response.data && response.data.result && response.data.result.lenght>0) {
                    const data = {
                        labels: ['Offered', 'Answered', 'Talk Time'],
                        datasets: [
                            {
                                label: 'Performance Metrics',
                                data: [
                                    response.data.results[0].data[0].metrics[0].stats.sum,
                                    response.data.results[0].data[0].metrics[1].stats.sum,
                                    response.data.results[0].data[0].metrics[2].stats.sum,
                                ],
                                backgroundColor: [
                                    'rgba(75, 192, 192, 0.6)',
                                    'rgba(153, 102, 255, 0.6)',
                                    'rgba(255, 159, 64, 0.6)',
                                ],
                            },
                        ],
                    };
                    setChartData(data);
                }else {
                    console.log('No data received from Performance API')
                }
            } catch (error) {
                console.error('Error fetching performance data:', error);
            }
        };

    fetchPerformanceData();
}, [token]);

return (
    <div>
        <h2>Performance Data</h2>
        {chartData && chartData.datasets && chartData.datasets[0] && chartData.datasets[0].data ? 
        ( <Bar data={chartData} />) : (<p> No data available</p>)}
       
    </div>
);
};

export default PerformanceData;