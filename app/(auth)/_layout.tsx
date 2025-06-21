import { UserProvider } from "@/context/UserContext";
import { Stack } from "expo-router";

export default function AuthRoutesLayout() {
  // const { isSignedIn } = useAuth();

  // console.log("AuthRoutesLayout isSignedIn:", isSignedIn);

  // if (isSignedIn) {
  //   return <Redirect href={"/"} />;
  // }

  return (
    <UserProvider>

    <Stack   
      screenOptions={{
        headerShown: false,
      }}
    />
    </UserProvider>
  )
}
