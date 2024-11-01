import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

axios.defaults.withCredentials = true;

const useAuthStore = create((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,

  signup: async (email) => {
    // Only email for now
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/signup`, { email });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyEmail: async (code) => {
    set({ isLoading: true, error: null})
    try{
      const response = await axios.post(`${API_URL}/verify-email`, { code });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch(error) {
      set({
        error: error.response?.data?.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  
  },

  login: async (email) => {
    // Only email for now
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/login`, { email });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error loging in up",
        isLoading: false,
      });
      throw error;
    }
  },

  verifyLoginOtp: async (otp) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, { otp });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null, // Clear any existing error after successful verification
      });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Error verifying OTP",
        isLoading: false,
      });
      console.error("Error verifying OTP:", error); // Log error for debugging
      throw error;
    }
  },
}
));

export default useAuthStore;
