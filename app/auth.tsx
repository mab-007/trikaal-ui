import { Stack, useRouter } from "expo-router";
import { Text, View } from "react-native";
import { useEffect } from "react";

export default function Auth() {

  return (
    <>
      <Stack.Screen name="index" options={{ headerShown: false}} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FAF0E6",
        }}
      >
        <Text>Edit app/auth.tsx to adsd edit this screen.</Text>
      </View>
    </>
  );
}