/**
 * TournamentState - Manages the bracket mode state
 *
 * Tracks bracketMode: Boolean (true = Active, false = Draft)
 */
class TournamentState {
	constructor() {
		this.bracketMode = false;
	}

	/**
	 * Set the bracket mode
	 * @param {boolean} isActive - true for Active mode, false for Draft mode
	 */
	setBracketMode(isActive) {
		this.bracketMode = isActive;
		this._notifyChange('bracketMode');
	}

	/**
	 * Get the current bracket mode
	 * @returns {boolean} true if Active mode, false if Draft mode
	 */
	isActiveMode() {
		return this.bracketMode;
	}

	/**
	 * Get the current bracket mode as string
	 * @returns {string} 'active' or 'draft'
	 */
	getBracketModeString() {
		return this.bracketMode ? 'active' : 'draft';
	}

	/**
	 * Notify listeners of state changes
	 * @private
	 * @param {string} changeType - Type of change that occurred
	 */
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
