import { GoogleSignin } from "@react-native-google-signin/google-signin";
import axiosClient from "../api/instance";
import AsyncStorage from "@react-native-async-storage/async-storage";

GoogleSignin.configure({
  webClientId:
    "56244500164-ckeos32n9d8vhdid5fqa5ij86mhqcjum.apps.googleusercontent.com",
  scopes: ["profile", "email"],
});

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    await GoogleSignin.signOut();

    const googleSignInResult = await GoogleSignin.signIn();
    const email = googleSignInResult?.data?.user?.email;

    if (!email) {
      throw new Error("Failed to retrieve email from Google Sign-In.");
    }

    const response = await axiosClient.post(`/login/google?email=${email}`);

    if (response) {
      const token = response?.data?.jwt_token;
      await AsyncStorage.setItem("userToken", JSON.stringify({ token }));
    }

    return response.data;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    throw error;
  }
};

export const handleLogout = async () => {
  try {
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem("userInfo");
    console.log("Đăng xuất thành công!");
  } catch (error) {
    console.error("Lỗi khi đăng xuất:", error);
  }
};
