import { apiRequest } from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import { parseAPIResponse } from '../parseAPIResponse';
import { userScheme } from '../schemes/user.scheme';

export const userService = {
  async getCurrent() {
    const rawData = await apiRequest(API_ENDPOINTS.USERS.READ_CURRENT);

    const parsedData = parseAPIResponse(userScheme, rawData);

    return parsedData;
  }
};