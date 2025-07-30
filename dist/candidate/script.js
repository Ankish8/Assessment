class RecordingInterface {
    constructor() {
        this.mediaRecorder = null;
        this.audioChunks = [];
        this.recordedBlob = null;
        this.recordingTimer = null;
        this.recordingStartTime = null;
        this.maxRecordingTime = 600; // 10 minutes in seconds
        this.currentAudio = null;
        
        this.initializeElements();
        this.bindEvents();
        this.hideInterface(); // Start hidden
        this.showState('ready');
    }
    
    initializeElements() {
        // Overlay and card
        this.overlay = document.getElementById('recordingOverlay');
        this.card = document.getElementById('recordingCard');
        
        // States
        this.readyState = document.getElementById('readyState');
        this.recordingState = document.getElementById('recordingState');
        this.completedState = document.getElementById('completedState');
        
        // Buttons
        this.startRecordingBtn = document.getElementById('startRecordingBtn');
        this.stopRecordingBtn = document.getElementById('stopRecordingBtn');
        this.playBtn = document.getElementById('playBtn');
        this.discardBtn = document.getElementById('discardBtn');
        this.closeBtn = document.getElementById('closeBtn');
        this.closeTopBtn = document.getElementById('closeTopBtn');
        
        // Display elements
        this.currentTime = document.getElementById('currentTime');
        this.maxTime = document.getElementById('maxTime');
        this.progressBar = document.getElementById('progressBar');
        this.audioDuration = document.getElementById('audioDuration');
        
        // Permission elements
        this.permissionAlert = document.getElementById('permissionAlert');
        this.retryPermissionBtn = document.getElementById('retryPermissionBtn');
        
        // Set max time display
        this.maxTime.textContent = this.formatTime(this.maxRecordingTime);
    }
    
    bindEvents() {
        // Recording controls
        this.startRecordingBtn.addEventListener('click', () => this.startRecording());
        this.stopRecordingBtn.addEventListener('click', () => this.stopRecording());
        
        // Playback controls
        this.playBtn.addEventListener('click', () => this.togglePlayback());
        
        // Interface controls
        this.discardBtn.addEventListener('click', () => this.discardRecording());
        this.closeBtn.addEventListener('click', () => this.closeInterface());
        this.closeTopBtn.addEventListener('click', () => this.closeInterface());
        if (this.retryPermissionBtn) {
            this.retryPermissionBtn.addEventListener('click', () => this.retryPermission());
        }
        
        // Font size controls
        this.bindFontControls();
        
        // Overlay click to close
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeInterface();
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeInterface();
            }
        });
    }
    
    showState(state) {
        // Hide all states
        this.readyState.classList.add('hidden');
        this.recordingState.classList.add('hidden');
        this.completedState.classList.add('hidden');
        
        // Show requested state
        switch(state) {
            case 'ready':
                this.readyState.classList.remove('hidden');
                break;
            case 'recording':
                this.recordingState.classList.remove('hidden');
                break;
            case 'completed':
                this.completedState.classList.remove('hidden');
                break;
        }
    }
    
    
    async startRecording() {
        try {
            this.hidePermissionAlert();
            
            // Request microphone access
            const stream = await navigator.mediaDevices.getUserMedia({ 
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                } 
            });
            
            // Initialize MediaRecorder
            this.mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            });
            
            this.audioChunks = [];
            
            // Event handlers
            this.mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    this.audioChunks.push(event.data);
                }
            };
            
            this.mediaRecorder.onstop = () => {
                this.recordedBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
                this.processRecording();
                
                // Stop all tracks to release microphone
                stream.getTracks().forEach(track => track.stop());
            };
            
            // Start recording
            this.mediaRecorder.start(1000); // Collect data every second
            this.recordingStartTime = Date.now();
            this.showState('recording');
            this.startTimer();
            
            // Update UI for recording state
            this.startRecordingBtn.disabled = true;
            
        } catch (error) {
            console.error('Error starting recording:', error);
            this.handlePermissionError(error);
        }
    }
    
    handlePermissionError(error) {
        if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
            this.showPermissionAlert();
        } else {
            this.showError('Unable to access microphone. Please check your browser settings.');
        }
    }
    
    showPermissionAlert() {
        if (this.permissionAlert) {
            this.permissionAlert.classList.remove('hidden');
        }
    }
    
    hidePermissionAlert() {
        if (this.permissionAlert) {
            this.permissionAlert.classList.add('hidden');
        }
    }
    
    retryPermission() {
        this.hidePermissionAlert();
        this.startRecording();
    }
    
    stopRecording() {
        if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
            this.mediaRecorder.stop();
            this.stopTimer();
        }
    }
    
    startTimer() {
        this.recordingTimer = setInterval(() => {
            const elapsed = Math.floor((Date.now() - this.recordingStartTime) / 1000);
            this.updateTimer(elapsed);
            
            // Auto-stop at max time
            if (elapsed >= this.maxRecordingTime) {
                this.stopRecording();
            }
        }, 1000);
    }
    
    stopTimer() {
        if (this.recordingTimer) {
            clearInterval(this.recordingTimer);
            this.recordingTimer = null;
        }
    }
    
    updateTimer(seconds) {
        this.currentTime.textContent = this.formatTime(seconds);
        
        // Update progress bar
        const progress = (seconds / this.maxRecordingTime) * 100;
        this.progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
    
    processRecording() {
        // Calculate recording duration
        const duration = Math.floor((Date.now() - this.recordingStartTime) / 1000);
        this.audioDuration.textContent = this.formatTime(duration);
        
        // Create audio element for playback
        const audioUrl = URL.createObjectURL(this.recordedBlob);
        this.currentAudio = new Audio(audioUrl);
        
        // Update play button when audio ends
        this.currentAudio.addEventListener('ended', () => {
            this.updatePlayButton(false);
        });
        
        // Show completed state
        this.showState('completed');
        
        // Re-enable start button
        this.startRecordingBtn.disabled = false;
        
        // Simulate upload success (in real app, you'd upload to server)
        setTimeout(() => {
            this.showUploadSuccess();
        }, 500);
    }
    
    showUploadSuccess() {
        // Success state is already indicated by the success icon and "Recording Complete" message
        // No additional changes needed for the new design
    }
    
    togglePlayback() {
        if (!this.currentAudio) return;
        
        if (this.currentAudio.paused) {
            this.currentAudio.play();
            this.updatePlayButton(true);
        } else {
            this.currentAudio.pause();
            this.updatePlayButton(false);
        }
    }
    
    updatePlayButton(isPlaying) {
        const svg = this.playBtn.querySelector('svg');
        
        if (isPlaying) {
            // Show pause icon
            svg.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
            this.playBtn.setAttribute('aria-label', 'Pause audio');
        } else {
            // Show play icon
            svg.innerHTML = '<polygon points="5,3 19,12 5,21"></polygon>';
            this.playBtn.setAttribute('aria-label', 'Play audio');
        }
    }
    
    discardRecording() {
        // Show confirmation dialog
        if (confirm('Are you sure you want to discard this recording?')) {
            this.resetRecording();
            this.showState('ready');
        }
    }
    
    resetRecording() {
        if (this.currentAudio) {
            this.currentAudio.pause();
            this.currentAudio = null;
        }
        
        this.recordedBlob = null;
        this.audioChunks = [];
        this.stopTimer();
        this.progressBar.style.width = '0%';
        this.updatePlayButton(false);
        this.startRecordingBtn.disabled = false;
    }
    
    closeInterface() {
        // In a real application, you might want to check if recording is in progress
        if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
            if (confirm('Recording is in progress. Are you sure you want to close?')) {
                this.stopRecording();
                this.hideInterface();
            }
        } else {
            this.hideInterface();
        }
    }
    
    hideInterface() {
        this.overlay.style.display = 'none';
        this.resetRecording();
    }
    
    showInterface() {
        this.overlay.style.display = 'flex';
        this.showState('ready');
    }
    
    showError(message) {
        // In a real app, you'd show a proper error UI
        alert(message);
    }
    
    // Format time helper
    formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // Font size controls
    bindFontControls() {
        const fontButtons = document.querySelectorAll('.font-btn, .font-btn-compact');
        const readingText = document.getElementById('readingText');
        
        if (!readingText) return; // Only bind if reading text exists
        
        fontButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                // Remove active class from all buttons
                fontButtons.forEach(b => b.classList.remove('active'));
                
                // Add active class to clicked button
                e.target.classList.add('active');
                
                // Remove all font size classes
                readingText.classList.remove('font-small', 'font-medium', 'font-large');
                
                // Add the selected font size class
                const size = e.target.dataset.size;
                readingText.classList.add(`font-${size}`);
                
                // Save preference to localStorage
                localStorage.setItem('reading-font-size', size);
            });
        });
        
        // Load saved font size preference
        const savedSize = localStorage.getItem('reading-font-size') || 'medium';
        const savedButton = document.querySelector(`[data-size="${savedSize}"]`);
        if (savedButton && readingText) {
            // Remove active from all and set saved as active
            fontButtons.forEach(b => b.classList.remove('active'));
            savedButton.classList.add('active');
            
            // Apply saved font size
            readingText.classList.remove('font-small', 'font-medium', 'font-large');
            readingText.classList.add(`font-${savedSize}`);
        }
    }
}

// Initialize the recording interface when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.recordingInterface = new RecordingInterface();
});

// Global function to show the recording interface (for demo purposes)
function showRecordingInterface() {
    if (window.recordingInterface) {
        window.recordingInterface.showInterface();
    }
}

// Handle browser compatibility
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    console.error('MediaDevices API or getUserMedia not supported in this browser.');
    
    // Show error message to user
    document.addEventListener('DOMContentLoaded', () => {
        const errorMessage = document.createElement('div');
        errorMessage.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #FEF2F2;
            border: 1px solid #FECACA;
            color: #DC2626;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 14px;
            z-index: 10000;
            max-width: 300px;
        `;
        errorMessage.textContent = 'Your browser does not support audio recording. Please use a modern browser like Chrome, Firefox, or Safari.';
        document.body.appendChild(errorMessage);
        
        // Remove error message after 10 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 10000);
    });
}

// Add accessibility enhancements
document.addEventListener('DOMContentLoaded', () => {
    // Add ARIA labels and roles
    const recordingOverlay = document.getElementById('recordingOverlay');
    if (recordingOverlay) {
        recordingOverlay.setAttribute('role', 'dialog');
        recordingOverlay.setAttribute('aria-modal', 'true');
        recordingOverlay.setAttribute('aria-labelledby', 'recording-title');
        recordingOverlay.setAttribute('aria-describedby', 'recording-description');
    }
    
    // Add focus management
    const firstFocusableElement = recordingOverlay?.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (firstFocusableElement) {
        firstFocusableElement.focus();
    }
});

// Add enhanced keyboard navigation
document.addEventListener('keydown', (e) => {
    const recordingOverlay = document.getElementById('recordingOverlay');
    if (!recordingOverlay || recordingOverlay.style.display === 'none') return;
    
    // Tab trapping for accessibility
    if (e.key === 'Tab') {
        const focusableElements = recordingOverlay.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});