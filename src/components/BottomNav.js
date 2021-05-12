import React from "react";
import styled from "styled-components/native";
import colors from "../variables/color";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

const BottomNavWrapper = styled.View`
  display: flex;
  flex-direction: row;
  /* justify-content: space-evenly; */
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: 58px;
  background: ${colors.smoothBlack};
`;

const IconWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const IconText = styled.Text`
  color: ${colors.text};
  font-size: 14px;
  font-family: "Manrope_500Medium";
  margin-top: 3px;
`;

const BottomNav = ({ state, descriptors, navigation }) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  if (focusedOptions.screen !== "Tesetata") {
    return (
      <BottomNavWrapper style={{ flexDirection: "row" }}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, { screen: options.screen });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <IconWrapper
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
            >
              <AntDesign
                name={options.icon}
                size={20}
                color={isFocused ? colors.text : colors.unFocused}
              />
              <IconText
                style={
                  isFocused
                    ? { color: colors.text }
                    : { color: colors.unFocused }
                }
              >
                {label}
              </IconText>
            </IconWrapper>
          );
        })}
      </BottomNavWrapper>
    );
  } else return null;
};

export default BottomNav;
