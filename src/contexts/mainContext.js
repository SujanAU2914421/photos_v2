/* eslint-disable */
import { createContext, useState } from "react";

export const MainContext = createContext(null);
export function MainContextProvider({ children }) {
	const [data, setData] = useState({
		darkMode: false,
	});
	return (
		<MainContext.Provider value={[data, setData]}>
			{children}
		</MainContext.Provider>
	);
}

// const [data, setData] = useContext(MainContext);
// useEffect(() => {
// 	setData({
// 		...data,
// 		darkMode: true,
// 	});
// }, []);
