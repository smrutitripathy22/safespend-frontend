import axiosInstance from "../utils/axiosInstance";

export const kycUpload = async (formData, fSuccess, fError) => {
  try {
    const res = await axiosInstance.post("/kyc", formData, {
      headers: {
     
        "Content-Type": "multipart/form-data",
      },
    });
    if (res.data) fSuccess(res.data.data);
  } catch (error) {
    fError(error);
  }
};

export const deactivateAccount=async(fSuccess,fError)=>{
    try {
    const res = await axiosInstance.post("/auth/deactivate")
    if (res.data) fSuccess(res.data.data);
  } catch (error) {
    fError(error);
  }
}
