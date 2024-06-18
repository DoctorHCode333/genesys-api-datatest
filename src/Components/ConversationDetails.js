// ConversationDetails.js

import React, { useEffect, useState } from 'react';
import platformClient from 'purecloud-platform-client-v2';

const ConversationDetails = ({ token }) => {
  const [conversationDetails, setConversationDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const client = platformClient.ApiClient.instance;
    client.setEnvironment(platformClient.PureCloudRegionHosts.us_east_1); 
    client.setAccessToken(token);
    const fetchConversations = async () => {
      try {
        const conversationsApi = new platformClient.ConversationsApi();

         
        const conversationsResponse = await conversationsApi.getConversations();
        const conversationIds = conversationsResponse.entities.map(convo => convo.id);

        const detailsResponse = await conversationsApi.getAnalyticsConversationsDetails({ id: conversationIds });
        
        setConversationDetails(detailsResponse.conversations);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching conversation details", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchConversations();
  }, [token]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  return (
    <div>
      <h2>Conversation Details</h2>
      <pre>{JSON.stringify(conversationDetails, null, 2)}</pre>
    </div>
  );
};

export default ConversationDetails;