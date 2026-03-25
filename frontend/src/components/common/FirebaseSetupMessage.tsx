import React from 'react';
import './FirebaseSetupMessage.css';

const FirebaseSetupMessage: React.FC = () => {
  return (
    <div className="firebase-setup-message">
      <div className="setup-card">
        <h2>🔧 Firebase Setup Required</h2>
        <p>To use authentication features, you need to configure Firebase:</p>

        <div className="setup-steps">
          <h3>Quick Setup Steps:</h3>
          <ol>
            <li>
              Go to{' '}
              <a
                href="https://console.firebase.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Firebase Console
              </a>
            </li>
            <li>Create a new project or select existing one</li>
            <li>Enable Authentication with Email/Password</li>
            <li>Go to Project Settings → General → Your apps</li>
            <li>Copy your Firebase config values</li>
            <li>
              Update the <code>frontend/.env</code> file with your values
            </li>
            <li>Restart the development server</li>
          </ol>
        </div>

        <div className="demo-note">
          <p>
            <strong>For now:</strong> You can explore the UI and design, but
            authentication features won't work until Firebase is configured.
          </p>
        </div>

        <div className="help-links">
          <a
            href="https://firebase.google.com/docs/web/setup"
            target="_blank"
            rel="noopener noreferrer"
          >
            📚 Firebase Setup Guide
          </a>
        </div>
      </div>
    </div>
  );
};

export default FirebaseSetupMessage;
