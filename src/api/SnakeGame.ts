import { API_URL } from "./config/constants"

const END_POINTS = {
  newGame: () => `${API_URL}/new?`,
  validateGame: () => `${API_URL}/validate`,
}

export const startNewGame = async (width: number, height: number) => {
  try {
    const response = await fetch(`${END_POINTS.newGame()}w=${width}&h=${height}`);
    if(response.ok){
      const result = await response.json();
      return result.data;
    } else {
      const error = { error: response.statusText };
      throw error;
    }
  } catch (e: any) {
    console.error(e);
    return e;
  }
}
export const validateNewGame = async (payload: any) => {
  const postBody = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      // mode: 'no-cors',
    },
    body: JSON.stringify(payload),
  };
  try {
    const response = await fetch(`${END_POINTS.validateGame()}`, postBody);
    if(response.ok){
      const result = await response.json();
      return result.data;
    } else {
      const error = { error: response.statusText };
      throw error;
    }
  } catch (e: any) {
    console.error(e);
    return e;
  }
}