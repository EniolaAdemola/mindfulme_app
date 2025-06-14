import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      className="flex-1 items-center justify-center"
      style={{ flex: 1, backgroundColor: "#53389E" }}
    >
      <Text className="text-white text-5xl"> Bolu.</Text>
      {/* <Link href="/articles/test" className="text-2xl">
        Article
      </Link> */}
    </View>
  );
}
