import { AmityUserTokenManager, ApiRegion } from '@amityco/js-sdk';
import { apiKey, displayName, userId } from '~/social/constants';

const REWARDS_BASE_URL =
  'https://cym-hachiko-rest-go-964250d07549.herokuapp.com/api/v1/rewards?shop_id=1&logged_in_customer_id=';
const REWARDS_TYPE = '&type=challenge';

const ServerAPI = () => {
  async function getAccessToken() {
    const { accessToken, err } = await AmityUserTokenManager.createUserToken(apiKey, ApiRegion.US, {
      userId: userId,
    });
    return accessToken;
  }

  //////////////////////////////// ARISE CALLS //////////////////////////////////////////
  const ariseGetRewards = async (ariseUserId) => {
    console.log(ariseUserId);
    try {
      const response = await fetch(`${REWARDS_BASE_URL}${ariseUserId}${REWARDS_TYPE}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error: ', response.status);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };
  //////////////////////////////// USER //////////////////////////////////////////
  // get user metaData
  const getUserMetaData = async (ariseUserId) => {
    const url = `https://api.us.amity.co/api/v3/users/${ariseUserId}`;
    try {
      const accessToken = await getAccessToken();

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };

  const savePost = async (ariseUserId, fetchedMetadata, savedPostIds) => {
    const url = `https://api.us.amity.co/api/v3/users/`;
    try {
      const accessToken = await getAccessToken();

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId: `${ariseUserId}`,
          metadata: {
            ariseTier: fetchedMetadata.ariseTier,
            agreedBetaTerms: fetchedMetadata.agreedBetaTerms,
            agreedToTerms: fetchedMetadata.agreedToTerms,
            userEmail: fetchedMetadata.userEmail,
            shopifyUrl: fetchedMetadata.shopifyUrl,
            savedPostIds,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };

  // update userMetaData

  const followUser = async (userId) => {
    const url = `https://api.us.amity.co/api/v4/me/following/${userId}`;

    try {
      const accessToken = await getAccessToken();

      const response = await fetch(url, {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          deleteAll: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };
  const deleteUser = async (userId) => {
    const url = `https://api.us.amity.co/api/v4/users/${userId}`;

    try {
      const accessToken = await getAccessToken();

      const response = await fetch(url, {
        method: 'DELETE',

        headers: {
          Authorization: `Bearer ${'4471e3d7c5564e4f9a3e3fc9309d8c7de1871d6b'}`,
        },
        body: JSON.stringify({
          deleteAll: true,
        }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };

  const getPosts = async (text) => {
    const url = 'https://beta.amity.services/search/v2/posts';

    try {
      const accessToken = await getAccessToken();

      const response = await fetch(url, {
        method: 'POST',

        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: apiKey,
          userId: userId,
          query: {
            targetType: 'public',
            publicSearch: true,
            text: text,
          },
          populatePostObject: true,
          sort: {
            reactionsCount: 'desc',
          },
        }),
      });

      if (!response.ok) {
        console.error('Error:', response);
        throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }

    // const url = 'https://beta.amity.services/search/v2/posts';
  };

  // fetch posts within community
  const getGroupPosts = async (groupId) => {
    const url = `https://api.us.amity.co/api/v3/community-feeds/${groupId}`;

    try {
      const accessToken = await getAccessToken();

      const response = await fetch(url, {
        method: 'GET',

        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        // body: JSON.stringify({
        //   deleteAll: true,
        // }),
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };

  //////////////////////////////// NOTIFICATION CALLS //////////////////////////////////////////

  const getNotifications = async () => {
    const url = 'https://beta.amity.services/notifications/v2/history';

    try {
      const accessToken = await getAccessToken();

      const response = await fetch(url, {
        method: 'GET',

        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };

  const setReadNotification = async (body) => {
    const url = 'https://beta.amity.services/notifications/v2/read';

    try {
      const accessToken = await getAccessToken();

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ verb: body.verb, targetId: body.targetId }),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };

  const updateUserName = async (shopifyCustomerName) => {
    const url = `https://api.us.amity.co/api/v3/users`;

    try {
      const accessToken = await getAccessToken();

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          userId: `${userId}`,
          displayName: `${shopifyCustomerName}`,
        }),
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };

  const likedList = async (url) => {
    try {
      const accessToken = await getAccessToken();

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error retriveing user list', error);
    }
  };

  const getCommunityUsers = async (communityId) => {
    const baseUrl = `https://api.us.amity.co/api/v3/communities/${communityId}/users`;
    const limit = 10; // Number of results per page
    let allUsers = [];

    try {
      const accessToken = await getAccessToken();

      let nextCursor = null;

      do {
        const url = nextCursor
          ? `${baseUrl}?sortBy=firstCreated&options%5Blimit%5D=${limit}&options%5Btoken%5D=${encodeURIComponent(
              nextCursor,
            )}`
          : `${baseUrl}?sortBy=firstCreated&options%5Blimit%5D=${limit}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = await response.json();
        allUsers = allUsers.concat(data.users); // Concatenate current page results

        nextCursor = data.paging.next;
      } while (nextCursor); // Continue fetching while there's a next cursor

      return allUsers;
    } catch (error) {
      console.log('Error fetching community users:', error);
      throw error; // Rethrow the error after logging
    }
  };

  const getFollowers = async (userId) => {
    const baseUrl = `https://api.us.amity.co/api/v4/users/${userId}/followers`;
    const limit = 100; // Number of results per page
    let allUsers = [];

    try {
      const accessToken = await getAccessToken();

      let nextCursor = null;

      do {
        const url = nextCursor
          ? `${baseUrl}?limit=${limit}&token=${nextCursor}`
          : `${baseUrl}?limit=${limit}`;

        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data = await response.json();
        allUsers = allUsers.concat(data.users); // Concatenate current page results

        nextCursor = data.paging.next;
      } while (nextCursor); // Continue fetching while there's a next cursor

      return allUsers;
    } catch (error) {
      console.log('Error fetching community users:', error);
      throw error; // Rethrow the error after logging
    }
  };

  const deletePost = async (postId) => {
    try {
      const accessToken = await getAccessToken();

      const response = await fetch(`https://api.us.amity.co/api/v4/posts/${postId}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error retriveing user list', error);
    }
  };

  const getFeaturedPosts = async (postIdsArray) => {
    try {
      const accessToken = await getAccessToken();

      const response = await fetch(`https://api.us.amity.co/api/v3/posts/list?${postIdsArray}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(console.log('Error:', error));
    }
  };

  const getFollowStatus = async (targetId) => {
    const url = `https://api.us.amity.co/api/v5/users/${targetId}/followInfo`;
    try {
      const accessToken = await getAccessToken();

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };

  return {
    ariseGetRewards,
    getNotifications,
    setReadNotification,
    deleteUser,
    followUser,
    updateUserName,
    likedList,
    getCommunityUsers,
    getUserMetaData,
    savePost,
    getPosts,
    getFollowers,
    getGroupPosts,
    deletePost,
    getFeaturedPosts,
    getFollowStatus,
  };
};

export default ServerAPI;
