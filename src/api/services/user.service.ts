import { apiRequest } from '../axios';
import { API_ENDPOINTS } from '../endpoints';
import { parseAPIResponse } from '../parseAPIResponse';
import { userSchema } from '../schemas/user.schema';

export const userService = {
  async getCurrent() {
    const rawData = await apiRequest(API_ENDPOINTS.USERS.READ_CURRENT);

    const parsedData = parseAPIResponse(userSchema, rawData);

    return parsedData;
  }
};