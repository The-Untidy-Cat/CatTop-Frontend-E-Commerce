import axios from "axios";

export const getDeepLinkForAndroid = async () => {
  try {
    const response = await axios.get(
      "https://api.vietqr.io/v2/android-app-deeplinks"
    );
    return response?.data?.apps;
  } catch (error) {
    return [];
  }
};

export const getDeepLinkForIOS = async () => {
  try {
    const response = await axios.get(
      "https://api.vietqr.io/v2/ios-app-deeplinks"
    );
    return response?.data?.apps;
  } catch (error) {
    return [];
  }
};
