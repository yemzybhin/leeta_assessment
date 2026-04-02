import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomTabIcon } from "../../src/components/customTabBarIcon";

const AppLayout = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent={false}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarStyle: {
            backgroundColor: "#fff",
            borderTopWidth: 0,
            elevation: 0,
            height: 80,
            paddingTop: 8,
            paddingBottom: 8,
            flexDirection: "row",
            justifyContent: "space-around",
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <CustomTabIcon
                iconName="receipt"
                label="Orders"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="insights"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <CustomTabIcon
                iconName="business"
                label="Insights"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="gas"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <CustomTabIcon iconName="flame" label="Gas" focused={focused} />
            ),
          }}
        />
      </Tabs>
    </SafeAreaView>
  );
};

export default AppLayout;
