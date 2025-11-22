import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "../services/api";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(null);
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const isAuthenticated = computed(() => !!token.value);

  function setToken(newToken) {
    token.value = newToken;
    if (newToken) {
      localStorage.setItem("auth_token", newToken);
    } else {
      localStorage.removeItem("auth_token");
    }
  }

  function setUser(newUser) {
    user.value = newUser;
  }

  function loadTokenFromStorage() {
    const storedToken = localStorage.getItem("auth_token");
    if (storedToken) {
      token.value = storedToken;
    }
  }

  function clearAuth() {
    token.value = null;
    user.value = null;
    error.value = null;
    localStorage.removeItem("auth_token");
  }

  async function login(credentials) {
    loading.value = true;
    error.value = null;
    try {
      // Mock Login Check
      if (credentials.username === 'admin' && credentials.password === 'admin') {
        const mockToken = 'mock-token-' + Date.now();
        const mockUser = { name: 'Admin User', role: 'admin' };
        
        setToken(mockToken);
        setUser(mockUser);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        return true;
      }

      // NOTE: Adjust the endpoint if your backend differs
      const response = await api.post("/auth/login", credentials);

      // Adjust based on your actual API response structure
      // Example: { token: '...', user: { ... } }
      const { token: accessToken, user: userData } = response.data;

      if (accessToken) {
        setToken(accessToken);
      }

      if (userData) {
        setUser(userData);
      }

      return true;
    } catch (err) {
      console.error("Login error:", err);
      error.value =
        err.response?.data?.message ||
        "Login failed. Please check your credentials.";
      return false;
    } finally {
      loading.value = false;
    }
  }

  async function register(credentials) {
    loading.value = true;
    error.value = null;
    try {
      const response = await api.post("/auth/register", credentials);
      
      // Assuming auto-login after register, or just return true to redirect to login
      // For this implementation, let's assume it logs the user in directly
      const { token: accessToken, user: userData } = response.data;

      if (accessToken) {
        setToken(accessToken);
      }

      if (userData) {
        setUser(userData);
      }

      return true;
    } catch (err) {
      console.error("Register error:", err);
      error.value =
        err.response?.data?.message ||
        "Registration failed. Please try again.";
      return false;
    } finally {
      loading.value = false;
    }
  }

  function logout() {
    clearAuth();
    // Optional: Redirect logic can be handled here or in the component/router
  }

  return {
    token,
    user,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    loadTokenFromStorage,
    clearAuth,
  };
});
