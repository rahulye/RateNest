/** @format */

import { PaletteIcon } from "lucide-react";
import { useEffect, useState } from "react";

const THEMES = ["forest", "silk"];

const ThemeSelector = () => {
	const [theme, setTheme] = useState(() => {
		if (typeof window !== "undefined") {
			const stored = localStorage.getItem("theme");
			if (stored && THEMES.includes(stored)) return stored;
		}
		return "forest";
	});

	useEffect(() => {
		document.documentElement.setAttribute("data-theme", theme);
		localStorage.setItem("theme", theme);
	}, [theme]);

	return (
		<div className="dropdown dropdown-end">
			<div tabIndex={0} role="button" className="btn btn-ghost btn-sm gap-1">
				<PaletteIcon className="size-4" />
				<span className="hidden sm:inline">Theme</span>
			</div>
			<ul
				tabIndex={0} // for tab key
				className="dropdown-content menu rounded-box bg-base-300 w-40 py-3 gap-2 flex-nowrap shadow-xl mt-2">
				{THEMES.map((t) => (
					<li key={t}>
						<button
							onClick={() => setTheme(t)}
							className={`flex justify-between ${theme === t ? "bg-primary rounded text-primary-content" : ""}`}
						>
							<span className={`capitalize`}>{t}</span>
							<div className="flex gap-1 px-2 py-1 rounded " data-theme={t}>
								<span className="w-2 h-4 rounded-sm bg-primary"></span>
								<span className="w-2 h-4 rounded-sm bg-secondary"></span>
								<span className="w-2 h-4 rounded-sm bg-accent"></span>
								<span className="w-2 h-4 rounded-sm bg-neutral"></span>
							</div>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default ThemeSelector;
