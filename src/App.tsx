import "@radix-ui/themes/styles.css";
import "./themes/theme-config.css";

import * as Toast from "@radix-ui/react-toast";

import { Theme } from "@radix-ui/themes";
import { GlobalStyle } from "./styles/global";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "@routes/app.routes";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClient } from "@lib/react-query";
import { ToastCustomProvider } from "@contexts/ToastContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Theme
        accentColor="green"
        grayColor="gray"
        radius="small"
        hasBackground={false}
        panelBackground="solid"
      >
        <Toast.Provider>
          <GlobalStyle />
          <BrowserRouter>
            <ToastCustomProvider>
              <AppRouter />
            </ToastCustomProvider>
          </BrowserRouter>
        </Toast.Provider>
      </Theme>
    </QueryClientProvider>
  );
}

export default App;
