import axiosInstance from "../utils/axiosInstance";

export const stripeCheckout = async (amount, fSuccess, fError) => {
  try {
    let res = await axiosInstance.post("/stripe/create-checkout-session", { amount });
    if (res.data) fSuccess(res.data);
  } catch (error) {
    fError(error);
  }
};


export const verifyPayement = async (sessionId, fSuccess, fError) => {
  try {
    let res = await axiosInstance.post(`/wallet/verify-session?sessionId=${sessionId}`);
    if (res.data) fSuccess(res.data);
  } catch (error) {
    fError(error);
  }
};
