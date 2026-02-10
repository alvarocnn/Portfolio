import { Stack } from "expo-router";
import React from "react";

export default function Layout() {
    return (
        <Stack >
             <Stack.Screen
                name="index"
                options={{
                    title: "Calendar",
                    headerStyle: {
                        height: 60, // Cambia esta altura según sea necesario
                    },
                    headerTitleStyle: {
                        alignSelf: 'center', // Centra el título si es necesario
                    },
                }}
            />
        </Stack>
    );
}