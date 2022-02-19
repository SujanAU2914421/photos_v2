import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MainContextProvider } from "./contexts/mainContext";

ReactDOM.render(
	<React.StrictMode>
		<MainContextProvider>
			<App />
		</MainContextProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
