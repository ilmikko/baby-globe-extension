async function SettingsChanged() {
	console.log("Saving settings:", SETTINGS);
	await chrome.storage.local.set({'settings': JSON.stringify(SETTINGS)});

	// Notify content script of the change
	const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
	chrome.tabs.sendMessage(tab.id, {
		type: 'SETTINGS_CHANGED',
		data: SETTINGS,
	});
}

async function LoadSettings() {
	try {
		// Load saved settings.
		console.log("Loading saved settings...");
		const { settings } = await chrome.storage.local.get('settings');
		console.log("Parsing JSON:", settings);
		let loaded = JSON.parse(settings);
		SETTINGS.size = loaded.size;
	} catch(err) {
		console.log("Failed to load saved settings:", err);
	}
	ApplySettings();
}

// Make the DOM reflect the settings.
function ApplySettings(settings) {
	console.log("Settings:", SETTINGS);
	size.value = SETTINGS.size;
}

document.addEventListener('DOMContentLoaded', async () => {
	const size = document.getElementById('size');

	// Save on change.
	size.addEventListener('change', async () => {
		SETTINGS.size = size.value;
		ApplySettings();
		SettingsChanged();
	});
});

// Load settings and apply them to the options DOM.
LoadSettings();
