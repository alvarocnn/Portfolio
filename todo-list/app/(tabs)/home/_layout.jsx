import { Stack } from "expo-router";
import React from "react";
import { ModalPortal } from "react-native-modals";


export default function Layout() {
    return (
        <>
        <Stack >
        <Stack.Screen
                name="index"
                options={{
                    title: "Taskify",
                    headerStyle: {
                        height: 60, // Cambia esta altura según sea necesario
                    },
                    headerTitleStyle: {
                        alignSelf: 'center', // Centra el título si es necesario
                    },
                }}
            />
        </Stack>
        <ModalPortal/>
        </>
    );
}