class TournamentState {
	constructor() {
		this.bracketMode = false;
	}

	setBracketMode(isActive) {
		this.bracketMode = isActive;
		this._notifyChange('bracketMode');
	}

	isActiveMode() {
		return this.bracketMode;
	}

	getBracketModeString() {
		return this.bracketMode ? 'active' : 'draft';
	}

	getDraftBracket() {
		if (typeof window !== 'undefined' && window.bracketManager) {
			return window.bracketManager.bracketData;
		}
		return null;
	}

	_notifyChange(changeType) {
		if (typeof window !== 'undefined' && window.dispatchEvent) {
			window.dispatchEvent(
				new CustomEvent('tournamentStateChanged', {
					detail: {
						changeType: changeType,
						bracketMode: this.bracketMode,
					},
				})
			);
		}
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = TournamentState;
}

if (typeof window !== 'undefined') {
	window.TournamentState = TournamentState;

	if (!window.tournamentState) {
		window.tournamentState = new TournamentState();
	}
}
