
// Extend BracketManager class with edit/delete functionality
if (typeof BracketManager !== 'undefined') {
	
	/**
	 * Add edit and delete controls to all competitor elements
	 * Call this after rendering the bracket in draft mode
	 */
	BracketManager.prototype.addCompetitorControls = function() {
		const bracketContainer = document.getElementById('bracket-viewer');
		if (!bracketContainer) return;

		// Find all participant containers in the bracket
		// brackets-viewer uses specific class structure
		const participantContainers = bracketContainer.querySelectorAll('.participant');

		participantContainers.forEach((container) => {
			// Skip if already has controls
			if (container.querySelector('.competitor-controls')) return;

			// Find the name element - it's usually in a span after the ID
			// Structure is typically: <div class="participant"><span class="id">#0</span><span>Name</span></div>
			const spans = container.querySelectorAll('span');
			let nameSpan = null;
			let competitorName = '';

			// Find the span that contains the actual name (not the ID)
			for (let span of spans) {
				const text = span.textContent.trim();
				// Skip if it's an ID (#0, #1, etc.) or empty
				if (!text.startsWith('#') && text !== '') {
					nameSpan = span;
					competitorName = text;
					break;
				}
			}

			// If no name span found, skip
			if (!nameSpan) return;

			// Skip empty slots, nulls, and BYEs
			if (!competitorName || 
			    competitorName === 'null' || 
			    competitorName === 'BYE' || 
			    competitorName === 'TBD' ||
			    competitorName === '') {
				return;
			}

			// Make container a flex container
			container.style.display = 'flex';
			container.style.alignItems = 'center';
			container.style.justifyContent = 'space-between';
			container.classList.add('competitor-item');
			
			// Mark the name span as editable
			nameSpan.classList.add('editable-name');
			nameSpan.style.cursor = 'pointer';
			nameSpan.style.flex = '1';

			// Create controls container
			const controlsDiv = document.createElement('div');
			controlsDiv.className = 'competitor-controls';
			controlsDiv.innerHTML = `
				<button class="edit-competitor-btn" title="Edit competitor name" aria-label="Edit">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
					</svg>
				</button>
				<button class="delete-competitor-btn" title="Delete competitor" aria-label="Delete">
					<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
						<path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
					</svg>
				</button>
			`;

			container.appendChild(controlsDiv);

			// Add event listeners
			const editBtn = controlsDiv.querySelector('.edit-competitor-btn');
			const deleteBtn = controlsDiv.querySelector('.delete-competitor-btn');

			editBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				this.editCompetitorName(nameSpan, competitorName);
			});

			deleteBtn.addEventListener('click', (e) => {
				e.stopPropagation();
				this.deleteCompetitor(competitorName);
			});

			// Allow clicking on name to edit
			nameSpan.addEventListener('click', (e) => {
				e.stopPropagation();
				this.editCompetitorName(nameSpan, competitorName);
			});
		});
	};

	/**
	 * Edit competitor name inline
	 * @param {HTMLElement} nameSpan - The span element containing the competitor name
	 * @param {string} originalName - The original name of the competitor
	 */
	BracketManager.prototype.editCompetitorName = function(nameSpan, originalName) {
		// Prevent multiple edits on the same element
		if (nameSpan.querySelector('input')) return;

		// Create input field
		const input = document.createElement('input');
		input.type = 'text';
		input.value = originalName;
		input.className = 'competitor-name-input';
		input.style.cssText = `
			width: 100%;
			padding: 4px 8px;
			border: 2px solid #3b82f6;
			border-radius: 4px;
			outline: none;
			font-size: inherit;
			font-family: inherit;
			background: white;
			box-sizing: border-box;
		`;

		// Store original display
		const originalDisplay = nameSpan.style.display;
		const originalContent = nameSpan.innerHTML;

		// Replace span content with input
		nameSpan.innerHTML = '';
		nameSpan.appendChild(input);
		input.focus();
		input.select();

		// Save changes function
		const saveChanges = () => {
			const newName = input.value.trim();

			if (newName && newName !== originalName && newName !== 'null') {
				// Update in competitors array
				const index = this.competitors.indexOf(originalName);
				if (index !== -1) {
					this.competitors[index] = newName;
				}

				// Update in bracketData.participants
				if (this.bracketData && this.bracketData.participants) {
					this.bracketData.participants = this.bracketData.participants.map(p => {
						if (p && p.name === originalName) {
							return { ...p, name: newName };
						}
						return p;
					});
				}

				// Restore span and update text
				nameSpan.innerHTML = originalContent;
				nameSpan.textContent = newName;

				// Save and re-render
				this.saveToLocalStorage();
				
				// Re-render the bracket
				setTimeout(() => {
					this.renderBracket();
				}, 100);
				
				this.showNotification(`Renamed "${originalName}" to "${newName}"`, 'success');
			} else {
				// Just restore the original content
				nameSpan.innerHTML = originalContent;
			}
		};

		// Cancel changes function
		const cancelChanges = () => {
			nameSpan.innerHTML = originalContent;
		};

		// Event listeners
		input.addEventListener('keydown', (e) => {
			if (e.key === 'Enter') {
				e.preventDefault();
				saveChanges();
			} else if (e.key === 'Escape') {
				e.preventDefault();
				cancelChanges();
			}
		});

		input.addEventListener('blur', () => {
			setTimeout(saveChanges, 150);
		});
	};

	/**
	 * Delete a competitor from the bracket
	 * @param {string} competitorName - Name of competitor to delete
	 */
	BracketManager.prototype.deleteCompetitor = function(competitorName) {
		// Confirm deletion
		const confirmed = confirm(
			`Delete "${competitorName}" from the bracket?\n\n` +
			`This will remove them from all matches and cannot be undone.`
		);
		
		if (!confirmed) return;

		// Remove from competitors array - replace with null
		const index = this.competitors.indexOf(competitorName);
		if (index !== -1) {
			this.competitors[index] = null;
		}

		// Remove from bracketData.participants
		if (this.bracketData && this.bracketData.participants) {
			this.bracketData.participants = this.bracketData.participants.filter(p => {
				return !p || p.name !== competitorName;
			});
		}

		// Update matches to remove this participant
		if (this.bracketData && this.bracketData.matches) {
			this.bracketData.matches = this.bracketData.matches.map(match => {
				const updatedMatch = { ...match };
				
				// Check opponent1
				if (match.opponent1) {
					const participant1 = this.bracketData.participants.find(p => p && p.id === match.opponent1.id);
					if (participant1 && participant1.name === competitorName) {
						updatedMatch.opponent1 = null;
					}
				}
				
				// Check opponent2
				if (match.opponent2) {
					const participant2 = this.bracketData.participants.find(p => p && p.id === match.opponent2.id);
					if (participant2 && participant2.name === competitorName) {
						updatedMatch.opponent2 = null;
					}
				}
				
				return updatedMatch;
			});
		}

		// Save and re-render
		this.saveToLocalStorage();
		
		// Re-render the bracket
		setTimeout(() => {
			this.renderBracket();
		}, 100);
		
		this.showNotification(`"${competitorName}" has been deleted`, 'success');
	};

	/**
	 * Show a notification message
	 * @param {string} message - Message to display
	 * @param {string} type - Type of notification: 'success', 'error', or 'info'
	 */
	BracketManager.prototype.showNotification = function(message, type = 'info') {
		const notification = document.createElement('div');
		notification.className = `bracket-notification notification-${type}`;
		notification.textContent = message;
		notification.style.cssText = `
			position: fixed;
			top: 20px;
			right: 20px;
			padding: 12px 20px;
			border-radius: 8px;
			background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
			color: white;
			font-weight: 500;
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
			z-index: 9999;
			animation: slideIn 0.3s ease;
		`;

		document.body.appendChild(notification);

		setTimeout(() => {
			notification.style.animation = 'slideOut 0.3s ease';
			setTimeout(() => notification.remove(), 300);
		}, 3000);
	};

	// Update the renderBracket method to add controls after rendering
	const originalRenderBracket = BracketManager.prototype.renderBracket;
	BracketManager.prototype.renderBracket = function() {
		// Call the original renderBracket
		originalRenderBracket.call(this);

		// If in draft mode, add competitor controls after a delay
		if (this.isDraftMode) {
			setTimeout(() => {
				this.addCompetitorControls();
			}, 500); // Longer delay to ensure brackets-viewer is fully rendered
		}
	};
}

// Add CSS styles
const style = document.createElement('style');
style.textContent = `
	@keyframes slideIn {
		from {
			transform: translateX(400px);
			opacity: 0;
		}
		to {
			transform: translateX(0);
			opacity: 1;
		}
	}

	@keyframes slideOut {
		from {
			transform: translateX(0);
			opacity: 1;
		}
		to {
			transform: translateX(400px);
			opacity: 0;
		}
	}

	.competitor-item {
		transition: background-color 0.2s ease;
		padding: 4px 8px;
		border-radius: 4px;
		position: relative;
	}

	.competitor-item:hover {
		background-color: rgba(59, 130, 246, 0.05);
	}

	.editable-name {
		padding: 4px;
		border-radius: 4px;
		transition: background-color 0.2s ease;
	}

	.editable-name:hover {
		background-color: rgba(59, 130, 246, 0.1);
	}

	.competitor-controls {
		display: flex;
		gap: 4px;
		opacity: 0;
		transition: opacity 0.2s ease;
		margin-left: 8px;
	}

	.competitor-item:hover .competitor-controls {
		opacity: 1;
	}

	.competitor-controls button {
		padding: 4px;
		border: none;
		background: transparent;
		cursor: pointer;
		border-radius: 4px;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s ease;
	}

	.competitor-controls button:hover {
		transform: scale(1.1);
	}

	.edit-competitor-btn:hover {
		background-color: rgba(59, 130, 246, 0.1);
		color: #3b82f6;
	}

	.delete-competitor-btn:hover {
		background-color: rgba(239, 68, 68, 0.1);
		color: #ef4444;
	}

	.competitor-controls svg {
		width: 16px;
		height: 16px;
	}

	.competitor-name-input {
		min-width: 100px;
	}

	/* Make sure controls work with drag-and-drop */
	#bracket-viewer.draft-mode .competitor-item {
		cursor: default;
	}
`;
document.head.appendChild(style);

console.log('Competitor edit and delete functionality loaded');