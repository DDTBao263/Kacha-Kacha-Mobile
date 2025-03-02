import { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId:
    "56244500164-b875sjdipi46i3krpfnibpe78lhi92df.apps.googleusercontent.com",
  scopes: ["profile", "email"],
});

const useGoogleFirebase = () => {
  const [user, setUser] = useState(null);

  // Theo dõi trạng thái đăng nhập
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser);
    return subscriber; // Hủy đăng ký khi component unmount
  }, []);

  // Hàm đăng nhập với Google
  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.error("Google Sign-In Error:", error);
    }
  };

  return { user, signInWithGoogle };
};

export default useGoogleFirebase;
