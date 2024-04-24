import React from 'react';
import AllRoutes from "./Routed";
import { NotificationsProvider } from "@mantine/notifications";

export default function App() {
  return (
    <>
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider>
        <AllRoutes />
      </NotificationsProvider>
    </MantineProvider>
    </>

  );
}